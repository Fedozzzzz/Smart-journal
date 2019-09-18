import React, {Component} from "react"
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {actionCreators} from "../../store/groupReducer";
import Loading from "../Loading";
import {Link} from "react-router-dom";


class AddUserToGroup extends Component {

    constructor(props) {
        super(props);
        this.state = {
            chosenUsers: new Map
        };
        this.onAddUsersToGroup = this.onAddUsersToGroup.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        this.props.getUsersFromGroup(this.props.groupId);
        this.props.getAllUsers();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevState !== this.state) {
            console.log(this.state)
        }
    }

    onAddUsersToGroup() {
        this.state.chosenUsers.forEach(((value, key) => {
            this.props.addUsersToGroupSubmit(this.props.groupId, key);
        }))
    }

    handleChange(e) {
        console.log("check before: ", this.state);
        // console.log("e.target.id", e.target.id);
        console.log("e.target.id", e.target.checked);
        let tempMap = new Map(this.state.chosenUsers);
        if (e.target.checked) {
            tempMap.set(e.target.id, 0);
            console.log(tempMap);
            this.setState({chosenUsers: tempMap});
        } else {
            tempMap.delete(e.target.id);
            this.setState({chosenUsers: tempMap})
        }
        console.log("check: ", this.state.chosenUsers);
    }


    render() {
        return (<div>
            <h4>Добавьте учеников в группу</h4>
            {/*<form className="form-control">*/}
            {this.props.users ?
                this.props.users.map(user => (<div className="form-inline">
                        <div>{user.name} {user.surname} {user.patronymic}</div>
                        < div className="form-check">
                            < input className="form-check-input"
                                    type="checkbox"
                                    value=""
                                    onChange={this.handleChange}
                                    id={user.guid}/>
                        </div>
                    </div>
                )) : <Loading/>
            }
            <Link to={`/groups/group_list/group_${this.props.groupId}`}
                  className='btn btn-success'
                  onClick={this.onAddUsersToGroup}>Сохранить</Link>
            {/*</form>*/}
        </div>)
    }
}


export default connect(
    state => state.group,
    dispatch => bindActionCreators(actionCreators, dispatch)
)(AddUserToGroup);


