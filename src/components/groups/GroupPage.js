import React, {Component} from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {Link} from "react-router-dom";
import "../../css/GroupPage.css"
import Loading from "../Loading";
import {groupActionCreators} from "../../store/reducers/groupReducer";

class GroupPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            // isLoaded: false,
            userById: null
        }
    }

    componentDidMount() {
        // console.log("props user:", this.props.userById);
        this.props.getGroupById(this.props.groupId);
        this.props.getUsersFromGroup(this.props.groupId);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.isLoaded === false) {
            this.props.getGroupById(this.props.groupId);
            this.props.getUsersFromGroup(this.props.groupId);
        }
    }

    renderSchedule() {
        let res = [];
        for (let i = 0; i < 7; i++) {
            res.push(<td key={i}
                         className={this.props.groupById.days[i] ? "cell_active" : "cell"}>
                {this.props.groupById.startTimes[i]}
            </td>)
        }
        return res;
    }

    render() {
        // console.log("render of group page ", this.props.groupById);//should add redirect
        console.log("props", this.props);
        return (
            <div className="container">
                <div className="group-page__info">
                    <h4>Страница группы</h4>
                    {this.props.groupById ? <div>
                        <div>
                            <div>Имя: {this.props.groupById.name}</div>
                            <div>Цена за занятие: {this.props.groupById.cost}</div>
                            <div>Продолжительность занятия: {this.props.groupById.duration}</div>
                            <div>Расписание:</div>
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
                                <tr>
                                    {this.renderSchedule()}
                                </tr>
                                </tbody>
                            </table>
                        </div>
                        <div>
                            <h5>Студенты этой группы:</h5>{
                            this.props.usersFromGroup ?
                                this.props.usersFromGroup.map(user => (
                                    <div>
                                        <Link
                                            to={`/users/user_${user.guid}`}>{user.name} {user.surname} {user.patronymic}</Link>
                                    </div>
                                )) : <Loading/>
                        }
                        </div>
                        <div>
                            <Link to='/groups/'
                                  className="btn btn-outline-danger"
                                  onClick={() => this.props.deleteGroup(this.props.groupId)}>Удалить</Link>
                            <Link to={`/groups/edit_group/group_${this.props.groupId}`}
                                  className="btn btn-outline-warning"
                                  onClick={() => this.props.editGroup(this.props.groupId.guid)}>Редактировать</Link>
                        </div>
                    </div> : <Loading/>}
                </div>
            </div>
        )
    }
}

export default connect(
    state => state.group,
    dispatch => bindActionCreators(groupActionCreators, dispatch)
)(GroupPage)