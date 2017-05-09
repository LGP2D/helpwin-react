import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, IndexRoute, hashHistory } from 'react-router';

import Layout from 'app/components/frontpage/layout/layout-onepage';
import LayoutBlank from 'app/components/frontpage/layout/layout-blank';
import FrontHome from 'app/pages/frontpage/home';
import Register from 'app/pages/frontpage/register';
import VolunteeringList from 'app/pages/frontpage/volunteering-list';

import DashLayout from 'app/components/dashboard/layout/layout'
import DashHome from 'app/pages/dashboard/home';

const app = document.getElementById('app');

ReactDOM.render(
    <Router history={ hashHistory }>
        <Route path='/' component={ Layout }>
            <IndexRoute component={ FrontHome }/>
        </Route>
        <Route path='/dashboard' component={ DashLayout }>
            <IndexRoute component={ DashHome }/>
        </Route>
        <Route path='/register' component={ LayoutBlank }>
            <IndexRoute component={ Register }/>
        </Route>
        <Route path='/voluntlist' component={ LayoutBlank }>
            <IndexRoute component={ VolunteeringList }/>
        </Route>
    </Router>,
    app
);
