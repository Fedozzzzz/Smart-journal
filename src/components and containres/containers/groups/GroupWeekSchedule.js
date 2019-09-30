import React from "react"

export const GroupWeekSchedule = (props) => (<div>
    <div>Расписание:</div>
    <table className='table table-striped table-bordered'>
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
            {renderSchedule(props.groupById)}
        </tr>
        </tbody>
    </table>
</div>);


function renderSchedule(props) {
    let res = [];
    for (let i = 0; i < 7; i++) {
        res.push(<td key={i}
                     className={props.days[i] ? "cell_active" : "cell"}>
            {props.startTimes[i]}
        </td>)
    }
    return res;
}