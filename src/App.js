import React from 'react';
import {Route} from 'react-router-dom';
import Layout from './components/Layout';
import MainTable from "./components/MainTable"
import Schedule from "./components/schedule/Schedule";
import Groups from "./components/groups/Groups";
import Home from "./components/Home";
import Users from "./components/users/Users";

export default () => (
    <Layout>
        <Route exact path='/' component={Home}/>
        <Route path='/payment' component={MainTable}/>
        <Route path='/schedule' component={Schedule}/>
        <Route path='/groups' component={Groups}/>
        <Route path='/users' component={Users}/>
    </Layout>
);
