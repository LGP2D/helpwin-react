import { EventEmitter } from 'events';
import dispatcher from 'app/dispatcher/dispatcher';
import axios from 'axios';
import config from './config';

class InstitutionStore extends EventEmitter {
    constructor (){
        super();

        this.data = []
    }

    getAll (){
        return this.data;
    }

    handleActions (action) {
        switch (action.type) {
            case 'GET_PROPOSALS': {
                axios({
                    method: 'post',
                    url: config.API_URL + 'actions/institutionActions',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'Authorization': action.token
                    }
                }).then(response => {
                    this.data = response.data;
                    console.log('data -> ' + this.data);
                    this.emit('update-get-proposals-institution');
                }).catch(error => {
                    console.log(error);
                });
                this.emit('update-get-proposals-institution');
            }
        }
    }
}


const institutionStore = new InstitutionStore;
dispatcher.register(institutionStore.handleActions.bind(institutionStore));

export default institutionStore;
