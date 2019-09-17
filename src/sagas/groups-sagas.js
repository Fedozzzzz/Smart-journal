import {call, put, takeLatest} from 'redux-saga/effects';
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
        console.log("data-from-saga", data.startTimes = [false, false]);
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
        yield put({type: createGroupSucceededType, group})
    } catch (error) {
        console.log(error);
        yield put({type: createGroupFailedType})
    }
}

export function* editGroup() {
    yield takeLatest(editGroupSubmitType, callEditGroup)
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
        yield put({type: editGroupSucceededType})
    } catch (error) {
        console.log(error);
        yield put({type: editGroupFailedType})
    }
}

export function* deleteGroup() {
    yield takeLatest(deleteGroupType, callDeleteGroup)
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
        yield put({type: deleteGroupSucceededType})
    } catch (error) {
        console.log(error);
        yield put({type: deleteGroupFailedType})
    }
}


export function* getGroupById() {
    yield takeLatest(getGroupByIdType, callGetGroupById)
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
        yield put({type: getGroupByIdSucceededType, groupById});
    } catch (error) {
        console.log(error);
        yield put({type: getGroupByIdFailedType});
    }
}


