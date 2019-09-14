import {all} from "redux-saga/effects"
import {initGroups, editUser, editUserSubmit} from "./table-sagas";
import {createGroup, getGroups, addUserToGroup, createUser, deleteGroup
, editGroup, getGroupById, getUsers, getUser} from "./groups-sagas";
import {editSchedule, getSchedule} from "./schedule-sagas";




export default function* rootSaga() {
    console.log('hello-from-saga!!!');
    yield all([
        editUserSubmit(),
        editUser(),
        initGroups(),
        getGroups(),
        createGroup(),
        editGroup(),
        deleteGroup(),
        getGroupById(),
        getUsers(),
        createUser(),
        getUser(),
        addUserToGroup(),

        getSchedule(),
        editSchedule()
    ])
}