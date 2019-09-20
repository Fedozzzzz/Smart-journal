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

//get users from group
    getUsersFromGroupType: 'GET_USERS',
    getUsersFromGroupSucceededType: 'GET_USERS_SUCCEEDED',
    getUsersFromGroupFailedType: 'GET_USERS_FAILED',

//creating user
    createUserType: "CREATE_USER",
    createUserSubmitType: "CREATE_USER_SUBMIT",
    createUserSucceededType: "CREATE_USER_SUCCEEDED",
    createUserFailedType: "CREATE_USER_FAILED",

//delete user
    deleteUserType: "DELETE_USER",
    deleteUserSucceededType: "DELETE_USER_SUCCEEDED",
    deleteUserFailedType: "DELETE_USER_FAILED",

//get user by id
    getUserType: 'GET_USER',
    getUserSucceededType: 'GET_USER_SUCCEEDED',
    getUserFailedType: 'GET_USER_FAILED',

//edit user
    editUserType: 'EDIT_USER',
    editUserSubmitType: 'EDIT_USER_SUBMIT',
    editUserSucceededType: 'EDIT_USER_SUCCEEDED',
    editUserFailedType: 'EDIT_USER_FAILED',

//get all users
    getAllUsersType: 'GET_ALL_USERS',
    getAllUsersSucceededType: 'GET_ALL_USERS_SUCCEEDED',
    getAllUsersFailedType: 'GET_ALL_USERS_FAILED',

//add user to group
    addUserToGroupType: 'ADD_USER_TO_GROUP',
    addUserToGroupSubmitType: 'ADD_USER_TO_GROUP_SUBMIT',
    addUserToGroupSucceededType: 'ADD_USER_TO_GROUP_SUCCEEDED',
    addUserToGroupFailedType: 'ADD_USER_TO_GROUP_FAILED',
};

const initialState = {
    groups: [],
    users: [], //??????
    isLoaded: false,
    onCreatingGroup: false,
    onCreatingUser: false,
    error: ''
};

export const actionCreators = {
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
    getAllUsers: () => ({
        type: actionTypes.getAllUsersType
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
    getUsersFromGroup: (groupId) => ({
        type: actionTypes.getUsersFromGroupType,
        groupId
    }),
    createUser: () => ({
        type: actionTypes.createUserType,
    }),
    createUserSubmit: (data) => ({
        type: actionTypes.createUserSubmitType,
        data
    }),
    addUsersToGroup: () => ({
        type: actionTypes.addUserToGroupType
    }),
    addUsersToGroupSubmit: (groupId, userId) => ({
        type: actionTypes.addUserToGroupSubmitType,
        groupId,
        userId
    }),
    deleteUser: (guid) => ({
        type: actionTypes.deleteUserType,
        guid
    }),
    editUser: () => ({
        type: actionTypes.editUserType,
    }),
    editUserSubmit: (guid, data) => ({
        type: actionTypes.editUserSubmitType,
        guid,
        data
    }),
    getUserById: (id) => ({
        type: actionTypes.getUserType,
        guid: id
    })
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
                isLoaded: false,
                onCreatingGroup: false,
            };
        case actionTypes.createGroupSucceededType:
            let temp = state.groups;
            temp.push(action.group);
            return {
                ...state,
                isLoaded: false,
                groups: temp
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
                isLoaded: false
            };
        case actionTypes.deleteGroupFailedType:
            return {
                ...state,
                isLoaded: false
            };
        case actionTypes.getUserSucceededType: {
            return {
                ...state,
                userById: action.userById
            }
        }
        case actionTypes.createUserType:
            return {
                ...state,
                onCreatingUser: true
            };
        case actionTypes.createUserSubmitType:
            return {
                ...state,
                onCreatingUser: false
            };
        case actionTypes.createUserSucceededType:
            console.log(action.user);
            let temp1 = state.users;
            temp1.push(action.user);
            return {
                ...state,
                users: temp1
            };
        case actionTypes.getAllUsersSucceededType:
            return {
                ...state,
                users: action.users
            };
        case actionTypes.getAllUsersFailedType:
            console.log(action.payload);
            return {
                ...state,
                error: action.payload
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
        case actionTypes.getUsersFromGroupSucceededType: {
            return {
                ...state,
                usersFromGroup: action.usersFromGroup
            }
        }
        case actionTypes.getUsersFromGroupFailedType: {
            return {
                ...state,
                error: action.payload
            }
        }
        default :
            return state;
    }
};

