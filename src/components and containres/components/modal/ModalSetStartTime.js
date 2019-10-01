import React, {Component} from "react"
import {Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, FormGroup, Label, Input} from "reactstrap";
import ModalAskSchedule from "./ModalAskSchedule";

class ModalSetStartTime extends Component {

    constructor(props) {
        super(props);
        this.state = {
            newStartTime: null,
            modal: false,
            isNestedModalOpen: false,
            // closeAll: false,
            toDelete: false
        };
        this.toggle = this.toggle.bind(this);
        this.toggleCallback = this.toggleCallback.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onSave = this.onSave.bind(this);
        this.onDelete = this.onDelete.bind(this);
    }

    componentWillReceiveProps(nextProps, nextContext) {
        // console.log("receive props");
        // console.log(nextProps);
        this.setState({
            modal: nextProps.isOpen,
            newStartTime: nextProps.oldStartTime,
            toDelete: nextProps.toDelete
        })
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        // console.log(this.state.modal);
        // console.log(prevState.modal);
        if (this.state.modal !== prevState.modal) {
            // this.props.getNewScheduleDay(this.state.newSchedule);
            // console.log("did update", this.state.modal !== prevState.modal);
            if (this.state.newStartTime) {
                this.props.getNewStartTime({newStartTime: this.state.newStartTime, toDelete: this.state.toDelete});
            }
            this.props.toggleCallback(this.state.modal);
        }
        // if (this.state.closeAll !== prevState.closeAll) {
        //     console.log("сука вызовись уже нахуй");
        //     this.props.getNewStartTime({newStartTime: this.state.newStartTime, toDelete: this.state.toDelete});
        // }
    }

    toggle() {
        // console.log("toggle, this.state", this.state.modal);
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
        // console.log("toggle, this.state", this.state.modal);
    }

    toggleCallback(isOpen, closeAll, toDelete) {
        // console.log(isOpen, closeAll, toDelete);
        this.setState({
            isNestedModalOpen: isOpen,
            modal: !closeAll,
            toDelete: toDelete
        });
    }

    onChange(e) {
        this.setState({newStartTime: e.target.value});
    }

    onSave() {
        console.log(this.state);
        this.props.getNewStartTime({newStartTime: this.state.newStartTime, toDelete: this.state.toDelete});
        this.toggle();
        // this.setState(prevState => ({
        //     modal: !prevState.modal
        // }));
        // this.props.toggleCallback(this.state.modal);

        // let tempMap = this.props.newSchedule;
        // if (this.props.htmlElement.className === "table-warning") {
        //     this.props.htmlElement.className = "table-light";
        //     tempMap.set(this.props.day, {toDelete: true, startTime: this.props.scheduleOfGroup.get(this.props.day)});
        //     this.setState({newSchedule: tempMap});
        // } else if (this.props.htmlElement.className === "table-info") {
        //     this.props.htmlElement.className = "table-light";
        //     let answ = window.confirm("Вы уверены, что хотите удалить этот день из расписания?");
        //     if (answ) {
        //         tempMap.set(this.props.day, {
        //             toDelete: true,
        //             startTime: this.state.scheduleOfGroup.get(this.props.day)
        //         });
        //         this.setState({newSchedule: tempMap});
        //     }
        // } else {
        //     // let startTime = prompt("Введите время занятия в формате --:--");
        //     // if (startTime) {
        //     this.props.htmlElement.className = "table-warning";
        //     tempMap.set(this.props.day, {toDelete: false, startTime: this.state.newStartTime});
        //     this.setState({newSchedule: tempMap});
        //     // }
        // }
        // this.props.toggleCallback(this.state.modal);
        // this.props.toggleCallback(this.state.modal);
    }

    onDelete() {
        this.setState({isNestedModalOpen: true})
    }

    render() {
        // console.log(this.props);
        // console.log("modal state", this.state.modal);
        return (
            <Modal isOpen={this.state.modal} toggle={this.toggle}
                   onClosed={this.state.closeAll ? this.toggle : undefined}>
                <ModalHeader toggle={this.toggle}>Время занятия</ModalHeader>
                <ModalBody>
                    <FormGroup>
                        <Label for="startTime">Введите время начала занятия</Label>
                        <Input type="time" id="startTime" onChange={this.onChange}
                               defaultValue={this.props.oldStartTime}/>
                    </FormGroup>
                    {this.props.oldStartTime ?
                        <Button color="danger" onClick={this.onDelete}>Удалить из расписания</Button> : null}
                    <ModalAskSchedule isOpen={this.state.isNestedModalOpen} toggleCallback={this.toggleCallback}/>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={this.onSave}>Сохранить</Button>
                    <Button color="secondary" onClick={this.toggle}>Отмена</Button>
                </ModalFooter>
            </Modal>
        )
    }
}

export default ModalSetStartTime