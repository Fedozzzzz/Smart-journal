import {call, put, takeLatest, all} from 'redux-saga/effects'
// import * as api from "../fakeApi"
import {
    createUserSubmitType, createUserSucceededType,
    createUserFailedType, getUserType,
    getUserSucceededType,
    getUserFailedType, addUserToGroupType,
    addUserToGroupSucceededType, addUserToGroupFailedType,
    getAllUsersFailedType,
    getAllUsersSucceededType,
    getAllUsersType,
    getUsersFromGroupFailedType,
    getUsersFromGroupSucceededType,
    getUsersFromGroupType, deleteUserType,
    deleteUserFailedType, deleteUserSucceededType,
    editUserFailedType, editUserSubmitType,
    editUserSucceededType
} from "../store/groupReducer";

//MAIN TABLE COMPONENT

//GROUPS COMPONENT
const url = 'http://localhost:8200';


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
    yield takeLatest(editUserSubmitType, callEditUser)
}

function* callEditUser({guid, data}) {
    try {
        // console.log("saga-edit-user", guid, data);
        // console.log("saga-edit-user-data", JSON.stringify(data));
        let headers = new Headers();
        headers.append('Content-Type', "application/json");
        yield call(() => fetch(url + '/users/' + guid.toString(),
            {
                method: 'PUT',
                headers: headers,
                // mode: "no-cors",
                body: JSON.stringify(data)
            }).catch(error => console.log(error)));
        yield put({type: editUserSucceededType})
    } catch (error) {
        console.log(error);
        yield put({type: editUserFailedType})
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
