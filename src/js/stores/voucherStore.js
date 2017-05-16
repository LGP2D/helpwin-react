import { EventEmitter } from 'events';
import dispatcher from 'app/dispatcher/dispatcher';
import axios from 'axios';
import config from './config'

class VoucherStore extends EventEmitter {

    constructor () {
        super();
        this.vouchers = [];
    }

    getAll () {
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

            }
        }
    }
}

const voucherStore = new VoucherStore;
dispatcher.register(voucherStore.handleActions.bind(voucherStore));

export default voucherStore;
