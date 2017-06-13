import { EventEmitter } from 'events';
import dispatcher from 'app/dispatcher/dispatcher';
import axios from 'axios';
import config from './config'
import UserStore from 'app/stores/userStore';

class VoucherStore extends EventEmitter {

    constructor () {
        super();
        this.error = false;
        this.vouchers = [];
        this.credits = 0;
    }

    isError () {
        return this.error;
    }

    getVouchers () {
        return this.vouchers;
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
                    url: config.API_URL + 'voucher', // /companyVouchers
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'Authorization': UserStore.getJwt
                    }
                }).then(response => {
                    this.vouchers = response.data;
                    this.emit('CHANGE_VOUCHERS_COMPANY');
                }).catch(error => {
                    console.log(error);
                });
                break;
            }
            case 'REDEEM_VOUCHER' : {
                axios({
                    method: 'post',
                    url: config.API_URL + 'voucher/exchangeVoucher',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'Authorization': UserStore.getJwt
                    },
                    data : {
                        uniqueId: action.uniqueId
                    }
                }).then(response => {
                    this.credits = action.credits;
                    this.error = false;
                    this.emit('REDEEMED_VOUCHER');
                }).catch(error => {
                    console.log(error);
                    this.error = true;
                    this.emit('REDEEMED_VOUCHER');
                });
                break;
            }
            case 'DELETE_VOUCHER' : {
                axios({
                    method: 'post',
                    url: config.API_URL + 'voucher/deleteCompanyVouchers/',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    data: {
                        uniqueId: action.uniqueId
                    }
                }).then(response => {
                    this.emit('VOUCHER_DELETED');
                    console.log('DELETE_VOUCHER DONE')
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

    get getCreditsToRemove () { return this.credits; }
}

const voucherStore = new VoucherStore;
dispatcher.register(voucherStore.handleActions.bind(voucherStore));

export default voucherStore;
