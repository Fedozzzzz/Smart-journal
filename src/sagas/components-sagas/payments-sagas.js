import {call, put, takeLatest} from "redux-saga/effects";
//action types
// import {actionTypes} from "../../rubbish/paymentsReducer";
import {actionTypes} from "../../store/redux/payments/actionTypes";
//url
const url = "http://localhost:8202";


export function* getPayments() {
    yield takeLatest(actionTypes.getPaymentsType, callGetPayments)
}

function* callGetPayments({userId, from, to}) {
    try {
        console.log('saga-get-payments');
        let headers = new Headers();
        headers.append('Content-Type', "application/json");
        const payments = yield call(() => fetch(url + '/payments/' + userId +
            "?from=" + from + "&to=" + to,
            {
                method: 'GET',
                headers: headers,
            }).then(response => response.json())
            .catch(error => console.error(error)));
        yield put({type: actionTypes.getPaymentsSucceededType, payments});
    } catch (error) {
        console.log(error);
        yield put({type: actionTypes.getPaymentsFailedType});
    }
}

export function* addPayment() {
    yield takeLatest(actionTypes.addPaymentSubmitType, callAddPayment);
}

function* callAddPayment({userId, data}) {
    try {
        console.log("saga-add-payment");
        let headers = new Headers();
        headers.append('Content-Type', "application/json");
        const newPaymentId = yield call(() => fetch(url + '/payments/' + userId,
            {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(data)
            }).then(response => response.json())
            .catch(error => console.log(error)));
        yield put({type: actionTypes.addPaymentSucceededType, newPaymentId})
    } catch (error) {
        console.log(error);
        yield put({type: actionTypes.addPaymentFailedType})
    }
}

export function* cancelPayment() {
    yield takeLatest(actionTypes.cancelPaymentType, callCancelPayment)
}

function* callCancelPayment({userId, paymentId}) {
    try {
        let headers = new Headers();
        console.log("saga-cancel-payment");
        headers.append('Content-Type', "application/json");
        yield call(() => fetch(url + '/payments/' + userId + '/' + paymentId,
            {
                method: 'DELETE',
                headers: headers
            }).catch(error => console.log(error)));
        yield put({type: actionTypes.cancelPaymentSucceededType})
    } catch (error) {
        console.log(error);
        yield put({type: actionTypes.cancelPaymentFailedType})
    }
}

