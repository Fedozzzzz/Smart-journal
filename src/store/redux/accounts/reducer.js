import {actionTypes} from "./actionTypes";

const initialState = {
    accountsFromGroup: [],
    isLoaded: false
};

export const accountsReducer = (state, action) => {
    state = state || initialState;
    switch (action.type) {
        case actionTypes.getAccountsByGroupIdSucceeded:
            console.log(action.accounts);
            return {
                ...state,
                accountsFromGroup: action.accounts,
                isLoaded: true
            };
        default:
            return state;
    }
};
