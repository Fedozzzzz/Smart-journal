import React, {Component} from 'react';
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import {bindActionCreators} from "redux";
import {actionCreators} from "../../store/groupReducer";

class UserEdit extends Component {

    constructor(props) {
        super(props);
        this.onSaveEditUser = this.onSaveEditUser.bind(this);
    }

    componentDidMount() {
        this.props.getUserById(this.props.userId);
    }

    onSaveEditUser() {
        let cash = {
            "name": "",
            "surname": "",
            "patronymic": "",
            "email": "",
            "phoneNumber": ""
        };
        cash.name = document.getElementById('editedUserName').value;
        //console.log('name ', document.getElementById('userName').value);
        cash.surname = document.getElementById('editedUserSurname').value; //
        cash.patronymic = document.getElementById('editedUserPatronymic').value;
        cash.email = document.getElementById("editedEmail-input").value;
        cash.phoneNumber = document.getElementById("editedTel-input").value;
        console.log("user-data: ", cash);
        console.log(this.props.userId);
        this.props.editUserSubmit(this.props.userId, cash);
        this.props.history.goBack();
    }

    render() {
        return (
            <div>
                <div>
                    <form className="form-inline">
                        <div className="form-group">
                            <label htmlFor="example-text-input" className="col-xs-2 col-form-label">Имя</label>
                            <div className="col-xs-10">
                                <input className="form-control"
                                       type="text"
                                       placeholder={this.props.userById ? this.props.userById.name : "Введите имя"}
                                       id='editedUserName'
                                />
                            </div>
                        </div>
                    </form>
                    <form className="form-inline">
                        <div className="form-group">
                            <label htmlFor="example-text-input" className="col-xs-2 col-form-label">Фамилия</label>
                            <div className="col-xs-10">
                                <input className="form-control"
                                       type="text"
                                       placeholder={this.props.userById ? this.props.userById.surname : "Введите фамилию"}
                                       id='editedUserSurname'
                                />
                            </div>
                        </div>
                    </form>
                    <form className="form-inline">
                        <div className="form-group">
                            <label htmlFor="example-text-input" className="col-xs-2 col-form-label">Отчество</label>
                            <div className="col-xs-10">
                                <input className="form-control"
                                       type="text"
                                       placeholder={this.props.userById ? this.props.userById.patronymic : "Введите отчество"}
                                       id='editedUserPatronymic'
                                />
                            </div>
                        </div>
                    </form>
                    <form className="form-inline">
                        <div className="form-group">
                            <label htmlFor="example-email-input" className="col-xs-2 col-form-label">Email</label>
                            <div className="col-xs-10">
                                <input className="form-control"
                                       type="email"
                                       placeholder={this.props.userById ? this.props.userById.email : "ivanov.ii@example.com"}
                                       id="editedEmail-input"/>
                            </div>
                        </div>
                    </form>
                    <form className="form-inline">
                        <div className="form-group">
                            <label htmlFor="example-tel-input" className="col-xs-2 col-form-label">Номер
                                телефона</label>
                            <div className="col-xs-10">
                                <input className="form-control"
                                       type="tel"
                                       placeholder={this.props.userById ? this.props.userById.phoneNumber : "1-(555)-555-5555"}
                                       id="editedTel-input"/>
                            </div>
                        </div>
                    </form>
                    <div>
                        <Link
                            // to="/groups/user_list"
                            className='btn btn-success'
                            onClick={this.onSaveEditUser}>Сохранить</Link>
                    </div>
                </div>
            </div>
        )
    }
}


export default connect(
    state => state.group,
    dispatch => bindActionCreators(actionCreators, dispatch)
)(UserEdit)