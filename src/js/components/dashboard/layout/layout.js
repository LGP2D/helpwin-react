import React from "react";

import Footer from "./footer";
import Header from "./header";
import Sidebar from "./sidebar";

require('./layout.scss');
require('./helper.js');

export default class Layout extends React.Component {
    render () {
        const { location } = this.props;

        return (
            <div id='wrapper'>
                <Sidebar />
                <div class='main'>
                    <Header />
                    <div class='main-content'>
                        <div class='container-fluid'>
                            { this.props.children }
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}
