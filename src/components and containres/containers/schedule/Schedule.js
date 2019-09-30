import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import "../../../css/Schedule.css";
import {scheduleActionCreators} from "../../../store/redux/schedule/actionCreators";
import {groupActionCreators} from "../../../store/redux/groups/actionCreators";
import Form from "../../components/Form"
import {EditSaveButtons} from "../../components/EditSaveButtons";
import {MonthlySchedule} from "./MonthlySchedule"


class Schedule extends Component {

    constructor(props, ctx) {
        super(props, ctx);
        this.state = {
            selectedGroupId: null,
            selectedMonth: new Date().getBeginOfMonth(),
            previousMonth: new Date(new Date(new Date().getBeginOfMonth()).setMonth(new Date().getMonth() - 1)),
            scheduleOfGroup: new Map(),
            isSelected: false,
            newSchedule: new Map()
        };
        this.onDateChange = this.onDateChange.bind(this);
        this.onEdit = this.onEdit.bind(this);
        this.onSave = this.onSave.bind(this);
        this.onSelectGroup = this.onSelectGroup.bind(this);
        this.getSelectedGroupId = this.getSelectedGroupId.bind(this);
        this.getSelectedDate = this.getSelectedDate.bind(this);
        this.onClick = this.onClick.bind(this);
    }

    componentDidMount(prevProps, prevState, snapshot) {
        console.log("did mount");
        // this.props.getSchedule();
        this.props.getAllGroups();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.schedule.schedule !== prevProps.schedule.schedule) {
            let scheduleOfGroup = new Map();
            this.props.schedule.schedule.map((day) => {
                scheduleOfGroup.set(new Date(day.date).getDate(), day.startTime);
            });
            this.setState({
                scheduleOfGroup: scheduleOfGroup,
            });
        }
        if ((this.state.selectedGroupId !== prevState.selectedGroupId) && this.state.selectedMonth
            || (this.state.selectedMonth !== prevState.selectedMonth) && this.state.selectedGroupId
            || (!this.props.schedule.isLoaded && this.state.selectedMonth && this.state.selectedGroupId)) {
            let date = new Date(this.state.selectedMonth);
            // console.log(date);
            let from = date.toLocaleISOString();
            date.setDate(this.state.selectedMonth.daysInMonth());
            let to = date.toLocaleISOString();
            // console.log(this.state.selectedGroupId, from, to);
            this.props.getSchedule(this.state.selectedGroupId, from, to);
        }
        // console.log(this.state);
    }

    onDateChange(e) {
        // console.log(e.target.value);
        let date = e.target.value;
        if (this.state.newSchedule.size) {
            if (window.confirm("Внимание!!! Предыдущие действия не сохранятся! Вы уверены, что хотите продолжить?")) {
                this.setState({
                    selectedMonth: new Date(date),
                    previousMonth: new Date(new Date(date).setMonth(new Date(date).getMonth() - 1)),
                    nextMonth: new Date(new Date(date).setMonth(new Date(date).getMonth() + 1)),
                });
            }
        } else {
            this.setState({
                selectedMonth: new Date(date),
                previousMonth: new Date(new Date(date).setMonth(new Date(date).getMonth() - 1)),
                nextMonth: new Date(new Date(date).setMonth(new Date(date).getMonth() + 1)),
            });
        }
    }

    onSelectGroup(e) {
        let groupId = e.target.value;
        if (this.state.newSchedule.size) {
            if (window.confirm("Внимание!!! Предыдущие действия не сохранятся! Вы уверены, что хотите продолжить?")) {
                this.setState({
                    selectedGroupId: groupId,
                    isSelected: true,
                    newSchedule: new Map()
                });
                this.props.saveSchedule();
            }
        } else {
            this.setState({
                selectedGroupId: groupId,
                isSelected: true
            });
        }
    }

    onEdit(e) {
        this.props.editSchedule();
    }

    onClick(day, e) {
        console.log("onclick");
        let elem = document.getElementById(day + "cell");
        console.log(elem.className);
        if (this.props.schedule.isEdit) {
            let tempMap = this.state.newSchedule;
            if (elem.className === "table-warning") {
                elem.className = "table-light";
                tempMap.set(day, {toDelete: true, startTime: this.state.scheduleOfGroup.get(day)});
                this.setState({newSchedule: tempMap});
            } else if (elem.className === "table-info") {
                elem.className = "table-light";
                let answ = window.confirm("Вы уверены, что хотите удалить этот день из расписания?");
                if (answ) {
                    tempMap.set(day, {toDelete: true, startTime: this.state.scheduleOfGroup.get(day)});
                    this.setState({newSchedule: tempMap});
                }
            } else {
                let startTime = prompt("Введите время занятия в формате --:--");
                if (startTime) {
                    elem.className = "table-warning";
                    tempMap.set(day, {toDelete: false, startTime: startTime});
                    this.setState({newSchedule: tempMap});
                }
            }
        }
    }

    onSave(e) {
        let data = [];
        let currDate = new Date(this.state.selectedMonth);
        this.state.newSchedule.forEach((value, key) => {
            currDate.setDate(key);
            data.push({
                date: currDate.toLocaleISOString(),
                startTime: value.startTime,
                toDelete: value.toDelete,
            });
        });
        // console.log(data);
        this.props.saveSchedule(this.state.selectedGroupId, data);
        this.setState({newSchedule: new Map()});
    }


    getSelectedGroupId(value) {
        // this.setState({selectedGroupId: value});
        if (this.state.newSchedule.size) {
            if (window.confirm("Внимание!!! Предыдущие действия не сохранятся! Вы уверены, что хотите продолжить?")) {
                this.setState({
                    selectedGroupId: value,
                    isSelected: true,
                    newSchedule: new Map()
                });
                this.props.saveSchedule();
            }
        } else {
            this.setState({
                selectedGroupId: value,
                isSelected: true
            });
        }
    }

    getSelectedDate(value) {
        // this.setState({selectedGroupId: value});
        let previousMonth = new Date(new Date(value).setMonth(new Date(value).getMonth() - 1));
        console.log("getCurDate", previousMonth);
        if (this.state.newSchedule.size) {
            if (window.confirm("Внимание!!! Предыдущие действия не сохранятся! Вы уверены, что хотите продолжить?")) {
                this.setState({
                    selectedMonth: new Date(value),
                    previousMonth: previousMonth,
                    nextMonth: new Date(new Date(value).setMonth(new Date(value).getMonth() + 1)),
                });
            }
        } else {
            this.setState({
                selectedMonth: new Date(value),
                previousMonth: new Date(new Date(value).setMonth(new Date(value).getMonth() - 1)),
                nextMonth: new Date(new Date(value).setMonth(new Date(value).getMonth() + 1)),
            });
        }
    }

    render() {
        // console.log("render");
        // console.log("this.state", this.state);
        // console.log("this.props", this.props);
        // console.log("this.props.children", this.props.children);
        return (
            <div>
                <div className="schedule">
                    <h3>Расписание</h3>
                    <Form getSelectedGroupId={this.getSelectedGroupId} groups={this.props.group.groups}
                          getSelectedDate={this.getSelectedDate}/>
                    <EditSaveButtons isLoaded={this.props.schedule.isLoaded} isEdit={this.props.schedule.isEdit}
                                     onEdit={this.onEdit} onSave={this.onSave}/>
                    {this.props.schedule.schedule ?
                        <MonthlySchedule props={this.state} clickHandler={this.onClick}/> : null}

                </div>
            </div>
        );
    }
}



export default connect(
    state => {
        return {
            schedule: state.schedule,
            group: state.group
        }
    },
    dispatch => bindActionCreators(Object.assign({}, scheduleActionCreators, groupActionCreators), dispatch)
)(Schedule);