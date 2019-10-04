import React, {Component} from "react";
import {Redirect, Route} from "react-router-dom";
import {ErrorPage} from "./ErrorPage";
import {connect} from "react-redux";

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hasError: false,
        }
    }


    componentDidCatch(error, errorInfo) {
        this.setState({
            hasError: true,
            error: error
        })
    }

//                {/*<div>Упс, что-то пошло не так :(</div> */}
//{/*<Redirect to="/error_page"/>*/}

    render() {
        console.log("error boundary", console.log(this.state));
        return (<Route path="/error_page">{
            this.state.hasError ? <div>
                    <ErrorPage/>
                </div>
                : this.props.children}</Route>)
    }
}


export default connect(
    state => state
)(ErrorBoundary);