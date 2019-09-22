import {call, put, takeLatest, all} from 'redux-saga/effects'
import {
    initScheduleSucceededType,
    initScheduleFailedType,
    editScheduleSucceededType,
    editScheduleFailedType,
    editScheduleSubmitType, initScheduleType
} from "../../store/reducers/scheduleReducer";

const url = 'http://7a1b344f.ngrok.io';

//GET

export function* getSchedule() {
    yield takeLatest(initScheduleType, callGetSchedule);
}

function* callGetSchedule({id}) {
    try {
        console.log('saga-get-schedule');
        const schedule = yield call(() => fetch(url + "/schedule/" + id.toString() + "?from=",
            {method: "GET"}).then(res => res.json())
            .catch(err => console.log(err)));
        yield put({type: initScheduleSucceededType, schedule})
    } catch (e) {
        yield put({type: initScheduleFailedType});
    }
    // try {
    //     console.log('saga-get-schedule');
    //     const groups = yield fetch(url + '/groups',
    //         {
    //             method: 'GET',
    //         }).then(response => response.json())
    //         .catch(error => console.error(error));
    //     // console.log('saga-get-groups-groups');
    //     console.log('saga groups: ', groups);
    //     //yield dispatch();
    //     yield put({type: firstInitGroupSucceededType, groups});
    // } catch (error) {
    //     yield put({type: firstInitGroupFailedType});
    // }
}


export function* editSchedule() {
    yield takeLatest(editScheduleSubmitType, callEditSchedule)
}

function* callEditSchedule({data}, {id}) {
    try {
        let headers = new Headers();
        console.log("saga-edit-schedule");
        headers.append('Content-Type', "application/json");//
        const newSchedule = yield call(() => fetch(url + "/schedule/" + id.toString(),
            {
                method: 'PUT',
                headers: headers,
                body: JSON.stringify(data)
            }).then(response => response.json())
            .catch(error => console.log(error)));
        yield put({type: editScheduleSucceededType, newSchedule})
    } catch (error) {
        yield put({type: editScheduleFailedType})
    }
}
