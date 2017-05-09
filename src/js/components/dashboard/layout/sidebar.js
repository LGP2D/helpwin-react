import React from 'react';

export default class Header extends React.Component {
    render () {

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
                            <li>
                                <a href='index.html' class='active'>
                                    <i class='ti ti-home'/> <span>Dashboard</span>
                                </a>
                            </li>
                            <li>
                                <a href='elements.html' class=''>
                                    <i class='ti ti-comment'/> <span>Elements</span>
                                </a>
                            </li>
                            <li>
                                <a href='charts.html' class=''>
                                    <i class='ti ti-bar-chart-alt'/> <span>Charts</span>
                                </a>
                            </li>
                            <li>
                                <a href='panels.html' class=''>
                                    <i class='ti ti-panel'/> <span>Panels</span>
                                </a>
                            </li>
                            <li>
                                <a href='notifications.html' class=''>
                                    <i class='ti ti-announcement'/> <span>Notifications</span>
                                </a>
                            </li>
                            <li>
                                <a href='#subPages' data-toggle='collapse' class='collapsed'>
                                    <i class='ti ti-file'/> <span>Pages</span>
                                    <i class='icon-submenu fa fa-caret-left'/>
                                </a>
                                <div id='subPages' class='collapse '>
                                    <ul class='nav'>
                                        <li><a href='page-profile.html' class=''>Profile</a></li>
                                        <li><a href='page-login.html' class=''>Login</a></li>
                                        <li><a href='page-lockscreen.html' class=''>Lockscreen</a></li>
                                    </ul>
                                </div>
                            </li>
                            <li>
                                <a href='tables.html' class=''>
                                    <i class='ti ti-layout'/> <span>Tables</span>
                                </a>
                            </li>
                            <li>
                                <a href='typography.html' class=''>
                                    <i class='ti ti-text'/> <span>Typography</span>
                                </a>
                            </li>
                            <li>
                                <a href='icons.html' class=''>
                                    <i class='ti ti-image'/> <span>Icons</span>
                                </a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        );
    }
}
