import {all} from "redux-saga/effects"
import {
    createGroup,
    getGroups,
    deleteGroup,
    editGroup,
    getGroupById,
    addUserToGroup, addUserToGroupSubmit, getUsersFromGroup, deleteUserFromGroup,
} from "./groups";
import {editSchedule, getSchedule} from "./shedule";
import {createUser, deleteUser, editUser, getAllUsers, getUser,} from "./users";
import {editAttendance, getAttendance} from "./attendance";
import {addPayment, cancelPayment, getPayments} from "./payments";

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
        editAttendance(),
        addPayment(),
        getPayments(),
        cancelPayment()
    ])
}