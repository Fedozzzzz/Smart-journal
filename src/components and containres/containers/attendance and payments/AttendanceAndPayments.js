import React, {Component} from "react"
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {groupActionCreators} from "../../../store/reducers/groupReducer";
import Form from "../../components/Form";
import {scheduleActionCreators} from "../../../store/reducers/scheduleReducer";


class AttendanceAndPayments extends Component {

    constructor(props, ctx) {
        super(props, ctx);
        this.state = {
            selectedGroupId: null,
            currentMonth: new Date(new Date().setDate(1)),
            // currentMonth: new Date(),
            // previousMonth: new Date(),
            // date: String(),
            // nextMonth
            // isSelected: false,
            // newSchedule: new Map()
        };
        this.getCurrentDate = this.getCurrentDate.bind(this);
        this.getSelectedGroupId = this.getSelectedGroupId.bind(this);
    }

    componentDidMount() {
        this.props.getAllGroups();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        // console.log((this.state.selectedGroupId !== prevState.selectedGroupId) && this.state.currentMonth);
        // console.log((this.state.currentMonth !== prevState.currentMonth) && this.state.selectedGroupId);
        // console.log(!this.props.schedule.isLoaded && this.state.currentMonth && this.state.selectedGroupId);
        if ((this.state.selectedGroupId !== prevState.selectedGroupId) && this.state.currentMonth
            || (this.state.currentMonth !== prevState.currentMonth) && this.state.selectedGroupId
            || (!this.props.schedule.isLoaded && this.state.currentMonth && this.state.selectedGroupId)) {
            let date = new Date(this.state.currentMonth);
            console.log(date);
            let from = date.toISOString().slice(0, 10);
            date.setUTCDate(this.state.currentMonth.daysInMonth());
            let to = date.toISOString().slice(0, 10);
            console.log(this.state.selectedGroupId, from, to);
            this.props.getSchedule(this.state.selectedGroupId, from, to);
        }
    }

    getCurrentDate(value) {
        this.setState({currentMonth: value});
    }

    getSelectedGroupId(value) {
        this.setState({selectedGroupId: value});
    }

    // renderButtons() {
    //     return (
    //         <div className="buttons">
    //             {/*<button*/}
    //             {/*    onClick={this.onSubmit}*/}
    //             {/*    type="submit"*/}
    //             {/*    className="btn btn-primary"*/}
    //             {/*>Принять*/}
    //             {/*</button>*/}
    //             {this.props.schedule.schedule ?
    //                 <button
    //                     onClick={this.onEdit}
    //                     type="redact"
    //                     className="btn btn-info"
    //                 >Редактировать таблицу
    //                 </button> : null}
    //             {this.props.schedule.isEdit ?
    //                 <button
    //                     onClick={this.onSave}
    //                     type="save"
    //                     className="btn btn-success"
    //                 >Сохранить
    //                 </button> : null
    //             }
    //         </div>)
    // }

    render() {
        console.log("this.state", this.state);
        console.log("this.props", this.props);
        return (<div>
            <h3>Управление платежами</h3>
            {/*{this.renderForm()}*/}
            <Form getSelectedGroupId={this.getSelectedGroupId} getCurrentDate={this.getCurrentDate}
                  groups={this.props.group.groups}/>
            {/*{this.renderButtons()}*/}
        </div>)
    }
}

export default connect(
    state => {
        return {
            group: state.group,
            schedule: state.schedule
        }
    },
    dispatch => bindActionCreators(Object.assign({}, groupActionCreators, scheduleActionCreators), dispatch)
)(AttendanceAndPayments)