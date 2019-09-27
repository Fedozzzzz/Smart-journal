import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {actionCreators} from "../../rubbish/Users";


const Home = props => (
    <div>
        <h1>Smart Journal</h1>
        <p>Добро пожаловать в "Smart Journal"!</p>
    </div>
);

export default connect()(Home);