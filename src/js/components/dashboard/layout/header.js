import React from 'react';
import { Link } from 'react-router';

import { UserActions } from 'app/actions';
import { UserStore } from 'app/stores';

export default class Header extends React.Component {
    render () {

        return (
            <header>
                { /* TOP NAVBAR */ }
                <nav className='navbar navbar-default'>
                    <div className='container-fluid'>
                        <div className='navbar-btn'>
                            <button type='button' className='btn-toggle-fullwidth'>
                                <i className='ti ti-arrow-circle-left' />
                            </button>
                        </div>
                        <div className='navbar-header'>
                            <button type='button' className='navbar-toggle collapsed' data-toggle='collapse' data-target='#navbar-menu' aria-expanded='false'>
                                <span className='sr-only'>Toggle Navigation</span>
                                <i className='fa fa-bars icon-nav' />
                            </button>
                        </div>
                        <div id='navbar-menu' className='navbar-collapse collapse' aria-expanded='false'>
                            <form className='navbar-form navbar-left hidden-xs'>
                                <div className='input-group'>
                                    { /*<input type='text' className='form-control' placeholder='Search dashboard...' />
                                     <span className='input-group-btn'>
                                         <button type='button' className='btn btn-primary disabled'>Go</button>
                                     </span>*/ }
                                </div>
                            </form>
                            <ul className='nav navbar-nav navbar-right'>
                                <li>
                                    <Link to='/' className='dropdown-toggle icon-menu'>
                                        <i className='fa fa-database coin' /> <span>{ UserStore.getUserData.credits }</span>
                                        { /* <span className='badge bg-danger'>5</span> */ }
                                    </Link>
                                </li>
                                <li>
                                    <Link to='/' className='dropdown-toggle icon-menu'>
                                        <i className='ti ti-announcement' /> <span>Home Page</span>
                                        { /* <span className='badge bg-danger'>5</span> */ }
                                    </Link>
                                </li>
                                <li className='dropdown'>
                                    <a href='#' className='dropdown-toggle' data-toggle='dropdown'>
                                        <i className='ti ti-help-alt' /> <span>Help</span>
                                        <i className='icon-submenu ti fa fa-caret-down' />
                                    </a>
                                    <ul className='dropdown-menu'>
                                        <li><Link to='/'>Basic Use</Link></li>
                                    </ul>
                                </li>
                                <li className='dropdown'>
                                    <a href='#' className='dropdown-toggle' data-toggle='dropdown'>
                                        <i className='img-circle ti ti-user' alt='Avatar' />
                                        <span id='user-name'> { UserStore.getUserName !== null ?
                                            UserStore.getUserName : 'User' }</span>
                                        <i className='icon-submenu lnr lnr-chevron-down' />
                                    </a>
                                    <ul className='dropdown-menu'>
                                        <li>
                                            <Link to='/dashboard/volunteerProfile'><i className='lnr lnr-user' />
                                                <span> My Profile</span>
                                            </Link>
                                        </li>
                                        <li>
                                            <a href='#' onClick={ this.handleLogout }><i className='lnr lnr-exit' />
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
