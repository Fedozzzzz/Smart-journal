import {call, put, takeLatest, all} from 'redux-saga/effects'
import {actionTypes} from "../../store/reducers/scheduleReducer";

//url
const url = 'http://localhost:8200';

//GET

export function* getSchedule() {
    yield takeLatest(actionTypes.getScheduleType, callGetSchedule);
}

function* callGetSchedule({groupId, from, to}) {
    try {
        console.log('saga-get-schedule');
        let headers = new Headers();
        headers.append('Content-Type', "application/json");
        const schedule = yield call(() => fetch(url + "/schedule/" + groupId.toString() +
            "?from=" + from + "&to=" + to,
            {
                method: "GET",
                headers: headers
            })
            .then(res => res.json())
            .catch(err => console.log(err)));
        yield put({type: actionTypes.getScheduleSucceededType, schedule})
    } catch (e) {
        console.log(e);
        yield put({type: actionTypes.getScheduleFailedType});
    }
}

export function* editSchedule() {
    yield takeLatest(actionTypes.editScheduleSubmitType, callEditSchedule)
}

function* callEditSchedule({groupId, data}) {
    try {
        let headers = new Headers();
        console.log("saga-edit-schedule");
        headers.append('Content-Type', "application/json");//
        const newSchedule = yield call(() => fetch(url + "/schedule/" + groupId.toString(),
            {
                method: 'PUT',
                headers: headers,
                body: JSON.stringify(data)
            })
        // .then(response => response.json())
            .catch(error => console.log(error)));
        yield put({type: actionTypes.editScheduleSucceededType, newSchedule})
    } catch (error) {
        console.log(error);
        yield put({type: actionTypes.editScheduleFailedType})
    }
}
