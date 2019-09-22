import {call, put, takeLatest} from 'redux-saga/effects'
import {actionTypes} from "../../store/reducers/userReducer";

//url
const url = 'http://localhost:8200';

//USERS

export function* getUsersFromGroup() {
    yield takeLatest(actionTypes.getUsersFromGroupType, callGetUsersFromGroup)
}

function* callGetUsersFromGroup({groupId}) {
    try {
        const usersFromGroup = yield call(() => fetch(url + '/groups/' + groupId.toString() + '/users',
            {
                method: 'GET',
            }).then(response => response.json())
            .catch(error => console.error(error)));
        yield put({type: actionTypes.getUsersFromGroupSucceededType, usersFromGroup});
    } catch (error) {
        console.log(error);
        yield put({type: actionTypes.getUsersFromGroupFailedType});
    }
}

export function* createUser() {
    yield takeLatest(actionTypes.createUserSubmitType, callCreateUser)
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
        yield put({type: actionTypes.createUserSucceededType, user})
    } catch (error) {
        console.log(error);
        yield put({type: actionTypes.createUserFailedType})
    }
}

export function* getUser() {
    yield takeLatest(actionTypes.getUserType, callGetUser)
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
        yield put({type: actionTypes.getUserSucceededType, userById});
    } catch (error) {
        console.log(error);
        yield put({type: actionTypes.getUserFailedType});
    }
}

export function* getAllUsers() {
    yield takeLatest(actionTypes.getAllUsersType, callGetAllUsers)
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
        yield put({type: actionTypes.getAllUsersSucceededType, users});
    } catch (error) {
        console.log(error);
        yield put({type: actionTypes.getAllUsersFailedType});
    }
}

export function* deleteUser() {
    yield takeLatest(actionTypes.deleteUserType, callDeleteUser)
}

function* callDeleteUser({guid}) {
    try {
        let headers = new Headers();
        console.log("saga-delete-user ", guid);
        headers.append('Content-Type', "application/json");
        const res = yield call(() => fetch(url + '/users/' + guid.toString(),
            {
                method: 'DELETE',
                headers: headers
            }).then(response => response)
            .catch(error => console.log(error)));
        // console.log(res);
        yield put({type: actionTypes.deleteUserSucceededType, ok: res.ok})
    } catch (error) {
        console.log(error);
        yield put({type: actionTypes.deleteUserFailedType, ok: false})
    }
}

export function* editUser() {
    yield takeLatest(actionTypes.editUserSubmitType, callEditUser)
}

function* callEditUser({guid, data}) {
    try {
        // console.log("saga-edit-user", guid, data);
        // console.log("saga-edit-user-data", JSON.stringify(data));
        let headers = new Headers();
        headers.append('Content-Type', "application/json");
        const res = yield call(() => fetch(url + '/users/' + guid.toString(),
            {
                method: 'PUT',
                headers: headers,
                // mode: "no-cors",
                body: JSON.stringify(data)
            }).catch(error => console.log(error)));
        yield put({type: actionTypes.editUserSucceededType, ok: res.ok})
    } catch (error) {
        console.log(error);
        yield put({type: actionTypes.editUserFailedType})
    }
}

//add user to group
export function* addUserToGroup() {
    yield takeLatest(actionTypes.addUserToGroupSubmitType, callAddUserToGroup)
}

function* callAddUserToGroup({groupId, userId}) {
    try {
        console.log("saga-add-user-to-group", groupId, userId);
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
                // mode: "no-cors",
                body: JSON.stringify(data)
            }).catch(error => console.log(error)));
        yield put({type: actionTypes.addUserToGroupSucceededType})
    } catch (error) {
        console.log(error);
        yield put({type: actionTypes.addUserToGroupFailedType})
    }
}


//delete user from group

export function* deleteUserFromGroup() {
    yield takeLatest(actionTypes.deleteUserFromGroupSubmitType, callDeleteUserFromGroup)
}

function* callDeleteUserFromGroup({groupId, userId, ...arrayOfUserId}) {
    try {
        let headers = new Headers();
        const requestBody = {
            "userIds": arrayOfUserId,
            "userId": userId,
            "groupId": groupId
        };
        console.log("saga-delete-user-from-group ", groupId, userId, arrayOfUserId);
        headers.append('Content-Type', "application/json");
        yield call(() => fetch(url + '/users/assign',
            {
                method: 'DELETE',
                headers: headers,
                body: requestBody
            }).then(res => console.log(res))
            .catch(error => console.log(error)));
        yield put({type: actionTypes.deleteUserFromGroupSucceededType})
    } catch (error) {
        console.log(error);
        yield put({type: actionTypes.deleteUserFromGroupFailedType})
    }
}