import {actionTypes} from "../../store/redux/account history/actionTypes"
import {call, put, takeLatest, all} from "redux-saga/effects"
import {httpRequest} from "../../functions/httpRequest";
import {url} from "../../constants";

export function* getAccountHistorySaga() {
    yield all([getAccountHistory()])
}

function* getAccountHistory() {
    yield takeLatest(actionTypes.getAccountHistoryType, callGetAccountHistory);
}

function* callGetAccountHistory({userId}) {
    try {
        console.log('saga-get-AccountHistory');
        let headers = new Headers();
        headers.append('Content-Type', "application/json");
        const response = yield call(httpRequest, "get", url + "/account/history/" + userId, headers);
        yield put({type: actionTypes.getAccountHistorySucceededType, userAccountHistory: response.data})
    } catch (error) {
        console.log(error);
        yield put({type: actionTypes.getAccountHistoryFailedType, error});
    }
}