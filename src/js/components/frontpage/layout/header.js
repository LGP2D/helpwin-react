import React from 'react';
import { Link, IndexLink } from 'react-router';

export default class Header extends React.Component {
    render () {
        return (
            <header class='intro'>
                <div class='img' />
                { /* Navigation */ }
                <nav class='navbar navbar-custom navbar-fixed-top' role='navigation'>
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
                                    <a class='page-scroll' href='#about'>About</a>
                                </li>
                                <li>
                                    <a class='page-scroll' href='#download'>Download</a>
                                </li>
                                <li>
                                    <a class='page-scroll' href='#contact'>Contact</a>
                                </li>
                                <li>
                                    <a class='page-scroll' href='#/register'>Register</a>
                                </li>
                            </ul>
                        </div>
                        { /* /.navbar-collapse */ }
                    </div>
                    { /* /.container */ }
                </nav>
                { /* Title */ }
                <div class='intro-body'>
                    <div class='container'>
                        <div class='row'>
                            <div class='col-md-8 col-md-offset-2'>
                                <h1 class='brand-heading'>Helpwin</h1>
                                <p class='intro-text'>
                                    Inovating the way volunteers change the world
                                </p>
                                <a href='#about' class='btn btn-circle page-scroll'>
                                    <i class='fa fa-angle-double-down animated' />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        );
    }
}
