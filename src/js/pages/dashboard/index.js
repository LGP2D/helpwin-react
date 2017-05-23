import React from 'react';

import UserStore from 'app/stores/userStore';

import CollaboratorHome from 'app/pages/dashboard/collaborator';
import VolunteerHome from 'app/pages/dashboard/volunteer';
import InstitutionHome from 'app/pages/dashboard/institution';
import CompanyHome from 'app/pages/dashboard/company';

export default class DashboardIndex extends React.Component {

    constructor () {
        super();
    }

    render () {
        switch (UserStore.getUserRole) {
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
