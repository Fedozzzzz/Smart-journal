import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import "../../css/Schedule.css"
import {scheduleActionCreators} from "../../store/reducers/scheduleReducer";
import {groupActionCreators} from "../../store/reducers/groupReducer";
import Form from "../Form"


// eslint-disable-next-line no-extend-native
Date.prototype.daysInMonth = function () {
    return 32 - new Date(this.getFullYear(), this.getMonth(), 32).getDate();
};

class Schedule extends Component {

    constructor(props, ctx) {
        super(props, ctx);
        this.state = {
            selectedGroupId: null,
            currentMonth: new Date(),
            previousMonth: new Date(),
            date: String(),
            // nextMonth
            isSelected: false,
            newSchedule: new Map()
        };
        this.renderForm = this.renderForm.bind(this);
        this.renderTrueSchedule = this.renderTrueSchedule.bind(this);
        this.onDateChange = this.onDateChange.bind(this);
        this.onEdit = this.onEdit.bind(this);
        this.onSave = this.onSave.bind(this);
        this.onSelectGroup = this.onSelectGroup.bind(this);
        // this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount(prevProps, prevState, snapshot) {
        console.log("did mount");
        // this.props.getSchedule();
        this.props.getAllGroups();
    }


    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.schedule.schedule !== prevProps.schedule.schedule) {
            let scheduleOfGroup = new Map();
            // let scheduleArr = new Map();
            this.props.schedule.schedule.map((day) => {
                // scheduleArr.set(new Date(day.date).getDate(), {toDelete: false, startTime: day.startTime});
                scheduleOfGroup.set(new Date(day.date).getDate(), day.startTime);
            });
            this.setState({
                scheduleOfGroup: scheduleOfGroup,
                // newSchedule: scheduleArr,
                // scheduleArr: scheduleArr
            });
        }
        // console.log(this.state.currentMonth !== prevState.currentMonth);
        // console.log("isLoaded?", this.props.schedule.isLoaded);
        if ((this.state.selectedGroupId !== prevState.selectedGroupId) && this.state.currentMonth
            || (this.state.currentMonth !== prevState.currentMonth) && this.state.selectedGroupId
            || (!this.props.schedule.isLoaded && this.state.currentMonth && this.state.selectedGroupId)) {
            let date = new Date(this.state.currentMonth);
            console.log(date);
            let from = date.toISOString().slice(0, 10);
            date.setUTCDate(this.state.currentMonth.daysInMonth());
            let to = date.toISOString().slice(0, 10);
            console.log(this.state.selectedGroupId, from, to);
            this.props.getSchedule(this.state.selectedGroupId, from, to);
        }
        // console.log(this.state);
    }

    onDateChange(e) {
        console.log(e.target.value);
        if (this.state.newSchedule.size) {
            if (window.confirm("Внимание!!! Предыдущие действия не сохранятся! Вы уверены, что хотите продолжить?")) {
                this.setState({
                    currentMonth: new Date(e.target.value),
                    previousMonth: new Date(new Date(e.target.value).setMonth(new Date(e.target.value).getMonth() - 1)),
                    nextMonth: new Date(new Date(e.target.value).setMonth(new Date(e.target.value).getMonth() + 1)),
                });
            }
            // else {
            //     this.setState({
            //         currentMonth: new Date(new Date(e.target.value).setMonth(new Date(e.target.value).getMonth() - 1))
            //     });
            // }
        } else {
            this.setState({
                currentMonth: new Date(e.target.value),
                previousMonth: new Date(new Date(e.target.value).setMonth(new Date(e.target.value).getMonth() - 1)),
                nextMonth: new Date(new Date(e.target.value).setMonth(new Date(e.target.value).getMonth() + 1)),
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

    // onSubmit(e) {
    //     this.setState({
    //         currentMonth: new Date(this.state.date),
    //         previousMonth: new Date(new Date(this.state.date).setMonth(new Date(this.state.date).getMonth() - 1)),
    //         nextMonth: new Date(new Date(this.state.date).setMonth(new Date(this.state.date).getMonth() + 1)),
    //         isSelected: true
    //     });
    //     let date = new Date(this.state.date);
    //     console.log(date);
    //     let from = date.toISOString().slice(0, 10);
    //     date.setUTCDate(this.state.currentMonth.daysInMonth());
    //     let to = date.toISOString().slice(0, 10);
    //     console.log(this.state.selectedGroupId, from, to);
    //     this.props.getSchedule(this.state.selectedGroupId, from, to);
    // }

    onEdit(e) {
        // e.preventDefault();
        // let stateDate = new Date(this.state.date);
        // let nowDate = new Date(Date.now());
        // stateDate.setDate(nowDate.getDay());
        // if (Date.parse(this.state.date) < Date.now()) {
        //     alert("Внимание! Вы пытаетесь изменить расписание группы за прошедший месяц. Это может привести к нежелательным последствиям.")
        // }
        this.props.editSchedule();
    }

    onClick(day) {
        console.log("onclick");
        let elem = document.getElementById(day + "cell");
        // console.log(elem.className);
        if (this.props.schedule.isEdit) {
            let tempMap = this.state.newSchedule;
            if (elem.className === "selected-cell") {
                elem.className = "cell";
                // let tempForm = document.createElement("form");
                // tempMap.delete(day);
                tempMap.set(day, {toDelete: true, startTime: this.state.scheduleOfGroup.get(day)});
                this.setState({newSchedule: tempMap});
            } else {
                let startTime = prompt("Введите время занятия в формате --:--");
                // console.log(startTime);
                if (startTime) {
                    elem.className = "selected-cell";
                    tempMap.set(day, {toDelete: false, startTime: startTime});
                    this.setState({newSchedule: tempMap});
                }
                // this.setState({newSchedule: tempMap});
            }
        }
    }

    onSave(e) {
        let data = [];
        let currDate = new Date(this.state.currentMonth);
        this.state.newSchedule.forEach((value, key) => {
            let obj = {};
            currDate.setDate(key);
            obj.date = currDate.toISOString();
            obj.startTime = value.startTime;
            obj.toDelete = value.toDelete;
            data.push(obj);
        });
        console.log(data);
        this.props.saveSchedule(this.state.selectedGroupId, data);
        this.setState({newSchedule: new Map()});
    }

    renderForm() {
        // console.log("form state", this.state.currentMonth.toISOString().slice(0, 7));
        // let value = this.state.currentMonth.toISOString().slice(0, 7);
        return (
            <div className="container">
                <div className="form">
                    <form>
                        <div className="form-group">
                            <label htmlFor="exampleMonth" className="label_month">Месяц</label>
                            <input
                                type="month"
                                className="form-control"
                                id="exampleMonth"
                                aria-describedby="monthHelp"
                                placeholder="Введите месяц"
                                // value={this.state.currentMonth.toISOString().slice(0, 10)}
                                value={this.state.currentMonth.toISOString().slice(0, 7)}
                                // defaultValue={this.state.currentMonth.dateString}
                                onChange={this.onDateChange}
                            />
                        </div>
                        {/*<div className="form-group">*/}
                        {/*    <label htmlFor="exampleGroup">№ Группы</label>*/}
                        {/*    <input type="number"*/}
                        {/*           className="form-control"*/}
                        {/*           id="exampleGroup"*/}
                        {/*           aria-describedby="groupHelp"*/}
                        {/*           placeholder="Введите № группы"*/}
                        {/*           value={this.state.groupId}*/}
                        {/*           onChange={this.onGroupChange}*/}
                        {/*    />*/}
                        {/*</div>*/}
                        <select className="custom-select" onChange={this.onSelectGroup}
                                value={this.state.selectedGroupId}>
                            <option selected>Выберите группу</option>
                            {this.props.group.groups.map(group => (
                                <option value={group.guid}>{group.name}</option>
                            ))}
                        </select>
                    </form>
                </div>
                <div className="buttons">
                    {/*<button*/}
                    {/*    onClick={this.onSubmit}*/}
                    {/*    type="submit"*/}
                    {/*    className="btn btn-primary"*/}
                    {/*>Принять*/}
                    {/*</button>*/}
                    {this.props.schedule.schedule ?
                        <button
                            onClick={this.onEdit}
                            type="redact"
                            className="btn btn-info"
                        >Редактировать таблицу
                        </button> : null}
                    {this.props.schedule.isEdit ?
                        <button
                            onClick={this.onSave}
                            type="save"
                            className="btn btn-success"
                        >Сохранить
                        </button> : null
                    }
                </div>
            </div>
        )
    }

    renderTrueSchedule() {
        console.log("state", this.state.scheduleOfGroup);
        let weekSize = 7;
        let tableBody = [];
        let week = [];
        let beginOfWeek = this.state.currentMonth.getDay() || 7;
        let daysInPreviousMonth = this.state.previousMonth.daysInMonth() - beginOfWeek + 1;
        let endOfTable = 42;
        let daysInNextMonth = 1;
        let day = 0;
        if (this.state.scheduleOfGroup) {
            for (let i = 1; i < endOfTable + 1; i++) {
                if (i < beginOfWeek) {
                    week.push(<td className="opacity-cell">
                        <div>{++daysInPreviousMonth}</div>
                        <p>{null}</p>
                    </td>);
                } else {
                    let className = this.state.scheduleOfGroup.has(day + 1) ? "selected-cell" : "cell";
                    console.log(className);
                    week.push(day < this.state.currentMonth.daysInMonth() ?
                        <td className={className} onClick={this.onClick.bind(this, day + 1)} id={day + 1 + "cell"}>
                            <div>{++day}</div>
                            <p>{this.state.scheduleOfGroup.has(day) ? this.state.scheduleOfGroup.get(day)
                                : this.state.newSchedule.has(day) ? this.state.newSchedule.get(day).startTime : null}</p>
                        </td> :
                        <td className="opacity-cell">
                            <div>{daysInNextMonth++}</div>
                            <p>{null}</p>
                        </td>);
                    if (i % weekSize === 0 || i === endOfTable) {
                        tableBody.push(<tr>{week}</tr>);
                        week = [];
                    }
                }
            }
        }
        // console.log(tableBody);
        return (
            <div className="schedule__true-schedule">
                <table className='table table-striped table-bordered'>
                    <thead>
                    <tr>
                        <th>Пн</th>
                        <th>Вт</th>
                        <th>Ср</th>
                        <th>Чт</th>
                        <th>Пт</th>
                        <th>Сб</th>
                        <th>Вс</th>
                    </tr>
                    </thead>
                    <tbody>
                    {tableBody}
                    </tbody>
                </table>
            </div>
        )
    }

    render() {
        // console.log("render");
        console.log("this.state", this.state);
        // console.log("this.props", this.props);
        return (
            <div>
                <div className="schedule">
                    <h3>Расписание</h3>
                    {this.renderForm()}
                    {/*<Form handlers={this}/>*/}
                    {this.props.schedule.schedule ? this.renderTrueSchedule() : null}
                </div>
            </div>
        );
    }
}


// renderTableSchedule() {
//     let size = this.props.groups.size;
//     // console.log(size);
//     let out = [];
//     for (let i = 1; i <= size; i++) {
//         //console.log(this.props.groups.get(i).weekSchedule.days);
//         console.log(this.props.groups.get(i.toString()));
//         out.push(<tr>
//             <td>{this.props.groups.get(i.toString()).id}</td>
//             {this.props.groups.get(i.toString()).weekSchedule.days !== null ?//week schedule must be not null
//                 this.props.groups.get(i.toString()).weekSchedule.days.map(day => (
//                     day ? <td>+</td> : <td>-</td>
//                 )) : null}
//         </tr>);
//     }
//     return (out);
// }
//
// renderWeekSchedule() {
//     console.log('render-week-schedule');
//     return (
//         this.props.isLoaded ?
//             <table className='table table-striped'>
//                 <thead>
//                 <tr>
//                     <th>Группа</th>
//                     <th>Пн</th>
//                     <th>Вт</th>
//                     <th>Ср</th>
//                     <th>Чт</th>
//                     <th>Пт</th>
//                     <th>Сб</th>
//                     <th>Вс</th>
//                 </tr>
//                 </thead>
//                 <tbody>
//                 {this.renderTableSchedule()}
//                 </tbody>
//             </table> : null)
// }

export default connect(
    state => {
        return {
            schedule: state.schedule,
            group: state.group
        }
    },
    dispatch => bindActionCreators(Object.assign({}, scheduleActionCreators, groupActionCreators), dispatch)
)(Schedule);