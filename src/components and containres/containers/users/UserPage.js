import React, {Component} from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {Link} from "react-router-dom";
import Loading from "../../components/Loading";
import {paymentsActionCreators} from "../../../store/redux/payments/actionCreators";
import {UserPaymentHistory} from "./UserPaymentHistory";
import {userActionCreators} from "../../../store/redux/users/actionCreators";


class UserPage extends Component {

    componentDidMount() {
        // console.log("props user:", this.props.userById);
        this.props.getUserById(this.props.userId);
        let beginOfYear = new Date(new Date(new Date().setMonth(0)).setUTCDate(1)).toISOString().slice(0, 10);
        let endOfYear = new Date(new Date(new Date().setMonth(11)).setUTCDate(31)).toISOString().slice(0, 10);
        this.props.getPayments(this.props.userId, beginOfYear, endOfYear);
        // console.log("initial get method");
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (!this.props.user.isLoaded) {
            // console.log("additional get method");
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

    render() {
        return (
            <div className="container">
                <div className="user-page__info">
                    <h4>Страница ученика</h4>
                    {this.props.user.userById ? (<div>
                        <div>Имя: {this.props.user.userById.name}</div>
                        <div>Фамилия: {this.props.user.userById.surname}</div>
                        <div>Отчество: {this.props.user.userById.patronymic}</div>
                        <div>Номер телефона: {this.props.user.userById.phoneNumber}</div>
                        <div>Email : {this.props.user.userById.email}</div>
                        <Link to='/users' className="btn btn-outline-danger"
                              onClick={() => this.props.deleteUser(this.props.userId)}>Удалить</Link>
                        <Link to={`/users/edit_user/user_${this.props.userId}`}
                              className="btn btn-outline-warning"
                              onClick={() => this.props.editUser(this.props.userId)}>Редактировать</Link>
                    </div>) : <Loading/>}
                    {this.props.payments.isLoaded ?
                        // && this.props.payments.payments.size ?
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