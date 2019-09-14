import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import{actionCreators} from "../rubbish/Users";


const Home=props=>(
<div>
  <h1>Smart Journal</h1>
  <p>Welcome to the Smart Journal web-Application!</p>
</div>
);

export default connect()(Home);