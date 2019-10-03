import React from "react"
import "../../../css/userCreating.css"


export const UserCreatingInputs = (props) => (<div className="container-fluid">
    {/*<div className="create-user__container">*/}
    <form>
        <div className="form-group row col-md-8">
            <label htmlFor='userName' className="col-xs-2 col-form-label">Имя</label>
            {/*<div className="col-xs-10">*/}
            <input className="form-control col-xs-10 m-0"
                   type="text"
                   placeholder="Введите имя"
                   id='userName'
                   onChange={props.handler}
            />
            {/*</div>*/}
        </div>
        {/*</form>*/}
        {/*<form className="row">*/}
        <div className="form-group row col-md-8">
            <label htmlFor='userSurname' className="col-xs-2 col-form-label">Фамилия</label>
            {/*<div className="col-xs-10">*/}
            <input className="form-control col-xs-10 m-0"
                   type="text"
                   placeholder="Введите фамилию"
                   id='userSurname'
                   onChange={props.handler}
            />
            {/*</div>*/}
        </div>
        {/*</form>*/}
        {/*<form className="form-inline">*/}
        <div className="form-group row col-md-8">
            <label htmlFor='userPatronymic' className="col-xs-2 col-form-label">Отчество</label>
            {/*<div className="col-xs-10">*/}
            <input className="form-control col-xs-10 m-0"
                   type="text"
                   placeholder="Введите отчество"
                   id='userPatronymic'
                   onChange={props.handler}
            />
            {/*</div>*/}
        </div>
        {/*</form>*/}
        {/*<form className="form-inline">*/}
        <div className="form-group row col-md-8">
            <label htmlFor="email-input" className="col-xs-2 col-form-label">Email</label>
            {/*<div className="col-xs-10">*/}
            <input className="form-control col-xs-10 m-0"
                   type="email"
                   placeholder="ivanov.ii@example.com"
                   id="email-input"
                   onChange={props.handler}
            />
            {/*</div>*/}
        </div>
        {/*</form>*/}
        {/*<form className="form-inline">*/}
        <div className="form-group row col-md-8">
            <label htmlFor="tel-input" className="col-xs-2 col-form-label ">Номер
                телефона</label>
            {/*<div className="col-xs-10">*/}
            <input className="form-control col-xs-10 m-0"
                   type="tel"
                   placeholder="1-(555)-555-5555"
                   id="tel-input"
                   onChange={props.handler}
            />
        </div>
        {/*</div>*/}
    </form>
    {/*</div>*/}
</div>);