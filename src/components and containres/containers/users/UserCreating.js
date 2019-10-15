import React, {Component} from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {userActionCreators} from "../../../store/redux/users/actionCreators";
import UserCreatingInputs from "../../components/users/UserCreatingInputs";
import UserCreatingForm from "../../components/users/UserCreatingForm";

class UserCreating extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: null,
            surname: null,
            patronymic: null,
            email: null,
            phoneNumber: null,
            nameError: null,
            surnameError: null,
            patronymicError: null,
            phoneNumberError: null,
            emailError: null,
        };
        this.onSaveUser = this.onSaveUser.bind(this);
        this.getUserProfileCallback = this.getUserProfileCallback.bind(this);
    }

    onSaveUser() {
        this.props.createUserSubmit(this.state);
        this.props.history.goBack();
    }

    getUserProfileCallback(userData) {
        this.setState({
            name: userData.name,
            surname: userData.surname,
            patronymic: userData.patronymic,
            email: userData.email,
            phoneNumber: userData.phoneNumber,
            // nameError: userData.nameError,
            // surnameError: userData.surnameError,
            // patronymicError: userData.patronymicError,
            // phoneNumberError: userData.phoneNumberError,
            // emailError: userData.emailError,
        })
    }

    render() {
        console.log(this.state);
        return (
            <div>
                <h4>Создание профиля студента</h4>
                <UserCreatingInputs getUserProfileCallback={this.getUserProfileCallback}/>
                <div className="container-fluid">
                    <div className="form-group row col-8">
                        <button
                            className='btn btn-success'
                            onClick={this.onSaveUser}
                            // disabled={this.state.nameError
                            // || this.state.surnameError
                            // || this.state.patronymicError
                            // || this.state.phoneNumberError
                            // || this.state.emailError}
                        >Сохранить
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}


export default connect(
    state => state.user,
    dispatch => bindActionCreators(userActionCreators, dispatch)
)(UserCreating);