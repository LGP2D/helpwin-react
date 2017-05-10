import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, IndexRoute, hashHistory } from 'react-router';

import Layout from 'app/components/frontpage/layout/layout-onepage';
import LayoutBlank from 'app/components/frontpage/layout/layout-blank';

import FrontHome from 'app/pages/frontpage/home';
import Register from 'app/pages/frontpage/register';
import VolunteeringList from 'app/pages/frontpage/volunteering-list';

import DashLayout from 'app/components/dashboard/layout/layout';
import Sidebar from 'app/components/dashboard/layout/sidebar';

import CollaboratorHome from 'app/pages/dashboard/collaborator';
import VolunteerHome from 'app/pages/dashboard/volunteer';
import InstitutionHome from 'app/pages/dashboard/institution';
import CompanyHome from 'app/pages/dashboard/company';
import ListInstitution from 'app/pages/dashboard/list-institution';

const app = document.getElementById('app');

ReactDOM.render(

    <Router history={ hashHistory }>
        <Route path='/' component={ Layout }>
            <IndexRoute component={ FrontHome }/>
        </Route>

        <Route path='/dashboard' component={ DashLayout } >
            /* Home pages */
            <IndexRoute components={ { main: VolunteerHome, sidebar: Sidebar } } />
            <Route path='collaborator' components={ { main: CollaboratorHome, sidebar: Sidebar } } />
            <Route path='institution' components={ { main: InstitutionHome, sidebar: Sidebar } } />
            <Route path='company' components={ { main: CompanyHome, sidebar: Sidebar } } />
            /* Content pages */
            <Route path='list-institutions' components={ { main: ListInstitution, sidebar: Sidebar } } />
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
