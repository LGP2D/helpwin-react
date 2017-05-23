import React from 'react';

import UserStore from 'app/stores/userStore';

class AuthorizedComponent extends React.Component {

    componentWillMount () {
        const { routes } = this.props; // array of routes
        const { router } = this.context;

        let userData = UserStore.getUserData();
        let loggedIn = UserStore.isLoggedIn();
        let userRole = UserStore.getUserRole;
        let role = this.props.route.role;
        console.log(role);
        if (!userData || !loggedIn) {
            // redirect to login if not
            router.push('/login');
        }
        else if(!userRole !== role) {
            // redirect to login if not
            router.push('/login');
        }
    }
}

export default AuthorizedComponent;
