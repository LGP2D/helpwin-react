import { EventEmitter } from 'events';
import dispatcher from 'app/dispatcher/dispatcher';
import axios from 'axios';
import UserStore from 'app/stores/userStore';

import config from 'app/stores/config';

class CompanyStore extends EventEmitter {
    constructor () {
        super();

        this.companiesData = [];
    }

    get getCompanies () { return this.companiesData; }

    handleActions (action) {
        switch (action.type) {
            case 'GET_COMPANIES': {
                axios({
                    method: 'get',
                    url: config.API_URL + 'user/companies',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                    }
                }).then(response => {
                    console.log(response.data);
                    this.companiesData = response.data;
                    this.emit('GET_COMPANIES_SUCCESSFUL');
                }).catch(error => {
                    console.log(error);
                });
                break;
            }
            case 'ACTIVATE_COMPANY': {
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
                    this.companiesData = response.data;
                    this.emit('ACTIVATE_COMPANY_SUCCESSFUL');
                }).catch(error => {
                    console.log(error);
                });
                break;
            }
            case 'DEACTIVATE_COMPANY': {
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
                    this.companiesData = response.data;
                    this.emit('DEACTIVATE_COMPANY_SUCCESSFUL');
                }).catch(error => {
                    console.log(error);
                });
                break;
            }
            default: {
                break;
            }
        }
    }
}

const companyStore = new CompanyStore();
dispatcher.register(companyStore.handleActions.bind(companyStore));

export default companyStore;
