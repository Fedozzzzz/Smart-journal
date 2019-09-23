import React, {Component} from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {userActionCreators} from "../../store/reducers/userReducer";

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
                    phoneNumber: nextProps .userById.phoneNumber || null
                }
            )
        }
    }

    // onSaveEditUser() {
    //     let cash = {
    //         "name": "",
    //         "surname": "",
    //         "patronymic": "",
    //         "email": "",
    //         "phoneNumber": ""
    //     };
    //     cash.name = document.getElementById('editedUserName').value || this.props.userById.name;
    //     //console.log('name ', document.getElementById('userName').value);
    //     cash.surname = document.getElementById('editedUserSurname').value || this.props.userById.surname; //
    //     cash.patronymic = document.getElementById('editedUserPatronymic').value || this.props.userById.patronymic;
    //     cash.email = document.getElementById("editedEmail-input").value || this.props.userById.email;
    //     cash.phoneNumber = document.getElementById("editedTel-input").value || this.props.userById.phoneNumber;
    //     console.log("user-data: ", cash);
    //     console.log(this.props.userId);
    //     this.props.editUserSubmit(this.props.userId, cash);
    //     this.props.history.goBack();
    // }

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
        console.log("this.state", this.state);
        return (
            <div>
                <div>
                    <form className="form-inline">
                        <div className="form-group">
                            <label htmlFor="example-text-input" className="col-xs-2 col-form-label">Имя</label>
                            <div className="col-xs-10">
                                <input className="form-control"
                                       type="text"
                                       onChange={this.handleChange}
                                       defaultValue={this.props.userById ? this.props.userById.name : null}
                                       placeholder="Введите имя"
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
                                       onChange={this.handleChange}
                                       defaultValue={this.props.userById ? this.props.userById.surname : null}
                                       placeholder="Введите фамилию"
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
                                       onChange={this.handleChange}
                                       defaultValue={this.props.userById ? this.props.userById.patronymic : null}
                                       placeholder="Введите отчество"
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
                                       onChange={this.handleChange}
                                       defaultValue={this.props.userById ? this.props.userById.email : null}
                                       placeholder="ivanov.ii@example.com"
                                       id="editedEmail-input"
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
                                       onChange={this.handleChange}
                                       defaultValue={this.props.userById ? this.props.userById.phoneNumber : null}
                                       placeholder={"1-(555)-555-5555"}
                                       id="editedTel-input"
                                />
                            </div>
                        </div>
                    </form>
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