export const actionTypes = {

//first init
    firstInitGroupType: 'GET_GROUPS',
    firstInitGroupSucceededType: 'GET_GROUPS_SUCCEEDED',
    firstInitGroupFailedType: 'GET_GROUPS_SUCCEEDED',

//creating group
    createGroupType: 'CREATE_GROUP',
    createGroupSubmitType: 'CREATE_GROUP_SUBMIT',
    createGroupSucceededType: 'CREATE_GROUP_SUCCEEDED',
    createGroupFailedType: 'CREATE_GROUP_FAILED',

//editing group
    editGroupType: 'EDIT_GROUP',
    editGroupSubmitType: 'EDIT_GROUP_SUBMIT',
    editGroupSucceededType: 'EDIT_GROUP_SUCCEEDED',
    editGroupFailedType: 'EDIT_GROUP_FAILED',

//delete group
    deleteGroupType: 'DELETE_GROUP',
    deleteGroupSucceededType: 'DELETE_GROUP_SUCCEEDED',
    deleteGroupFailedType: 'DELETE_GROUP_FAILED',

//get group by id
    getGroupByIdType: 'GET_GROUPS_BY_ID',
    getGroupByIdSucceededType: 'GET_GROUPS_BY_ID_SUCCEEDED',
    getGroupByIdFailedType: 'GET_GROUPS_BY_ID_SUCCEEDED',
};

const initialState = {
    groups: [],
    // users: [], //??????
    isLoaded: false,
    onCreatingGroup: false,
    onCreatingUser: false,
    error: ''
};

export const groupActionCreators = {
    getAllGroups: () => ({
        type: actionTypes.firstInitGroupType
    }),
    createGroup: () => ({
        type: actionTypes.createGroupType,
    }),
    createGroupSubmit: (data) => ({
        type: actionTypes.createGroupSubmitType,
        data
    }),

    getGroupById: (guid) => ({
        type: actionTypes.getGroupByIdType,
        guid
    }),
    deleteGroup: (guid) => ({
        type: actionTypes.deleteGroupType,
        guid
    }),
    editGroup: () => ({
        type: actionTypes.editGroupType,
    }),
    editGroupSubmit: (guid, data) => ({
        type: actionTypes.editGroupSubmitType,
        guid,
        data
    }),


};

export const groupReducer = (state, action) => {

    state = state || initialState;

    switch (action.type) {
        case actionTypes.firstInitGroupSucceededType:
            return {
                ...state,
                isLoaded: true,
                groups: action.groups
            };
        case actionTypes.firstInitGroupFailedType:
            return {
                ...state,
                error: action.payload
            };
        case actionTypes.createGroupType:
            return {
                ...state,
                onCreatingGroup: true
            };
        case actionTypes.createGroupSubmitType:
            return {
                ...state,
                // isLoaded: false,
                onCreatingGroup: false,
            };
        case actionTypes.createGroupSucceededType:
            // let temp = state.groups;
            // temp.push(action.group);
            return {
                ...state,
                isLoaded: false,
                // groups: temp,
                newGroup: action.group
            };
        case actionTypes.createGroupFailedType:
            return {
                ...state,
                error: action.payload
            };//delete + edit
        case actionTypes.editGroupSucceededType:
            return {
                ...state,
            };
        case actionTypes.editGroupFailedType:
            return {
                ...state,
                error: action.payload
            };
        case actionTypes.deleteGroupSucceededType:
            return {
                ...state,
                // isLoaded: false
            };
        case actionTypes.deleteGroupFailedType:
            return {
                ...state,
                // isLoaded: false
            };

        case actionTypes.getGroupByIdSucceededType:
            return {
                ...state,
                groupById: action.groupById
            };
        case actionTypes.getGroupByIdFailedType: {
            return {
                ...state,
                error: action.payload
            }
        }
        default :
            return state;
    }
};

