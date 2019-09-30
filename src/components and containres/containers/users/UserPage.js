import React, {Component} from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import Loading from "../../components/Loading";
import {paymentsActionCreators} from "../../../store/redux/payments/actionCreators";
import {UserPaymentHistory} from "./UserPaymentHistory";
import {userActionCreators} from "../../../store/redux/users/actionCreators";
import {UserPageProfile} from "./UserPageProfile";


class UserPage extends Component {

    componentDidMount() {
        this.props.getUserById(this.props.userId);
        let beginOfYear = new Date(new Date(new Date().setMonth(0)).setUTCDate(1)).toISOString().slice(0, 10);
        let endOfYear = new Date(new Date(new Date().setMonth(11)).setUTCDate(31)).toISOString().slice(0, 10);
        this.props.getPayments(this.props.userId, beginOfYear, endOfYear);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (!this.props.user.isLoaded) {
            this.props.getUserById(this.props.userId);
        }
        if (!this.props.payments.isLoaded) {
            let beginOfYear = new Date(new Date(new Date().setMonth(0)).setUTCDate(1)).toISOString().slice(0, 10);
            let endOfYear = new Date(new Date(new Date().setMonth(11)).setUTCDate(31)).toISOString().slice(0, 10);
            this.props.getPayments(this.props.userId, beginOfYear, endOfYear);
        }
    }

    onDelete(paymentId) {
        this.props.cancelPayment(this.props.userId, paymentId);
    }

    onDeleteUser() {
        this.props.deleteUser(this.props.userId);
    }

    onEditUser() {
        this.props.editUser(this.props.userId);
    }

    render() {
        return (
            <div className="container">
                <div className="user-page__info">
                    <h4>Страница ученика</h4>
                    {this.props.user.userById ?
                        <UserPageProfile userById={this.props.user.userById}
                                         onDeleteUser={this.onDeleteUser.bind(this)}
                                         onEditUser={this.onEditUser.bind(this)}
                                         userId={this.props.userId}/> : <Loading/>}
                    {this.props.payments.isLoaded ?
                        <UserPaymentHistory payments={this.props.payments.payments}
                                            onDelete={this.onDelete.bind(this)}/>
                        : null}
                </div>
            </div>
        )
    }
}

export default connect(
    state => {
        return {
            user: state.user,
            payments: state.payments
        }
    },
    dispatch => bindActionCreators(
        Object.assign({}, paymentsActionCreators, userActionCreators),
        dispatch)
)(UserPage);