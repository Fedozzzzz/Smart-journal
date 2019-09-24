//init
export const initScheduleType = 'INIT_SCHEDULE';
export const initScheduleSucceededType = 'INIT_SCHEDULE_SUCCEEDED';
export const initScheduleFailedType = 'INIT_SCHEDULE_FAILED';

//edit
export const editScheduleType = 'EDIT_SCHEDULE_TYPE';
export const editScheduleSucceededType = 'EDIT_SCHEDULE_SUCCEEDED';
export const editScheduleFailedType = 'EDIT_SCHEDULE_FAILED';

export const editScheduleSubmitType = 'EDIT_SCHEDULE_SUBMIT';

// export const editUserSubmitedType='EDIT_SCHEDULE_SUBMITED'; //save
//add

const initialState = {
    schedule: [],
    error: '',
    isEdit: false,
    isEdited: false,
    isLoaded: false
};

export const actionCreators = {
    initSchedule: () => ({
        type: initScheduleType
    }),
    editSchedule: () => ({
        type: editScheduleType,
    }),
    saveSchedule: (id, data) => ({
        // type: editScheduleSubmitType,
        type: editScheduleSucceededType,
        id,
        data
    })
};

export const scheduleReducer = (state, action) => {//action.type===????
    // console.log('scheduleReducer');
    state = state || initialState;

    console.log(action.type);
    switch (action.type) {
        // case(initScheduleSucceededType):
        //     return {
        //         ...state,  //spread????
        //         schedule: action.schedule,
        //         isLoaded: true
        //     };
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


