import React, {Component} from "react"
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {actionCreators} from "../../store/groupReducer";


class GroupCreating extends Component {

    constructor(props) {
        super(props);
        this.onSaveGroup = this.onSaveGroup.bind(this);
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
        let size = document.getElementsByName("cbName").length;
        //console.log(document.getElementsByName("cbName")[0].checked);
        for (let i = 0; i < size; i++) {
            //console.log(document.getElementsByName("cbName")[i].checked);
            cash.days.push(document.getElementsByName("cbName")[i].checked)
        }
        //console.log("checkbox", document.getElementById("blankCheckbox").checked);
        cash.duration = 0;
        console.log(cash);
        //this.setState({group:cash});
        this.props.createGroupSubmit(cash);
    }

    render() {
        return (<div>
                <div>
                    <form className="form-inline">
                        <label htmlFor="example-text-input" className="col-xs-2 col-form-label">Название</label>
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
                </div>
                < label
                    htmlFor="example-text-input"
                    className="col-xs-2 col-form-label"> Расписание
                    :</label>
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
                    {/*<tr>
<td>
<input className="form-control" id="disabledInput" type="text"
placeholder="Disabled input here..." disabled/>
</td>
</tr>*/}
                    </tbody>
                </table>
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