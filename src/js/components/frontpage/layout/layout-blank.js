import React from 'react';
import { Link } from 'react-router'
import Footer from './footer';
import Header from './header';

import { UserStore } from 'app/stores';
import { UserActions } from 'app/actions';

require('./layout-onepage.scss');

export default class LayoutBlank extends React.Component {
    constructor () {
        super();
    }

    static contextTypes = {
        router: React.PropTypes.object.isRequired
    };

    get headerItems () {
        let loggedIn = UserStore.isLoggedIn();
        return (
            <ul className='nav navbar-nav'>
                <li className='hidden'>
                    <a href='#page-top'/>
                </li>
                <li>
                    <a className='page-scroll' href='#'>About</a>
                </li>
                <li>
                    <Link className='page-scroll' to='/voluntlist'>Volunteering List</Link>
                </li>
                <li>
                    <Link className='page-scroll' to='/companyvoucher'>Company Voucher</Link>
                </li>
                <li>
                    <Link className='page-scroll' to='/vouchers'>Voucher</Link>
                </li>
                { !loggedIn &&
                <li>
                    <Link className='page-scroll' to='/register'>Register</Link>
                </li> }
                { !loggedIn &&
                <li>
                    <Link className='page-scroll' to='/login'>Login</Link>
                </li> }
                { loggedIn &&
                <li>
                    <Link className='page-scroll' to='/dashboard'>Welcome, { UserStore.getUserName }</Link>
                </li> }
                { loggedIn &&
                <li>
                    <a className='page-scroll' onClick={ this.handleLogout } href='#'>Logout</a>
                </li> }
            </ul>
        );
    }

    handleLogout = () => {
        UserActions.logout();
        this.context.router.push('/');
    };

    render () {
        return (
            <div>
                { /* Navigation */ }
                <nav className='navbar navbar-custom navbar-fixed-top top-nav-collapse' role='navigation'>
                    <div className='container'>
                        <div className='navbar-header'>
                            <button type='button' className='navbar-toggle' data-toggle='collapse'
                                    data-target='.navbar-main-collapse'>
                                Menu <i className='fa fa-bars'/>
                            </button>
                            <a className='navbar-brand page-scroll' href='#'>
                                <i className='fa fa-play-circle'/> <span className='light'>HELP</span> WIN
                            </a>
                        </div>
                        <div className='collapse navbar-collapse navbar-right navbar-main-collapse'>
                            { this.headerItems }
                        </div>
                        { /* /.navbar-collapse */ }
                    </div>
                    { /* /.container */ }
                </nav>
                <div class='blank-content'>
                    <div class='container'>
                        { this.props.children }
                    </div>
                </div>
                <Footer/>
            </div>
        );
    }
}
