import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, IndexRoute, hashHistory } from 'react-router';

import Layout from "app/components/frontpage/layout/Layout";
import FrontHome from "app/pages/frontpage/home";
import DashHome from "app/pages/dashboard/Home";
import Register from "app/pages/frontpage/register"

const app = document.getElementById('app');

ReactDOM.render(
    <Router history={ hashHistory }>
        <Route path='/' component={ Layout }>
            <IndexRoute component={ FrontHome }/>
        </Route>
        <Route path='/dashboard' component={ Layout }>
            <IndexRoute component={ DashHome }/>
        </Route>
        <Route path='/register' component={ Layout }>
            <IndexRoute component={ Register }/>
        </Route>
    </Router>,
    app
);
