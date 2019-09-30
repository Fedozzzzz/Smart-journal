import React, {Component} from "react"
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {groupActionCreators} from "../../../store/redux/groups/actionCreators";
import Form from "../../components/Form";
import {scheduleActionCreators} from "../../../store/redux/schedule/actionCreators";
import "../../../css/AttendanceAndPayments.css"
import {attendanceActionCreators} from "../../../store/redux/attendance/actionCreators";
import {paymentsActionCreators} from "../../../store/redux/payments/actionCreators";
import {EditSaveButtons} from "../../components/EditSaveButtons";


Date.prototype.getBeginOfMonth = function () {
    return new Date(this.getFullYear(), this.getMonth(), 1, 0, 0, 0, 0);
};

Date.prototype.toLocaleISOString = function () { // uses here instead of Date.prototype.toISOString()
    return this.getFullYear() + "-"
        + (this.getMonth() + 1 < 10 ? "0" + (this.getMonth() + 1) : (this.getMonth() + 1)) + "-"
        + (this.getDate() < 10 ? "0" + this.getDate() : this.getDate());
};

class AttendanceAndPayments extends Component {

    constructor(props, ctx) {
        super(props, ctx);
        this.state = {
            selectedGroupId: null,
            selectedMonth: new Date().getBeginOfMonth(),
            scheduleOfGroup: new Map(),
            newAttendance: new Map(),
            groupsMap: new Map(),
            currentDate: new Date()
        };
        this.getSelectedDate = this.getSelectedDate.bind(this);
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
        if ((this.state.selectedGroupId !== prevState.selectedGroupId) && this.state.selectedMonth
            || (this.state.selectedMonth !== prevState.selectedMonth) && this.state.selectedGroupId)
        // || (!this.props.schedule.isLoaded && this.state.selectedMonth && this.state.selectedGroupId))
        {
            console.log("did-update");
            let date = new Date(this.state.selectedMonth);
            // console.log(date);
            let from = date.toLocaleISOString();
            date.setDate(this.state.selectedMonth.daysInMonth());
            let to = date.toLocaleISOString();
            // console.log(this.state.selectedGroupId, from, to);
            this.props.getSchedule(this.state.selectedGroupId, from, to);
            this.props.getUsersFromGroup(this.state.selectedGroupId);
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
                el.attendance.forEach(value => {
                    attendance.set(new Date(value.date).getDate(), value.isPaid);
                    // let tempObj = {};
                    // tempObj.date = new Date(value.date).getDate();
                    // tempObj.isPaid= value.isPaid;
                });
                tempMap.set(el.userId, attendance);
                tempNewAttendance.set(el.userId, []);
            });
            this.setState({
                attendance: tempMap,
                newAttendance: tempNewAttendance
            });
        }
        if (this.props.attendance.isEdited && this.state.selectedGroupId) {
            let date = new Date(this.state.selectedMonth);
            // console.log(date);
            let from = date.toLocaleISOString();
            date.setDate(this.state.selectedMonth.daysInMonth());
            let to = date.toLocaleISOString();
            this.props.getAttendance(this.state.selectedGroupId, from, to);
        }
        if (this.props.group.groups !== prevProps.group.groups) {
            let tempGroupsMap = new Map();
            this.props.group.groups.forEach(value => {
                tempGroupsMap.set(value.guid, {
                    name: value.name,
                    days: value.days,
                    startTimes: value.startTimes,
                    duration: value.duration,
                    cost: value.cost
                })
            });
            this.setState({
                groupsMap: tempGroupsMap
            })
        }
        if (this.props.payments.newPaymentId !== prevProps.payments.newPaymentId) {
            this.props.getUsersFromGroup(this.state.selectedGroupId);
            let date = new Date(this.state.selectedMonth);
            // console.log(date);
            let from = date.toLocaleISOString();
            date.setDate(this.state.selectedMonth.daysInMonth());
            let to = date.toLocaleISOString();
            this.props.getAttendance(this.state.selectedGroupId, from, to);
            // let date = new Date(this.state.selectedMonth);
            // console.log(date);
            // let from = date.toISOString().slice(0, 10);
            // date.setUTCDate(this.state.selectedMonth.daysInMonth());
            // let to = date.toISOString().slice(0, 10);
            // console.log(this.state.selectedGroupId, from, to);
            // // this.props.getAttendance()
            // this.props.getAttendance(this.state.selectedGroupId, from, to);
        }
    }

    getSelectedDate(value) {
        this.setState({selectedMonth: new Date(value).getBeginOfMonth()});
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
            data.push({userId: key, updatedAttendance: value});
        });
        // console.log(data);
        this.props.saveEditAttendance(this.state.selectedGroupId, data);
    }

    clickAttendanceHeadHandler(key, e) {
        if (this.props.attendance.isEdit) {
            this.props.group.usersFromGroup.forEach(value => {
                let elem = document.getElementById(value.guid + key + "cell");
                console.log(elem);
                // let mapAttendance = this.state.newAttendance;
                // // console.log(mapAttendance);
                // let tempNewAttendance = mapAttendance.get(value.guid);
                // // console.log(tempNewAttendance);
                // let thisDate = new Date(new Date(this.state.selectedMonth).setDate(key)).toLocaleISOString();
                // let attendance = tempNewAttendance.find(element => {
                //     if (element.date === thisDate) {
                //         return element;
                //     }
                // }) || {date: thisDate};
                // let elem = document.getElementById(value.guid + key + "cell");
                // switch (elem.className) {
                //     case "table-default":
                //         e.target.className = "table-primary";
                //         e.target.innerHTML = "Б";
                //         attendance.isAttended = true;
                //         break;
                //     case "table-primary":
                //         e.target.className = "table-secondary";
                //         e.target.innerHTML = "Н";
                //         attendance.isAttended = false;
                //         break;
                //     case "table-secondary":
                //         e.target.className = "table-default";
                //         e.target.innerHTML = null;
                //         break;
                // }
                //
                // if (tempNewAttendance.indexOf(attendance) === -1) {
                //     tempNewAttendance.push(attendance);
                // }
                // mapAttendance.set(value.guid, tempNewAttendance);
                // // console.log(mapAttendance);
                // this.setState({newAttendance: mapAttendance})
            })
        }
    }

    renderScheduleHead() {
        let result = [];
        this.state.scheduleOfGroup.forEach((value, key) => {
            result.push(<th className="cell" onClick={this.clickAttendanceHeadHandler.bind(this, key)}>{key}</th>)
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
            // console.log(mapAttendance);
            let tempNewAttendance = mapAttendance.get(userId);
            // console.log(tempNewAttendance);
            let thisDate = new Date(new Date(this.state.selectedMonth).setDate(key)).toLocaleISOString();
            let attendance = tempNewAttendance.find(element => {
                if (element.date === thisDate) {
                    return element;
                }
            }) || {date: thisDate};
            // let attendance = {date: thisDate};
            // console.log(attendance);
            // e.target.userSelect="none";
            switch (e.target.className) {
                case "table-default":
                    e.target.className = "table-primary";
                    e.target.innerHTML = "Б";
                    attendance.isAttended = true;
                    break;
                case "table-primary":
                    e.target.className = "table-secondary";
                    e.target.innerHTML = "Н";
                    attendance.isAttended = false;
                    break;
                case "table-secondary":
                    e.target.className = "table-default";
                    e.target.innerHTML = null;
                    break;
            }
            // if (e.target.className === "cell") {
            //     e.target.className = "cell_attended";
            //     e.target.innerHTML = "Б";
            //     attendance.isAttended = true;
            // } else if (e.target.className === "cell_attended") {
            //     e.target.className = "cell_absent";
            //     e.target.innerHTML = "Н";
            //     attendance.isAttended = false;
            // } else if (e.target.className === "cell_absent") {
            //     e.target.className = "cell";
            //     e.target.innerHTML = null;
            // }
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
        if (this.props.attendance.isEdit && this.state.attendance) {
            let attendanceOfUser = this.state.attendance.get(userId);
            this.state.scheduleOfGroup.forEach((value, key) => {
                let classname = "table-default";
                let content;
                if (attendanceOfUser.has(key)) {
                    classname = "table-primary";
                    content = "Б";
                } else if (key <= this.state.currentDate.getDate()
                    && this.state.selectedMonth.getMonth() <= this.state.currentDate.getMonth()) {
                    classname = "table-secondary";
                    content = "Н";
                }
                result.push(<td className={classname}
                                onClick={this.clickAttendanceHandler.bind(this, userId, key)}
                                id={userId + key + "cell"}>{content}</td>)
            });
            return result;
        }
        if (this.state.attendance) {
            let attendanceOfUser = this.state.attendance.get(userId);
            this.state.scheduleOfGroup.forEach((value, key) => {
                let classname = "table-default";
                let content;
                if (attendanceOfUser.has(key)) {
                    classname = attendanceOfUser.get(key) ? "table-success" : "table-danger";
                    content = "Б";
                } else if (key <= this.state.currentDate.getDate()
                    && this.state.selectedMonth.getMonth() <= this.state.currentDate.getMonth()) {
                    classname = "table-secondary";
                    content = "Н";
                }
                result.push(<td className={classname}
                                onClick={this.clickAttendanceHandler.bind(this, userId, key)}
                                id={userId + key + "cell"}>{content}</td>)
            });
            return result;
        }
    }

    renderTable() {
        return (<div>
            <table className='table table-hover table-bordered table-responsive'>
                <thead>
                <tr>
                    <th>Студент</th>
                    {this.renderScheduleHead()}
                    <th>Долг</th>
                    <th>Счет</th>
                </tr>
                </thead>
                <tbody>
                {this.props.group.usersFromGroup ?
                    this.props.group.usersFromGroup.map(user => (
                        <tr>
                            <td>{user.name} {user.surname}</td>
                            {this.renderScheduleBody(user.guid)}
                            <td>{user.dept}</td>
                            <td>{user.amount}</td>
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
            <Form getSelectedGroupId={this.getSelectedGroupId} getSelectedDate={this.getSelectedDate}
                  groups={this.props.group.groups}/>
            <EditSaveButtons isLoaded={this.props.attendance.isLoaded} isEdit={this.props.attendance.isEdit}
                             onEdit={this.onEdit} onSave={this.onSave}/>
            <div>{this.state.groupsMap.size && this.state.selectedGroupId ?
                <div>
                    <h6>Цена за одно занятие:</h6>
                    <p>{this.state.groupsMap.get(this.state.selectedGroupId).cost} руб.</p>
                </div> : null}
            </div>
            {this.props.group.usersFromGroup.length ? this.renderTable() : null}
        </div>)
    }
}

export default connect(
    state => {
        return {
            group: state.group,
            schedule: state.schedule,
            attendance: state.attendance,
            payments: state.payments
        }
    },
    dispatch => bindActionCreators(Object.assign({}, groupActionCreators,
        scheduleActionCreators, attendanceActionCreators, paymentsActionCreators), dispatch)
)
(AttendanceAndPayments)