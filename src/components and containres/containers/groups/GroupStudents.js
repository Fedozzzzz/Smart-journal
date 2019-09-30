import React from "react"
import {Link} from "react-router-dom";

export const GroupStudents = (props) => {
    let result = [];
    props.usersFromGroup.forEach(user => result.push(
        <div>
            <Link
                to={`/users/user_${user.guid}`}>{user.name} {user.surname} {user.patronymic}</Link>
        </div>
    ));
    return (
        <div>
            <h5>Студенты этой группы:</h5>
            {result}
        </div>)
};