import React from "react"
import "../../../css/userCreating.css"

export const UserCreatingInputs = (props) => {
    console.log(props);
    return (<div className="container-fluid">
        <div className="create-user">
            <form>
                <div className="form-group row col-md-8">
                    <label htmlFor='userName' className="col-xs-2 col-form-label">Имя</label>
                    <input className={"form-control col-xs-10 m-0 " + getClassNameByError(props.errors.nameError)}
                           type="text"
                           placeholder="Введите имя"
                           id='userName'
                           onChange={props.changeHandler}
                           onBlur={props.blurHandler}
                           defaultValue={props.userById ? props.userById.name : null}
                    />
                    <div className="invalid-feedback valid-feedback">
                        <div>{props.errors.nameError}</div>
                    </div>
                </div>
                <div className="form-group row col-md-8">
                    <label htmlFor='userSurname' className="col-xs-2 col-form-label">Фамилия</label>
                    <input className={"form-control col-xs-10 m-0 " + getClassNameByError(props.errors.surnameError)}
                           type="text"
                           placeholder="Введите фамилию"
                           id='userSurname'
                        // onChange={props.handler}
                           onChange={props.changeHandler}
                           onBlur={props.blurHandler}
                           defaultValue={props.userById ? props.userById.surname : null}
                    />
                    <div className="invalid-feedback valid-feedback">
                        <div>{props.errors.surnameError}</div>
                    </div>
                </div>
                <div className="form-group row col-md-8">
                    <label htmlFor='userPatronymic' className="col-xs-2 col-form-label">Отчество</label>
                    <input className={"form-control col-xs-10 m-0 " + getClassNameByError(props.errors.patronymicError)}
                           type="text"
                           placeholder="Введите отчество"
                           id='userPatronymic'
                        // onChange={props.handler}
                           onChange={props.changeHandler}
                           onBlur={props.blurHandler}
                           defaultValue={props.userById ? props.userById.patronymic : null}
                    />
                    <div className="invalid-feedback valid-feedback">
                        <div>{props.errors.patronymicError}</div>
                    </div>
                </div>
                <div className="form-group row col-md-8">
                    <label htmlFor="tel-input" className="col-xs-2 col-form-label ">Номер
                        телефона</label>
                    <input className={"form-control col-xs-10 m-0 " + getClassNameByError(props.errors.phoneNumberError)}
                           type="tel"
                           placeholder="1-(555)-555-5555"
                           id="tel-input"
                        // onChange={props.handler}
                           onChange={props.changeHandler}
                           onBlur={props.blurHandler}
                           defaultValue={props.userById ? props.userById.phoneNumber : null}
                    />
                    <div className="invalid-feedback valid-feedback">
                        <div>{props.errors.phoneNumberError}</div>
                    </div>
                </div>
                <div className="form-group row col-md-8">
                    <label htmlFor="email-input" className="col-xs-2 col-form-label">Email</label>
                    <input className={"form-control col-xs-10 m-0 " + getClassNameByError(props.errors.emailError)}
                           type="email"
                           placeholder="ivanov.ii@example.com"
                           id="email-input"
                        // onChange={props.handler}
                           onChange={props.changeHandler}
                           onBlur={props.blurHandler}
                           defaultValue={props.userById ? props.userById.email : null}
                    />
                    <div className="invalid-feedback valid-feedback">
                        <div>{props.errors.emailError}</div>
                    </div>
                </div>
            </form>
        </div>
    </div>);
};


function getClassNameByError(error) {
    return error ? "is-invalid" : "is-valid"
}