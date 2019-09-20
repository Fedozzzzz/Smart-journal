import React, {Component} from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {actionCreators} from "../../store/groupReducer";
import {Link} from "react-router-dom";
import Loading from "../Loading";

class UsersList extends Component {

    componentDidMount() {
        console.log("user-list-did-mount");
        this.props.getAllUsers();
        // this.forceUpdate();
    }


    // componentDidUpdate(prevProps, prevState, snapshot) {
    //     if (this.props !== prevProps) {
    //         // this.props.getAllUsers();
    //     }
    // }

    render() {
        console.log("render-users-list");
        // console.log("props:", this.props.users);
        return (
            <div>
                <h3>Студенты</h3>
                {this.props.users ?
                    this.props.users.map(user => (
                        <div key={user.guid}>
                            <h5><Link to={`/users/user_${user.guid}`}>{user.name} {user.surname}</Link></h5>
                        </div>
                    )) : <Loading/>}
                <Link to='/users/creating_user'
                      className='btn btn-primary'
                      onClick={this.addUser}>
                    +Добавить ученика</Link>
            </div>
        )
    }
}

export default connect(
    state => state.group,
    dispatch => bindActionCreators(actionCreators, dispatch)
)(UsersList)