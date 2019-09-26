export const actionTypes = {
    //get attendance
    getAttendanceType: 'GET_SCHEDULE',
    getAttendanceSucceededType: 'GET_SCHEDULE_SUCCEEDED',
    getAttendanceFailedType: 'GET_SCHEDULE_FAILED',

//edit attendance
    editAttendanceType: 'EDIT_SCHEDULE_TYPE',
    editAttendanceSucceededType: 'EDIT_SCHEDULE_SUCCEEDED',
    editAttendanceFailedType: 'EDIT_SCHEDULE_FAILED',
    editAttendanceSubmitType: 'EDIT_SCHEDULE_SUBMIT',
};

const initialState = {
    attendance: [],
    isEdit: false
};

export const attendanceActionCreators = {
    getAttendance: (groupId) => ({
        type: actionTypes.getAttendanceType,
        groupId
    }),
    editAttendance: () => ({
        type: actionTypes.editAttendanceType
    }),
    saveEditAttendance: (groupId, data) => ({
        type: actionTypes.editAttendanceSubmitType,
        groupId, data
    })
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


