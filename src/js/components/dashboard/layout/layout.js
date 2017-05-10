import React from "react";

import Footer from "./footer";
import Sidebar from "./sidebar.js";
import Header from "./header";

require('./layout.scss');
require('./helper.js');

export default class Layout extends React.Component {
    render () {
        const { main, sidebar } = this.props;

        return (
            <div id='wrapper'>
                { sidebar }
                <div class='main'>
                    <Header />
                    <div class='main-content'>
                        <div class='container-fluid'>
                            { main }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
