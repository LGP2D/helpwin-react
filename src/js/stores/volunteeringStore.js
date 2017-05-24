import { EventEmitter } from 'events';
import dispatcher from 'app/dispatcher/dispatcher';
import axios from 'axios';
import config from './config';

import { UserStore } from 'app/stores';

class VolunteeringStore extends EventEmitter {

    constructor () {
        super();

        this.data = [];
    }

    getActions () {
        return this.data;
    }

    handleActions (action) {
        switch (action.type) {
            case 'FETCH_DATA': {
                axios({
                    method: 'get',
                    url: config.API_URL + 'actions',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    }
                }).then(response => {
                    this.data = response.data;
                    console.log(this.data);
                    this.emit('UPDATE_VOLUNTEERING');
                }).catch(error => {
                    console.log(error);
                });
                break;
            }
            case 'APPLY_TO_ACTION': {
                console.log(UserStore.getJwt);
                axios({
                    method: 'post',
                    url: config.API_URL + 'actions/submit/' + action.actionId,
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'Authorization': UserStore.getJwt
                    }
                }).then(response => {
                    this.data = response.data;
                    console.log(this.data);
                    this.emit('APPLY_TO_ACTION_SUCCESS');
                }).catch(error => {
                    console.log(error);
                });
                break;
            }
        }
    }
}

const volunteeringStore = new VolunteeringStore;
dispatcher.register(volunteeringStore.handleActions.bind(volunteeringStore));

export default volunteeringStore;
