import { EventEmitter } from 'events';
import dispatcher from 'app/dispatcher/dispatcher';
import axios from 'axios';
import config from './config';

class UserStore extends EventEmitter {
    constructor () {
        super();
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
                let data = {
                    email: action.email,
                    password: action.password
                };
                axios({
                    method: 'post',
                    url: config.API_URL + 'user/login',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    data: { data }
                }).then(response => {
                    //Save token to local storage
                    localStorage.setItem('jwt', response.data.token);
                    this.emit('LOGIN_SUCCESS');
                }).catch(error => {
                    console.log(error);
                    this.emit('LOGIN_ERROR');
                });
                break;
            }
            default:
                console.log('Action not found in userStore');
                break;
        }
    }
}

const userStore = new UserStore;
dispatcher.register(userStore.handleActions.bind(userStore));

export default userStore;
