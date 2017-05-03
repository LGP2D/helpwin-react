import React from 'react';
import { Link, IndexLink } from 'react-router';

export default class Header extends React.Component {
    render () {
        return (
            <header class='intro'>
                <div class='img' />
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
