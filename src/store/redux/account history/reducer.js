import {actionTypes} from "./actionTypes";

const initialState = {
    userAccountHistory: null,
    isLoaded: false,
    error: null
};

export const accountHistoryReducer = (state, action) => {

    state = state || initialState;
    switch (action.type) {
        case actionTypes.getAccountHistoryByDateSucceededType:
        case actionTypes.getAccountHistoryByStepSucceededType:
            return {
                ...state,
                userAccountHistory: action.userAccountHistory,
                isLoaded: true,
            };
        case actionTypes.getAccountHistoryByDateFailedType:
        case actionTypes.getAccountHistoryByStepFailedType:
            return {
                ...state,
                error: action.error
            };
        default:
            return state
    }
};