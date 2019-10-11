// import ModalWarning from "../modals/ModalWarning";
import React, {Component} from "react";


class StatisticsForm extends Component {

    constructor(props, ctx) {
        super(props, ctx);
        this.state = {
            // selectedGroupId: null,
            selectedMonth: new Date(),
            // isWarningOpen: false,
            // warningMessage: "Текущие изменения не сохранятся!"
        };
        this.renderForm = this.renderForm.bind(this);
        this.onDateChange = this.onDateChange.bind(this);
        // this.onSelectGroup = this.onSelectGroup.bind(this);
        // this.warningToggle = this.warningToggle.bind(this);
        // this.warningCallback = this.warningCallback.bind(this);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.state.selectedMonth !== prevState.selectedMonth) {
            this.props.getSelectedDate(this.state.selectedMonth);
        }
    }

    // warningToggle(isOpen) {
    //     this.setState({
    //         isWarningOpen: isOpen
    //     })
    // }


    // warningCallback(value) {
    //     if (value) {
    //         this.setState({
    //             selectedMonth: this.state.tempMonth || this.state.selectedMonth,
    //             selectedGroupId: this.state.tempGroupId || this.state.selectedGroupId,
    //         });
    //     }
    // }


    onDateChange(e) {
        // if (this.props.isEdit) {
            this.setState({
                selectedMonth: new Date(e.target.value),
                // isWarningOpen: true
            })
        // } else this.setState({
        //     selectedMonth: new Date(e.target.value),
        // });
    }

    renderForm() {
        // console.log("form state", this.state);
        return (
            <div className="container">
                {/*<ModalWarning isOpen={this.state.isWarningOpen} warningCallback={this.warningCallback}*/}
                {/*              warningToggle={this.warningToggle} warningMessage={this.state.warningMessage}/>*/}
                <div className="form">
                    <div className="main-form">
                        <form>
                            <div className="form-group row">
                                <label htmlFor="exampleMonth" className="label_month col-md-2">Месяц</label>
                                <input
                                    type="month"
                                    className="form-control col-md-7"
                                    id="exampleMonth"
                                    aria-describedby="monthHelp"
                                    placeholder="Введите месяц"
                                    value={this.state.selectedMonth.toISOString().slice(0, 7)}
                                    onChange={this.onDateChange}
                                />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }

    render() {
        return (<div>
                {this.renderForm()}
            </div>
        )
    }
}

export default StatisticsForm;