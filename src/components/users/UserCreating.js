import React, {Component} from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {userActionCreators} from "../../store/reducers/userReducer";

class UserCreating extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: null,
            surname: null,
            patronymic: null,
            email: null,
            phoneNumber: null
        };
        this.onSaveUser = this.onSaveUser.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    onSaveUser() {
        this.props.createUserSubmit(this.state);
        this.props.history.goBack();
    }

    handleChange(e) {
        console.log(e.target.id);
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
                <form className="form-inline">
                    <div className="form-group">
                        <label htmlFor="example-text-input" className="col-xs-2 col-form-label">Имя</label>
                        <div className="col-xs-10">
                            <input className="form-control"
                                   type="text"
                                   placeholder="Введите имя"
                                   id='userName'
                                   onChange={this.handleChange}
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
                                   onChange={this.handleChange}
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
                                   onChange={this.handleChange}
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
                                   id="email-input"
                                   onChange={this.handleChange}
                            />
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
                                   id="tel-input"
                                   onChange={this.handleChange}
                            />
                        </div>
                    </div>
                </form>
                <div>
                    <button
                        // to="/groups/user_list"
                        className='btn btn-success'
                        onClick={this.onSaveUser}>Сохранить
                    </button>
                </div>
            </div>
        )
    }
}


export default connect(
    state => state.user,
    dispatch => bindActionCreators(userActionCreators, dispatch)
)(UserCreating);