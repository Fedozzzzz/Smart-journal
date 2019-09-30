import React from "react"

export const GroupCreatingWeekSchedule = (props) => {
    return (<div>
        <label
            htmlFor="example-text-input"
            className="col-xs-2 col-form-label"> Расписание :</label>
        <div className="create-group__schedule-table">
            <table className='table table-striped table-bordered'>
                <thead>
                <tr>
                    <th>ПН</th>
                    <th>ВТ</th>
                    <th>СР</th>
                    <th>ЧТ</th>
                    <th>ПТ</th>
                    <th>СБ</th>
                    <th>ВС</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    {renderCheckBoxes(props)}
                </tr>
                <tr>
                    {renderStartTimeInputs(props)}
                </tr>
                </tbody>
            </table>
        </div>

    </div>)
};

function renderCheckBoxes(props) {
    let result = [];
    for (let i = 0; i < 7; i++) {
        result.push(<td>
            <form>
                <input className="form-check-input"
                       type="checkbox"
                       onChange={props.handleCheckboxesChange}
                       id={i + "cb"}
                       name="cbName"
                       aria-label="..."/>
            </form>
        </td>)
    }
    return result;
}


function renderStartTimeInputs(props) {
    let result = [];
    for (let i = 0; i < 7; i++) {
        result.push(<td>
            <input
                className="form-control cell"
                type="time"
                id={i + "stForm"}
                name="startTimes"
                disabled={!props.props.checkboxes.get(i + "cb")}
                onChange={props.handleStartTimesInputsChange}
            />
        </td>)
    }
    return result;
}