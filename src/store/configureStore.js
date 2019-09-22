import {applyMiddleware, combineReducers, compose, createStore} from 'redux';
import createSagaMiddleware from 'redux-saga'
import {connectRouter, routerMiddleware} from "connected-react-router";
// import { routerReducer, routerMiddleware } from 'react-router-redux';
//import * as reducerForSaga from './reducerForSaga'
import * as scheduleReducer from './reducers/scheduleReducer'
import * as groupsReducer from './reducers/tableReducer'
//import * as formReducer from './formReducer'
//import tableSagas from '../sagas/table-sagas'
import mainTableSagas from '../sagas/root-sagas'
import * as groupReducer from "./reducers/groupReducer"
import * as userReducer from "./reducers/userReducer"

//import scheduleSagas from '../sagas/schedule-sagas'

export default function configureStore(history, initialState) {
    const reducers = {
        //users: reducerForSaga.usersReducer,
        //schedule: ScheduleReducer.scheduleReducer
        //form: formReducer.formReducer,
        tableGroups: groupsReducer.tableReducer,
        group: groupReducer.groupReducer,
        schedule: scheduleReducer.scheduleReducer,
        user: userReducer.userReducer
    };

    const sagaMiddleware = createSagaMiddleware();
    const middleware = [
        routerMiddleware(history),
        sagaMiddleware
    ];

    const enhancers = [];
    const isDevelopment = process.env.NODE_ENV === 'development'; //env????
    if (isDevelopment && typeof window !== 'undefined' && window.devToolsExtension) {
        enhancers.push(window.devToolsExtension());
    }

    const rootReducer = combineReducers({
        ...reducers,
        router: connectRouter(history)
    });

    const store = createStore(
        rootReducer,
        initialState,
        compose(applyMiddleware(...middleware), ...enhancers)
    );
    sagaMiddleware.run(mainTableSagas);

    return store;
}
