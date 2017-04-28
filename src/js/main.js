import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, IndexRoute, hashHistory } from 'react-router';

import Layout from 'app/components/frontpage/layout/layout-onepage';
import LayoutBlank from 'app/components/frontpage/layout/layout-blank';
import FrontHome from 'app/pages/frontpage/home';
import DashHome from 'app/pages/dashboard/home';
import Register from 'app/pages/frontpage/register'

const app = document.getElementById('app');

ReactDOM.render(
    <Router history={ hashHistory }>
        <Route path='/' component={ Layout }>
            <IndexRoute component={ FrontHome }/>
        </Route>
        <Route path='/dashboard' component={ Layout }>
            <IndexRoute component={ DashHome }/>
        </Route>
        <Route path='/register' component={ LayoutBlank }>
            <IndexRoute component={ Register }/>
        </Route>
    </Router>,
    app
);
