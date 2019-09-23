import React, {Component} from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {userActionCreators} from "../../store/reducers/userReducer";
import {Link} from "react-router-dom";


class UserCreating extends Component {

    constructor(props) {
        super(props);
        this.onSaveUser = this.onSaveUser.bind(this);
    }

    onSaveUser() {
        let cash = {
            "name": "",
            "surname": "",
            "patronymic": "",
            "email": "",
            "phoneNumber": ""
        };
        cash.name = document.getElementById('userName').value;
        //console.log('name ', document.getElementById('userName').value);
        cash.surname = document.getElementById('userSurname').value; //
        cash.patronymic = document.getElementById('userPatronymic').value;
        cash.email = document.getElementById("email-input").value;
        cash.phoneNumber = document.getElementById("tel-input").value;
        console.log("user-data: ", cash);
        this.props.createUserSubmit(cash);
        this.props.history.goBack();
    }


    render() {
        return (
            <div>
                <form className="form-inline">
                    <div className="form-group">
                        <label htmlFor="example-text-input" className="col-xs-2 col-form-label">Имя</label>
                        <div className="col-xs-10">
                            <input className="form-control"
                                   type="text"
                                   placeholder="Введите имя"
                                   id='userName'
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
                                   placeholder="Введите фамилию"
                                   id='userSurname'
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
                                   placeholder="Введите отчество"
                                   id='userPatronymic'
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
                                   placeholder="ivanov.ii@example.com"
                                   id="email-input"/>
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
                                   placeholder="1-(555)-555-5555"
                                   id="tel-input"/>
                        </div>
                    </div>
                </form>
                <div>
                    <button
                        // to="/groups/user_list"
                        className='btn btn-success'
                        onClick={this.onSaveUser}>Сохранить</button>
                </div>
            </div>
        )
    }
}


export default connect(
    state => state.user,
    dispatch => bindActionCreators(userActionCreators, dispatch)
)(UserCreating);