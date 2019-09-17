import React, {Component} from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {actionCreators} from "../store/groupReducer";
import {Link,Route} from "react-router-dom";
import EditUser from "./EditUser";


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
                    <Link to='/groups/user_list' className="btn btn-outline-danger"
                          onClick={() => this.props.deleteUser(this.props.userId)}>Удалить</Link>
                    <Link to={`/groups/users/edit_user/user_${this.props.userId}`} className="btn btn-outline-warning"
                          onClick={() => this.props.editUser(this.props.userId)}>Редактировать</Link>
                </div>
            </div>
        )
    }
}

export default connect(
    state => state.group,
    dispatch => bindActionCreators(actionCreators, dispatch)
)(User);