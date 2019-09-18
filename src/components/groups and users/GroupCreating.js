import React, {Component} from "react"
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {actionCreators} from "../../store/groupReducer";


class GroupCreating extends Component {

    constructor(props) {
        super(props);
        let tempMap = new Map();
        for (let i = 0; i < 7; i++) {
            tempMap.set(i + "cb", false);
        }
        this.state = {
            checkboxes: tempMap
        };
        this.onSaveGroup = this.onSaveGroup.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        this.props.getAllUsers();
    }

    onSaveGroup() {
        console.log('submit-group');
        let cash = {
            "name": "default",
            "duration": null,
            "cost": null,
            "days": [],
            "startTimes": []
        };
        cash.name = document.getElementById('groupName').value;
        cash.cost = document.getElementById('cost').value;
        cash.duration = document.getElementById("duration").value;
        for (let i = 0; i < document.getElementsByName("startTimes").length; i++) {
            cash.startTimes.push(document.getElementsByName("startTimes")[i].value)
        }
        for (let i = 0; i < document.getElementsByName("cbName").length; i++) {
            cash.days.push(document.getElementsByName("cbName")[i].checked)
        }
        this.props.createGroupSubmit(cash);
    }

    handleChange(e) {
        this.setState({checkboxes: this.state.checkboxes.set(e.target.id, e.target.checked)});
    }

    renderCheckBoxes() {
        let result = [];
        for (let i = 0; i < 7; i++) {
            result.push(<td>
                <form>
                    <input className="form-check-input"
                           type="checkbox"
                           onChange={this.handleChange}
                           id={i + "cb"}
                           name="cbName"
                           aria-label="..."/>
                </form>
            </td>)
        }
        return result;
    }

    renderStartTimeInputs() {
        let result = [];
        for (let i = 0; i < 7; i++) {
            result.push(<td>
                <input
                    className="form-control cell"
                    type="time"
                    id={i + "stForm"}
                    name="startTimes"
                    disabled={!this.state.checkboxes.get(i + "cb")}
                />
            </td>)
        }
        return result;
    }

    render() {
        return (<div className="container-fluid">
                <div>
                    <form className="form-inline">
                        <label htmlFor="example-text-input"
                               className="col-xs-4 col-form-label">Название</label>
                        <div className="col-xs-10">
                            <input className="form-control"
                                   type="text"
                                   placeholder="Введите название"
                                   id='groupName'
                            />
                        </div>
                    </form>
                    <form className="form-inline">
                        <label htmlFor="example-text-input"
                               className="col-xs-2 col-form-label">Цена за
                            занятие</label>
                        <div className="col-xs-10">
                            <input className="form-control"
                                   type="number"
                                   placeholder="Цена за занятие"
                                   id='cost'
                            />
                        </div>
                    </form>
                    <form className="form-inline">
                        <label htmlFor="example-text-input"
                               className="col-xs-4 col-form-label">Продолжительность
                            занятия</label>
                        <div className="col-xs-10">
                            <input className="form-control"
                                   type="number"
                                   placeholder="Продолжительность (в мин.)"
                                   id='duration'
                            />
                        </div>
                    </form>
                </div>
                < label
                    htmlFor="example-text-input"
                    className="col-xs-2 col-form-label"> Расписание
                    :</label>
                <div className="create-group__schedule-table">
                    <table className='table table-striped table-bordered'>
                        <thead>
                        <tr>
                            <th>ПН</th>
                            <th>ВТ</th>
                            <th>СР</th>
                            <th>ЧТ</th>
                            <th>ПТ</th>
                            <th>СБ</th>
                            <th>ВС</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            {this.renderCheckBoxes()}
                        </tr>
                        <tr>
                            {this.renderStartTimeInputs()}
                        </tr>
                        </tbody>
                    </table>
                </div>
                <div>
                    <Link className='btn btn-success' onClick={this.onSaveGroup}
                          to='/groups/group_list'>Сохранить</Link>
                </div>
            </div>
        )
    }
}


export default connect(
    state => state.group,
    dispatch => bindActionCreators(actionCreators, dispatch)
)(GroupCreating);