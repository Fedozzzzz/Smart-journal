//first init
export const firstInitGroupType = 'GET_GROUPS';
export const firstInitGroupSucceededType = 'GET_GROUPS_SUCCEEDED';
export const firstInitGroupFailedType = 'GET_GROUPS_SUCCEEDED';

//creating group
export const createGroupType = 'CREATE_GROUP';
export const createGroupSubmitType = 'CREATE_GROUP_SUBMIT';
export const createGroupSucceededType = 'CREATE_GROUP_SUCCEEDED';
export const createGroupFailedType = 'CREATE_GROUP_FAILED';

//editing group
export const editGroupType = 'EDIT_GROUP';
export const editGroupSubmitType = 'EDIT_GROUP_SUBMIT';
export const editGroupSucceededType = 'EDIT_GROUP_SUCCEEDED';
export const editGroupFailedType = 'EDIT_GROUP_FAILED';

//delete group
export const deleteGroupType = 'DELETE_GROUP';
export const deleteGroupSucceededType = 'DELETE_GROUP_SUCCEEDED';
export const deleteGroupFailedType = 'DELETE_GROUP_FAILED';

//get group by id
export const getGroupByIdType = 'GET_GROUPS_BY_ID';
export const getGroupByIdSucceededType = 'GET_GROUPS_BY_ID_SUCCEEDED';
export const getGroupByIdFailedType = 'GET_GROUPS_BY_ID_SUCCEEDED';

//get users from group
export const getUsersFromGroupType = 'GET_USERS';
export const getUsersFromGroupSucceededType = 'GET_USERS_SUCCEEDED';
export const getUsersFromGroupFailedType = 'GET_USERS_FAILED';

//creating user
export const createUserType = "CREATE_USER";
export const createUserSubmitType = "CREATE_USER_SUBMIT";
export const createUserSucceededType = "CREATE_USER_SUCCEEDED";
export const createUserFailedType = "CREATE_USER_FAILED";

//delete user
export const deleteUserType = "DELETE_USER";
export const deleteUserSucceededType = "DELETE_USER_SUCCEEDED";
export const deleteUserFailedType = "DELETE_USER_FAILED";

//get user by id
export const getUserType = 'GET_USER';
export const getUserSucceededType = 'GET_USER_SUCCEEDED';
export const getUserFailedType = 'GET_USER_FAILED';


//edit user
export const editUserType = 'EDIT_USER';
export const editUserSubmitType = 'EDIT_USER_SUBMIT';
export const editUserSucceededType = 'EDIT_USER_SUCCEEDED';
export const editUserFailedType = 'EDIT_USER_FAILED';


//get all users
export const getAllUsersType = 'GET_ALL_USERS';
export const getAllUsersSucceededType = 'GET_ALL_USERS_SUCCEEDED';
export const getAllUsersFailedType = 'GET_ALL_USERS_FAILED';

//add user to group
export const addUserToGroupType = 'ADD_USER_TO_GROUP';
export const addUserToGroupSucceededType = 'ADD_USER_TO_GROUP_SUCCEEDED';
export const addUserToGroupFailedType = 'ADD_USER_TO_GROUP_FAILED';

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
        type: firstInitGroupType
    }),
    createGroup: () => ({
        type: createGroupType,
    }),
    createGroupSubmit: (data) => ({
        type: createGroupSubmitType,
        data
    }),
    getAllUsers: () => ({
        type: getAllUsersType
    }),
    getGroupById: () => ({
        type: getGroupByIdType
    }),
    deleteGroup: (groupId) => ({
        type: deleteGroupType,
        groupId
    }),
    editGroup: () => ({
        type: editGroupType,
    }),
    editGroupSubmit: (groupId, data) => ({
        type: editGroupSubmitType,
        groupId,
        data
    }),
    getUsersFromGroup: () => ({
        type: getUsersFromGroupType
    }),
    createUser: () => ({
        type: createUserType,
    }),
    createUserSubmit: (data) => ({
        type: createUserSubmitType,
        data
    }),
    addUserToGroup: () => ({
        type: addUserToGroupType
    }),
    deleteUser: (id)=>({
        type: deleteUserType,
        guid: id
    }),
    editUser: () => ({
        type: editUserType,
    }),
    editUserSubmit: (guid, data) => ({
        type: editUserSubmitType,
        guid,
        data
    }),
    getUserById: (id)=>({
        type: getUserType,
        guid: id
    })
};

export const groupReducer = (state, action) => {

    state = state || initialState;

    switch (action.type) {
        case firstInitGroupSucceededType:
            return {
                ...state,
                isLoaded: true,
                groups: action.groups
            };
        case firstInitGroupFailedType:
            return {
                ...state,
                error: action.payload
            };
        case createGroupType:
            return {
                ...state,
                onCreatingGroup: true
            };
        case createGroupSubmitType:
            return {
                ...state,
                isLoaded: false,
                onCreatingGroup: false,
            };
        case createGroupSucceededType:
            let temp = state.groups;
            temp.push(action.group);
            return {
                ...state,
                isLoaded: false,
                groups: temp
            };
        case createGroupFailedType:
            return {
                ...state,
                error: action.payload
            };//delete + edit
        case editGroupSucceededType:
            return {
                ...state,
            };
        case editGroupFailedType:
            return {
                ...state,
                error:action.payload
            };
        case deleteGroupSucceededType:
            return {
                ...state,
                isLoaded: false
            };
        case deleteGroupFailedType:
            return {
                ...state,
                isLoaded: false
            };
        case getUserSucceededType:{
            return {
                ...state,
                userById: action.userById
            }
        }
        case createUserType:
            return {
                ...state,
                onCreatingUser: true
            };
        case createUserSubmitType:
            return {
                ...state,
                onCreatingUser: false
            };
        case createUserSucceededType:
            console.log(action.user);
            let temp1 = state.users;
            temp1.push(action.user);
            return {
                ...state,
                users: temp1
            };
        case getAllUsersSucceededType:
            return {
                ...state,
                users: action.users
            };
        case getAllUsersFailedType:
            console.log(action.payload);
            return {
                ...state,
                error: action.payload
            };
        default :
            return state;
    }
};

