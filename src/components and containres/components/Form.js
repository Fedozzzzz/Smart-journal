import React, {Component} from "react"

class Form extends Component {

    //getSelectedGroupId, getSelectedDate and groups should be passed with props

    constructor(props, ctx) {
        super(props, ctx);
        this.state = {
            selectedGroupId: null,
            selectedMonth: new Date(),
        };
        this.renderForm = this.renderForm.bind(this);
        this.onDateChange = this.onDateChange.bind(this);
        this.onSelectGroup = this.onSelectGroup.bind(this);
    }

    componentWillReceiveProps(nextProps, nextContext) {
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.state.selectedGroupId !== prevState.selectedGroupId && this.state.selectedGroupId !== "Выберите группу") {
            this.props.getSelectedGroupId(this.state.selectedGroupId)
        }
        if (this.state.selectedMonth !== prevState.selectedMonth) {
            this.props.getSelectedDate(this.state.selectedMonth);
        }
    }

    onDateChange(e) {
        if (this.props.isEdit) {
            if (window.confirm("Внимание!!! Предыдущие действия не сохранятся! Вы уверены, что хотите продолжить?")) {
                this.setState({
                    selectedMonth: new Date(e.target.value),
                });
            }
        } else this.setState({
            selectedMonth: new Date(e.target.value),
        });
    }

    onSelectGroup(e) {
        let groupId = e.target.value;
        if (this.props.isEdit) {
            if (window.confirm("Внимание!!! Предыдущие действия не сохранятся! Вы уверены, что хотите продолжить?")) {
                this.setState({
                    selectedGroupId: groupId,
                });
            }
        } else this.setState({
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
                                value={this.state.selectedMonth.toISOString().slice(0, 7)}
                                onChange={this.onDateChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="customSelect">Группа </label>
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
