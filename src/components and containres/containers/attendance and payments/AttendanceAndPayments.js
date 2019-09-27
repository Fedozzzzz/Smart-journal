import React, {Component} from "react"
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {groupActionCreators} from "../../../store/reducers/groupReducer";
import Form from "../../components/Form";
import {scheduleActionCreators} from "../../../store/reducers/scheduleReducer";
import "../../../css/AttendanceAndPayments.css"
import {attendanceActionCreators} from "../../../store/reducers/attendanceReducer";
import {paymentsActionCreators} from "../../../store/reducers/paymentsReducer";


class AttendanceAndPayments extends Component {

    constructor(props, ctx) {
        super(props, ctx);
        this.state = {
            selectedGroupId: null,
            currentMonth: new Date(new Date().setDate(1)),
            scheduleOfGroup: new Map()
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
            console.log(date);
            let from = date.toISOString().slice(0, 10);
            date.setUTCDate(this.state.currentMonth.daysInMonth());
            let to = date.toISOString().slice(0, 10);
            console.log(this.state.selectedGroupId, from, to);
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
            this.props.attendance.attendance.forEach(el => {
                tempMap.set(el.userId, el.attendance);
            });
            this.setState({
                attendance: tempMap
            });
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

    clickAttendanceHandler(userId,e){
        console.log(userId,e.target);

    }

    renderButtons() {
        console.log("buttons", this.props.attendance.attendance);
        return (
            <div className="buttons">
                {this.props.attendance.attendance ?
                    <button
                        onClick={this.onEdit}
                        type="redact"
                        className="btn btn-info"
                    >Редактировать таблицу
                    </button>
                    : null}
                {this.props.attendance.isEdit ?
                    <button
                        onClick={this.onSave}
                        type="save"
                        className="btn btn-success"
                    >Сохранить
                    </button> : null
                }
            </div>)
    }

    renderScheduleHead() {
        let result = [];
        this.state.scheduleOfGroup.forEach((value, key) => {
            result.push(<th className="cell">{key}</th>)
        });
        return result;
    }

    renderScheduleBody(userId) {
        let result = [];
        if (this.state.attendance) {
            let attendanceOfUser = this.state.attendance.get(userId);
            console.log("scb", attendanceOfUser);
            if(this.props.attendance.isEdit){
                this.state.scheduleOfGroup.forEach((value, key) => {
                    result.push(<td className="cell"><input className="table__input"/></td>)})
            }else {
            this.state.scheduleOfGroup.forEach((value, key) => {
                result.push(<td className="cell" onClick={this.clickAttendanceHandler.bind(this,userId)}></td>)
            });}
            return result;
        }
    }

    renderTable() {
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
                {this.props.group.usersFromGroup ?
                    this.props.group.usersFromGroup.map(user => (
                        <tr>
                            <td>{user.name}</td>
                            {this.renderScheduleBody(user.guid)}
                            <td>{user.dept}</td>
                            <td>{user.amount}</td>
                        </tr>
                    )) : null}
                </tbody>
            </table>
        </div>)
    }

    render() {
        console.log("this.state", this.state);
        console.log("this.props", this.props);
        return (<div>
            <h3>Управление платежами</h3>
            {/*{this.renderForm()}*/}
            <Form getSelectedGroupId={this.getSelectedGroupId} getCurrentDate={this.getCurrentDate}
                  groups={this.props.group.groups}/>
            {this.renderButtons()}
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
            payments: state.payments
        }
    },
    dispatch => bindActionCreators(Object.assign({}, groupActionCreators,
        scheduleActionCreators, attendanceActionCreators, paymentsActionCreators), dispatch)
)
(AttendanceAndPayments)