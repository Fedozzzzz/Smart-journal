import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
// import {actionCreators} from "../../store/reducers/scheduleReducer";
// import {Route} from "react-router-dom"
// import {Link} from "react-router-dom";
import "../../css/Schedule.css"
import {scheduleActionCreators} from "../../store/reducers/scheduleReducer";
import {groupActionCreators, groupReducer} from "../../store/reducers/groupReducer";

// eslint-disable-next-line no-extend-native
Date.prototype.daysInMonth = function () {
    return 32 - new Date(this.getFullYear(), this.getMonth(), 32).getDate();
};

class Schedule extends Component {

    constructor(props, ctx) {
        super(props, ctx);
        this.state = {
            selectedGroup: null,
            currentMonth: new Date(),
            previousMonth: new Date(),
            date: String(),
            // nextMonth
            isSelected: false,
            newSchedule: []
        };
        // this.renderWeekSchedule = this.renderWeekSchedule.bind(this);
        // this.renderScheduleMenu = this.renderScheduleMenu.bind(this);
        // this.renderWeekSchedule = this.renderWeekSchedule.bind(this);
        // this.renderTableSchedule = this.renderTableSchedule.bind(this);
        this.renderTrueSchedule = this.renderTrueSchedule.bind(this);
        this.onDateChange = this.onDateChange.bind(this);
        // this.onGroupChange = this.onGroupChange.bind(this);
        // this.onEdit = this.onEdit.bind(this);
        // this.onClick = this.onClick.bind(this);
        // this.onSave = this.onSave.bind(this);
        this.onSelectGroup = this.onSelectGroup.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount(prevProps, prevState, snapshot) {
        console.log("did mount");
        // this.props.getSchedule();
        this.props.getAllGroups();
    }


    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.schedule.schedule !== prevProps.schedule.schedule) {
            let scheduleOfGroup = new Map;
            this.props.schedule.schedule.map((day) => {
                // console.log(new Date(day.date).getDate());
                // scheduleOfGroup.push(new Date(day.date).getDate());
                scheduleOfGroup.set(new Date(day.date).getDate(), day.startTime);
            });
            this.setState({scheduleOfGroup: scheduleOfGroup});
        }
        // console.log(this.state);
    }

    onDateChange(e) {
        this.setState({date: new Date(e.target.value)});
    }

    onSelectGroup(e) {
        // console.log(e.target.value);
        this.setState({selectedGroup: e.target.value});
    }

    onSubmit(e) {
        this.setState({
            currentMonth: new Date(this.state.date),
            previousMonth: new Date(new Date(this.state.date).setMonth(new Date(this.state.date).getMonth() - 1)),
            nextMonth: new Date(new Date(this.state.date).setMonth(new Date(this.state.date).getMonth() + 1)),
            isSelected: true
        });
        let date = new Date(this.state.date);
        console.log(date);
        let from = date.toISOString().slice(0, 10);
        date.setUTCDate(this.state.currentMonth.daysInMonth());
        let to = date.toISOString().slice(0, 10);
        console.log(this.state.selectedGroup, from, to);
        this.props.getSchedule(this.state.selectedGroup, from, to);
    }

    // onEdit(e) {
    //     e.preventDefault();
    //     let stateDate = new Date(this.state.date);
    //     let nowDate = new Date(Date.now());
    //     stateDate.setDate(nowDate.getDay());
    //     if (Date.parse(this.state.date) < Date.now()) {
    //         alert("Внимание! Вы пытаетесь изменить расписание группы за прошедший месяц. Это может привести к нежелательным последствиям.")
    //     }
    //     this.props.editSchedule();
    // }
    //
    // onSave(e) {
    //     e.preventDefault();
    //     this.props.saveSchedule(this.state.groupId, this.state.newSchedule);
    // }

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

    renderForm() {
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
                                value={this.state.date.dateString}
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
                        <select className="custom-select" onChange={this.onSelectGroup}>
                            <option selected>Выберите группу</option>
                            {this.props.group.groups.map(group => (
                                <option value={group.guid}>{group.name}</option>
                            ))}
                        </select>
                    </form>
                </div>
                <div className="buttons">
                    <button
                        onClick={this.onSubmit}
                        type="submit"
                        className="btn btn-primary"
                    >Принять
                    </button>
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

    // onClick(day) {
    //     // console.log(day);
    //     // document.getElementById(day).style.backgroundColor="rgba(144,147,150,0.6)";
    //     let elem = document.getElementById(day);
    //     if (elem.className === "selected-cell") {
    //         elem.className = "cell";
    //     } else {
    //         document.getElementById(day).className = "selected-cell";
    //     }
    //     let tempArr = this.state.newSchedule;
    //     let tempObj = {};
    //     let tempDate = new Date(this.state.date);
    //     // console.log(tempDate);
    //     let tempStr = tempDate.setUTCDate(day);
    //     // console.log(tempStr);
    //     tempObj.Date = new Date(tempStr).toISOString();
    //     let flag = false;
    //     tempArr.forEach((el, i) => {
    //         if (el.Date === tempObj.Date) {
    //             tempArr.splice(i, 1);
    //             flag = true;
    //         }
    //     });
    //     if (!flag) {
    //         tempArr.push(tempObj);
    //     }
    //
    //     // console.log(tempArr);
    //     this.setState({newSchedule: tempArr});
    // }
    //
    // renderTrueSchedule() {
    //     console.log("schedule props", this.props);
    //     console.log("render schedule");
    //     // let scheduleOfGroup = [];
    //     // if (this.props.schedule.schedule) {
    //     //     this.props.schedule.schedule.map((day) => {
    //     //         console.log(new Date(day.date).getDate());
    //     //     })
    //     // }
    //     let tableBody = [];
    //     let day = 1;
    //     let week = [];
    //     let flag = false;
    //     let weekSize = 7;
    //     // console.log(this.props.isEdit);
    //     let className = this.props.schedule.schedule.isEdit ? "editing-cell" : "cell";
    //     // let handler =(el)=> ;
    //     // console.log("render schedule", this.state.date);
    //     for (let i = 1; i < weekSize; i++) {
    //         if (this.state.date.getDay() === i) {
    //             flag = true;
    //             week.push(<td className={className} id={day} onClick={this.onClick.bind(this, day)}>{day++}</td>)
    //         }
    //         week.push(flag ? <td className={className} id={day} onClick={this.onClick.bind(this, day)}>{day++}</td> :
    //             <td className="cell">-</td>)
    //         // week.push(this.state.date.getDay() === i ? <td>{day++}</td> : <td>-</td>)
    //     }
    //     // console.log(this.state.date.daysInMonth());
    //     tableBody.push(<tr>{week}</tr>);
    //     for (let i = 0; day <= this.state.date.daysInMonth(); i++) {
    //         week = [];
    //         for (let j = 0; j < weekSize; j++) {
    //             if (day <= this.state.date.daysInMonth()) {
    //                 week.push(<td className={className} id={day} onClick={this.onClick.bind(this, day)}>{day++}</td>);
    //             } else {
    //                 week.push(<td className="cell">-</td>)
    //             }
    //         }
    //         tableBody.push(<tr>{week}</tr>)
    //     }
    //
    //     return (
    //         <div className="schedule__true-schedule">
    //             <table className='table table-striped'>
    //                 <thead>
    //                 <tr>
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
    //                 {tableBody}
    //                 </tbody>
    //             </table>
    //         </div>
    //     )
    // }

    renderTrueSchedule() {
        console.log("state", this.state.scheduleOfGroup);
        // if(this.state.entries("scheduleOfGroup"))
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
                    week.push(<td className="opacity-cell">{daysInPreviousMonth++}</td>);
                } else {
                    week.push(day < this.state.currentMonth.daysInMonth() ?
                        <td className={this.state.scheduleOfGroup.has(day) ? "selected-cell" : "cell"}>{++day}</td> :
                        <td className="opacity-cell">{daysInNextMonth++}</td>);
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
        // console.log(this.state);
        return (
            <div>
                <div className="schedule">
                    <h3>Расписание</h3>
                    {this.renderForm()}
                    {this.props.schedule.schedule ? this.renderTrueSchedule() : null}
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