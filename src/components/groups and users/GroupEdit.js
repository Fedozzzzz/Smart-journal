import React, {Component} from "react"
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {actionCreators} from "../../store/groupReducer";
import {Link} from "react-router-dom";


class GroupEdit extends Component {

    constructor(props) {
        super(props);
        let tempMap = new Map();
        for (let i = 0; i < 7; i++) {
            tempMap.set(i + "cbEdit", false);
        }
        this.state = {
            checkboxes: tempMap
        };
        this.onSaveEditGroup = this.onSaveEditGroup.bind(this);
        this.renderCheckBoxes = this.renderCheckBoxes.bind(this);
        this.renderStartTimeInputs = this.renderStartTimeInputs.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        this.props.getGroupById(this.props.groupId);
        console.log("did mount:");
        console.log(this.props.groupById);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log("did-update");
        // let promise = new Promise(() =>
        //     this.props.getGroupById(this.props.groupId)
        // );
        // promise.then(res => {
        //     console.log("promise:");
        //     // console.log(this.state);
        //     let tempMap = new Map();
        //     // for (let i = 0; i < 7; i++) {
        //     //     tempMap.set(i + "cbEdit", false);
        //     // }
        //     for (let i = 0; i < 7; i++) {
        //         tempMap.set(i + "cbEdit", this.props.groupId.days[i]);
        //     }
        //     this.setState({
        //         checkboxes: tempMap
        //     })
        // })

        if (this.props.groupById !== prevProps.groupById) {
            // console.log(this.props.groupById);
            // console.log()
            let tempMap = new Map();
            for (let i = 0; i < 7; i++) {
                tempMap.set(i + "cbEdit", this.props.groupById.days[i]);
            }
            this.setState({
                checkboxes: tempMap
            });
        }
    }

    onSaveEditGroup() {
        let cash = {
            "name": "default",
            "duration": null,
            "cost": null,
            "days": [],
            "startTimes": []
        };
        cash.name = document.getElementById('editedGroupName').value || this.props.groupById.name;
        cash.cost = document.getElementById('editedCost').value || this.props.groupById.cost;
        cash.duration = document.getElementById("editedDuration").value;
        for (let i = 0; i < document.getElementsByName("startTimes").length; i++) {
            cash.startTimes.push(document.getElementsByName("startTimes")[i].value)
        }
        for (let i = 0; i < document.getElementsByName("cbNameEdit").length; i++) {
            cash.days.push(document.getElementsByName("cbNameEdit")[i].checked)
        }
        cash.duration = 0;
        // console.log("group-data: ", cash);
        this.props.editGroupSubmit(this.props.groupId, cash);
        // let users;//add user to group
        //this.props.addUserToGroup();
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
                           id={i + "cbEdit"}
                           name="cbNameEdit"
                           aria-label="..."
                           defaultChecked={this.props.groupById.days[i]}
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
                    defaultValue={this.props.groupById.startTimes[i]}
                />
            </td>);
            console.log(this.props.groupById.startTimes[i]);
        }
        return result;
    }


    render() {
        console.log("render edit group");
        // console.log(id);
        return (
            <div>
                <div>
                    <form className="form-inline">
                        <label htmlFor="example-text-input" className="col-xs-2 col-form-label">Название</label>
                        <div className="col-xs-10">
                            <input className="form-control"
                                   type="text"
                                   placeholder={this.props.groupById ? this.props.groupById.name : "Введите название"}
                                   id='editedGroupName'
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
                                   placeholder={this.props.groupById ? this.props.groupById.cost : "Цена за занятие"}
                                   id='editedCost'
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
                                   placeholder={this.props.groupById ? this.props.groupById.duration : "Продолжительность (в мин.)"}
                                   id='editedDuration'
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
                        {this.props.groupById ?
                            <tr>
                                {this.renderCheckBoxes()}
                            </tr>
                            : null}
                        {this.props.groupById ?
                            <tr>
                                {this.renderStartTimeInputs()}
                            </tr>
                            : null}
                        </tbody>
                    </table>
                    {/*<p>Добавьте студентов в группу: </p>*!/*/}
                </div>
                <div>
                    <h5>Выберите учеников из списка, чтобы добавить их в группу:</h5>
                    <div>
                        {this.props.users.map(user =>
                            <div>
                                {user.name} {user.surname}
                            </div>)}
                    </div>
                </div>
                <div>
                    <Link to='/groups/group_list' className='btn btn-success'
                          onClick={this.onSaveEditGroup}>Сохранить</Link>
                </div>
            </div>
        )
    }
}


export default connect(
    state => state.group,
    dispatch => bindActionCreators(actionCreators, dispatch)
)(GroupEdit);