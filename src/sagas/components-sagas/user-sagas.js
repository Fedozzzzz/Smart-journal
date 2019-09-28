import {call, put, takeLatest} from 'redux-saga/effects'
// import {actionTypes} from "../../rubbish/userReducer";
import {actionTypes} from "../../store/redux/users/actionTypes";
//url
const url = 'http://localhost:8200';

//USERS

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

