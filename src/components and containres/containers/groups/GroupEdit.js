import React, {Component} from "react"
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {Link} from "react-router-dom";
import AddUserToGroup from "./AddUserToGroup";
import Loading from "../../components/Loading";
import {groupActionCreators} from "../../../store/redux/groups/actionCreators";
import {userActionCreators} from "../../../store/redux/users/actionCreators";

class GroupEdit extends Component {

    constructor(props) {
        super(props);
        let tempCbMap = new Map();
        let tempStMap = new Map();
        for (let i = 0; i < 7; i++) {
            tempCbMap.set(i + "cbEdit", false);
            tempStMap.set(i + "stFormEdit", null);
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
        this.onSaveEditGroup = this.onSaveEditGroup.bind(this);
        this.onDeleteUserFromGroup = this.onDeleteUserFromGroup.bind(this);
        this.renderCheckBoxes = this.renderCheckBoxes.bind(this);
        this.renderStartTimeInputs = this.renderStartTimeInputs.bind(this);
        this.handleCheckboxesChange = this.handleCheckboxesChange.bind(this);
        this.handleStartTimesInputsChange = this.handleStartTimesInputsChange.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleUsersChange = this.handleUsersChange.bind(this);
    }

    componentDidMount() {
        this.props.getGroupById(this.props.groupId);
        this.props.getUsersFromGroup(this.props.groupId);
        this.props.getAllUsers();
    }

    componentWillReceiveProps(nextProps, nextContext) {
        // console.log("WillReceiveProps");
        if (this.props.group.groupById) {
            let tempCbMap = new Map();
            let tempStMap = new Map();
            for (let i = 0; i < 7; i++) {
                tempCbMap.set(i + "cbEdit", this.props.group.groupById.days[i]);
                tempStMap.set(i + "stFormEdit", this.props.group.groupById.startTimes[i]);
            }
            // console.log(tempStMap, tempCbMap);
            this.setState({
                    checkboxes: tempCbMap,
                    stInputs: tempStMap,
                    data: {
                        name: this.props.group.groupById.name || null,
                        duration: this.props.group.groupById.duration || null,
                        cost: this.props.group.groupById.cost || null,
                        days: this.props.group.groupById.days || [],
                        startTimes: this.props.group.groupById.startTimes || []
                    }
                }
            )
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log("did-update");
        // if (this.props.groupById !== prevProps.groupById) {
        //     let tempMap = new Map();
        //     for (let i = 0; i < 7; i++) {
        //         tempMap.set(i + "cbEdit", this.props.groupById.days[i]);
        //     }
        //     this.setState({
        //         checkboxes: tempMap
        //     });
        // }

        // if (this.props.group.usersFromGroup !== prevProps.group.usersFromGroup) {
        //     this.props.getUsersFromGroup(this.props.groupId);
        // }

        if (!this.props.group.isLoaded) {
            this.props.getUsersFromGroup(this.props.groupId);
        }
        console.log(this.props.group.usersFromGroup);
        console.log(prevProps.group.usersFromGroup);
    }

    // onSaveEditGroup() {
    //     let cash = {
    //         "name": "default",
    //         "duration": null,
    //         "cost": null,
    //         "days": [],
    //         "startTimes": []
    //     };
    //     cash.name = document.getElementById('editedGroupName').value || this.props.group.groupById.name;
    //     cash.cost = document.getElementById('editedCost').value || this.props.group.groupById.cost;
    //     cash.duration = document.getElementById("editedDuration").value;
    //     for (let i = 0; i < document.getElementsByName("startTimes").length; i++) {
    //         cash.startTimes.push(document.getElementsByName("startTimes")[i].value)
    //     }
    //     for (let i = 0; i < document.getElementsByName("cbNameEdit").length; i++) {
    //         cash.days.push(document.getElementsByName("cbNameEdit")[i].checked)
    //     }
    //     cash.duration = 0;
    //     // console.log("group-data: ", cash);
    //     this.props.editGroupSubmit(this.props.groupId, cash);
    //     this.props.history.goBack();
    //     // let users;//add user to group
    //     //this.props.addUserToGroup();
    // }

    onSaveEditGroup() {
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
        for (let i = 0; i < 7; i++) {
            if (!data.days[i]) {
                data.startTimes[i] = null;
            }
        }
        console.log(data);
        this.props.editGroupSubmit(this.props.groupId, data);
        data = [];
        this.state.chosenUsers.forEach((value, key) => {
            data.push(key);
        });
        this.props.addUsersToGroupSubmit(this.props.groupId, data);
        this.props.history.goBack();
    }

    handleCheckboxesChange(e) {
        this.setState({checkboxes: this.state.checkboxes.set(e.target.id, e.target.checked)});
    }

    handleStartTimesInputsChange(e) {
        this.setState({stInputs: this.state.stInputs.set(e.target.id, e.target.value)});
    }

    handleInputChange(e) {
        // console.log(e.target);
        let temp = Object.assign({}, this.state.data);
        switch (e.target.id) {
            case 'editedGroupName':
                temp.name = e.target.value;
                // this.setState({data: this.state.})
                break;
            case 'editedCost':
                temp.cost = e.target.value;
                // this.setState({surname: e.target.value});
                break;
            case 'editedDuration':
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


    onDeleteUserFromGroup(e) {
        // console.log(e.target.id);
        this.props.deleteUserFromGroup(this.props.groupId, e.target.id);
    }

    renderCheckBoxes() {
        let result = [];
        for (let i = 0; i < 7; i++) {
            result.push(<td>
                <form>
                    <input className="form-check-input"
                           type="checkbox"
                           onChange={this.handleCheckboxesChange}
                           id={i + "cbEdit"}
                           name="cbNameEdit"
                           aria-label="..."
                           defaultChecked={this.props.group.groupById.days[i]}
                    />
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
                    id={i + "stFormEdit"}
                    name="startTimes"
                    disabled={!this.state.checkboxes.get(i + "cbEdit")}
                    defaultValue={this.state.checkboxes.get(i + "cbEdit") ? this.props.group.groupById.startTimes[i] : null}
                    // value={!this.state.checkboxes.get(i + "cbEdit") ? this.state.stInputs.get(i + "stFormEdit") : null}
                    onChange={this.handleStartTimesInputsChange}
                />
            </td>);
        }
        return result;
    }


    render() {
        // console.log("render edit group");
        // console.log("this.state", this.state);
        // console.log(id);
        console.log("this.props", this.props.group.usersFromGroup);
        return (
            <div>
                <div>
                    <form className="form-inline">
                        <label htmlFor="example-text-input" className="col-xs-2 col-form-label">Название</label>
                        <div className="col-xs-10">
                            <input className="form-control"
                                   type="text"
                                   placeholder="Введите название"
                                   id='editedGroupName'
                                   defaultValue={this.props.group.groupById ? this.props.group.groupById.name : null}
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
                                   id='editedCost'
                                   defaultValue={this.props.group.groupById ? this.props.group.groupById.cost : null}
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
                                   id='editedDuration'
                                   defaultValue={this.props.group.groupById ? this.props.group.groupById.duration : null}
                                   onChange={this.handleInputChange}
                            />
                        </div>
                    </form>
                </div>
                <label htmlFor="example-text-input" className="col-xs-2 col-form-label">Расписание:</label>
                <div className="create-group__schedule-table">
                    <table className='table table-striped table-bordered'>
                        <thead>
                        <tr>
                            <td>ПН</td>
                            <td>ВТ</td>
                            <td>СР</td>
                            <td>ЧТ</td>
                            <td>ПТ</td>
                            <td>СБ</td>
                            <td>ВС</td>
                        </tr>
                        </thead>
                        <tbody>
                        {this.props.group.groupById ?
                            <tr>
                                {this.renderCheckBoxes()}
                            </tr>
                            : null}
                        {this.props.group.groupById ?
                            <tr>
                                {this.renderStartTimeInputs()}
                            </tr>
                            : null}
                        </tbody>
                    </table>

                </div>
                <div>
                    <h5>Студенты этой группы:</h5>{
                    this.props.group.usersFromGroup ?
                        this.props.group.usersFromGroup.map(user => (
                            <div>
                                <Link
                                    to={`/users/user_${user.guid}`}>
                                    {user.name} {user.surname} {user.patronymic}
                                </Link>
                                <button className="btn btn-danger" onClick={this.onDeleteUserFromGroup}
                                        id={user.guid}>Удалить
                                </button>
                            </div>
                        )) : <Loading/>
                }
                </div>
                <div>
                    <h5>Добавьте студентов в группу: </h5>
                    <p>Веберите студентов из списка, чтобы добавить их в группу</p>
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
                </div>
                <div>
                    <button
                        // to='/groups/group_list'
                        className='btn btn-success'
                        onClick={this.onSaveEditGroup}>Сохранить
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
)
(GroupEdit);