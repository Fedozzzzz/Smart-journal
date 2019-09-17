import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {actionCreators} from "../../store/groupReducer";
import {Route, Link} from "react-router-dom"
import '../../css/Groups.css'
import UserPage from "./UserPage";
import UserList from "./UsersList";
import UserEdit from "./UserEdit";
import GroupsMenu from "./GroupsMenu";
import GroupsList from "./GroupsList";
import GroupsCreating from "./GroupCreating";
import GroupsEdit from "./GroupEdit";
import GroupPage from "./GroupPage";
import UserCreating from "./UserCreating";


class Groups extends Component {

    render() {
        console.log('render');
        return (
            <div>
                <Route exact path='/groups' component={GroupsMenu}/>
                <Route exact path='/groups/group_list' component={GroupsList}/>
                <Route path='/groups/creating_group' component={GroupsCreating}/>
                <Route path='/groups/creating_user' component={UserCreating}/>
                <Route path="/groups/user_list" component={UserList}/>
                <Route exact path='/groups/users/user_:id'
                       render={({match}) => (<UserPage userId={(match.params.id)}/>)}/>
                <Route exact path='/groups/users/edit_user/user_:id'
                       render={({match}) => (<UserEdit userId={(match.params.id)}/>)}/>
                <Route exact path='/groups/group_list/group_:id'
                       render={({match}) => (<GroupPage groupId={match.params.id}/>)}/>
                <Route path='/groups/edit_group/group_:id'
                       render={({match}) => (<GroupsEdit groupId={match.params.id}/>)}/>
            </div>
        );
    }
}


export default connect(
    state => state.group,
    dispatch => bindActionCreators(actionCreators, dispatch)
)(Groups);