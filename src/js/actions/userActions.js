import dispatcher from 'app/dispatcher/dispatcher';
import { REGISTER_USER, LOGIN_USER } from './constants/userConstants';

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
