import React, {Component} from "react"
import "../../../css/userCreating.css"


class UserCreatingInputs extends Component {

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
        this.handleChange = this.handleChange.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
        this.validateName = this.validateName.bind(this);
        this.validatePhoneNumber = this.validatePhoneNumber.bind(this);
        this.validateEmail = this.validateEmail.bind(this);
    }

    UNSAFE_componentWillReceiveProps(nextProps, nextContext) {
        console.log("receive props");
        console.log(nextProps);
        if (nextProps.userById !== this.props.userById) {
            this.setState({
                name: nextProps.userById.name,
                surname: nextProps.userById.surname,
                patronymic: nextProps.userById.patronymic,
                email: nextProps.userById.email,
                phoneNumber: nextProps.userById.phoneNumber,
                nameError: null,
                surnameError: null,
                patronymicError: null,
                phoneNumberError: null,
                emailError: null,
            })
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.state.name !== prevState.name
            || this.state.surname !== prevState.surname
            || this.state.patronymic !== prevState.patronymic
            || this.state.email !== prevState.email
            || this.state.phoneNumber !== prevState.phoneNumber) {
            this.props.getUserProfileCallback(Object.assign({}, this.state))
        }
    }

    validateName(value) {
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
        console.log(this.props);
        return (<div className="container-fluid">
            <div className="create-user">
                <form>
                    <div className="form-group row col-md-8">
                        <label htmlFor='userName' className="col-xs-2 col-form-label">Имя</label>
                        <input className={"form-control col-xs-10 m-0 " + getClassNameByError(this.state.nameError)}
                               type="text"
                               placeholder="Введите имя"
                               id='userName'
                               onChange={this.handleChange}
                               onBlur={this.handleBlur}
                               value={this.state.name}
                               defaultValue={this.props.userById ? this.props.userById.name : null}
                        />
                        <div className="invalid-feedback valid-feedback">
                            <div>{this.state.nameError}</div>
                        </div>
                    </div>
                    <div className="form-group row col-md-8">
                        <label htmlFor='userSurname' className="col-xs-2 col-form-label">Фамилия</label>
                        <input
                            className={"form-control col-xs-10 m-0 " + getClassNameByError(this.state.surnameError)}
                            type="text"
                            placeholder="Введите фамилию"
                            id='userSurname'
                            onChange={this.handleChange}
                            onBlur={this.handleBlur}
                            value={this.state.surname}
                            defaultValue={this.props.userById ? this.props.userById.surname : null}
                        />
                        <div className="invalid-feedback valid-feedback">
                            <div>{this.state.surnameError}</div>
                        </div>
                    </div>
                    <div className="form-group row col-md-8">
                        <label htmlFor='userPatronymic' className="col-xs-2 col-form-label">Отчество</label>
                        <input
                            className={"form-control col-xs-10 m-0 " + getClassNameByError(this.state.patronymicError)}
                            type="text"
                            placeholder="Введите отчество"
                            id='userPatronymic'
                            // onChange={props.handler}
                            onChange={this.handleChange}
                            onBlur={this.handleBlur}
                            value={this.state.patronymic}
                            defaultValue={this.props.userById ? this.props.userById.patronymic : null}
                        />
                        <div className="invalid-feedback valid-feedback">
                            <div>{this.state.patronymicError}</div>
                        </div>
                    </div>
                    <div className="form-group row col-md-8">
                        <label htmlFor="tel-input" className="col-xs-2 col-form-label ">Номер
                            телефона</label>
                        <input
                            className={"form-control col-xs-10 m-0 " + getClassNameByError(this.state.phoneNumberError)}
                            type="tel"
                            placeholder="1-(555)-555-5555"
                            id="tel-input"
                            onChange={this.handleChange}
                            onBlur={this.handleBlur}
                            value={this.state.phoneNumber}
                            defaultValue={this.props.userById ? this.props.userById.phoneNumber : null}
                        />
                        <div className="invalid-feedback valid-feedback">
                            <div>{this.state.phoneNumberError}</div>
                        </div>
                    </div>
                    <div className="form-group row col-md-8">
                        <label htmlFor="email-input" className="col-xs-2 col-form-label">Email</label>
                        <input className={"form-control col-xs-10 m-0 " + getClassNameByError(this.state.emailError)}
                               type="email"
                               placeholder="ivanov.ii@example.com"
                               id="email-input"
                               onChange={this.handleChange}
                               onBlur={this.handleBlur}
                               value={this.state.email}
                               defaultValue={this.props.userById ? this.props.userById.email : null}
                        />
                        <div className="invalid-feedback valid-feedback">
                            <div>{this.state.emailError}</div>
                        </div>
                    </div>
                </form>
            </div>
        </div>);
    }
}

export default UserCreatingInputs;

function getClassNameByError(error) {
    return error ? "is-invalid" : "is-valid"
}