import React from "react"

export const GroupPageProfile = (props) => (<div className="m-2">
    <div className="row">
        <div className="col-sm-4">
            <p className="d-inline-block font-weight-light">Имя:</p>
            <p className="font-italic ml-2 d-inline-block">{props.groupById.name}</p>
        </div>
    </div>
    <div className="row">
        <div className="col-sm-4">
            <p className="d-inline-block font-weight-light">Цена за занятие:</p>
            <p className="font-italic ml-2 d-inline-block">{props.groupById.cost} руб.</p>
        </div>
    </div>
    <div className="row">
        <div className="col-sm-4">
            <p className="d-inline-block font-weight-light">Продолжительность занятия:</p>
            <p className="font-italic ml-2 d-inline-block">{props.groupById.duration} мин.</p>
        </div>
    </div>
</div>);