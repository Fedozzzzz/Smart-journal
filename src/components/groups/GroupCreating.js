import React, {Component} from "react"
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {userActionCreators} from "../../store/reducers/userReducer";
import {groupActionCreators} from "../../store/reducers/groupReducer";
import AddUserToGroup from "./AddUserToGroup";


class GroupCreating extends Component {

    constructor(props) {
        super(props);
        let tempCbMap = new Map();
        let tempStMap = new Map();
        for (let i = 0; i < 7; i++) {
            tempCbMap.set(i + "cb", false);
            tempStMap.set(i + "stForm", null);
        }
        this.state = {
            checkboxes: tempCbMap,
            stInputs: tempStMap,
            chosenUsers: [],
            data: {
                name: null,
                duration: null,
                cost: null,
                days: [],
                startTimes: []
            }
        };
        this.onSaveGroup = this.onSaveGroup.bind(this);
        this.handleCheckboxesChange = this.handleCheckboxesChange.bind(this);
        this.handleUsersChange = this.handleUsersChange.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleStartTimesInputsChange = this.handleStartTimesInputsChange.bind(this);
    }

    componentDidMount() {
        this.props.getAllUsers();
    }

    // onSaveGroup() {
    //     // console.log('submit-group');
    //     let cash = {
    //         "name": "default",
    //         "duration": null,
    //         "cost": null,
    //         "days": [],
    //         "startTimes": []
    //     };
    //     cash.name = document.getElementById('groupName').value;
    //     cash.cost = document.getElementById('cost').value;
    //     cash.duration = document.getElementById("duration").value;
    //     for (let i = 0; i < document.getElementsByName("startTimes").length; i++) {
    //         cash.startTimes.push(document.getElementsByName("startTimes")[i].value)
    //     }
    //     for (let i = 0; i < document.getElementsByName("cbName").length; i++) {
    //         cash.days.push(document.getElementsByName("cbName")[i].checked)
    //     }
    //     this.props.createGroupSubmit(cash);
    //     this.props.history.goBack();
    // }

    onSaveGroup() {
        let tempArr = [];
        let data = Object.assign({}, this.state.data);
        this.state.checkboxes.forEach((v) => {
            tempArr.push(v);
        });
        data.days = tempArr;
        tempArr = [];
        this.state.stInputs.forEach((v) => {
            tempArr.push(v);
        });
        data.startTimes = tempArr;
        console.log(data);
        this.props.createGroupSubmit(data);
        this.props.history.goBack();
    }

    componentWillUnmount() {
        // console.log("will unmount this.props ", this.props.group);
        let data = [];
        this.state.chosenUsers.forEach((value, key) => {
            data.push(key);
        });
        this.props.addUsersToGroup(data)
        // this.props.addUsersToGroupSubmit(this.props.newGroup.guid, data);
    }

    handleCheckboxesChange(e) {
        this.setState({checkboxes: this.state.checkboxes.set(e.target.id, e.target.checked)});
    }

    handleInputChange(e) {

        // console.log(e.target);
        let temp = Object.assign({}, this.state.data);
        switch (e.target.id) {
            case 'groupName':
                temp.name = e.target.value;
                // this.setState({data: this.state.})
                break;
            case 'cost':
                temp.cost = e.target.value;
                // this.setState({surname: e.target.value});
                break;
            case 'duration':
                temp.duration = e.target.value;
                // this.setState({patronymic: e.target.value});
                break;
            // case "email-input":
            //     this.setState({email: e.target.value});
            //     break;
            // case "tel-input":
            //     this.setState({phoneNumber: e.target.value});
            //     break;
        }
        this.setState({data: temp});
    }

    handleStartTimesInputsChange(e) {
        this.setState({stInputs: this.state.stInputs.set(e.target.id, e.target.value)});
    }

    renderCheckBoxes() {
        let result = [];
        for (let i = 0; i < 7; i++) {
            result.push(<td>
                <form>
                    <input className="form-check-input"
                           type="checkbox"
                           onChange={this.handleCheckboxesChange}
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
                    onChange={this.handleStartTimesInputsChange}
                />
            </td>)
        }
        return result;
    }

    handleUsersChange(e) {
        // console.log("check before: ", this.state);
        // console.log("e.target.id", e.target.id);
        // console.log("e.target.id", e.target.checked);
        let tempMap = new Map(this.state.chosenUsers);
        if (e.target.checked) {
            tempMap.set(e.target.id, 0);
            // console.log(tempMap);
            this.setState({chosenUsers: tempMap});
        } else {
            tempMap.delete(e.target.id);
            this.setState({chosenUsers: tempMap})
        }
        // console.log("check: ", this.state.chosenUsers);
    }

    render() {
        // console.log("this.state", this.state);

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
                                   onChange={this.handleInputChange}
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
                                   onChange={this.handleInputChange}
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
                                   onChange={this.handleInputChange}
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
                    {this.props.user.users ? <div>
                        <h5>Добавьте студентов в группу:</h5>
                        {this.props.user.users.map(user => (<div className="form-inline">
                            <Link to={`/users/user_${user.guid}`}>
                                {user.name} {user.surname} {user.patronymic}</Link>
                            < div className="form-check">
                                < input className="form-check-input"
                                        type="checkbox"
                                        value=""
                                        onChange={this.handleUsersChange}
                                        id={user.guid}
                                />
                            </div>
                        </div>))}
                    </div> : null}
                </div>
                <div>
                    <button className='btn btn-success'
                            onClick={this.onSaveGroup}
                        // to='/groups/group_list'
                    >Сохранить
                    </button>
                </div>
            </div>
        )
    }
}

export default connect(
    state => {
        return {
            group: state.group,
            user: state.user
        }
    },
    dispatch => bindActionCreators(Object.assign({}, groupActionCreators, userActionCreators), dispatch)
)(GroupCreating);