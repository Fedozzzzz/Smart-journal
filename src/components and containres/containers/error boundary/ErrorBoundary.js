import React, {Component} from "react";
import {Redirect, Route} from "react-router-dom";
import {ErrorPage} from "../../components/error boundary/ErrorPage";
import {connect} from "react-redux";

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hasError: false,
            // serverError: false
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps, nextContext) {
        console.log("error boundary receive props", nextProps);
        if (nextProps.group.error) {
            this.setState({
                hasError: true,
                error: nextProps.group.error
            })
        } else if (nextProps.user.error) {
            this.setState({
                hasError: true,
                error: nextProps.user.error
            })
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
        console.log("props", this.props);
        console.log("error boundary", console.log(this.state));
        return (
            <Route path="/error_page">{
                this.state.hasError ? <div>
                        <ErrorPage error={this.state.error}/>
                    </div>
                    // :
                    // this.state.serverError ? <div className="alert alert-danger" role="alert">
                    //     This is a danger alert—check it out!
                    // </div>
                    : this.props.children}</Route>)
    }
}


export default connect(
    state => state
)(ErrorBoundary);