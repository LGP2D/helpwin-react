import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, IndexRoute, hashHistory } from 'react-router';

import Layout from 'app/components/frontpage/layout/layout-onepage';
import LayoutBlank from 'app/components/frontpage/layout/layout-blank';

import UserStore from 'app/stores/userStore';

import FrontHome from 'app/pages/frontpage/home';
import Register from 'app/pages/frontpage/register';
import VolunteeringList from 'app/pages/frontpage/volunteering-list';
import GetVouchers from 'app/pages/frontpage/vouchersList';
import Login from 'app/pages/frontpage/login';
import CompanyVoucher from 'app/pages/frontpage/company-voucher';
import InstProp from 'app/pages/dashboard/listInstitutionProposals';


import DashLayout from 'app/components/dashboard/layout/layout';
import Sidebar from 'app/components/dashboard/layout/sidebar';

import CollaboratorHome from 'app/pages/dashboard/collaborator';
import VolunteerHome from 'app/pages/dashboard/volunteer';
import InstitutionHome from 'app/pages/dashboard/institution';
import CompanyHome from 'app/pages/dashboard/company';
import ListInstitution from 'app/pages/dashboard/list-institution';
import ListVouchers from 'app/pages/dashboard/list-vouchers';
import VolunteerProfile from 'app/pages/dashboard/volunteerProfile';
import VolunteerProposals from 'app/pages/dashboard/volunteerProposals';

const app = document.getElementById('app');

export default function requireAuth (role) {
    return(nextState, replace) => {
        let loggedIn = UserStore.isLoggedIn();
        let user = UserStore.getUser;
        if (!loggedIn) {
            replace({
                pathname: '/login',
                state: { nextPathname: nextState.location.pathname }
            });
        }
        else if(1 <= role) { // should be user.role instead of 1
            replace({
                pathname: '/login',
                state: { nextPathname: nextState.location.pathname } // return UNAUTHORIZED
            });
        }
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

        <Route path='/dashboard' component={ DashLayout } >
            /* Home pages */
            <IndexRoute components={ { main: VolunteerHome, sidebar: Sidebar } } />
            <Route path='collaborator' components={ { main: CollaboratorHome, sidebar: Sidebar } } onEnter={ requireAuth(4) } />
            <Route path='institution' components={ { main: InstitutionHome, sidebar: Sidebar } } />
            <Route path='company' components={ { main: CompanyHome, sidebar: Sidebar } } />
            /* Content pages */
            <Route path='list-institutions' components={ { main: ListInstitution, sidebar: Sidebar } } />
            <Route path='volunteerProfile' components={ { main: VolunteerProfile, sidebar: Sidebar } } />
            <Route path='proposals-volunteer' components={ { main: VolunteerProposals, sidebar: Sidebar } } />
            <Route path='vouchers' components={ { main: ListVouchers, sidebar: Sidebar } } />
            <Route path='institutionProps' components={ { main: InstProp, sidebar: Sidebar } } />

        </Route>

        <Route path='/register' component={ LayoutBlank }>
            <IndexRoute component={ Register }/>
        </Route>

        <Route path='/vouchers' component={ LayoutBlank }>
            <IndexRoute component={ GetVouchers }/>
        </Route>

        <Route path='/login' component={ LayoutBlank }>
            <IndexRoute component={ Login }/>
        </Route>

        <Route path='/companyvoucher' component={ LayoutBlank }>
            <IndexRoute component={ CompanyVoucher }/>
        </Route>

        <Route path='/voluntlist' component={ LayoutBlank }>
            <IndexRoute component={ VolunteeringList }/>
        </Route>

    </Router>,
    app
);
