import React, {Component} from "react"
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {actionCreators} from "../../store/groupReducer";
import {Link} from "react-router-dom";


class GroupEdit extends Component{

    constructor(props) {
        super(props);
        this.onSaveEditGroup = this.onSaveEditGroup.bind(this);
    }

    componentDidMount() {
        this.props.getGroupById(this.props.groupId);
    }

    onSaveEditGroup() {
        let cash = {
            "name": "default",
            "duration": null,
            "cost": null,
            "days": [],
            "startTimes": []
        };
        cash.name = document.getElementById('editedGroupName').value;
        cash.cost = document.getElementById('editedCost').value;
        let size = document.getElementsByName("cbName").length;
        //console.log(document.getElementsByName("cbName")[0].checked);
        for (let i = 0; i < size; i++) {
            //console.log(document.getElementsByName("cbName")[i].checked);
            cash.days.push(document.getElementsByName("cbName")[i].checked)
        }
        //console.log("checkbox", document.getElementById("blankCheckbox").checked);
        cash.duration = 0;
        console.log("group-data: ", cash);
        this.props.editGroupSubmit(this.props.groupId, cash);
        // let users;//add user to group
        //this.props.addUserToGroup();
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
                                   placeholder="Введите название"
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
                                   placeholder="Цена за занятие"
                                   id='editedCost'
                            />
                        </div>
                    </form>
                </div>
                <label htmlFor="example-text-input" className="col-xs-2 col-form-label">Расписание:</label>
                <table className='table table-striped'>
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
                    <tr>
                        <td>
                            <form>
                                <input className="form-check-input"
                                       type="checkbox"
                                       id="blankCheckbox"
                                       name="cbName"
                                       aria-label="..."/>
                            </form>
                        </td>
                        <td>
                            <form>
                                <input className="form-check-input"
                                       type="checkbox"
                                       id="blankCheckbox"
                                       name="cbName"
                                       aria-label="..."/>
                            </form>
                        </td>
                        <td>
                            <form>
                                <input className="form-check-input"
                                       type="checkbox"
                                       id="blankCheckbox"
                                       name="cbName"
                                       aria-label="..."/>
                            </form>
                        </td>
                        <td>
                            <form>
                                <input className="form-check-input"
                                       type="checkbox"
                                       id="blankCheckbox"
                                       name="cbName"
                                       aria-label="..."/>
                            </form>
                        </td>
                        <td>
                            <form>
                                <input className="form-check-input"
                                       type="checkbox"
                                       id="blankCheckbox"
                                       name="cbName"
                                       aria-label="..."/>
                            </form>
                        </td>
                        <td>
                            <form>
                                <input className="form-check-input"
                                       type="checkbox"
                                       id="blankCheckbox"
                                       name="cbName"
                                       aria-label="..."/>
                            </form>
                        </td>
                        <td>
                            <form>
                                <input className="form-check-input"
                                       type="checkbox"
                                       id="blankCheckbox"
                                       name="cbName"
                                       aria-label="..."/>
                            </form>
                        </td>
                    </tr>
                    </tbody>
                </table>
                <p>Добавьте студентов в группу: </p>
                {/*this.props.users.map(user => (
                    <div>
                        <p>{user.name}</p>
                        <p>{user.surname}</p>
                        <p>{user.patronymic}</p>
                        <div className="form-check">
                            <input className="form-check-input"
                                   type="checkbox"
                                   value=""
                                   name="user-input"
                                   aria-label="..."/>
                        </div>
                    </div>
                ))*/}
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