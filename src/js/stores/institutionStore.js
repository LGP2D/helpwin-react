import { EventEmitter } from 'events';
import dispatcher from 'app/dispatcher/dispatcher';
import axios from 'axios';
import config from './config';
import UserStore from 'app/stores/userStore';

class InstitutionStore extends EventEmitter {
    constructor (){
        super();

        this.data = [];
        this.proposalCandidates = [];
    }

    getAll (){
        return this.data;
    }

    getCandidates (){
        return this.proposalCandidates;
    }

    handleActions (action) {
        switch (action.type) {
            case 'GET_PROPOSALS': {
                console.log("POST");
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
                    console.log('data -> ' + this.data);
                    this.emit('update-get-proposals-institution');
                }).catch(error => {
                    console.log(error);
                });
                break;
            }
            case 'GET_PROPOSAL_CANDIDATES': {
                console.log("POST");
                axios({
                    method: 'post',
                    url: config.API_URL + 'actions/userProfiles',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    data:action.volunteeringProposal
                }).then(response => {
                    this.data = response.data;
                    console.log('data -> ' + this.data);
                    this.emit('update-get-proposals-institution');
                }).catch(error => {
                    console.log(error);
                });
                break;
            }
        }
    }
}


const institutionStore = new InstitutionStore;
dispatcher.register(institutionStore.handleActions.bind(institutionStore));

export default institutionStore;
