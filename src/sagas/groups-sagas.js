import {call, put, takeLatest, all} from 'redux-saga/effects'
// import * as api from "../fakeApi"
import {
    firstInitGroupType, firstInitGroupSucceededType,
    firstInitGroupFailedType, createGroupType,
    createGroupSubmitType, createGroupSucceededType,
    createGroupFailedType, editGroupType,
    editGroupSucceededType, editGroupFailedType,
    deleteGroupType, deleteGroupSucceededType,
    deleteGroupFailedType, getGroupByIdType,
    getGroupByIdSucceededType, getGroupByIdFailedType,
    createUserSubmitType, createUserSucceededType,
    createUserFailedType, getUserType,
    getUserSucceededType,
    getUserFailedType, addUserToGroupType,
    addUserToGroupSucceededType, addUserToGroupFailedType,
    editGroupSubmitType, getAllUsersFailedType,
    getAllUsersSucceededType,
    getAllUsersType,
    getUsersFromGroupFailedType,
    getUsersFromGroupSucceededType,
    getUsersFromGroupType, deleteUserType,
    deleteUserFailedType, deleteUserSucceededType,
    editUserFailedType, editUserSubmitType,
    editUserType, editUserSucceededType
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
    yield takeLatest(editUserSubmitType, callEditGroup)
}

function* callEditGroup({groupId, data}) {
    try {
        console.log("saga-edit ", groupId, data);
        let headers = new Headers();
        headers.append('Content-Type', "application/json");
        const user = yield call(() => fetch(url + '/groups/' + groupId.toString(),
            {
                method: 'PUT',
                headers: headers,
                // mode: "no-cors",
                body: JSON.stringify(data)
            }).then(response => response.json())
            .catch(error => console.log(error)));
        yield put({type: editUserSucceededType, user})
    } catch (error) {
        console.log(error);
        yield put({type: editUserFailedType})
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

//USERS

export function* getUsersFromGroup() {
    yield takeLatest(getUsersFromGroupType, callGetUsersFromGroup)
}

function* callGetUsersFromGroup({groupId}) {
    try {
        const users = yield call(() => fetch(url + '/groups/' + groupId.toString() + '/users',
            {
                method: 'GET',
            }).then(response => response.json())
            .then(data => {
                console.log(data)
            })
            .catch(error => console.error(error)));
        yield put({type: getUsersFromGroupSucceededType, users});
    } catch (error) {
        console.log(error);
        yield put({type: getUsersFromGroupFailedType});
    }
}

export function* createUser() {
    yield takeLatest(createUserSubmitType, callCreateUser)
}

function* callCreateUser({data}) {
    try {
        let headers = new Headers();
        console.log("saga-create-user: ", data);
        headers.append('Content-Type', "application/json");
        const user = yield call(() => fetch(url + '/users',
            {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(data)
            }).then(response => response.json())
            .catch(error => console.log(error)));
        yield put({type: createUserSucceededType, user})
    } catch (error) {
        console.log(error);
        yield put({type: createUserFailedType})
    }
}

export function* getUser() {
    yield takeLatest(getUserType, callGetUser)
}

function* callGetUser({guid}) {
    try {
        const userById = yield call(() => fetch(url + '/users/' + guid.toString(),
            {
                method: 'GET',
            }).then(response => response.json())
            // .then(data => {
            //     console.log(data)
            // })
            .catch(error => console.error(error)));
        yield put({type: getUserSucceededType, userById});
    } catch (error) {
        console.log(error);
        yield put({type: getUserFailedType});
    }
}

export function* getAllUsers() {
    yield takeLatest(getAllUsersType, callGetAllUsers)
}

function* callGetAllUsers() {
    try {
        console.log("hello from saga get users!!");
        let headers = new Headers();
        const users = yield call(() => fetch(url + '/users',
            {
                method: 'GET',
                headers: headers
            }).then(response => response.json())
            .catch(error => console.error(error)));
        console.log("saga-get-user:", users);
        yield put({type: getAllUsersSucceededType, users});
    } catch (error) {
        console.log(error);
        yield put({type: getAllUsersFailedType});
    }
}

export function* deleteUser() {
    yield takeLatest(deleteUserType, callDeleteUser)
}

function* callDeleteUser({guid}) {
    try {
        let headers = new Headers();
        console.log("saga-delete-user ", guid);
        headers.append('Content-Type', "application/json");
        yield call(() => fetch(url + '/users/' + guid.toString(),
            {
                method: 'DELETE',
                headers: headers
            }).then(response => response.json())
            .catch(error => console.log(error)));
        yield put({type: deleteUserSucceededType})
    } catch (error) {
        console.log(error);
        yield put({type: deleteUserFailedType})
    }
}

export function* editUser() {
    yield takeLatest(editGroupSubmitType, callEditUser)
}

function* callEditUser({guid, data}) {
    try {
        console.log("saga-edit-user", guid, data);
        let headers = new Headers();
        headers.append('Content-Type', "application/json");
        const group = yield call(() => fetch(url + '/groups/' + guid.toString(),
            {
                method: 'PUT',
                headers: headers,
                // mode: "no-cors",
                body: JSON.stringify(data)
            }).then(response => response.json())
            .catch(error => console.log(error)));
        yield put({type: editGroupSucceededType, group})
    } catch (error) {
        console.log(error);
        yield put({type: editGroupFailedType})
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
        yield call(() => fetch(url + '/users/assign',
            {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(data)
            }).catch(error => console.log(error)));
        yield put({type: addUserToGroupSucceededType})
    } catch (error) {
        console.log(error);
        yield put({type: addUserToGroupFailedType})
    }
}

