import { EventEmitter } from 'events';
import dispatcher from 'app/dispatcher/dispatcher';
import axios from 'axios';
import config from './config'
import UserStore from 'app/stores/userStore';

class VoucherStore extends EventEmitter {

    constructor () {
        super();
        this.vouchers = [];
        this.companyVouchers = [];
    }

    getVouchers () {
        return this.vouchers;
    }

    getCompanyVouchers () {
        return this.companyVouchers;
    }

    handleActions (action) {
        switch(action.type) {
            case 'GET_VOUCHERS' : {
                axios({
                    method: 'get',
                    url: config.API_URL + 'voucher',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    }
                }).then(response => {
                    this.vouchers = response.data;
                    this.emit('CHANGE_VOUCHERS');
                }).catch(error => {
                    console.log(error);
                });
                break;
            }
            case 'FETCH_COMPANY_VOUCHER': {
                axios({
                    method: 'get',
                    url: config.API_URL + 'voucher',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    }
                }).then(response => {
                    //this.companyVouchers = response.data;
                    this.emit('UPDATE_COMPANY_VOUCHER');
                }).catch(error => {
                    console.log(error);
                });
                break;
            }
            case 'ACTIVATE_VOUCHER': {
                axios({
                    method: 'put',
                    url: config.API_URL + 'voucher/validate',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'Authorization': UserStore.getJwt
                    },
                    data: {
                        uniqueId: action.uniqueId
                    }
                }).then(response => {
                    this.emit('ACTIVATE_VOUCHER_SUCCESSFUL');
                }).catch(error => {
                    console.log(error);
                });
                break;
            }
            case 'DEACTIVATE_VOUCHER' : {
                axios({
                    method: 'put',
                    url: config.API_URL + 'voucher/invalidate',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'Authorization': UserStore.getJwt
                    },
                    data: {
                        uniqueId: action.uniqueId
                    }
                }).then(response => {
                    this.emit('DEACTIVATE_VOUCHER_SUCCESSFUL');
                }).catch(error => {
                    console.log(error);
                });
                break;
            }
            case 'GET_VOUCHERS_COMPANY' : {
                axios({
                    method: 'get',
                    url: config.API_URL + 'voucher/companyVouchers',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'Authorization': UserStore.getJwt
                    }
                }).then(response => {
                    this.companyVouchers = response.data;
                    this.emit('CHANGE_VOUCHERS_COMPANY');
                    console.log('GET_VOUCHERS_COMPANY SAIU');
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

const voucherStore = new VoucherStore;
dispatcher.register(voucherStore.handleActions.bind(voucherStore));

export default voucherStore;
