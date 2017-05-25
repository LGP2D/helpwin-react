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
            case 'FETCH_USER_PROPOSALS': {
                axios({
                    method: 'get',
                    url: config.API_URL + 'user/volunteerActions',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'Authorization': UserStore.getJwt
                    }
                }).then(response => {
                    this.data = response.data;
                    this.emit('UPDATE_USER_PROPOSALS');
                }).catch(error => {
                    console.log(error);
                });
                break;
            }
            case 'FETCH_VALID_PROPOSALS': {
                axios({
                    method: 'get',
                    url: config.API_URL + 'actions/verifiedValid',
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
            //TODO case event from action -> axios -> success ? emit event : console.log() -> register events on component
            case 'ACTIVATE_PROPOSAL': {
                axios({
                    method: 'put',
                    url: config.API_URL + 'actions/validate',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'Authorization': UserStore.getJwt
                    },
                    data: {
                        uniqueId: action.uniqueId
                    }
                }).then(response => {
                    this.emit('ACTIVATE_PROPOSAL_SUCCESSFUL');
                }).catch(error => {
                    console.log(error);
                });
                break;
            }
            case 'DEACTIVATE_PROPOSAL' : {
                axios({
                    method: 'put',
                    url: config.API_URL + 'actions/invalidate',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'Authorization': UserStore.getJwt
                    },
                    data: {
                        uniqueId: action.uniqueId
                    }
                }).then(response => {
                    this.emit('DEACTIVATE_PROPOSAL_SUCCESSFUL');
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
