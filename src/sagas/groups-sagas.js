import {call, put, takeLatest} from 'redux-saga/effects'
// import * as api from "../fakeApi"

import {
    firstInitGroupType, firstInitGroupSucceededType,
    firstInitGroupFailedType,
    createGroupSubmitType, createGroupSucceededType,
    createGroupFailedType,
    editGroupSucceededType, editGroupFailedType,
    deleteGroupType, deleteGroupSucceededType,
    deleteGroupFailedType, getGroupByIdType,
    getGroupByIdSucceededType, getGroupByIdFailedType,
    editGroupSubmitType
} from "../store/groupReducer";

//MAIN TABLE COMPONENT

//GROUPS COMPONENT
const url = 'http://localhost:8200';

export function* getGroups() {
    yield takeLatest(firstInitGroupType, callGetGroups)
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
        yield put({type: firstInitGroupSucceededType, groups});
    } catch (error) {
        console.log(error);
        yield put({type: firstInitGroupFailedType});
    }
}

export function* createGroup() {
    yield takeLatest(createGroupSubmitType, callCreateGroup);
}

function* callCreateGroup({data}) {
    try {
        //console.log('saga-create');
        // console.log(this.getState());
        //console.log(data);
        //console.log(JSON.stringify(data));
        console.log("data-from-saga", data.startTimes = [false, false]);
        let headers = new Headers();
        headers.append('Content-Type', "application/json");
        // headers.append("Content-type", "text/html");
        // headers.append("Access-Control-Allow-Origin", "*");
        const group = yield call(() => fetch(url + '/groups',
            {
                method: 'POST',
                headers: headers,
                // headers:"application/json",
                // "Content-Type": "application/json",
                // contentType: 'application/json; charset=UTF-8',
                // mode: "no-cors",
                body: JSON.stringify(data)
            }).then(response => response.json())
            .catch(error => console.log(error)));
        console.log('saga-create-group', group);
        yield put({type: createGroupSucceededType, group})
    } catch (error) {
        console.log(error);
        yield put({type: createGroupFailedType})
    }
}

export function* editGroup() {
    yield takeLatest(editGroupSubmitType, callEditGroup)
}

function* callEditGroup({groupId, data}) {
    try {
        console.log("saga-edit ", groupId, data);
        let headers = new Headers();
        headers.append('Content-Type', "application/json");
        yield call(() => fetch(url + '/groups/' + groupId.toString(),
            {
                method: 'PUT',
                headers: headers,
                // mode: "no-cors",
                body: JSON.stringify(data)
            }).then(response => response.json())
            .catch(error => console.log(error)));
        yield put({type: editGroupSucceededType})
    } catch (error) {
        console.log(error);
        yield put({type: editGroupFailedType})
    }
}

export function* deleteGroup() {
    yield takeLatest(deleteGroupType, callDeleteGroup)
}

function* callDeleteGroup({groupId}) {
    try {
        let headers = new Headers();
        console.log("saga-delete ", groupId);
        headers.append('Content-Type', "application/json");
        yield call(() => fetch(url + '/groups/' + groupId.toString(),
            {
                method: 'DELETE',
                headers: headers
            }).then(response => response.json())
            .catch(error => console.log(error)));
        yield put({type: deleteGroupSucceededType})
    } catch (error) {
        console.log(error);
        yield put({type: deleteGroupFailedType})
    }
}


export function* getGroupById() {
    yield takeLatest(getGroupByIdType, callGetGroupById)
}

function* callGetGroupById({groupId}) {
    try {
        let headers = new Headers();
        const group = yield call(() => fetch(url + '/groups/' + groupId.toString(),
            {
                method: 'GET',
                headers: headers
            }).then(response => response.json())
            .then(data => {
                console.log(data)
            })
            .catch(error => console.error(error)));
        yield put({type: getGroupByIdSucceededType, group});
    } catch (error) {
        console.log(error);
        yield put({type: getGroupByIdFailedType});
    }
}


