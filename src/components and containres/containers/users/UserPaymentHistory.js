import React, {Component} from 'react';

export const UserPaymentHistory = (props) => {
    console.log(props);
    return (
        <div>
            <h5>История платежей студента</h5>
            <table className="table table-bordered table-bordered">
                <thead>
                <tr>
                    <th>Дата</th>
                    <th>Сумма</th>
                </tr>
                </thead>
                <tbody>
                {props.payments.map(payment => (
                    <tr>
                        <td>{new Date(payment.payday).toString()}</td>
                        <td>{payment.amount}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};
