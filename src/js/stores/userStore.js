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
        this.imageUrl = null;

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
            this.userData.imageUrl = config.API_STATIC_URL + response.data.imageUrl;
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
                    this.userData.imageUrl = config.API_STATIC_URL + response.data.imageUrl;
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
            case 'UPLOAD_IMAGE': {
                let file = action.image;
                console.log('file -> ', file);
                axios({
                    method: 'post',
                    url: config.API_URL + 'user/image',
                    headers:{
                      'Content-Type': 'application/json'
                    },
                    data: { file }
                }).then(response => {
                    console.log(response);
                    this.imageUrl = response.data;
                    this.emit('IMAGE_UPLOAD_SUCCESSFUL');
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

    get getUserImage () { return this.imageUrl; }

    isLoggedIn () { return !!this.user; }
}

const userStore = new UserStore;
dispatcher.register(userStore.handleActions.bind(userStore));

export default userStore;
