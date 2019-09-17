import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {actionCreators} from "../store/groupReducer";
import {Route, Link} from "react-router-dom"
import '../css/Groups.css'
import User from "./User";
import UserList from "./UserList";
import EditUser from "./EditUser";


class Groups extends Component {

    constructor(props, ctx) {
        super(props, ctx);

        //functions
        this.addGroup = this.addGroup.bind(this);
        this.addUser = this.addUser.bind(this);
        this.editGroup = this.editGroup.bind(this);
        this.deleteGroup = this.deleteGroup.bind(this);

        //handlers
        this.onSaveUser = this.onSaveUser.bind(this);
        this.onSaveGroup = this.onSaveGroup.bind(this);
        this.onSaveEditGroup = this.onSaveEditGroup.bind(this);

        //render
        this.renderCreatingGroupPage = this.renderCreatingGroupPage.bind(this);
        this.renderCreatingUserPage = this.renderCreatingUserPage.bind(this);
        this.renderGroupMenuPage = this.renderGroupMenuPage.bind(this);
        this.renderGroupListPage = this.renderGroupListPage.bind(this);
        this.renderEditGroup = this.renderEditGroup.bind(this);
        this.renderGroupPage = this.renderGroupPage.bind(this);
        this.renderUserListPage = this.renderUserListPage.bind(this);
    }

    UNSAFE_componentWillMount() {
        console.log('will-mount');
        // this.props.getAllGroups()
    }

    addGroup() {
        this.props.createGroup();
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

    deleteGroup(id) {
        this.props.deleteGroup(id);
    }

    addUser() {
        this.props.createUser();
    }

    onSaveUser() {
        //e.preventDefault();
        let cash = {
            "name": "",
            "surname": "",
            "patronymic": "",
            "email": "",
            "phoneNumber": ""
        };
        cash.name = document.getElementById('userName').value;
        //console.log('name ', document.getElementById('userName').value);
        cash.surname = document.getElementById('userSurname').value; //
        cash.patronymic = document.getElementById('userPatronymic').value;
        cash.email = document.getElementById("email-input").value;
        cash.phoneNumber = document.getElementById("tel-input").value;
        console.log("user-data: ", cash);
        this.props.createUserSubmit(cash);
    }

    // onChose(id){
    //     //this.setState({guid:id});
    //     this.guid=id;
    //     //console.log("onchoose");
    // }

    componentDidMount() {
        this.props.getAllUsers();
    }

    editGroup() {
        this.props.editGroup();
        //console.log(e.target);
    }

    onSaveEditGroup(id) {
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
        console.log("group-data: ", cash);
        this.props.editGroupSubmit(id, cash);
        // let users;//add user to group
        //this.props.addUserToGroup();
    }

    editUser() {
        this.props.editUser();
        //console.log(e.target);
    }

    onSaveEditUser(id) {
        let cash = {
            "name": "",
            "surname": "",
            "patronymic": "",
            "email": "",
            "phoneNumber": ""
        };
        cash.name = document.getElementById('userName').value;
        //console.log('name ', document.getElementById('userName').value);
        cash.surname = document.getElementById('userSurname').value; //
        cash.patronymic = document.getElementById('userPatronymic').value;
        cash.email = document.getElementById("email-input").value;
        cash.phoneNumber = document.getElementById("tel-input").value;
        console.log("user-data: ", cash);
        this.props.editUserSubmit(id, cash);
        // let users;//add user to group
        //this.props.addUserToGroup();
    }

    renderEditGroup(id) {
        console.log("render edit group");
        console.log(id);
        return (
            <div>
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
                <label htmlFor="example-text-input" className="col-xs-2 col-form-label">Расписание:</label>
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
                    </tbody>
                </table>
                <p>Добавьте студентов в группу: </p>
                {/*this.props.users.map(user => (
                    <div>
                        <p>{user.name}</p>
                        <p>{user.surname}</p>
                        <p>{user.patronymic}</p>
                        <div className="form-check">
                            <input className="form-check-input"
                                   type="checkbox"
                                   value=""
                                   name="user-input"
                                   aria-label="..."/>
                        </div>
                    </div>
                ))*/}
                <div>
                    <Link to='/groups/group_list' className='btn btn-success'
                          onClick={() => this.onSaveEditGroup(id)}>Сохранить</Link>
                </div>
            </div>
        )
    }

    renderCreatingUserPage() {
        return (
            <div>
                <form className="form-inline">
                    <div className="form-group">
                        <label htmlFor="example-text-input" className="col-xs-2 col-form-label">Имя</label>
                        <div className="col-xs-10">
                            <input className="form-control"
                                   type="text"
                                   placeholder="Введите имя"
                                   id='userName'
                            />
                        </div>
                    </div>
                </form>
                <form className="form-inline">
                    <div className="form-group">
                        <label htmlFor="example-text-input" className="col-xs-2 col-form-label">Фамилия</label>
                        <div className="col-xs-10">
                            <input className="form-control"
                                   type="text"
                                   placeholder="Введите фамилию"
                                   id='userSurname'
                            />
                        </div>
                    </div>
                </form>
                <form className="form-inline">
                    <div className="form-group">
                        <label htmlFor="example-text-input" className="col-xs-2 col-form-label">Отчество</label>
                        <div className="col-xs-10">
                            <input className="form-control"
                                   type="text"
                                   placeholder="Введите отчество"
                                   id='userPatronymic'
                            />
                        </div>
                    </div>
                </form>
                <form className="form-inline">
                    <div className="form-group">
                        <label htmlFor="example-email-input" className="col-xs-2 col-form-label">Email</label>
                        <div className="col-xs-10">
                            <input className="form-control"
                                   type="email"
                                   placeholder="ivanov.ii@example.com"
                                   id="email-input"/>
                        </div>
                    </div>
                </form>
                <form className="form-inline">
                    <div className="form-group">
                        <label htmlFor="example-tel-input" className="col-xs-2 col-form-label">Номер
                            телефона</label>
                        <div className="col-xs-10">
                            <input className="form-control"
                                   type="tel"
                                   placeholder="1-(555)-555-5555"
                                   id="tel-input"/>
                        </div>
                    </div>
                </form>
                <div>
                    <Link to="/groups/user_list" className='btn btn-success' onClick={this.onSaveUser}>Сохранить</Link>
                </div>
            </div>
        )
    }

    // renderUserPage(id) {
    //     console.log("render-user-page");
    //     let user = {
    //         "guid": id,
    //         "amount": null,
    //         "dept": null,
    //         "updatedAt": null,
    //         "name": null,
    //         "surname": null,
    //         "patronymic": null,
    //         "phoneNumber": null,
    //         "email": null
    //     };
    //     this.props.users.forEach(g => {
    //         if (g.guid === id) {
    //             user = g;
    //             return g;
    //         }
    //     });
    //     //const group = props;
    //     //console.log(this.state.guid);
    //     console.log(user);
    //     return (
    //         <div>
    //             {/*<h3>{user.name}</h3>*/}
    //             <User user={user}/>
    //             {/*<Link to='/groups/user_list' className="btn btn-outline-danger"*/}
    //             {/*      onClick={() => this.props.deleteUser(user.guid)}>Удалить</Link>*/}
    //             {/*<Link to={`/groups/users/edit_user/${user.guid}`} className="btn btn-outline-warning"*/}
    //             {/*      onClick={() => this.editUser(user.guid)}>Edit</Link>*/}
    //         </div>
    //     )
    // }

    renderGroupPage(id) {
        console.log("render-group-page");
        let group = {
            "guid": "",
            "name": "",
            "days": [],
            "startTimes": [],
            "duration": null,
            "cost": null
        };
        //console.log("params", id);
        this.props.groups.map(g => {//остановить перебор после первого совпадения
            if (g.guid === id) {
                group = {
                    "guid": g.guid,
                    "name": g.name
                }
            }
        });
        //const group = props;
        //console.log(this.state.guid);
        return (
            <div>
                <h3>{group.name}</h3>
                {/*<Link to='/groups/group_list' className="btn btn-outline-danger"*/}
                {/*      onClick={() => this.deleteGroup(group.guid)}>Delete</Link>*/}
                {/*<Link to={`/groups/edit_group/${group.guid}`} className="btn btn-outline-warning"*/}
                {/*      onClick={() => this.editGroup(group.guid)}>Edit</Link>*/}
            </div>
        )
    }


    renderCreatingGroupPage() {
        console.log('render-creating-group-page');
        return (
            <div>
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
                <label htmlFor="example-text-input" className="col-xs-2 col-form-label">Расписание:</label>
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
            </div>)
    }

    // @bind
    renderUserListPage() {
        if (this.props.users.length === 0) {
            this.props.getAllUsers();
        }
        console.log("user-list:", this.props.users);
        return (
            <div>
                <h3>Студенты</h3>
                {this.props.users ?
                    this.props.users.map(user => (
                        <div>
                            <h5><Link to={`/groups/users/user_${user.guid}`}>{user.name}</Link></h5>
                        </div>
                    )) : null}
                <Link to='/groups/creating_user' className='btn btn-primary' onClick={this.addUser}>+Добавить
                    ученика</Link>
            </div>
        )
    }

    renderGroupMenuPage() {
        return (
            <form>
                <Link to='/groups/group_list' className='btn btn-outline-primary'>
                    Список групп
                </Link>
                <Link to='groups/user_list' className="btn btn-outline-primary">
                    Список учеников
                </Link>
                {/*<button className='btn btn-outline-primary' onClick={this.addGroup}>*/}
                {/*    <Link to='/groups/creating_group'>*/}
                {/*        +Добавить группу*/}
                {/*    </Link>*/}
                {/*</button>*/}
                {/*<button className='btn btn-outline-primary' onClick={this.addUser}>*/}
                {/*    <Link to='/groups/creating_user'>*/}
                {/*        +Добавить ученика*/}
                {/*    </Link>*/}
                {/*</button>*/}
            </form>
        )
    }

    renderGroupListPage() {
        console.log('render-group-list-page');
        // console.log("loaded: ", this.props.isLoaded);
        if (!this.props.isLoaded) {
            this.props.getAllGroups();
        }
        return (
            <div>
                <h3>Группы</h3>
                {this.props.groups ?
                    this.props.groups.map(group => (
                        <div>
                            <h5><Link to={`/groups/${group.guid}`}>{group.name}</Link></h5>
                        </div>
                    )) : null}
                <div>
                    <Link to='/groups/creating_group' className='btn btn-primary' onClick={this.addGroup}>+Добавить
                        группу</Link>
                </div>
            </div>)
    }

    render() {
        console.log('render');
        return (
            <div>
                {/*<Switch>*/}
                <Route exact path='/groups' render={this.renderGroupMenuPage}/>
                <Route path='/groups/group_list' render={this.renderGroupListPage}/>
                <Route path='/groups/creating_group' render={this.renderCreatingGroupPage}/>
                <Route path='/groups/creating_user' render={this.renderCreatingUserPage}/>
                <Route path="/groups/user_list" render={() => <UserList/>}/>
                {/*<Route exact path='/groups/users/user_:id' render={({match}) => (this.renderUserPage(match.params.id))}/>*/}
                <Route exact path='/groups/users/user_:id' render={({match}) => (<User userId={(match.params.id)}/>)}/>
                <Route exact path='/groups/users/edit_user/user_:id'
                       render={({match}) => (<EditUser userId={(match.params.id)}/>)}/>
                {/*<Redirect from='/groups/group_list' to='`/groups/group_list/:id`' render={this.renderCreatingGroupPage}/>*/}
                {/*(props)=><ProjectPage projects={this.props.projects}{...props}*/}
                <Route exact path='/groups/:id' render={({match}) => (this.renderGroupPage(match.params.id))}/>
                <Route path='/groups/edit_group/:id' render={({match}) => (this.renderEditGroup(match.params.id))}/>
            </div>
        );
    }
}


export default connect(
    state => state.group,
    dispatch => bindActionCreators(actionCreators, dispatch)
)(Groups);