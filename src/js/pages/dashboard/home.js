import React from "react";

export default class Home extends React.Component {
    render() {
        const { location } = this.props;
        const layoutStyles = {
            textAlign: "center",
        };

        return (
            <div>
                <p>Yes, our dashboard is a cat, for now.</p>
                <img height="300px" src="https://static.pexels.com/photos/104827/cat-pet-animal-domestic-104827.jpeg" />
            </div>
        );
    }
}
