import React from "react";
import { IndexLink, Link } from "react-router";

export default class Home extends React.Component {
    render() {
        const { location } = this.props;
        const layoutStyles = {
            textAlign: "center",
        };

        return (
            <div>
                <p>The duck is a grown up boy!</p>
                <p>Click <Link to="dashboard">here</Link> to see our dashboard</p>
                <img height="300px" src="http://cdn.wallpapersafari.com/70/4/zw9v0o.jpg" />
            </div>
        );
    }
}
