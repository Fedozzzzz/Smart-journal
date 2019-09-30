import React from 'react';
import {Route} from 'react-router-dom';
import Layout from './components and containres/components/Layout';
import MainTable from "./rubbish/MainTable"
import Schedule from "./components and containres/containers/schedule/Schedule";
import Groups from "./components and containres/containers/groups/Groups";
import Home from "./components and containres/components/Home";
import Users from "./components and containres/containers/users/Users";
import AttendanceAndPayments from "./components and containres/containers/attendance and payments/AttendanceAndPayments";

export default () => (
    <Layout>
        <Route exact path='/' component={Home}/>
        <Route path='/payment_management' component={AttendanceAndPayments}/>
        <Route path='/schedule' component={Schedule}/>
        <Route path='/groups' component={Groups}/>
        <Route path='/users' component={Users}/>
    </Layout>
);
