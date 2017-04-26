import React from "react";

export default class Header extends React.Component {
    render() {
        const footerStyles = {
            marginTop: "30px",
        };

        return (
            <header style={footerStyles}>
                This is our header
            </header>
        );
    }
}
