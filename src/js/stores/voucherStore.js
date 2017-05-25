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

        this.companyVouchers = [
            {
                id: 1,
                description: 'Lorem ipsum dolor sit amet, vis no dicit noluisse suscipit, ea quo regione convenire facilisis, ad mea affert mentitum.',
                dateStart: '2016-01-01',
                dateEnd : '2017-01-01',
                quantity: 5,
                credits: 100,
                type: '5% Electronic discount'
            },
            {
                id: 2,
                description: 'Lorem ipsum dolor sit amet, vis no dicit noluisse suscipit, ea quo regione convenire facilisis, ad mea affert mentitum.',
                dateStart: '2016-01-01',
                dateEnd : '2017-01-01',
                quantity: 4,
                credits: 200,
                type: '10 Euros discount'
            },
            {
                id: 3,
                description: 'Lorem ipsum dolor sit amet, vis no dicit noluisse suscipit, ea quo regione convenire facilisis, ad mea affert mentitum.',
                dateStart: '2016-01-01',
                dateEnd : '2017-01-01',
                quantity: 8,
                credits: 150,
                type: '2 for the price of one'
            },
            {
                id: 4,
                description: 'Lorem ipsum dolor sit amet, vis no dicit noluisse suscipit, ea quo regione convenire facilisis, ad mea affert mentitum.',
                dateStart: '2016-01-01',
                dateEnd : '2017-01-01',
                quantity: 7,
                credits: 50,
                type: '10% off on puchase'
            }
        ]
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
            default: {
                break;
            }
        }
    }
}

const voucherStore = new VoucherStore;
dispatcher.register(voucherStore.handleActions.bind(voucherStore));

export default voucherStore;
