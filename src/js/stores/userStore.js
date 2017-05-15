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
        this.name = null;
        this.userData = null;

        this.autoLogin();
    }

    autoLogin () {
        let jwt = localStorage.getItem('jwt');
        if (jwt) {
            this.jwt = jwt;
            this.user = jwt_decode(jwt);
            this.name = localStorage.getItem('name');

            this.handleLoginToken(jwt);
        }
    }

    handleLoginToken (token) {
        axios({
            method: 'post',
            url: config.API_URL + 'user/loginToken',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization' : token
            }
        }).then(response => {
            this.userData = response.data;
            console.log(response);
            console.log(this.userData);
            this.emit('AUTO_LOGIN');
        }).catch(error => {
            console.log(error);
        });    }

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
                    console.log(action.user);
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
                    localStorage.setItem('name', response.data.name);

                    this.jwt = response.data.token;
                    this.user = jwt_decode(this.jwt);
                    this.name = response.data.name;
                    this.userData = response.data;
                    console.log(this.userData);
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
                this.name = null;
                this.userData = null;
                localStorage.setItem('jwt', '');
                localStorage.setItem('name', '');
                this.emit('LOGOUT_USER');
                break;
            }
            case 'EDIT_USER': {
                axios({
                    method: 'put',
                    url: config.API_URL + 'user' + '/editProfile',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    data: action.user
                }).then(response => {
                    console.log(response);
                    this.emit('EDIT_USER');
                }).catch(error => {
                    console.log(error);
                });
                break;
            }
            default:
                console.log('Action not found in userStore');
                break;
        }
    }

    get getJwt () { return this.jwt; }

    get getUser () { return this.user; }

    get getUserName () { return this.name; }

    get getUserData () { return this.userData; }

    isLoggedIn () { return !!this.user; }
}

const userStore = new UserStore;
dispatcher.register(userStore.handleActions.bind(userStore));

export default userStore;
