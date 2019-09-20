import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {actionCreators} from "../../store/groupReducer";
import {Route, Link} from "react-router-dom"
import '../../css/Groups.css'
import UserPage from "../users/UserPage";
import UserList from "../users/UsersList";
import UserEdit from "../users/UserEdit";
import GroupsMenu from "./GroupsMenu";
import GroupsList from "./GroupsList";
import GroupsCreating from "./GroupCreating";
import GroupsEdit from "./GroupEdit";
import GroupPage from "./GroupPage";
import UserCreating from "../users/UserCreating";
import AddUserToGroup from "./AddUserToGroup";


class Groups extends Component {

    render() {
        // console.log('render');
        return (
            <div>
                {/*<Route exact path='/groups' component={GroupsMenu}/>*/}
                <Route exact path='/groups' component={GroupsList}/>
                <Route path='/groups/creating_group' component={GroupsCreating}/>
                <Route exact path='/groups/group_:id'
                       render={({match}) => (<GroupPage groupId={match.params.id}/>)}/>
                <Route path='/groups/edit_group/group_:id'
                       render={({match}) => (<GroupsEdit groupId={match.params.id} history={this.props.history}/>)}/>
                <Route path='/groups/edit_group/add_users_to_group_:id'
                       render={({match}) => (
                           <AddUserToGroup groupId={match.params.id} history={this.props.history}/>)}/>
            </div>
        );
    }
}


export default connect(
    state => state.group,
    dispatch => bindActionCreators(actionCreators, dispatch)
)(Groups);