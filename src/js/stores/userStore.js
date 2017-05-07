import { EventEmitter } from 'events';
import dispatcher from 'app/dispatcher/dispatcher';
import axios from 'axios';
import config from './config';

class UserStore extends EventEmitter {
    constructor () {
        super();

        this.user = {
            name: '',
            email: ''
        };
    }

    getUser () {
        console.log('getUser', this.user);
        return this.user;
    }

    handleActions (action) {
        switch(action.type) {
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
                }).catch(error => {
                    console.log(error);
                });
                console.log('Register user ->', action.user);
            }
        }
    }
}

const userStore = new UserStore;
dispatcher.register(userStore.handleActions.bind(userStore));

export default userStore;
