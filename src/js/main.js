/**
 * How to add authentication?
 * Make your component's class extend AuthorizedComponent
 * Add to the imports: import AuthorizedComponent from 'app/components/dashboard/authorization';
 * In the constructor add:
 *
 * constructor () {
 *      super();
 *      this.authorize = [3]; // list of roles allowed
 *  }
 *
 *  If you are using the function componentWillMount make sure it HAS AT THE TOP:
 *  super.componentWillMount();
 *
 *  Ty!
 */
import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, IndexRoute, hashHistory } from 'react-router';

import Layout from 'app/components/frontpage/layout/layout-onepage';
import LayoutBlank from 'app/components/frontpage/layout/layout-blank';

import { UserStore } from 'app/stores';

import FrontHome from 'app/pages/frontpage/home';
import Register from 'app/pages/frontpage/register';
import VolunteeringList from 'app/pages/frontpage/volunteering-list';
import GetVouchers from 'app/pages/frontpage/vouchersList';
import Login from 'app/pages/frontpage/login';
import InstProp from 'app/pages/dashboard/listInstitutionProposals';
import Candidates from 'app/pages/dashboard/viewProposalCandidates';

import DashLayout from 'app/components/dashboard/layout/layout';
import Sidebar from 'app/components/dashboard/layout/sidebar';

import DashboardIndex from 'app/pages/dashboard';
import ListVouchers from 'app/pages/dashboard/companyVoucher';
import VolunteerProfile from 'app/pages/dashboard/volunteerProfile';
import VolunteerProposals from 'app/pages/dashboard/volunteerProposals';
import ListInstitution from 'app/pages/dashboard/list-institution';
import MyVolunteerProposals from 'app/pages/dashboard/myVolunteerProposals';
import ListVoucherCollaborator from 'app/pages/dashboard/list-vouchers-collab';
import ListCompanies from './pages/dashboard/list-companies';
import InsertAction from './pages/dashboard/insert-action';


const app = document.getElementById('app');

ReactDOM.render(

    <Router history={ hashHistory }>
        <Route path='/' component={ Layout }>
            <IndexRoute component={ FrontHome }/>
        </Route>

        <Route path='/dashboard' component={ DashLayout } >
            /* Home pages */
            <IndexRoute components={ { main: DashboardIndex, sidebar: Sidebar } } />
            /* Content pages */
            <Route path='list-institutions' components={ { main: ListInstitution, sidebar: Sidebar } } />
            <Route path='volunteerProfile' components={ { main: VolunteerProfile, sidebar: Sidebar } } />
            <Route path='proposals-volunteer' components={ { main: VolunteerProposals, sidebar: Sidebar } } />
            <Route path='my-proposals-volunteer' components={ { main: MyVolunteerProposals, sidebar: Sidebar } } />
            <Route path='vouchers' components={ { main: ListVouchers, sidebar: Sidebar } } />
            <Route path='institutionProps' components={ { main: InstProp, sidebar: Sidebar } } />
            <Route path='candidates/:id' components={ { main: Candidates, sidebar: Sidebar } } />
            <Route path='list-vouchers-collab' components={ { main: ListVoucherCollaborator, sidebar: Sidebar } } />
            <Route path='list-companies' components={ { main: ListCompanies, sidebar: Sidebar } } />
            <Route path='insert-action' components={ { main: InsertAction, sidebar: Sidebar } } />

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

        <Route path='/voluntlist' component={ LayoutBlank }>
            <IndexRoute component={ VolunteeringList }/>
        </Route>

    </Router>,
    app
);
