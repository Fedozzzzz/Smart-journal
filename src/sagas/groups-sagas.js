import {call, put, takeLatest} from 'redux-saga/effects';
import {actionTypes} from "../store/groupReducer";

//MAIN TABLE COMPONENT

//GROUPS COMPONENT
const url = 'http://localhost:8200';

export function* getGroups() {
    yield takeLatest(actionTypes.firstInitGroupType, callGetGroups)
}

function* callGetGroups() {
    try {
        console.log('saga-get-groups');

        let headers = new Headers();
        // headers.append("Content-type", "text/html");
        // headers.append("Access-Control-Allow-Origin", "*");
        const groups = yield call(() => fetch(url + '/groups',
            {
                method: 'GET',
                headers: headers,
                // mode: "no-cors",
                // body: null
            }).then(response => response.json())
            .catch(error => console.error(error)));
        // console.log('saga-get-groups-groups');
        console.log('saga groups: ', groups);
        //yield dispatch();
        yield put({type: actionTypes.firstInitGroupSucceededType, groups});
    } catch (error) {
        console.log(error);
        yield put({type: actionTypes.firstInitGroupFailedType});
    }
}

export function* createGroup() {
    yield takeLatest(actionTypes.createGroupSubmitType, callCreateGroup);
}

function* callCreateGroup({data}) {
    try {
        console.log("data-from-saga", data);
        let headers = new Headers();
        headers.append('Content-Type', "application/json");
        const group = yield call(() => fetch(url + '/groups',
            {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(data)
            }).then(response => response.json())
            .catch(error => console.log(error)));
        console.log('saga-create-group', group);
        yield put({type: actionTypes.createGroupSucceededType, group})
    } catch (error) {
        console.log(error);
        yield put({type: actionTypes.createGroupFailedType})
    }
}

export function* editGroup() {
    yield takeLatest(actionTypes.editGroupSubmitType, callEditGroup)
}

function* callEditGroup({guid, data}) {
    try {
        console.log("saga-edit ", guid, data);
        let headers = new Headers();
        headers.append('Content-Type', "application/json");
        yield call(() => fetch(url + '/groups/' + guid.toString(),
            {
                method: 'PUT',
                headers: headers,
                body: JSON.stringify(data)
            }).catch(error => console.log(error)));
        yield put({type: actionTypes.editGroupSucceededType})
    } catch (error) {
        console.log(error);
        yield put({type: actionTypes.editGroupFailedType})
    }
}

export function* deleteGroup() {
    yield takeLatest(actionTypes.deleteGroupType, callDeleteGroup)
}

function* callDeleteGroup({guid}) {
    try {
        let headers = new Headers();
        console.log("saga-delete ", guid);
        headers.append('Content-Type', "application/json");
        yield call(() => fetch(url + '/groups/' + guid.toString(),
            {
                method: 'DELETE',
                headers: headers
            }).catch(error => console.log(error)));
        yield put({type: actionTypes.deleteGroupSucceededType})
    } catch (error) {
        console.log(error);
        yield put({type: actionTypes.deleteGroupFailedType})
    }
}


export function* getGroupById() {
    yield takeLatest(actionTypes.getGroupByIdType, callGetGroupById)
}

function* callGetGroupById({guid}) {
    try {
        // console.log("saga-get-group-by-id", guid);
        let headers = new Headers();
        const groupById = yield call(() => fetch(url + '/groups/' + guid.toString(),
            {
                method: 'GET',
                headers: headers
            }).then(response => response.json())
            .catch(error => console.error(error)));
        // console.log("group data fom saga:", groupById);
        yield put({type: actionTypes.getGroupByIdSucceededType, groupById});
    } catch (error) {
        console.log(error);
        yield put({type: actionTypes.getGroupByIdFailedType});
    }
}


