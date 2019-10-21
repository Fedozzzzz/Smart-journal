import {actionTypes} from "./actionTypes";

export const accountHistoryActionCreators = {
    getAccountHistory: (userId) => ({
        type: actionTypes.getAccountHistoryType,
        userId
    })
};