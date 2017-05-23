import { EventEmitter } from 'events';
import dispatcher from 'app/dispatcher/dispatcher';
import axios from 'axios';
import config from './config';

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
                this.emit('UPDATE_VOLUNTEERING');
            }
        }
    }
}

const volunteeringStore = new VolunteeringStore;
dispatcher.register(volunteeringStore.handleActions.bind(volunteeringStore));

export default volunteeringStore;
