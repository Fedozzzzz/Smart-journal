import React from "react"

export const GroupCreatingProfile = (props) => {
    console.log("props profile", props);
    return (<div>
        <form className="form-inline">
            <label htmlFor="example-text-input"
                   className="col-xs-4 col-form-label">Название</label>
            <div className="col-xs-10">
                <input className="form-control"
                       type="text"
                       placeholder="Введите название"
                       id='groupName'
                       defaultValue={props.groupById ? props.groupById.name : null}
                       onChange={props.handleInputChange}
                />
            </div>
        </form>
        <form className="form-inline">
            <label htmlFor="example-text-input"
                   className="col-xs-2 col-form-label">Цена за
                занятие</label>
            <div className="col-xs-10">
                <input className="form-control"
                       type="number"
                       placeholder="Цена за занятие"
                       id='cost'
                       defaultValue={props.groupById ? props.groupById.cost : null}
                       onChange={props.handleInputChange}
                />
            </div>
        </form>
        <form className="form-inline">
            <label htmlFor="example-text-input"
                   className="col-xs-4 col-form-label">Продолжительность
                занятия</label>
            <div className="col-xs-10">
                <input className="form-control"
                       type="number"
                       placeholder="Продолжительность (в мин.)"
                       id='duration'
                       defaultValue={props.groupById ? props.groupById.duration : null}
                       onChange={props.handleInputChange}
                />
            </div>
        </form>
    </div>);
}