import React, { PropTypes } from 'react';

import UserStore from 'app/stores/userStore';

class AuthorizedComponent extends React.Component {

    static contextTypes = {
        router: PropTypes.object.isRequired
    };

    constructor (props) {
        super(props);

        this.authorize = [];
    }

    componentWillMount () {
        const { router } = this.context;

        let userData = UserStore.getUserData;
        let loggedIn = UserStore.isLoggedIn;
        let userRole = UserStore.getUserRole;

        if (!userData || !loggedIn) {
            // redirect to login if not
            router.push('/login');
        }
        else if(this.authorize && this.authorize.length !== 0
            && this.authorize.indexOf(userRole) === -1) {
            // unauthorized
            router.push('/login');
        }
    }
}

export default AuthorizedComponent;
