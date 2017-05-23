import { EventEmitter } from 'events';
import dispatcher from 'app/dispatcher/dispatcher';
import axios from 'axios';
import config from './config';

class VolunteeringListStore extends EventEmitter {
    constructor (){
        super();

        this.data = [];
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

const volunteeringListStore = new VolunteeringListStore;
dispatcher.register(volunteeringListStore.handleActions.bind(volunteeringListStore));

export default volunteeringListStore;
