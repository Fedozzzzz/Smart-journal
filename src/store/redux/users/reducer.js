import {actionTypes} from "./actionTypes";

const initialState = {
    users: [],
    usersFromGroup: [],
    isLoaded: false
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
        default :
            return state;
    }
};