import React from 'react';
import Footer from './footer';
import Header from './header';

import UserStore from 'app/stores/userStore';
import UserActions from 'app/actions/userActions';

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
        if (!loggedIn) {
            return (
                <ul className='nav navbar-nav'>
                    <li className='hidden'>
                        <a href='#page-top'/>
                    </li>
                    <li>
                        <a className='page-scroll' href='#'>About</a>
                    </li>
                    <li>
                        <a className='page-scroll' href='#/voluntlist'>Volunteering List</a>
                    </li>
                    <li>
                        <a className='page-scroll' href='#/register'>Register</a>
                    </li>
                    <li>
                        <a className='page-scroll' href='#/login'>Login</a>
                    </li>
                </ul>
            );
        } else {
            return (
                <ul className='nav navbar-nav'>
                    <li className='hidden'>
                        <a href='#page-top'/>
                    </li>
                    <li>
                        <a className='page-scroll' href='#'>About</a>
                    </li>
                    <li>
                        <a className='page-scroll' href='#/voluntlist'>Volunteering List</a>
                    </li>
                    <li>
                        <a className='page-scroll' href='#/register'>Register</a>
                    </li>
                    <li>
                        <a className='page-scroll' href='#'>Welcome, { UserStore.getUserName }</a>
                    </li>
                    <li>
                        <a className='page-scroll' onClick={ this.handleLogout } href='#'>Logout</a>
                    </li>
                </ul>
            );
        }
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
                <div className='blank-content'>
                    <div className='container'>
                        { this.props.children }
                    </div>
                </div>
                <Footer/>
            </div>
        );
    }
}
