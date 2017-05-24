import { EventEmitter } from 'events';
import dispatcher from 'app/dispatcher/dispatcher';
import axios from 'axios';
import config from './config';
import UserStore from 'app/stores/userStore';

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
                console.log("GET");
                console.log('GET ENTRA PUTA');
                axios({
                    method: 'post',
                    url: config.API_URL + 'actions/institutionActions',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'Authorization': UserStore.getJwt
                    }
                }).then(response => {
                    this.data = response.data;
                    console.log('ENTRA PUTA');
                    console.log('data -> ' + this.data);
                    this.emit('update-get-proposals-institution');
                }).catch(error => {
                    console.log(error);
                });
            }
        }
    }
}


const institutionStore = new InstitutionStore;
dispatcher.register(institutionStore.handleActions.bind(institutionStore));

export default institutionStore;
