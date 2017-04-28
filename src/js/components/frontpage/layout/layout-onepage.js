import React from 'react';

import Footer from './footer';
import Header from './header';

import './layout-onepage.scss';

export default class Layout extends React.Component {
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
                { this.props.children }
                <Footer />
            </div>
        );
    }
}
