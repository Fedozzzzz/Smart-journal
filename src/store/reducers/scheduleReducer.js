export const actionTypes = {
//init
    getScheduleType: 'GET_SCHEDULE',
    getScheduleSucceededType: 'GET_SCHEDULE_SUCCEEDED',
    getScheduleFailedType: 'GET_SCHEDULE_FAILED',

//edit
    editScheduleType: 'EDIT_SCHEDULE_TYPE',
    editScheduleSucceededType: 'EDIT_SCHEDULE_SUCCEEDED',
    editScheduleFailedType: 'EDIT_SCHEDULE_FAILED',
    editScheduleSubmitType: 'EDIT_SCHEDULE_SUBMIT',
};
// export const editUserSubmitedType='EDIT_SCHEDULE_SUBMITED'; //save
//add

const initialState = {
    schedule: [],
    error: null,
    // isEdit: false,
    // isEdited: false,
    isLoaded: false
};

export const scheduleActionCreators = {
    getSchedule: (groupId, from, to) => ({
        type: actionTypes.getScheduleType,
        groupId, from, to
    }),
    editSchedule: () => ({
        type: actionTypes.editScheduleType,
    }),
    saveSchedule: (groupId, data) => ({
        // type: editScheduleSubmitType,
        type: actionTypes.editScheduleSucceededType,
        groupId,
        data
    })
};

export const scheduleReducer = (state, action) => {//action.type===????
    // console.log('scheduleReducer');
    state = state || initialState;

    // console.log(action.type);
    switch (action.type) {
        case actionTypes.getScheduleSucceededType:
            return {
                ...state,  //spread????
                schedule: action.schedule,
                isLoaded: true
            };
        case actionTypes.getScheduleFailedType:
            return {
                ...state,
                error: action.payload
            };

        // case editScheduleType:
        //     return {
        //         ...state,
        //         isEdit: true,
        //         isEdited: false
        //     };
        // case editScheduleSucceededType:
        //     console.log("succeed");
        //     return {
        //         ...state,
        //         isEdit: false,
        //         isEdited: true
        //     };
        // case editScheduleFailedType:
        //     return {
        //         ...state,
        //         isEdit: false,
        //         isEdited: false,
        //         error: action.payload
        //     };
        default :
            return state;
    }
};


