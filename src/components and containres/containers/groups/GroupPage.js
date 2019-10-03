import React, {Component} from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {Link} from "react-router-dom";
import "../../../css/GroupPage.css"
import Loading from "../../components/Loading"
import {groupActionCreators} from "../../../store/redux/groups/actionCreators";
import {GroupPageProfile} from "./GroupPageProfile";
import {GroupWeekSchedule} from "./GroupWeekSchedule";
import {GroupStudents} from "./GroupStudents";


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

    render() {
        // console.log("render of group page ", this.props.groupById);//should add redirect
        // console.log("props", this.props);
        return (
            <div className="container">
                <div className="group-page__info">
                    <h4>Страница группы</h4>
                    {this.props.groupById ? <div>
                        <div>
                            <GroupPageProfile groupById={this.props.groupById}/>
                            <GroupWeekSchedule groupById={this.props.groupById}/>
                        </div>
                        <h5>Студенты этой группы:</h5>
                        {this.props.usersFromGroup ?
                            <GroupStudents usersFromGroup={this.props.usersFromGroup}/> : <Loading/>}
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