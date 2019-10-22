import React from "react"
import {Link} from "react-router-dom";

export const UserPageProfile = (props) => {
    return (<div className="m-2">
        <div className="row">
            <div className="col-sm-4">
                <p className="d-inline-block font-weight-light">Имя:</p>
                <p className="font-italic ml-2 d-inline-block">{props.userById.name}</p>
            </div>
        </div>
        <div className="row">
            <div className="col-sm-4">
                <p className="d-inline-block font-weight-light">Фамилия:</p>
                <p className="font-italic ml-2 d-inline-block">{props.userById.surname}</p>
            </div>
        </div>
        <div className="row">
            <div className="col-sm-4">
                <p className="d-inline-block font-weight-light">Отчество:</p>
                <p className="font-italic ml-2 d-inline-block">{props.userById.patronymic}</p>
            </div>
        </div>
        <div className="row">
            <div className="col-sm-4">
                <p className="d-inline-block font-weight-light">Номер телефона:</p>
                <p className="font-italic ml-2 d-inline-block">{props.userById.phoneNumber}</p>
            </div>
        </div>
        {/*<p className="col-sm-4">Номер телефона: {props.userById.phoneNumber}</p></div>*/}
        <div className="row">
            <div className="col-sm-4">
                <p className="d-inline-block font-weight-light">Email:</p>
                <p className="font-italic ml-2 d-inline-block">{props.userById.email}</p>
            </div>
            {/*<p className="col-sm-4">Email : {props.userById.email}</p></div>*/}
        </div>
    </div>)
};