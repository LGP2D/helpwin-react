import dispatcher from 'app/dispatcher/dispatcher';

export function registerUser (user) {
    dispatcher.dispatch({
        type: 'REGISTER_USER',
        user: user
    });
}
