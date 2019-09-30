import React from "react"
import {AttendanceAndPaymentsTableBodySchedule} from "./AttendanceAndPaymentsTableBodySchedule";

export const AttendanceAndPaymentsTableBody = (props) => {
    console.log(props);
    return (props.usersFromGroup ?
        props.usersFromGroup.map(user => (
            <tr>
                <td>{user.name} {user.surname}</td>
                {AttendanceAndPaymentsTableBodySchedule(props, user.guid)}
                <td>{user.dept}</td>
                <td>{user.amount}</td>
                <div className="table__button-add-payment">
                    <button className="btn btn-success" onClick={props.onAddPayment.bind(this, user.guid)}>
                        Пополнить счет
                    </button>
                </div>
            </tr>
        )) : null)
};