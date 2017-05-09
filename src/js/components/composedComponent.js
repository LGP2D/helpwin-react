import React from 'react';
import UserStore from 'app/stores/userStore';

export default ComposedComponent => {
    return class AuthenticatedComponent extends React.Component {

        static contextTypes = {
            router: React.PropTypes.object.isRequired
        };

        static willTransitionTo() {
            if (!UserStore.isLoggedIn()) {
                this.contextTypes.router.push('/login');
            }
        }

        constructor () {
            super();

            this.loggedIn = UserStore.isLoggedIn();
        }


        render () {
            return (
                <ComposedComponent
                    {...this.props}
                    loggedIn={ this.loggedIn }/>
            );
        }
    }
}
