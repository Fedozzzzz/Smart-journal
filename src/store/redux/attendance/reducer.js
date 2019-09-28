import {actionTypes} from "./actionTypes";

const initialState = {
    attendance: null,
    isEdit: false
};

export const attendanceReducer = (state, action) => {
    state = state || initialState;
    // console.log(action.type);
    switch (action.type) {
        case actionTypes.getAttendanceSucceededType:
            return {
                ...state,
                attendance: action.attendance,
                isLoaded: true
            };
        case actionTypes.getAttendanceFailedType:
            return {
                ...state,
                error: action.payload
            };
        case actionTypes.editAttendanceType:
            return {
                ...state,
                isEdit: true,
                // isEdited: false
            };
        case actionTypes.editAttendanceSucceededType:
            return {
                ...state,
                isEdit: false,
            };
        case actionTypes.editAttendanceFailedType:
            return {
                ...state,
                isEdit: false,
                error: action.payload
            };
        default :
            return state;
    }
};
