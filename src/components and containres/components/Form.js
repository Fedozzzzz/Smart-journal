import React, {Component} from "react"

class Form extends Component {

    //getSelectedGroupId, getSelectedDate and groups should be passed with props

    constructor(props, ctx) {
        super(props, ctx);
        this.state = {
            selectedGroupId: null,
            currentMonth: new Date(),
        };
        this.renderForm = this.renderForm.bind(this);
        this.onDateChange = this.onDateChange.bind(this);
        this.onSelectGroup = this.onSelectGroup.bind(this);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.state.selectedGroupId !== prevState.selectedGroupId && this.state.selectedGroupId !== "Выберите группу") {
            this.props.getSelectedGroupId(this.state.selectedGroupId)
        }
        if (this.state.currentMonth !== prevState.currentMonth) {
            this.props.getSelectedDate(this.state.currentMonth);
        }
    }

    onDateChange(e) {
        this.setState({
            currentMonth: new Date(e.target.value),
        });
    }

    onSelectGroup(e) {
        let groupId = e.target.value;
        this.setState({
            selectedGroupId: groupId,
        });
    }

    renderForm() {
        return (
            <div className="container">
                <div className="form">
                    <form>
                        <div className="form-group">
                            <label htmlFor="exampleMonth" className="label_month">Месяц</label>
                            <input
                                type="month"
                                className="form-control"
                                id="exampleMonth"
                                aria-describedby="monthHelp"
                                placeholder="Введите месяц"
                                value={this.state.currentMonth.toISOString().slice(0, 7)}
                                onChange={this.onDateChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="customSelect">Группа    </label>
                            <select className="custom-select form-control" onChange={this.onSelectGroup}
                                    value={this.state.selectedGroupId || undefined}
                                    id="customSelect">
                                <option value={undefined}>Выберите группу</option>
                                {this.props.groups.map(group => (
                                    <option value={group.guid} key={group.guid}>{group.name}</option>
                                ))}
                            </select>
                        </div>
                    </form>
                </div>
            </div>
        )
    }

    render() {
        // console.log("sorry, i am dumb component, my props is", this.props);
        return (<div>
                {this.renderForm()}
            </div>
        )
    }
}

export default Form;
