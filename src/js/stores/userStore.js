import { EventEmitter } from 'events';
import dispatcher from 'app/dispatcher/dispatcher';
import axios from 'axios';
import config from './config';
import jwt_decode from 'jwt-decode';

class UserStore extends EventEmitter {
    constructor () {
        super();

        this.user = null;
        this.jwt = null;

        this.autoLogin();
    }

    autoLogin () {
        let jwt = localStorage.getItem('jwt');
        if (jwt) {
            this.jwt = jwt;
            this.user = jwt_decode(jwt);
        }
    }

    handleActions (action) {
        switch (action.type) {
            case 'REGISTER_USER': {
                axios({
                    method: 'post',
                    url: config.API_URL + 'user',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    data: action.user
                }).then(response => {
                    console.log(response);
                    this.emit('REGISTER_SUCCESS');
                }).catch(error => {
                    console.log(error);
                });
                break;
            }
            case 'LOGIN_USER': {
                let email = action.email;
                let password = action.password;
                axios({
                    method: 'post',
                    url: config.API_URL + 'user/login',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    data: { email, password }
                }).then(response => {
                    //Save token to local storage
                    localStorage.setItem('jwt', response.data.token);
                    this.jwt = response.data.token;
                    this.user = jwt_decode(this.jwt);
                    this.emit('LOGIN_SUCCESS');
                }).catch(error => {
                    console.log(error);
                    this.emit('LOGIN_ERROR');
                });
                break;
            }
            case 'LOGOUT_USER': {
                this.jwt = null;
                this.user = null;
                localStorage.setItem('jwt', '');
                this.emit('LOGOUT_USER');
                break;
            }
            default:
                console.log('Action not found in userStore');
                break;
        }
    }

    get getJwt () { return this.jwt; }

    get getUser () { return this.user; }

    get getUserName () { return this.user.sub; }

    isLoggedIn () { return !!this.user; }
}

const userStore = new UserStore;
dispatcher.register(userStore.handleActions.bind(userStore));

export default userStore;
