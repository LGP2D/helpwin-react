import React from 'react';
import Footer from './footer';
import Header from './header';

import UserStore from 'app/stores/userStore';

require('./layout-onepage.scss');

export default class LayoutBlank extends React.Component {
    constructor () {
        super();
    }

    get headerItems () {
        let loggedIn = UserStore.isLoggedIn();
        if (!loggedIn) {
            return (
                <ul class='nav navbar-nav'>
                    <li class='hidden'>
                        <a href='#page-top'/>
                    </li>
                    <li>
                        <a class='page-scroll' href='#'>About</a>
                    </li>
                    <li>
                        <a class='page-scroll' href='#/voluntlist'>Volunteering List</a>
                    </li>
                    <li>
                        <a class='page-scroll' href='#/register'>Register</a>
                    </li>
                    <li>
                        <a class='page-scroll' href='#/login'>Login</a>
                    </li>
                </ul>
            );
        } else {
            let username = UserStore.getUser.sub;
            return (
                <ul class='nav navbar-nav'>
                    <li class='hidden'>
                        <a href='#page-top'/>
                    </li>
                    <li>
                        <a class='page-scroll' href='#'>About</a>
                    </li>
                    <li>
                        <a class='page-scroll' href='#/voluntlist'>Volunteering List</a>
                    </li>
                    <li>
                        <a class='page-scroll' href='#/register'>Register</a>
                    </li>
                    <li>
                        <a class='page-scroll' href='#'>Welcome, { username }</a>
                    </li>
                </ul>
            );
        }
    }

    render () {
        return (
            <div>
                { /* Navigation */ }
                <nav class='navbar navbar-custom navbar-fixed-top top-nav-collapse' role='navigation'>
                    <div class='container'>
                        <div class='navbar-header'>
                            <button type='button' class='navbar-toggle' data-toggle='collapse'
                                    data-target='.navbar-main-collapse'>
                                Menu <i class='fa fa-bars'/>
                            </button>
                            <a class='navbar-brand page-scroll' href='#'>
                                <i class='fa fa-play-circle'/> <span class='light'>HELP</span> WIN
                            </a>
                        </div>

                        <div class='collapse navbar-collapse navbar-right navbar-main-collapse'>
                            { this.headerItems }
                        </div>
                        { /* /.navbar-collapse */ }
                    </div>
                    { /* /.container */ }
                </nav>
                <div class='blank-content'>
                    { this.props.children }
                </div>
                <Footer/>
            </div>
        );
    }
}
