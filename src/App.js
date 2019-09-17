import React from 'react';
import {Route} from 'react-router-dom';
import Layout from './components/Layout';
import MainTable from "./components/MainTable"
import Schedule from "./components/Schedule";
import Groups from "./components/groups and users/Groups";
import Home from "./components/Home";

export default () => (
    <Layout>
        <Route exact path='/' component={Home}/>
        <Route path='/payment' component={MainTable}/>
        <Route path='/schedule' component={Schedule}/>
        <Route path='/groups' component={Groups}/>
    </Layout>
);
