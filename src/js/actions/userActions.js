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
    },

    logout: () => {
        dispatcher.dispatch({
            type: 'LOGOUT_USER'
        });
    },

    saveImage: (image) => {
        dispatcher.dispatch({
            type: 'UPLOAD_IMAGE',
            image: image
        });
    },

    editUser: (user) => {
        dispatcher.dispatch({
            type: 'EDIT_USER',
            user: user
        });
    }
}
