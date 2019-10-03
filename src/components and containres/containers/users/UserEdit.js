import React, {Component} from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {userActionCreators} from "../../../store/redux/users/actionCreators";
import {UserEditInputs} from "./UserEditInputs";

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
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        this.props.getUserById(this.props.userId);
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if (nextProps.userById) {
            this.setState({
                    name: nextProps.userById.name || null,
                    surname: nextProps.userById.surname || null,
                    patronymic: nextProps.userById.patronymic || null,
                    email: nextProps.userById.email || null,
                    phoneNumber: nextProps.userById.phoneNumber || null
                }
            )
        }
    }

    onSaveEditUser() {
        console.log("this.state OK!", this.state);
        this.props.editUserSubmit(this.props.userId, this.state);
        this.props.history.goBack();
    }

    handleChange(e) {
        // console.log(e.target.id);
        switch (e.target.id) {
            case 'editedUserName':
                this.setState({name: e.target.value});
                break;
            case 'editedUserSurname':
                this.setState({surname: e.target.value});
                break;
            case 'editedUserPatronymic':
                this.setState({patronymic: e.target.value});
                break;
            case "editedEmail-input":
                this.setState({email: e.target.value});
                break;
            case "editedTel-input":
                this.setState({phoneNumber: e.target.value});
                break;
        }
    }

    render() {
        // console.log("this.state", this.state);
        return (
            <div
                // className="col-12 col-md-9 col-xl-8 py-md-3 pl-md-5 bd-content" role="main"
            >
                <div>
                    <UserEditInputs handler={this.handleChange} userById={this.props.userById || null}/>
                    <div>
                        <button className='btn btn-success' onClick={this.onSaveEditUser}>Сохранить</button>
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