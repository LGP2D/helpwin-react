import React from 'react';
import { Link } from 'react-router'
import Footer from './footer';
import Header from './header';

import './layout-onepage.scss';

import UserStore from 'app/stores/userStore';
import UserActions from 'app/actions/userActions';

export default class Layout extends React.Component {
    constructor () {
        super();
    }

    componentDidMount () {
        window.addEventListener('scroll', this.handleScroll.bind(null, this.refs.navbar), false);
    }

    componentWillUnmount () {
        window.removeEventListener('scroll', this.handleScroll.bind(null, this.refs.navbar), false);
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
        const { location } = this.props;
        const layoutStyles = {
            position: 'absolute',
            width: '100%',
            height: '100%'
        };

        return (
            <div style={ layoutStyles }>
                <Header />
                { /* Navigation */ }
                <nav className='navbar navbar-custom navbar-fixed-top' role='navigation'
                     onScroll={ this.handleScroll.bind(this) } ref='navbar'>
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
                { this.props.children }
                <Footer />
            </div>
        );
    }

    handleScroll (navbar, event) {
        if(event.srcElement.body.scrollTop > 50) {
            navbar.classList.add('top-nav-collapse');
        }
        else {
            navbar.classList.remove('top-nav-collapse');
        }
    }
}
