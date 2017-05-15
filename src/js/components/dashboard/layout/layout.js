import React from "react";

import Footer from "./footer";
import Sidebar from "./sidebar.js";
import Header from "./header";

require('./layout.scss');

export default class Layout extends React.Component {

    componentDidMount () {
        this.loadJS('./helper.js');
    }

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

    loadJS () {
        const script = document.createElement("script");
        script.id = 'helper-script';
        script.src = "assets/js/helper.js";
        script.async = true;
        if(document.getElementById("helper-script")) {
            this.removeElement(document.getElementById("helper-script"));
        }
        document.body.appendChild(script);
    }

    removeElement (element) {
        element && element.parentNode && element.parentNode.removeChild(element);
    }
}
