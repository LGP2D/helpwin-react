import { EventEmitter } from 'events';
import dispatcher from 'app/dispatcher/dispatcher';
import axios from 'axios';
import config from './config';

class VolunteeringListStore extends EventEmitter {
    constructor (){
        super();
    }

    getAll (){
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
                    this.emit('update');
                }).catch(error => {
                    console.log(error);
                });
                this.emit('update');
            }
        }
    }
}

const volunteeringListStore = new VolunteeringListStore;
dispatcher.register(volunteeringListStore.handleActions.bind(volunteeringListStore));

export default volunteeringListStore;
