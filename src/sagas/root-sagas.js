import {all} from "redux-saga/effects"
import {initGroups, editUser, editUserSubmit} from "./table-sagas";
import {
    createGroup, getGroups, addUserToGroup, createUser, deleteGroup
    , editGroup, getGroupById, getUser, getUsersFromGroup, getAllUsers, deleteUser
} from "./groups-sagas";
import {editSchedule, getSchedule} from "./schedule-sagas";

export default function* rootSaga() {
    console.log('hello-from-root-saga!!!');
    yield all([
        editUserSubmit(),
        editUser(),
        initGroups(),
        getGroups(),
        createGroup(),
        editGroup(),
        deleteGroup(),
        getGroupById(),
        getUsersFromGroup(),
        createUser(),
        getUser(),
        addUserToGroup(),
        getSchedule(),
        editSchedule(),
        getAllUsers(),
        deleteUser()
    ])
}