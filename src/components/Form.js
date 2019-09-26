import React, {Component} from "react"

export default (handlers) => {
    // console.log("hello from form component", this);
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
                            value={handlers.handlers.state.date.dateString}
                            onChange={handlers.handlers.onDateChange}
                        />
                    </div>
                    <select className="custom-select" onChange={handlers.handlers.onSelectGroup}>
                        <option selected>Выберите группу</option>
                        {handlers.handlers.props.group.groups.map(group => (
                            <option value={group.guid}>{group.name}</option>
                        ))}
                    </select>
                </form>
            </div>
            <div className="buttons">
                <button
                    onClick={handlers.handlers.onSubmit}
                    type="submit"
                    className="btn btn-primary"
                >Принять
                </button>
                {handlers.handlers.props.schedule.schedule ?
                    <button
                        onClick={handlers.handlers.onEdit}
                        type="redact"
                        className="btn btn-info"
                    >Редактировать таблицу
                    </button> : null}
                {handlers.handlers.props.schedule.isEdit ?
                    <button
                        onClick={handlers.handlers.onSave}
                        type="save"
                        className="btn btn-success"
                    >Сохранить
                    </button> : null
                }
            </div>
        </div>
    )
}
