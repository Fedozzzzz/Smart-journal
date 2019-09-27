import React, {Component} from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
// import {actionCreators} from "../../store/reducers/userReducer";
import {Link} from "react-router-dom";
import Loading from "../../components/Loading";
import {userActionCreators} from "../../../store/reducers/userReducer";

class UsersList extends Component {

    componentDidMount(prevProps) {
        console.log("user-list-did-mount");
        this.props.getAllUsers();
        console.log("initial get method");
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        // console.log("this.props:", this.props.ok);
        // console.log("prev.props:", prevProps.ok);
        // if (this.props.newUser !== prevProps.newUser
        //     || this.props.ok) {
        //     this.props.getAllUsers();
        // }

        if (!this.props.isLoaded) {
            console.log("additional get method");
            this.props.getAllUsers();
        }

        // // else
        // if (this.props.status !== prevProps.status) {
        //     this.props.getAllUsers();
        // }
    }


    render() {
        console.log("render-users-list");
        console.log("props", this.props);
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
    state => state.user,
    dispatch => bindActionCreators(userActionCreators, dispatch)
)(UsersList)