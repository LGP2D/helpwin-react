import { EventEmitter } from 'events';
import dispatcher from 'app/dispatcher/dispatcher';
import axios from 'axios';
import config from './config';
import UserStore from 'app/stores/userStore';

class InstitutionStore extends EventEmitter {
    constructor (){
        super();

        this.data = [];
        this.institutions = [];
    }

    getAll (){
        return this.data;
    }

    get getInstitutions () {
        return this.institutions;
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
                        'Authorization': UserStore.getJwt
                    }
                }).then(response => {
                    this.data = response.data;
                    this.emit('update-get-proposals-institution');
                }).catch(error => {
                    console.log(error);
                });
                break;
            }
            case 'GET_INSTITUTIONS': {
                axios({
                    method: 'get',
                    url: config.API_URL + 'user/institutions',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'Authorization': UserStore.getJwt
                    }
                }).then(response => {
                    this.institutions = response.data;
                    this.emit('GET_INSTITUTIONS_SUCCESSFUL');
                }).catch(error => {
                    console.log(error);
                });
                break;
            }
            case 'ACTIVATE_INSTITUTION': {
                axios({
                    method: 'put',
                    url: config.API_URL + 'user/activate',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'Authorization': UserStore.getJwt
                    },
                    data: {
                        uniqueId: action.uniqueId
                    }
                }).then(response => {
                    console.log(response.data);
                    this.emit('ACTIVATE_INSTITUTION_SUCCESSFUL');
                }).catch(error => {
                    console.log(error);
                    console.log(error.data);
                });
                break;
            }
            case 'DEACTIVATE_INSTITUTION': {
                axios({
                    method: 'put',
                    url: config.API_URL + 'user/deactivate',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'Authorization': UserStore.getJwt
                    },
                    data: {
                        uniqueId: action.uniqueId
                    }
                }).then(response => {
                    console.log(response.data);
                    this.emit('DEACTIVATE_INSTITUTION_SUCCESSFUL');
                }).catch(error => {
                    console.log(error);
                });
                break;
            }
            default: {

            }
        }
    }
}

const institutionStore = new InstitutionStore;
dispatcher.register(institutionStore.handleActions.bind(institutionStore));

export default institutionStore;
