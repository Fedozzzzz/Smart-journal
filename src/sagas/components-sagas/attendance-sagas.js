import {call, put, takeLatest} from "redux-saga/effects"

//action types
import {actionTypes} from "../../store/reducers/attendanceReducer";

//url
const url = "http://localhost:8202";

export function* getAttendance() {
    yield takeLatest(actionTypes.getAttendanceType, callGetAttendance);
}

function* callGetAttendance({groupId, from, to}) {
    try {
        console.log('saga-get-Attendance');
        let headers = new Headers();
        headers.append('Content-Type', "application/json");
        const attendance = yield call(() => fetch(url + "/attendance/" + groupId
            + "?from=" + from + "&to=" + to,
            {
                method: "GET",
                headers: headers
            })
            .then(res => res.json())
            .catch(err => console.log(err)));
        yield put({type: actionTypes.getAttendanceSucceededType, attendance})
    } catch (e) {
        console.log(e);
        yield put({type: actionTypes.getAttendanceFailedType});
    }
}

//edit attendance
export function* editAttendance() {
    yield takeLatest(actionTypes.editAttendanceSubmitType, callEditAttendance)
}

function* callEditAttendance({groupId, data}) {
    try {
        let headers = new Headers();
        console.log("saga-edit-Attendance");
        headers.append('Content-Type', "application/json");//
        yield call(() => fetch(url + "/attendance/" + groupId,
            {
                method: 'PUT',
                headers: headers,
                body: JSON.stringify(data)
            }).catch(error => console.log(error)));
        yield put({type: actionTypes.editAttendanceSucceededType})
    } catch (error) {
        console.log(error);
        yield put({type: actionTypes.editAttendanceFailedType})
    }
}
