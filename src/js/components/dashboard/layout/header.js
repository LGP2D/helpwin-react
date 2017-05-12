import React from 'react';
import { Link } from 'react-router';

export default class Header extends React.Component {
    render () {

        return (
            <header>
                { /* TOP NAVBAR */ }
                <nav class='navbar navbar-default'>
                    <div class='container-fluid'>
                        <div class='navbar-btn'>
                            <button type='button' class='btn-toggle-fullwidth'>
                                <i class='ti ti-arrow-circle-left' />
                            </button>
                        </div>
                        <div class='navbar-header'>
                            <button type='button' class='navbar-toggle collapsed' data-toggle='collapse' data-target='#navbar-menu' aria-expanded='false'>
                                <span class='sr-only'>Toggle Navigation</span>
                                <i class='fa fa-bars icon-nav' />
                            </button>
                        </div>
                        <div id='navbar-menu' class='navbar-collapse collapse' aria-expanded='false'>
                            <form class='navbar-form navbar-left hidden-xs'>
                                <div class='input-group'>
                                    <input type='text' value='' class='form-control' placeholder='Search dashboard...' />
                                    <span class='input-group-btn'>
                                        <button type='button' class='btn btn-primary'>Go</button>
                                    </span>
                                </div>
                            </form>
                            <ul class='nav navbar-nav navbar-right'>
                                <li>
                                    <Link to='/' class='dropdown-toggle icon-menu'>
                                        <i class='ti ti-announcement' /> <span>Back to Home</span>
                                        { /* <span class='badge bg-danger'>5</span> */ }
                                    </Link>
                                </li>
                                <li class='dropdown'>
                                    <a href='#' class='dropdown-toggle' data-toggle='dropdown'>
                                        <i class='ti ti-help-alt' /> <span>Help</span>
                                        <i class='icon-submenu ti fa fa-caret-down' />
                                    </a>
                                    <ul class='dropdown-menu'>
                                        <li><a href='#'>Basic Use</a></li>
                                        <li><a href='#'>Working With Data</a></li>
                                        <li><a href='#'>Security</a></li>
                                        <li><a href='#'>Troubleshooting</a></li>
                                    </ul>
                                </li>
                                <li class='dropdown'>
                                    <a href='#' class='dropdown-toggle' data-toggle='dropdown'>
                                        <i class='img-circle ti ti-user' alt='Avatar' />
                                        <span> Samuel</span>
                                        <i class='icon-submenu lnr lnr-chevron-down' />
                                    </a>
                                    <ul class='dropdown-menu'>
                                        <li>
                                            <a href='#'><i class='lnr lnr-user' />
                                                <span> My Profile</span>
                                            </a>
                                        </li>
                                        <li>
                                            <a href='#'><i class='lnr lnr-envelope' />
                                                <span> Message</span>
                                            </a>
                                        </li>
                                        <li>
                                            <a href='#'><i class='lnr lnr-cog' />
                                                <span> Settings</span>
                                            </a>
                                        </li>
                                        <li><a href='#'><i class='lnr lnr-exit' />
                                            <span> Logout</span>
                                        </a>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </div>
                    { /* END TOP NAVBAR */ }
                </nav>
            </header>
        );
    }
}
