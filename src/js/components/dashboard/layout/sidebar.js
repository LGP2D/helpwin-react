import React from 'react';
import { Link } from 'react-router'

import CollaboratorRoutes from 'app/stores/sidebar-routes/sidebar-colab'
import VolunteerRoutes from 'app/stores/sidebar-routes/sidebar-volun'
import InstitutionRoutes from 'app/stores/sidebar-routes/sidebar-insti'
import CompanyRoutes from 'app/stores/sidebar-routes/sidebar-compa'

export default class Sidebar extends React.Component {

    render () {

        const { location } = this.props;
        const role = 1;
        const paths = this.getSidebar(location, role);

        return (
            <div id='sidebar-nav' class='sidebar'>
                <div class='brand'>
                    HelpWin
                    { /*<a href='index.html'>
                     <img src='http://image.prntscr.com/image/e1343e51b8834758bf5c00bf0fcd22e0.png'
                     alt='logo' class='img-responsive logo'/>
                     </a>*/ }
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
                                          data-target='.sidebarCollapse'>
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

    getSidebar(location, role) {
        switch (role) {
            case 3:
                return InstitutionRoutes;
            case 2:
                return CompanyRoutes;
            case 1:
                return CollaboratorRoutes;
            default:
                return VolunteerRoutes;
        }
    }
}
