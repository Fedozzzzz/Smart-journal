import React, {Component} from "react"
import {Route} from "react-router-dom";
import {connect} from "react-redux";
import {ErrorPage} from "./ErrorPage";


class ErrorRoute extends Component {
    render() {
        return (<Route path="/error_page" component={ErrorPage}/>)
    }
}

export default connect(
    state => {
        return state;
    }
)(ErrorRoute)