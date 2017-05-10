import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, hashHistory, Redirect } from 'react-router';

import Layout from 'app/components/frontpage/layout/layout-onepage';
import LayoutBlank from 'app/components/frontpage/layout/layout-blank';
import FrontHome from 'app/pages/frontpage/home';
import DashHome from 'app/pages/dashboard/home';
import Register from 'app/pages/frontpage/register';
import VolunteeringList from 'app/pages/frontpage/volunteering-list';
import Login from 'app/pages/frontpage/login';

import UserStore from 'app/stores/userStore';

const app = document.getElementById('app');

export default function requireAuth (nextState, replace) {
    let loggedIn = UserStore.isLoggedIn();
    if (!loggedIn) {
        replace({
            pathname: '/login',
            state: { nextPathname: nextState.location.pathname }
        });
    }
};
/**
 * Auth guard is not on any of the pages as of right now.
 * If you wish to use it, just type onEnter on the route and direct it to { requireAuth }
 * E.g <IndexRoute component={ VolunteeringList } onEnter={ requireAuth }
 */
ReactDOM.render(
    <Router history={ hashHistory }>
        <Route path='/' component={ Layout }>
            <IndexRoute component={ FrontHome }/>
            <Route path='/dashboard' component={ DashHome }/>
        </Route>
        <Route path='/register' component={ LayoutBlank }>
            <IndexRoute component={ Register }/>
        </Route>
        <Route path='/voluntlist' component={ LayoutBlank }>
            <IndexRoute component={ VolunteeringList }/>
        </Route>
        <Route path='/login' component={ LayoutBlank }>
            <IndexRoute component={ Login }/>
        </Route>
    </Router>,
    app
);
