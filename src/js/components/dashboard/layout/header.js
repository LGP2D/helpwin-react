import React from 'react';
import { Link } from 'react-router';

import { UserActions } from 'app/actions';
import { UserStore } from 'app/stores';

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
                                    <input type='text' class='form-control' placeholder='Search dashboard...' />
                                    <span class='input-group-btn'>
                                        <button type='button' class='btn btn-primary disabled'>Go</button>
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
                                        <li><Link to='/'>Basic Use</Link></li>
                                    </ul>
                                </li>
                                <li class='dropdown'>
                                    <a href='#' class='dropdown-toggle' data-toggle='dropdown'>
                                        <i class='img-circle ti ti-user' alt='Avatar' />
                                        <span id='user-name'> { UserStore.getUserName !== null ?
                                            UserStore.getUserName : 'User' }</span>
                                        <i class='icon-submenu lnr lnr-chevron-down' />
                                    </a>
                                    <ul class='dropdown-menu'>
                                        <li>
                                            <Link to='/dashboard/volunteerProfile'><i class='lnr lnr-user' />
                                                <span> My Profile</span>
                                            </Link>
                                        </li>
                                        <li>
                                            <a href='#' onClick={ this.handleLogout }><i class='lnr lnr-exit' />
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

    handleLogout = () => {
        UserActions.logout();
        this.context.router.push('/');
    };
}
