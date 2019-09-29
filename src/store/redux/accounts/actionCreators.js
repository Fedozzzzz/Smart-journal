import {actionTypes} from "./actionTypes";

export const accountsActionCreators = {
    getAccountsByGroupId: (groupId) => ({
        type: actionTypes.getAccountsByGroupId,
        groupId
    })
};