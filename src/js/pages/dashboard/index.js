import React from 'react';

import { UserStore } from 'app/stores';

import CollaboratorHome from 'app/pages/dashboard/collaborator';
import VolunteerHome from 'app/pages/dashboard/volunteer';
import InstitutionHome from 'app/pages/dashboard/institution';
import CompanyHome from 'app/pages/dashboard/company';

export default class DashboardIndex extends React.Component {

    constructor () {
        super();
    }

    render () {
        let role = UserStore.getUserRole;

        switch (role) {
            case 2:
                return <InstitutionHome />;
            case 4:
                return <CompanyHome />;
            case 1:
                return <CollaboratorHome />;
            default:
                return <VolunteerHome />;
        }
    }
}
