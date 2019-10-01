import React, {Component} from "react"
import {Button, FormGroup, Input, Label, Modal, ModalBody, ModalHeader, ModalFooter} from "reactstrap";


class ModalWarning extends Component {

    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            // continue: false
        };
        this.toggle = this.toggle.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentWillReceiveProps(nextProps, nextContext) {
        this.setState({
            modal: nextProps.isOpen,
        })
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.state.modal !== prevState.modal) {
            // this.props.paymentModalCallback(this.state.sum);
            this.props.warningToggle(this.state.modal);
        }
    }

    toggle() {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }

    onSubmit() {
        this.props.warningCallback(true);
        this.toggle();
    }

    onCancel() {
        this.props.warningCallback(false);
        this.toggle();
    }

    render() {
        return (
            <div>
                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>Внимание!</ModalHeader>
                    <ModalBody>
                        <h6>Текущие изменения не сохранятся!</h6>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger" onClick={this.onSubmit}>Продолжить</Button>
                        <Button color="secondary" onClick={this.onCancel}>Отмена</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

export default ModalWarning;