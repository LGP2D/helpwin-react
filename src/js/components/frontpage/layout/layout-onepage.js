import React from 'react';

import Footer from './footer';
import Header from './header';

import './layout-onepage.scss';

export default class Layout extends React.Component {

    componentDidMount () {
        window.addEventListener('scroll', this.handleScroll.bind(null, this.refs.navbar), false);
    }

    componentWillUnmount () {
        window.removeEventListener('scroll', this.handleScroll.bind(null, this.refs.navbar), false);
    }

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
                <nav class='navbar navbar-custom navbar-fixed-top' role='navigation'
                     onScroll={ this.handleScroll.bind(this) } ref='navbar'>
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
                                    <a class='page-scroll' href='#/companyvoucher'>Company Voucher</a>
                                </li>
                            </ul>
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
