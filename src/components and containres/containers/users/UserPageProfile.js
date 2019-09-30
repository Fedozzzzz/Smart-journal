import React from "react"
import {Link} from "react-router-dom";

export const UserPageProfile = (props) => {
    return (<div>
        <div>Имя: {props.userById.name}</div>
        <div>Фамилия: {props.userById.surname}</div>
        <div>Отчество: {props.userById.patronymic}</div>
        <div>Номер телефона: {props.userById.phoneNumber}</div>
        <div>Email : {props.userById.email}</div>
        <Link to='/users' className="btn btn-outline-danger"
              onClick={props.onDeleteUser}>Удалить</Link>
        <Link to={`/users/edit_user/user_${props.userId}`}
              className="btn btn-outline-warning"
              onClick={props.onEditUser}>Редактировать</Link>
    </div>)
};