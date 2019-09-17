import React, {Component} from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {actionCreators} from "../../store/groupReducer";
import {Link} from "react-router-dom";

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
    }

    render() {
        console.log("render of group page ", this.props.groupById);//should add redirect
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
                        </div>
                        <div>
                            <Link to='/groups/group_list' className="btn btn-outline-danger"
                                  onClick={() => this.props.deleteGroup(this.props.groupId)}>Удалить</Link>
                            <Link to={`/groups/edit_group/group_${this.props.groupId}`}
                                  className="btn btn-outline-warning"
                                  onClick={() => this.props.editGroup(this.props.groupById.guid)}>Редактировать</Link>
                        </div>
                    </div> : null}
                </div>
            </div>
        )
    }
}

export default connect(
    state => state.group,
    dispatch => bindActionCreators(actionCreators, dispatch)
)(GroupPage)