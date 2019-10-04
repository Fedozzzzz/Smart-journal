import React from "react"
import "../../../css/ErrorPage.css"

export const ErrorPage = () => {
    // console.log("error");
    return (<div>
        <div className="container">
            <div className="error-page">
                <div>
                    <h1>Ошибка...</h1>
                    <p className="error-page__msg">Упс! Что-то пошло не так <br/>:(</p>
                    <a href="/" className="btn btn-primary error-page__btn">
                        Вернуться на главную страницу
                    </a>
                </div>
            </div>
        </div>
    </div>)
};
