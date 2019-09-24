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
            date: "",
            isSelected: false,
            newSchedule: []
        };
        // this.renderWeekSchedule = this.renderWeekSchedule.bind(this);
        // this.renderScheduleMenu = this.renderScheduleMenu.bind(this);
        this.renderWeekSchedule = this.renderWeekSchedule.bind(this);
        this.renderTableSchedule = this.renderTableSchedule.bind(this);
        this.renderTrueSchedule = this.renderTrueSchedule.bind(this);
        this.onDateChange = this.onDateChange.bind(this);
        this.onGroupChange = this.onGroupChange.bind(this);
        this.onEdit = this.onEdit.bind(this);
        this.onClick = this.onClick.bind(this);
        this.onSave = this.onSave.bind(this);
        this.onSelectGroup = this.onSelectGroup.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount(prevProps, prevState, snapshot) {
        console.log("did mount");
        // this.props.getSchedule();
        this.props.getAllGroups();
    }

    onDateChange(e) {
        // console.log(e.target.value);
        this.setState({
            date: new Date(e.target.value),
            isSelected: true
        });
        // this.props.getSchedule()
    }

    onGroupChange(e) {
        this.setState({groupId: e.target.value});
        // this.props.getSchedule()
    }

    onSubmit(e) {
        let date = new Date(this.state.date);
        console.log(date);
        let from = date.toISOString().slice(0, 10);
        date.setUTCDate(this.state.date.daysInMonth());
        // console.log(this.state.date.daysInMonth());
        // console.log(date);
        let to = date.toISOString().slice(0, 10);
        console.log(this.state.selectedGroup, from, to);
        this.props.getSchedule(this.state.selectedGroup, from, to);
    }

    onEdit(e) {
        e.preventDefault();
        let stateDate = new Date(this.state.date);
        let nowDate = new Date(Date.now());
        stateDate.setDate(nowDate.getDay());
        if (Date.parse(this.state.date) < Date.now()) {
            alert("Внимание! Вы пытаетесь изменить расписание группы за прошедший месяц. Это может привести к нежелательным последствиям.")
        }
        this.props.editSchedule();
    }

    onSave(e) {
        e.preventDefault();
        this.props.saveSchedule(this.state.groupId, this.state.newSchedule);
    }

    renderTableSchedule() {
        let size = this.props.groups.size;
        // console.log(size);
        let out = [];
        for (let i = 1; i <= size; i++) {
            //console.log(this.props.groups.get(i).weekSchedule.days);
            console.log(this.props.groups.get(i.toString()));
            out.push(<tr>
                <td>{this.props.groups.get(i.toString()).id}</td>
                {this.props.groups.get(i.toString()).weekSchedule.days !== null ?//week schedule must be not null
                    this.props.groups.get(i.toString()).weekSchedule.days.map(day => (
                        day ? <td>+</td> : <td>-</td>
                    )) : null}
            </tr>);
        }
        return (out);
    }

    renderWeekSchedule() {
        console.log('render-week-schedule');
        return (
            this.props.isLoaded ?
                <table className='table table-striped'>
                    <thead>
                    <tr>
                        <th>Группа</th>
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
                    {this.renderTableSchedule()}
                    </tbody>
                </table> : null)
    }

    onSelectGroup(e) {
        // console.log(e.target.value);
        this.setState({selectedGroup: e.target.value});
    }

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
                    <button
                        onClick={this.onEdit}
                        type="redact"
                        className="btn btn-info"
                    >Редактировать таблицу
                    </button>
                    {this.props.isEdit ?
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

    onClick(day) {
        // console.log(day);
        // document.getElementById(day).style.backgroundColor="rgba(144,147,150,0.6)";
        let elem = document.getElementById(day);
        if (elem.className === "selected-cell") {
            elem.className = "cell";
        } else {
            document.getElementById(day).className = "selected-cell";
        }
        let tempArr = this.state.newSchedule;
        let tempObj = {};
        let tempDate = new Date(this.state.date);
        // console.log(tempDate);
        let tempStr = tempDate.setUTCDate(day);
        // console.log(tempStr);
        tempObj.Date = new Date(tempStr).toISOString();
        let flag = false;
        tempArr.forEach((el, i) => {
            if (el.Date === tempObj.Date) {
                tempArr.splice(i, 1);
                flag = true;
            }
        });
        if (!flag) {
            tempArr.push(tempObj);
        }

        // console.log(tempArr);
        this.setState({newSchedule: tempArr});
    }

    renderTrueSchedule() {
        console.log("schedule props", this.props);
        let tableBody = [];
        let day = 1;
        let week = [];
        let flag = false;
        let weekSize = 7;
        // console.log(this.props.isEdit);
        let className = this.props.isEdit ? "editing-cell" : "cell";
        // let handler =(el)=> ;
        // console.log("render schedule", this.state.date);
        for (let i = 1; i < weekSize; i++) {
            if (this.state.date.getDay() === i) {
                flag = true;
                week.push(<td className={className} id={day} onClick={this.onClick.bind(this, day)}>{day++}</td>)
            }
            week.push(flag ? <td className={className} id={day} onClick={this.onClick.bind(this, day)}>{day++}</td> :
                <td className="cell">-</td>)
            // week.push(this.state.date.getDay() === i ? <td>{day++}</td> : <td>-</td>)
        }
        // console.log(this.state.date.daysInMonth());
        tableBody.push(<tr>{week}</tr>);
        for (let i = 0; day <= this.state.date.daysInMonth(); i++) {
            week = [];
            for (let j = 0; j < weekSize; j++) {
                if (day <= this.state.date.daysInMonth()) {
                    week.push(<td className={className} id={day} onClick={this.onClick.bind(this, day)}>{day++}</td>);
                } else {
                    week.push(<td className="cell">-</td>)
                }
            }
            tableBody.push(<tr>{week}</tr>)
        }

        return (
            <div className="schedule__true-schedule">
                <table className='table table-striped'>
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
                    {this.state.isSelected ? this.renderTrueSchedule() : null}
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