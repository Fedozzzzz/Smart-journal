import React, {Component} from "react"
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
// import {groupActionCreators} from "../../../rubbish/groupReducer";
import {groupActionCreators} from "../../../store/redux/groups/actionCreators";
import Form from "../../components/Form";
// import {scheduleActionCreators} from "../../../rubbish/scheduleReducer";
import {scheduleActionCreators} from "../../../store/redux/schedule/actionCreators";
import "../../../css/AttendanceAndPayments.css"
// import {attendanceActionCreators} from "../../../store/reducers/attendanceReducer";
import {attendanceActionCreators} from "../../../store/redux/attendance/actionCreators";
// import {paymentsActionCreators} from "../../../rubbish/paymentsReducer";
import {paymentsActionCreators} from "../../../store/redux/payments/actionCreators";
import {EditSaveButtons} from "../../components/EditSaveButtons";
import {accountsActionCreators} from "../../../store/redux/accounts/actionCreators";


class AttendanceAndPayments extends Component {

    constructor(props, ctx) {
        super(props, ctx);
        this.state = {
            selectedGroupId: null,
            currentMonth: new Date(new Date().setDate(1)),
            scheduleOfGroup: new Map(),
            newAttendance: new Map(),
            accountsFromGroup: new Map()
            // currentMonth: new Date(),
            // previousMonth: new Date(),
            // date: String(),
            // nextMonth
            // isSelected: false,
            // newSchedule: new Map()
        };
        this.getCurrentDate = this.getCurrentDate.bind(this);
        this.getSelectedGroupId = this.getSelectedGroupId.bind(this);
        this.renderTable = this.renderTable.bind(this);
        // this.renderSchedule = this.renderSchedule.bind(this);
        this.renderScheduleBody = this.renderScheduleBody.bind(this);
        this.renderScheduleHead = this.renderScheduleHead.bind(this);
        this.onEdit = this.onEdit.bind(this);
        this.onSave = this.onSave.bind(this);
        this.addPayment = this.addPayment.bind(this);
        // this.clickAttendanceHandler=this.clickAttendanceHandler.bind(this);
    }

    componentDidMount() {
        this.props.getAllGroups();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if ((this.state.selectedGroupId !== prevState.selectedGroupId) && this.state.currentMonth
            || (this.state.currentMonth !== prevState.currentMonth) && this.state.selectedGroupId)
        // || (!this.props.schedule.isLoaded && this.state.currentMonth && this.state.selectedGroupId))
        {
            console.log("did-update");
            let date = new Date(this.state.currentMonth);
            // console.log(date);
            let from = date.toISOString().slice(0, 10);
            date.setUTCDate(this.state.currentMonth.daysInMonth());
            let to = date.toISOString().slice(0, 10);
            // console.log(this.state.selectedGroupId, from, to);
            this.props.getSchedule(this.state.selectedGroupId, from, to);
            this.props.getUsersFromGroup(this.state.selectedGroupId);
            this.props.getAccountsByGroupId(this.state.selectedGroupId);
            this.props.getAttendance(this.state.selectedGroupId, from, to);
        }
        if (this.props.schedule.schedule !== prevProps.schedule.schedule) {
            let scheduleOfGroup = new Map();
            this.props.schedule.schedule.map((day) => {
                scheduleOfGroup.set(new Date(day.date).getDate(), day.startTime);
            });
            this.setState({
                scheduleOfGroup: scheduleOfGroup,
            });
        }
        // console.log("buttons", this.props.attendance.attendance);
        if (this.props.attendance.attendance !== prevProps.attendance.attendance
            && this.props.attendance.attendance) {
            let tempMap = new Map();
            let tempNewAttendance = new Map();
            this.props.attendance.attendance.forEach(el => {
                let attendance = new Map();
                el.attendance.forEach(el => {
                    attendance.set(new Date(el.date).getDate(), el.isPaid)
                });
                tempMap.set(el.userId, attendance);
                tempNewAttendance.set(el.userId, []);
            });
            this.setState({
                attendance: tempMap,
                newAttendance: tempNewAttendance
            });
        }
        if (this.props.payments.newPaymentId !== prevProps.payments.newPaymentId) {
            this.props.getUsersFromGroup(this.state.selectedGroupId);
            this.props.getAccountsByGroupId(this.state.selectedGroupId); //получать только измененные данные
        }
        if (this.props.accounts.accountsFromGroup !== prevProps.accounts.accountsFromGroup) {
            // console.log("accounts got");
            let tempMap = new Map();
            this.props.accounts.accountsFromGroup.forEach(value => {
                let tempObj = {};
                tempObj.amount = value.amount;
                tempObj.dept = value.dept;
                tempObj.updatedAt = value.updatedAt;
                tempMap.set(value.userId, tempObj);
            });
            this.setState({accountsFromGroup: tempMap});
        }
    }

    getCurrentDate(value) {
        this.setState({currentMonth: value});
    }

    getSelectedGroupId(value) {
        this.setState({selectedGroupId: value});
    }

    onEdit() {
        this.props.editAttendance();
    }

    onSave() {
        let data = [];
        console.log(this.state.newAttendance);
        this.state.newAttendance.forEach((value, key) => {
            let tempObj = {};
            tempObj.userId = key;
            tempObj.updatedAttendance = value;
            data.push(tempObj);
        });
        console.log(data);
        this.props.saveEditAttendance(this.state.selectedGroupId, data);
        let date = new Date(this.state.currentMonth);
        // console.log(date);
        let from = date.toISOString().slice(0, 10);
        date.setUTCDate(this.state.currentMonth.daysInMonth());
        let to = date.toISOString().slice(0, 10);
        // this.props.getAttendance(this.state.selectedGroupId, from, to);
    }

    // renderButtons() {
    //     // console.log("buttons", this.props.attendance.attendance);
    //     return (
    //         <div className="buttons">
    //             {this.props.attendance.attendance ?
    //                 <button
    //                     onClick={this.onEdit}
    //                     type="redact"
    //                     className="btn btn-info"
    //                 >Редактировать таблицу
    //                 </button>
    //                 : null}
    //             {this.props.attendance.isEdit ?
    //                 <button
    //                     onClick={this.onSave}
    //                     type="save"
    //                     className="btn btn-success"
    //                 >Сохранить
    //                 </button> : null
    //             }
    //         </div>)
    // }

    renderScheduleHead() {
        let result = [];
        this.state.scheduleOfGroup.forEach((value, key) => {
            result.push(<th className="cell">{key}</th>)
        });
        return result;
    }

    addPayment(userId) {
        let amount = window.prompt("Введите сумму платежа в рублях");
        if (amount) {
            this.props.addPayment(userId, {
                amount: amount,
                payday: new Date().toISOString()
            });
        }
    }

    clickAttendanceHandler(userId, key, e) {
        // console.log(e.target);

        // let elem = document.getElementById(userId + key + "cell");
        // console.log(elem);
        if (this.props.attendance.isEdit) {
            let mapAttendance = this.state.newAttendance;
            // console.log(tempMapAttendance);
            let tempNewAttendance = mapAttendance.get(userId);
            // console.log(tempNewAttendance);
            let thisDate = new Date(new Date(this.state.currentMonth).setDate(key)).toISOString();
            let attendance = tempNewAttendance.find(element => {
                if (element.date === thisDate) {
                    return element;
                }
            }) || {date: thisDate};
            // console.log(attendance);
            if (e.target.className === "cell") {
                e.target.className = "cell_attended";
                e.target.innerHTML = "Б";
                attendance.isAttended = true;
            } else if (e.target.className === "cell_attended") {
                e.target.className = "cell_absent";
                e.target.innerHTML = "Н";
                attendance.isAttended = false;
            } else if (e.target.className === "cell_absent") {
                e.target.className = "cell";
                e.target.innerHTML = null;
            }
            if (tempNewAttendance.indexOf(attendance) === -1) {
                tempNewAttendance.push(attendance);
            }
            mapAttendance.set(userId, tempNewAttendance);
            // console.log(mapAttendance);
            this.setState({newAttendance: mapAttendance})
        }
    }

    renderScheduleBody(userId) {
        let result = [];

        if (this.state.attendance) {
            let attendanceOfUser = this.state.attendance.get(userId);
            // console.log("scb", attendanceOfUser);
            // if(this.props.attendance.isEdit){
            //     this.state.scheduleOfGroup.forEach((value, key) => {
            //         result.push(<td className="cell"><input className="table__input"/></td>)})
            // }else {
            this.state.scheduleOfGroup.forEach((value, key) => {
                let cell;
                if (attendanceOfUser.has(key)) {
                    let className = attendanceOfUser.get(key) ? "cell_paid" : "cell_dept";
                    cell = <td className={className} onClick={this.clickAttendanceHandler.bind(this, userId, key)}
                               id={userId + key + "cell"}>Б</td>
                } else {
                    cell = <td className="cell" onClick={this.clickAttendanceHandler.bind(this, userId, key)}
                               id={userId + key + "cell"}>{null}</td>
                }
                result.push(cell);
            });
            // }
            return result;
        }
    }

    renderTable() {
        // console.log(this.props.accounts.isLoaded);
        return (<div>
            <table className='table table-striped table-bordered'>
                <thead>
                <tr>
                    <th>Студент</th>
                    {this.renderScheduleHead()}
                    <th>Долг</th>
                    <th>Счет</th>
                </tr>
                </thead>
                <tbody>
                {this.state.accountsFromGroup.size ?
                    this.props.group.usersFromGroup.map(user => (
                        <tr>
                            <td>{user.name} {user.surname}</td>
                            {this.renderScheduleBody(user.guid)}
                            <td>{this.state.accountsFromGroup.get(user.guid).dept}</td>
                            <td>{this.state.accountsFromGroup.get(user.guid).amount}</td>
                            <div className="table__button-add-payment">
                                <button className="btn btn-success" onClick={this.addPayment.bind(this, user.guid)}>
                                    Пополнить счет
                                </button>
                            </div>
                        </tr>
                    )) : null}
                </tbody>
            </table>
        </div>)
    }

    render() {
        console.log("this.state", this.state);
        // console.log("this.props", this.props);
        return (<div>
            <h3>Управление платежами</h3>
            {/*{this.renderForm()}*/}
            <Form getSelectedGroupId={this.getSelectedGroupId} getCurrentDate={this.getCurrentDate}
                  groups={this.props.group.groups}/>
            {/*{this.renderButtons()}*/}
            <EditSaveButtons isLoaded={this.props.attendance.isLoaded} isEdit={this.props.attendance.isEdit}
                             onEdit={this.onEdit} onSave={this.onSave}/>
            {this.props.group.usersFromGroup ? this.renderTable() : null}
        </div>)
    }
}

export default connect(
    state => {
        return {
            group: state.group,
            schedule: state.schedule,
            attendance: state.attendance,
            payments: state.payments,
            accounts: state.accounts
        }
    },
    dispatch => bindActionCreators(Object.assign({}, groupActionCreators,
        scheduleActionCreators, attendanceActionCreators, paymentsActionCreators,
        accountsActionCreators), dispatch)
)
(AttendanceAndPayments)