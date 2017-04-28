import React from 'react';
import Footer from './footer';
import Header from './header'

import './layout-onepage.scss';

export default class LayoutBlank extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div>
                <Header/>
                { this.props.children }
                <Footer/>
            </div>
        );
    }
}
