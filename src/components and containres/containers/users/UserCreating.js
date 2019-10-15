import React, {Component} from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {userActionCreators} from "../../../store/redux/users/actionCreators";
import {UserCreatingInputs} from "../../components/users/UserCreatingInputs";
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
            nameError: "Это поле обязательно",
            surnameError: "Это поле обязательно",
            patronymicError: "Это поле обязательно",
            phoneNumberError: "Это поле обязательно",
            emailError: "Это поле обязательно",
        };
        this.onSaveUser = this.onSaveUser.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
        this.validateName = this.validateName.bind(this);
        this.validatePhoneNumber = this.validatePhoneNumber.bind(this);
        this.validateEmail = this.validateEmail.bind(this);
    }

    onSaveUser() {
        this.props.createUserSubmit(this.state);
        this.props.history.goBack();
    }

    validateName(value) {
        // console.log(value);
        // console.log(!RegExp(/^[A-Zа-я][a-zа-я]+/).test(value));
        return !new RegExp(/^[A-ZА-Я][a-zа-я]+/).test(value) ?
            "Неверный ввод"
            : "";
    }

    validatePhoneNumber(value) {
        return !new RegExp(/^8[0-9]{10}/).test(value) ?
            "Неверный ввод"
            : "";
    }

    handleBlur(e) {
        // const usernameError = this.validateUserName();
        // this.setState({usernameError});
        switch (e.target.id) {
            case "userName":
                this.setState({nameError: this.validateName(this.state.name)});
                break;
            case 'userSurname':
                this.setState({surnameError: this.validateName(this.state.surname)});
                break;
            case "userPatronymic":
                this.setState({patronymicError: this.validateName(this.state.patronymic)});
                break;
            case "email-input":
                this.setState({emailError: this.validateEmail(this.state.email)});
                break;
            case "tel-input":
                this.setState({phoneNumberError: this.validatePhoneNumber(this.state.phoneNumber)});
                break;
        }
    }

    validateEmail(value) {
        return !new RegExp(/.+@.+\..+/i).test(value) ?
            "Неверный ввод"
            : "";
    }

    handleChange(e) {
        // console.log(e.target.id);
        switch (e.target.id) {
            case "userName":
                this.setState({name: e.target.value});
                break;
            case 'userSurname':
                this.setState({surname: e.target.value});
                break;
            case "userPatronymic":
                this.setState({patronymic: e.target.value});
                break;
            case "email-input":
                this.setState({email: e.target.value});
                break;
            case "tel-input":
                this.setState({phoneNumber: e.target.value});
                break;
        }
    }

    render() {
        console.log(this.state);
        return (
            <div>
                <h4>Создание профиля студента</h4>
                {/*<UserCreatingForm/>*/}
                <UserCreatingInputs changeHandler={this.handleChange} blurHandler={this.handleBlur}
                                    errors={{
                                        nameError: this.state.nameError,
                                        surnameError: this.state.surnameError,
                                        patronymicError: this.state.patronymicError,
                                        phoneNumberError: this.state.phoneNumberError,
                                        emailError: this.state.emailError,
                                    }}
                />
                <div className="container-fluid">
                    <div className="form-group row col-8">
                        <button
                            className='btn btn-success'
                            onClick={this.onSaveUser}
                            disabled={this.state.nameError
                                || this.state.surnameError
                                || this.state.patronymicError
                                || this.state.phoneNumberError
                                || this.state.emailError}
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