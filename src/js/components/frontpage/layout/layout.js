import React from "react";
import { Link } from "react-router";

import Footer from "./footer";
import Header from "./header";

export default class Layout extends React.Component {
    render() {
        const { location } = this.props;
        const layoutStyles = {
            textAlign: "center"
        };

        return (
            <div>
                <Header />
                    { this.props.children }
                <Footer />
            </div>

        );
    }
}
