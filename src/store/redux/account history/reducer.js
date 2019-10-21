import {actionTypes} from "./actionTypes";

const initialState = {
    accountHistory: null,
    isLoaded: false,
    error: null
};

export const accountHistoryReducer = (state, action) => {

    state = state || initialState;
    switch (action.type) {
        case actionTypes.getAccountHistorySucceededType:
            return {
                ...state,
                accountHistory: action.accountHistory,
                isLoaded: true,
            };
        case actionTypes.getAccountHistoryFailedType:
            return {
                ...state,
                error: action.error
            }
    }
};