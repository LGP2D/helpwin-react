import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, IndexRoute, hashHistory } from 'react-router';

import Layout from 'app/components/frontpage/layout/layout-onepage';
import LayoutBlank from 'app/components/frontpage/layout/layout-blank';
import FrontHome from 'app/pages/frontpage/home';
import Register from 'app/pages/frontpage/register';
import VolunteeringList from 'app/pages/frontpage/volunteering-list';
import GetVouchers from 'app/pages/frontpage/vouchersList'
import Login from 'app/pages/frontpage/login';
import UserStore from 'app/stores/userStore';
import DashLayout from 'app/components/dashboard/layout/layout'
import DashHome from 'app/pages/dashboard/home';
import CompanyVoucher from 'app/pages/frontpage/company-voucher';

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
        </Route>
        <Route path='/dashboard' component={ DashLayout }>
            <IndexRoute component={ DashHome }/>
        </Route>
        <Route path='/register' component={ LayoutBlank }>
            <IndexRoute component={ Register }/>
        </Route>
        <Route path='/vouchers' component={ LayoutBlank }>
            <IndexRoute component={ GetVouchers }/>
        </Route>
        <Route path='/voluntlist' component={ LayoutBlank }>
            <IndexRoute component={ VolunteeringList }/>
        </Route>
        <Route path='/login' component={ LayoutBlank }>
            <IndexRoute component={ Login }/>
        </Route>
        <Route path='/companyvoucher' component={ LayoutBlank }>
            <IndexRoute component={ CompanyVoucher }/>
        </Route>

    </Router>,
    app
);
