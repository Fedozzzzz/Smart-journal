import {call, put, takeLatest, all} from 'redux-saga/effects'
import * as api from "../fakeApi"
import {
    initGroupsType,
    initGroupsSucceededType,
    initGroupsFailedType
} from "../store/tableReducer";
import {
    firstInitGroupType,
    firstInitGroupSucceededType,
    firstInitGroupFailedType,
    createGroupType,
    createGroupSubmitType,
    createGroupSucceededType,
    createGroupFailedType,
    editGroupType,
    editGroupSucceededType,
    editGroupFailedType,
    deleteGroupType,
    deleteGroupSucceededType,
    deleteGroupFailedType,
    getUsersType,
    getUsersSucceededType,
    getUsersFailedType,
    getGroupByIdType,
    getGroupByIdSucceededType,
    getGroupByIdFailedType,
    createUserSubmitType,
    createUserSucceededType,
    createUserFailedType,
    getUserType,
    getUserSucceededType,
    getUserFailedType,
    addUserToGroupType,
    addUserToGroupSucceededType,
    addUserToGroupFailedType,
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
        const groups = yield fetch(url + '/groups',
            {
                method: 'GET',
                headers: headers
            }).then(response => response.json())
            .catch(error => console.error(error));
        // console.log('saga-get-groups-groups');
        console.log('saga groups: ', groups);
        //yield dispatch();
        yield put({type: firstInitGroupSucceededType, groups});
    } catch (error) {
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
        let headers = new Headers();
        headers.append('Content-Type', "application/json");
        // headers.append("Content-type", "text/html");
        // headers.append("Access-Control-Allow-Origin", "*");
        const group = yield fetch(url + '/groups',
            {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(data)
            }).then(response => response.json())
            .catch(error => console.log(error));
        //console.log('saga-group', group);
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
        yield call(fetch(url + '/groups/' + groupId.toString(),
            {
                method: 'PUT',
                headers: headers,
                body: JSON.stringify(data)
            }).then(response => response.json())
            .catch(error => console.log(error)));
        yield put({type: editGroupSucceededType, data})
    } catch (error) {
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
        yield call(fetch(url + '/groups/' + groupId.toString(),
            {
                method: 'DELETE',
                headers: headers
            }).then(response => response.json())
            .catch(error => console.log(error)));
        yield put({type: deleteGroupSucceededType})
    } catch (error) {
        yield put({type: deleteGroupFailedType})
    }
}


export function* getGroupById() {
    yield takeLatest(getGroupByIdType, callGetGroupById)
}


function* callGetGroupById({groupId}) {
    try {
        const group = yield call(fetch(url + '/groups/' + groupId.toString(),
            {
                method: 'GET',
            }).then(response => response.json())
            .then(data => {
                console.log(data)
            })
            .catch(error => console.error(error)));
        yield put({type: getGroupByIdSucceededType, group});
    } catch (error) {
        yield put({type: getGroupByIdFailedType});
    }
}

//users

export function* getUsers() {
    yield takeLatest(getUsersType, callGetUsers)
}

function* callGetUsers({groupId}) {
    try {
        const users = yield call(fetch(url + '/groups/' + groupId.toString() + '/users',
            {
                method: 'GET',
            }).then(response => response.json())
            .then(data => {
                console.log(data)
            })
            .catch(error => console.error(error)));
        yield put({type: getUsersSucceededType, users});
    } catch (error) {
        yield put({type: getUsersFailedType});
    }
}

export function* createUser() {
    yield takeLatest(createUserSubmitType, callCreateUser)
}

function* callCreateUser({data}) {
    try {
        let headers = new Headers();
        headers.append('Content-Type', "application/json");
        const user = yield call(fetch(url + '/students',
            {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(data)
            }).then(response => response.json())
            .catch(error => console.log(error)));
        yield put({type: createUserSucceededType, user})
    } catch (error) {
        yield put({type: createUserFailedType})
    }
}

export function* getUser() {
    yield takeLatest(getUserType, callGetUser)
}

function* callGetUser({userId}) {
    try {
        const user = yield call(fetch(url + '/students/' + userId.toString(),
            {
                method: 'GET',
            }).then(response => response.json())
            .then(data => {
                console.log(data)
            })
            .catch(error => console.error(error)));
        yield put({type: getUserSucceededType, user});
    } catch (error) {
        yield put({type: getUserFailedType});
    }
}


//add user to group
export function* addUserToGroup() {
    yield takeLatest(addUserToGroupType, callAddUserToGroup)
}

function* callAddUserToGroup({userId, groupId}) {
    try {
        let headers = new Headers();
        const data = {
            "UserId": userId,
            "GroupId": groupId
        };
        headers.append('Content-Type', "application/json");
        yield call(fetch(url + '/students/assign',
            {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(data)
            }).catch(error => console.log(error)));
        yield put({type: addUserToGroupSucceededType})
    } catch (error) {
        yield put({type: addUserToGroupFailedType})
    }
}

