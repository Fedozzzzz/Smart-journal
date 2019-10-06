import React, {Component} from "react"
import {connect} from "react-redux";


class Statistics extends Component{
    render() {
        return(<div>
            <h3>Статистика</h3>
        </div>)
    }
}

export default connect()(Statistics);