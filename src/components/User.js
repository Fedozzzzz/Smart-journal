import React, {Component} from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {actionCreators} from "../store/groupReducer";

class User extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            userById: null
        }
    }


    componentDidMount() {
        console.log("props user:", this.props.userById);
        this.props.getUserById(this.props.userId);
    }

    render() {
        return (
            <div className="container">
                <div className="user-page__info">
                    <h4>Страница ученика</h4>
                    {this.props.userById ? (<div>
                        <div>Имя: {this.props.userById.name}</div>
                        <div>Фамилия: {this.props.userById.surname}</div>
                        <div>Отчество: {this.props.userById.patronymic}</div>
                        <div>Номер телефона: {this.props.userById.phoneNumber}</div>
                        <div>Email : {this.props.userById.email}</div>
                    </div>) : null}

                </div>
            </div>
        )
    }
}

export default connect(
    state => state.group,
    dispatch => bindActionCreators(actionCreators, dispatch)
)(User);