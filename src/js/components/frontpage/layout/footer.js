import React from "react";

export default class Footer extends React.Component {
    render() {
        const footerStyles = {
            marginTop: "30px",
        };

        return (
            <footer style={footerStyles}>
                This is our footer
            </footer>
        );
    }
}
