import { EventEmitter } from 'events';
import dispatcher from 'app/dispatcher/dispatcher';
import axios from 'axios';
import config from './config';
import jwt_decode from 'jwt-decode';
import bcrypt from 'bcryptjs';

class UserStore extends EventEmitter {
    constructor () {
        super();

        this.userData = JSON.parse(localStorage.getItem('userData'));
        this.jwt = this.userData !== null ? this.userData.token : null;
        this.user = this.jwt !== null ? jwt_decode(this.jwt) : null;
        this.name = this.userData !== null ? this.userData.name : null;
        this.imageUrl = this.userData !== null ? this.userData.imageUrl : null;

        this.autoLogin();
    }

    autoLogin () {
        let userData = JSON.parse(localStorage.getItem('userData'));
        if (userData) {
            this.jwt = userData.token;
            this.user = jwt_decode(this.jwt);
            this.name = userData !== null ? userData.name : null;

            this.handleLoginToken(this.jwt);
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
            this.emit('AUTO_LOGIN');
        }).catch(error => {
            localStorage.removeItem('userData');
            console.log(error);
        });
    }

    handleActions (action) {
        switch (action.type) {
            case 'REGISTER_USER': {
                let hash = bcrypt.hashSync(action.user.password, '$2a$10$w2Avr1TOt5f00mKZvvHot.');
                action.user.password = hash;
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
                let hash = bcrypt.hashSync(action.password, '$2a$10$w2Avr1TOt5f00mKZvvHot.');
                let email = action.email;
                let password = hash;
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
                    localStorage.setItem('userData', JSON.stringify(response.data));

                    this.userData = response.data;
                    this.jwt = response.data.token;
                    this.user = jwt_decode(this.jwt);
                    this.name = response.data.name;
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
                localStorage.removeItem('userData');
                this.emit('LOGOUT_USER');
                break;
            }
            case 'UPLOAD_IMAGE': {
                let file = action.image;
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
            case 'EDIT_USER': {
                let hash = bcrypt.hashSync(action.user.password, '$2a$10$w2Avr1TOt5f00mKZvvHot.');
                action.user.password = hash;
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
        }
    }

    get getJwt () { return this.jwt; }

    get getUser () { return this.user; }

    get getUserName () { return this.name; }

    get getUserData () { return this.userData; }

    get getUserImage () { return this.imageUrl; }

    get getUserRole () {return this.userData.role.id; }

    isLoggedIn () { return !!this.user; }
}

const userStore = new UserStore;
dispatcher.register(userStore.handleActions.bind(userStore));

export default userStore;
