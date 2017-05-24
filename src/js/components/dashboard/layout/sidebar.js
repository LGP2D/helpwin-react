import React from 'react';
import { Link } from 'react-router'

import CollaboratorRoutes from 'app/stores/sidebar-routes/sidebar-colab'
import VolunteerRoutes from 'app/stores/sidebar-routes/sidebar-volun'
import InstitutionRoutes from 'app/stores/sidebar-routes/sidebar-insti'
import CompanyRoutes from 'app/stores/sidebar-routes/sidebar-compa'

import { UserStore } from 'app/stores';

export default class Sidebar extends React.Component {

    render () {

        const { location } = this.props;
        const role = UserStore.getUserRole;
        const paths = this.getSidebar(location, role);

        return (
            <div id='sidebar-nav' class='sidebar'>
                <div class='brand'>
                    <Link to='/'>
                        HelpWin
                    </Link>
                </div>
                <div class='sidebar-scroll'>
                    <nav>
                        <ul class='nav'>
                            { /* Dynamically add sidebar content */ }
                            { paths.map((paths, index) => (
                                <li key={ index }>
                                    <Link key={ index }
                                          to={ paths.href }
                                          href={ paths.child ? null : paths.href }
                                          activeClassName='active'
                                          data-toggle={ paths.child ? 'collapse' : null }
                                          data-target='.sidebarCollapse' onlyActiveOnIndex>
                                        <i class={ paths.icon }/> <span>{ paths.name }</span>
                                        { paths.child ? <i class='icon-submenu fa fa-caret-left'/> : '' }
                                    </Link>

                                    <div class='collapse sidebarCollapse'>
                                        <ul class='nav'>
                                            { paths.child ? paths.child.map((child, index) => (
                                                <li key={ index }>
                                                    <a key={ index } href={ child.href } class=''>{ child.name }</a>
                                                </li>
                                            )) : '' }
                                        </ul>
                                    </div>
                                </li>
                            )) }
                        </ul>
                    </nav>
                </div>
            </div>
        );
    }

    getSidebar (location, role) {
        switch (role) {
            case 2:
                return InstitutionRoutes;
            case 4:
                return CompanyRoutes;
            case 1:
                return CollaboratorRoutes;
            default:
                return VolunteerRoutes;
        }
    }
}
