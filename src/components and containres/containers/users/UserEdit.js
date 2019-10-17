import React, {Component} from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {userActionCreators} from "../../../store/redux/users/actionCreators";
import UserCreatingInputs from "../../components/users/UserCreatingInputs";

class UserEdit extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: null,
            surname: null,
            patronymic: null,
            email: null,
            phoneNumber: null
        };
        this.onSaveEditUser = this.onSaveEditUser.bind(this);
        this.getUserProfileCallback = this.getUserProfileCallback.bind(this);
        // this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        this.props.getUserById(this.props.userId);
    }

    onSaveEditUser() {
        console.log("this.state OK!", this.state);
        this.props.editUserSubmit(this.props.userId, this.state);
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
        // console.log("this.state", this.state);
        return (
            <div
                // className="col-12 col-md-9 col-xl-8 py-md-3 pl-md-5 bd-content" role="main"
            >
                <div>
                    <h4>Редактирование профиля студента</h4>
                    <UserCreatingInputs getUserProfileCallback={this.getUserProfileCallback}
                                        userById={this.props.userById}/>
                    <div className="container">
                        <div className="form-group row col-8">
                            <button className='btn btn-success' onClick={this.onSaveEditUser}>Сохранить</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(
    state => state.user,
    dispatch => bindActionCreators(userActionCreators, dispatch)
)(UserEdit)