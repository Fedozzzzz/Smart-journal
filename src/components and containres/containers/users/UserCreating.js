import React, {Component} from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {userActionCreators} from "../../../store/redux/users/actionCreators";
import UserCreatingInputs from "../../components/users/UserCreatingInputs";

// import UserCreatingForm from "../../components/users/UserCreatingForm";

class UserCreating extends Component {

    constructor(props) {
        super(props);
        let savedUserDataFromSessionStorage = JSON.parse(sessionStorage.getItem("savedUserData"));
        console.log(savedUserDataFromSessionStorage);
        this.state = {
            name: savedUserDataFromSessionStorage ? savedUserDataFromSessionStorage.name : null,
            surname: savedUserDataFromSessionStorage ? savedUserDataFromSessionStorage.surname : null,
            patronymic: savedUserDataFromSessionStorage ? savedUserDataFromSessionStorage.patronymic : null,
            email: savedUserDataFromSessionStorage ? savedUserDataFromSessionStorage.email : null,
            phoneNumber: savedUserDataFromSessionStorage ? savedUserDataFromSessionStorage.phoneNumber : null,
            nameError: null,
            surnameError: null,
            patronymicError: null,
            phoneNumberError: null,
            emailError: null,
        };
        this.onSaveUser = this.onSaveUser.bind(this);
        this.getUserProfileCallback = this.getUserProfileCallback.bind(this);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.state.name !== prevState.name
            || this.state.surname !== prevState.surname
            || this.state.patronymic !== prevState.patronymic
            || this.state.email !== prevState.email
            || this.state.phoneNumber !== prevState.phoneNumber) {
            // console.log("update body");
            sessionStorage.setItem("savedUserData", JSON.stringify({
                name: this.state.name,
                surname: this.state.surname,
                patronymic: this.state.patronymic,
                email: this.state.email,
                phoneNumber: this.state.phoneNumber,
            }))
        }
    }

    onSaveUser() {
        // try {
        this.props.createUserSubmit(this.state);
        this.props.history.goBack();
        // } catch (e) {
        //     console.log("error", this.props, e);
        // }
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
        // console.log(this.state);
        console.log("ls", sessionStorage.getItem("savedUserData"));
        // console.log("ls", sessionStorage);
        console.log("state:", this.state);
        return (
            <div>
                <h4>Создание профиля студента</h4>
                <UserCreatingInputs getUserProfileCallback={this.getUserProfileCallback} userById={
                    {
                        name: this.state.name,
                        surname: this.state.surname,
                        patronymic: this.state.patronymic,
                        email: this.state.email,
                        phoneNumber: this.state.phoneNumber,
                    }}/>
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