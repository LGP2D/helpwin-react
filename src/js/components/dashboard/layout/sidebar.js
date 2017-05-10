import React from 'react';

export default class Sidebar extends React.Component {
    render () {
        const { paths } = this.props.route;

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
                                    <a key={ index }
                                       href={ paths.child ? null : paths.href }
                                       class={ paths.class }
                                       data-toggle={ paths.child ? 'collapse' : null }
                                       data-target='.sidebarCollapse'>
                                        <i class={ paths.icon }/> <span>{ paths.name }</span>
                                        { paths.child ? <i class='icon-submenu fa fa-caret-left'/> : '' }
                                    </a>
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
}
