import {all} from "redux-saga/effects"
import {createGroup, getGroups, deleteGroup, editGroup, getGroupById} from "./groups-sagas";
import {editSchedule, getSchedule} from "./schedule-sagas";
import {addUserToGroup, createUser, deleteUser, editUser, getAllUsers, getUser, getUsersFromGroup} from "./user-sagas";

export default function* rootSaga() {
    console.log('hello-from-root-saga!!!');
    yield all([
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
        deleteUser(),
        editUser()
    ])
}