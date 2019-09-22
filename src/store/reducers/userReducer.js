export const actionTypes = {

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

    //delete users or user from group
    deleteUserFromGroupType: 'ADD_USER_TO_GROUP',
    deleteUserFromGroupSubmitType: 'ADD_USER_TO_GROUP_SUBMIT',
    deleteUserFromGroupSucceededType: 'ADD_USER_TO_GROUP_SUCCEEDED',
    deleteUserFromGroupFailedType: 'ADD_USER_TO_GROUP_FAILED',
};

const initialState = {
    isLoaded: true
};

export const actionCreators = {

    getAllUsers: () => ({
        type: actionTypes.getAllUsersType
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
    }),
    deleteUserFromGroup: (groupId, userId) => ({
        type: actionTypes.deleteUserFromGroupSubmitType,
        groupId, userId
    })
};


export const userReducer = (state, action) => {
    state = state || initialState;

    switch (action.type) {
        case actionTypes.getUserSucceededType:
            return {
                ...state,
                userById: action.userById,
                isLoaded: true
            };
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
        case actionTypes.deleteUserSucceededType:
            return {
                ...state,
                isLoaded: false
            };
        case actionTypes.deleteUserFailedType:
            return {
                ...state,
                isLoaded: false
            };
        case actionTypes.createUserSucceededType:
            // console.log(action.user);
            // let temp1 = state.users;
            // temp1.push(action.user);
            return {
                ...state,
                // users: temp1
                // newUser: action.user
                isLoaded: false
            };
        case actionTypes.getAllUsersSucceededType:
            return {
                ...state,
                users: action.users,
                isLoaded: true
            };
        case actionTypes.getAllUsersFailedType:
            // console.log(action.payload);
            return {
                ...state,
                error: action.payload
                // isLoaded:
            };
        case actionTypes.editUserSucceededType: {
            return {
                ...state,
                isLoaded: false
            }
        }
        case actionTypes.editUserFailedType: {
            return {
                ...state,
                // ok: action.ok,
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
        case actionTypes.deleteUserFromGroupSucceededType: {
            return {
                ...state,
                // ok: action.ok,
            }
        }
        case actionTypes.deleteUserFromGroupFailedType: {
            return {
                ...state,
                // ok: action.ok,
            }
        }

        default :
            return state;
    }
};
