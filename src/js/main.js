import React from "react";
import ReactDOM from "react-dom";
import {Router, Route, IndexRoute, hashHistory} from 'react-router';

import Layout from "./components/frontpage/layout/Layout";
import FrontHome from "./components/frontpage/pages/Home";
import DashHome from "./components/dashboard/pages/Home";
import Register from "./components/registerForm/layout/Register"

const app = document.getElementById('app');

ReactDOM.render(
    <Router history={hashHistory}>
        <Route path="/" component={Layout}>
            <IndexRoute component={FrontHome}/>
        </Route>
        <Route path="/dashboard" component={Layout}>
            <IndexRoute component={DashHome}/>
        </Route>
        <Route path="/register" component={Layout}>
            <IndexRoute component={Register}/>
        </Route>
    </Router>,
    app
);
