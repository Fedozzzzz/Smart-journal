import React, {Component} from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {actionCreators} from "../../store/groupReducer";
import {Link} from "react-router-dom";

class GroupsList extends Component {

    componentDidMount() {
        console.log("user-list-did-mount");
        this.props.getAllGroups();
    }

    render() {
        console.log('render-group-list-page');
        return (
            <div>
                <h3>Группы</h3>
                {this.props.groups ?
                    this.props.groups.map(group => (
                        <div>
                            <h5><Link to={`/groups/group_list/group_${group.guid}`}>{group.name}</Link></h5>
                        </div>
                    )) : null}
                <div>
                    <Link to='/groups/creating_group' className='btn btn-primary' onClick={this.props.createGroup}>+Добавить
                        группу</Link>
                </div>
            </div>
        )
    }
}

export default connect(
    state => state.group,
    dispatch => bindActionCreators(actionCreators, dispatch)
)(GroupsList)