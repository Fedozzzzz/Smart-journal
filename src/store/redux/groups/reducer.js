import {actionTypes} from "./actionTypes";

const initialState = {
    groups: [],
    // users: [], //??????
    isLoaded: false,
    onCreatingGroup: false,
    onCreatingUser: false,
    error: '',
    isUsersAddedToGroup: false
};

export const groupReducer = (state, action) => {
    state = state || initialState;
    // console.log(action.type);
    switch (action.type) {
        case actionTypes.getAllGroupsSucceededType:
            return {
                ...state,
                isLoaded: true,
                groups: action.groups
            };
        case actionTypes.getAllGroupsFailedType:
            return {
                ...state,
                isLoaded: false,
                error: action.payload
            };
        // case actionTypes.createGroupType:
        //     return {
        //         ...state,
        //         // isLoaded: false,
        //         // onCreatingGroup: true
        //     };
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
                isLoaded: false,
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
                // isLoaded: false
            };
        case actionTypes.getGroupByIdSucceededType:
            return {
                ...state,
                isLoaded: true,
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
                usersFromGroup: action.usersFromGroup,
                isLoaded: true
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
                isLoaded: false
                // ok: action.ok,
            }
        }
        case actionTypes.deleteUserFromGroupFailedType: {
            return {
                ...state,
                // ok: action.ok,
            }
        }
        case actionTypes.addUserToGroupType: {
            return {
                ...state,
                usersToGroup: action.userIds,
                isUsersAddedToGroup: false
            }
        }
        case actionTypes.addUserToGroupSucceededType: {
            return {
                ...state,
                isLoaded: false,
                // usersToGroup: action.usersToGroup
                isUsersAddedToGroup: true,
            }
        }
        default :
            return state;
    }
};