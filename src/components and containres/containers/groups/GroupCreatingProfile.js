import React from "react"

export const GroupCreatingProfile = (props) => (<div>
    <form className="form-inline">
        <label htmlFor="example-text-input"
               className="col-xs-4 col-form-label">Название</label>
        <div className="col-xs-10">
            <input className="form-control"
                   type="text"
                   placeholder="Введите название"
                   id='groupName'
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
                   onChange={props.handleInputChange}
            />
        </div>
    </form>
</div>);
