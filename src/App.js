import React from 'react';
import {Route, Switch} from 'react-router-dom';
import Layout from './components/Layout';
//import FetchData from './components/MainTable'
import MainTable from "./components/MainTable"
import Schedule from "./components/Schedule";
import Groups from "./components/Groups";
import Home from "./components/Home";

export default () => (
    <Layout>
        {/*<Switch>*/}
            <Route exact path='/' component={Home}/>
            <Route path='/payment' component={MainTable}/>
            <Route path='/schedule' component={Schedule}/>
            <Route path='/groups' component={Groups}/>
        {/*</Switch>*/}
    </Layout>
);
