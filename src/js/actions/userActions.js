import dispatcher from 'app/dispatcher/dispatcher';

export default {
    registerUser: (user) => {
        dispatcher.dispatch({
            type: 'REGISTER_USER',
            user: user
        });
    },

    loginUser: (email, password) => {
        dispatcher.dispatch({
            type: 'LOGIN_USER',
            email: email,
            password: password
        });
    }
}
