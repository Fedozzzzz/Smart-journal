import React, {Component} from "react"

class Search extends Component {
    render() {
        return (
            <div>
                <form className="form-inline">
                    <input className="form-control m-0" type="search" placeholder="Поиск" aria-label="Search"/>
                    <button className="btn btn-outline-success my-2" type="submit">Найти</button>
                </form>
            </div>
        )
    }
}

export default Search;