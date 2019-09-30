import React from "react"
import {Link} from "react-router-dom";

export const GroupAddStudents = (props) => (<div>
        {props.users.map(user => (<div className="form-inline">
            <Link to={`/users/user_${user.guid}`}>
                {user.name} {user.surname} {user.patronymic}</Link>
            <div className="form-check">
                <input className="form-check-input"
                       type="checkbox"
                       value=""
                       onChange={props.handleUsersChange}
                       id={user.guid}
                />
            </div>
        </div>))
        }</div>
);