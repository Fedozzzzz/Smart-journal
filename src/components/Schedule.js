import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {actionCreators} from "../store/scheduleReducer";
import {Link,Switch,Route} from "react-router-dom"
import "../css/Schedule.css"

// eslint-disable-next-line no-extend-native
Date.prototype.daysInMonth = function() {
    return 32 - new Date(this.getFullYear(), this.getMonth(), 32).getDate();
};

class Schedule extends Component {

    constructor(props, ctx) {
        super(props, ctx);
        this.state = {
            date: '',
            groupId: '',
            isSelected: false,
            newSchedule: []
        };
        this.renderWeekSchedule = this.renderWeekSchedule.bind(this);
        this.renderScheduleMenu = this.renderScheduleMenu.bind(this);
        this.renderWeekSchedule = this.renderWeekSchedule.bind(this);
        this.renderTableSchedule = this.renderTableSchedule.bind(this);
        this.onDateChange = this.onDateChange.bind(this);
        this.onGroupChange = this.onGroupChange.bind(this);
        this.onEdit = this.onEdit.bind(this);
        this.onClick = this.onClick.bind(this);
        this.onSave = this.onSave.bind(this);
    }

    componentDidMount(prevProps, prevState, snapshot) {
        console.log("did mount");
        this.props.initSchedule();
    }

    onDateChange(e) {
        this.setState({
            date: new Date(e.target.value),
            isSelected: true
        });
        this.props.initSchedule()
    }

    onGroupChange(e) {
        this.setState({groupId: e.target.value});
        this.props.initSchedule()
    }

    onSubmit(e) {
        e.preventDefault();
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
                        <div className="form-group">
                            <label htmlFor="exampleGroup">№ Группы</label>
                            <input type="number"
                                   className="form-control"
                                   id="exampleGroup"
                                   aria-describedby="groupHelp"
                                   placeholder="Введите № группы"
                                   value={this.state.groupId}
                                   onChange={this.onGroupChange}
                            />
                        </div>
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
        // console.log(this.state);

        // console.log(this.state.date.toString());
        // console.log(document.getElementById(day).className);
    }

    renderTrueSchedule() {
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

    renderScheduleMenu() {
        // console.log(this.state.date);
        return (
            <div className="schedule">
                <h1>Schedule</h1>
                {this.renderForm()}
                {this.state.isSelected ? this.renderTrueSchedule() : null}
                {/*<Link to='/schedule/true_schedule'>True Schedule</Link>*/}
                <Link to='/schedule/week_schedule'>Week Schedule</Link>
            </div>
        )
    }

    render() {
        // console.log("render");
        // console.log(this.props.isEdit);
        return (
            <div>
                <Switch>
                    <Route exact path='/schedule' render={this.renderScheduleMenu}/>
                    <Route path='/schedule/true_schedule' render={this.renderTrueSchedule}/>
                    <Route path='/schedule/week_schedule' render={this.renderWeekSchedule}/>
                </Switch>
            </div>
        );
    }
}

// function renderSchedule(props) {
//     let size = props.groups.length;
//     console.log(size);
//     let out = [];
//     for (let i = 0; i < size; i++) {
//         console.log(props.groups.get(i).weekSchedule.days);
//         out.push(<tr>
//             <td>{props.groups.get(i).id}</td>
//             {props.groups.get(i).weekSchedule.days.map(day => (
//                 day ? <td>+</td> : <td>-</td>
//             ))}
//         </tr>);
//     }
//     return (
//         <tbody>
//         {out}
//         </tbody>
//     );
// }

export default connect(
    state=> state.schedule,
    dispatch=>bindActionCreators(actionCreators,dispatch)
)(Schedule);