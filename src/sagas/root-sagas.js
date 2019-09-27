import {all} from "redux-saga/effects"
import {
    createGroup,
    getGroups,
    deleteGroup,
    editGroup,
    getGroupById,
    addUserToGroup, addUserToGroupSubmit, getUsersFromGroup, deleteUserFromGroup,
} from "./components-sagas/groups-sagas";
import {editSchedule, getSchedule} from "./components-sagas/schedule-sagas";
import {createUser, deleteUser, editUser, getAllUsers, getUser,} from "./components-sagas/user-sagas";
import {editAttendance, getAttendance} from "./components-sagas/attendance-sagas";

export default function* rootSaga() {
    console.log('hello-from-root-saga!!!');
    yield all([
        getGroups(),
        createGroup(),
        editGroup(),
        deleteGroup(),
        getGroupById(),
        createUser(),
        getUser(),
        getSchedule(),
        editSchedule(),
        getAllUsers(),
        deleteUser(),
        editUser(),
        addUserToGroup(),
        addUserToGroupSubmit(),
        getUsersFromGroup(),
        deleteUserFromGroup(),
        getAttendance(),
        editAttendance()
    ])
}