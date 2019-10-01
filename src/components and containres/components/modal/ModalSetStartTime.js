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
            closeAll: false
        };
        this.toggle = this.toggle.bind(this);
        this.toggleCallback = this.toggleCallback.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onSave = this.onSave.bind(this);
        this.onDelete = this.onDelete.bind(this);
    }

    componentWillReceiveProps(nextProps, nextContext) {
        console.log("receive props");
        this.setState({modal: nextProps.isOpen})
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.state.newSchedule !== prevState.newSchedule) {
            this.props.getNewScheduleDay(this.state.newSchedule);
            this.props.toggleCallback(this.state.modal);
        }
    }

    toggle() {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }

    toggleCallback(isOpen, closeAll) {
        this.setState({
            isNestedModalOpen: isOpen,
            modal: closeAll
        });
    }

    onChange(e) {
        this.setState({newStartTime: e.target.value});
    }

    onSave() {
        let tempMap = this.props.newSchedule;
        if (this.props.htmlElement.className === "table-warning") {
            this.props.htmlElement.className = "table-light";
            tempMap.set(this.props.day, {toDelete: true, startTime: this.props.scheduleOfGroup.get(this.props.day)});
            this.setState({newSchedule: tempMap});
        } else if (this.props.htmlElement.className === "table-info") {
            this.props.htmlElement.className = "table-light";
            let answ = window.confirm("Вы уверены, что хотите удалить этот день из расписания?");
            if (answ) {
                tempMap.set(this.props.day, {
                    toDelete: true,
                    startTime: this.state.scheduleOfGroup.get(this.props.day)
                });
                this.setState({newSchedule: tempMap});
            }
        } else {
            // let startTime = prompt("Введите время занятия в формате --:--");
            // if (startTime) {
            this.props.htmlElement.className = "table-warning";
            tempMap.set(this.props.day, {toDelete: false, startTime: this.state.newStartTime});
            this.setState({newSchedule: tempMap});
            // }
        }
        this.toggle();
    }

    onDelete() {
        this.setState({isNestedModalOpen: true})
    }

    render() {
        console.log(this.props);
        console.log("modal state", this.state);
        return (
            <Modal isOpen={this.state.modal} toggle={this.toggle}>
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