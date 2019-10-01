import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import "../../../css/Schedule.css";
import {scheduleActionCreators} from "../../../store/redux/schedule/actionCreators";
import {groupActionCreators} from "../../../store/redux/groups/actionCreators";
import Form from "../../components/Form"
import {EditSaveButtons} from "../../components/EditSaveButtons";
import {MonthlySchedule} from "./MonthlySchedule"
import ModalSetStartTime from "../../components/modal/ModalSetStartTime";


class Schedule extends Component {

    constructor(props, ctx) {
        super(props, ctx);
        this.state = {
            selectedGroupId: null,
            selectedMonth: new Date().getBeginOfMonth(),
            previousMonth: new Date(new Date(new Date().getBeginOfMonth()).setMonth(new Date().getMonth() - 1)),
            scheduleOfGroup: new Map(),
            editedScheduleOfGroup: new Map(),
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
        this.getNewScheduleDay = this.getNewScheduleDay.bind(this);
        this.getNewStartTime = this.getNewStartTime.bind(this);
        this.toggleCallback = this.toggleCallback.bind(this);
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
                editedScheduleOfGroup: new Map(scheduleOfGroup)
            });
        }
        if ((this.state.selectedGroupId !== prevState.selectedGroupId) && this.state.selectedMonth
            || (this.state.selectedMonth !== prevState.selectedMonth) && this.state.selectedGroupId
            || (!this.props.schedule.isLoaded && this.state.selectedMonth && this.state.selectedGroupId)) {
            let date = new Date(this.state.selectedMonth);
            let from = date.toLocaleISOString();
            date.setDate(this.state.selectedMonth.daysInMonth());
            let to = date.toLocaleISOString();
            this.props.getSchedule(this.state.selectedGroupId, from, to);
            if (this.props.schedule.isEdit) {
                this.props.cancelEditSchedule();
            }
        }
    }

    onDateChange(e) {
        // console.log(e.target.value);
        let date = e.target.value;
        this.setState({
            selectedMonth: new Date(date),
            previousMonth: new Date(new Date(date).setMonth(new Date(date).getMonth() - 1)),
            nextMonth: new Date(new Date(date).setMonth(new Date(date).getMonth() + 1)),
        });
    }

    onSelectGroup(e) {
        let groupId = e.target.value;
        this.setState({
            selectedGroupId: groupId,
            isSelected: true,
            newSchedule: new Map()
        });
    }

    onEdit(e) {
        this.props.editSchedule();
    }

    toggleCallback(isOpen) {
        // console.log("togglecallback schedule");
        this.setState({isOpen: isOpen})
    }

    getNewStartTime(value) {
        // if (this.props.schedule.isEdit) {
        console.log("value", value);
        // console.log(this.state);
        let element = this.state.htmlElement;
        let tempScheduleOfGroup = new Map(this.state.editedScheduleOfGroup);
        // if (element) {
        console.log(tempScheduleOfGroup);
        switch (element.className) {
            case "table-warning":
                if (value.toDelete) {
                    element.className = "table-light";
                    tempScheduleOfGroup.delete(this.state.day);
                } else {
                    tempScheduleOfGroup.set(this.state.day, value.newStartTime);
                }
                break;
            case "table-info" :
                if (value.toDelete) {
                    element.className = "table-light";
                    tempScheduleOfGroup.delete(this.state.day);
                } else {
                    tempScheduleOfGroup.set(this.state.day, value.newStartTime);
                }
                break;
            case "table-light":
                element.className = "table-warning";
                tempScheduleOfGroup.set(this.state.day, value.newStartTime);
                break;
        }
        let tempMap = new Map(this.state.newSchedule);
        tempMap.set(this.state.day, {startTime: value.newStartTime, toDelete: value.toDelete});
        console.log(tempScheduleOfGroup);
        this.setState({
            newSchedule: tempMap,
            editedScheduleOfGroup: tempScheduleOfGroup,
            isOpen: false
        });
    }

    onClick(day, e) {
        // console.log("onclick");
        let elem = document.getElementById(day + "cell");
        // console.log(elem.className);
        if (this.props.schedule.isEdit) {
            let oldStartTime = this.state.newSchedule.get(day) ? this.state.newSchedule.get(day).startTime : this.state.scheduleOfGroup.get(day)
            this.setState({
                isOpen: true,
                htmlElement: elem,
                day: day,
                toDelete: false,
                oldStartTime: oldStartTime
            });
        }
        // if (this.props.schedule.isEdit) {
        //     let tempMap = this.state.newSchedule;
        //     if (elem.className === "table-warning") {
        //         elem.className = "table-light";
        //         tempMap.set(day, {toDelete: true, startTime: this.state.scheduleOfGroup.get(day)});
        //         this.setState({newSchedule: tempMap});
        //     } else if (elem.className === "table-info") {
        //         elem.className = "table-light";
        //         let answ = window.confirm("Вы уверены, что хотите удалить этот день из расписания?");
        //         if (answ) {
        //             tempMap.set(day, {toDelete: true, startTime: this.state.scheduleOfGroup.get(day)});
        //             this.setState({newSchedule: tempMap});
        //         }
        //     } else {
        //         let startTime = prompt("Введите время занятия в формате --:--");
        //         if (startTime) {
        //             elem.className = "table-warning";
        //             tempMap.set(day, {toDelete: false, startTime: startTime});
        //             this.setState({newSchedule: tempMap});
        //         }
        //     }
        // }
        // return <ModalSetStartTime/>
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

    getNewScheduleDay(value) {
        this.setState({newSchedule: value});
    }

    getSelectedGroupId(value) {
        this.setState({
            selectedGroupId: value,
            isSelected: true,
            newSchedule: new Map()
        });
    }

    getSelectedDate(value) {
        // this.setState({selectedGroupId: value});
        let previousMonth = new Date(new Date(value).setMonth(new Date(value).getMonth() - 1));
        this.setState({
            selectedMonth: new Date(value),
            previousMonth: previousMonth,
            nextMonth: new Date(new Date(value).setMonth(new Date(value).getMonth() + 1)),
        });
    };

    render() {
        // console.log("render");
        console.log("this.state", this.state);
        // console.log("this.props", this.props);
        // console.log("this.props.children", this.props.children);
        return (
            <div>
                <div className="schedule">
                    <ModalSetStartTime isOpen={this.state.isOpen}
                        // toggle={this.toggle}
                                       oldStartTime={this.state.oldStartTime}
                        // || this.state.newSchedule.get(this.state.day) ? this.state.newSchedule.get(this.state.day).startTime : null}
                                       toggleCallback={this.toggleCallback}
                                       getNewStartTime={this.getNewStartTime}
                                       toDelete={this.state.toDelete}/>
                    <h3>Расписание</h3>
                    <Form getSelectedGroupId={this.getSelectedGroupId} groups={this.props.group.groups}
                          getSelectedDate={this.getSelectedDate} isEdit={this.props.schedule.isEdit}/>
                    <EditSaveButtons
                        isLoaded={this.props.schedule.isLoaded && this.state.selectedGroupId && this.state.selectedMonth}
                        isEdit={this.props.schedule.isEdit}
                        onEdit={this.onEdit} onSave={this.onSave}/>
                    {this.props.schedule.isLoaded && this.state.selectedGroupId && this.state.selectedMonth ?
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
)
(Schedule);