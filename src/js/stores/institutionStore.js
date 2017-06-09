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
        this.institutions = [];
    }

    getAll (){
        console.log('Get all Proposals');
        return this.data;
    }

    getCandidates () {
        return this.proposalCandidates;
    }

    get getInstitutions () {
        return this.institutions;
    }

    handleActions (action) {
        switch (action.type) {
            case 'GET_INSTITUTION_PROPOSALS': {
                console.log("GET_INSTITUTION_PROPOSALS");
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
                    console.log('UPDATED PROPOSALS');
                    this.emit('UPDATE_INSTITUTION_PROPOSALS');
                }).catch(error => {
                    console.log(error);
                });
                break;
            }
            case 'GET_PROPOSAL_CANDIDATES': {
                axios({
                    method: 'post',
                    url: config.API_URL + 'actions/userProfiles/' + action.volunteeringProposal,
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    }
                }).then(response => {
                    this.proposalCandidates = response.data;
                    console.log(this.proposalCandidates);
                    this.emit('UPDATE_PROPOSAL_CANDIDATES');
                }).catch(error => {
                    console.log(error);
                });
                break;
            }
            case 'GET_PROPOSAL_VOLUNTEERS': {
                axios({
                    method: 'post',
                    url: config.API_URL + 'actions/acceptedUsers/' + action.volunteeringProposal,
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'Authorization': UserStore.getJwt
                    }
                }).then(response => {
                    this.data = response.data;
                    console.log(this.data);
                    this.emit('UPDATE_PROPOSAL_VOLUNTEERS');
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
            case 'ACCEPT_VOLUNTEER': {
                axios({
                    method: 'POST',
                    url: config.API_URL + 'actions/acceptUser/' + action.actionId + '/' + action.userUniqueId,
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'Authorization': UserStore.getJwt
                    }
                }).then(response => {
                    console.log(response.data);
                    this.emit('ACCEPT_VOLUNTEER_SUCCESSFUL');
                }).catch(error => {
                    console.log(error);
                });
                break;
            }
            case 'REJECT_VOLUNTEER': {
                axios({
                    method: 'POST',
                    url: config.API_URL + 'actions/declineUser/' + action.actionId + '/' + action.userUniqueId,
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'Authorization': UserStore.getJwt
                    }
                }).then(response => {
                    console.log(response.data);
                    this.emit('REJECT_VOLUNTEER_SUCCESSFUL');
                }).catch(error => {
                    console.log(error);
                });
                break;
            }
            case 'EVALUATE_VOLUNTEER': {
                axios({
                    method: 'POST',
                    url: config.API_URL + 'user/evaluate/' + action.actionId + '/' + action.status,
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'Authorization': UserStore.getJwt
                    },
                    data: {
                        uniqueId: action.userUniqueId
                    }
                }).then(response => {
                    console.log(response.data);
                    this.emit('EVALUATE_VOLUNTEER_SUCCESSFUL');
                }).catch(error => {
                    console.log(error);
                });
                break;
            }
            default: { }
        }
    }
}

const institutionStore = new InstitutionStore;
dispatcher.register(institutionStore.handleActions.bind(institutionStore));

export default institutionStore;
