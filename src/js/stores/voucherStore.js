import { EventEmitter } from 'events';
import dispatcher from 'app/dispatcher/dispatcher';
import axios from 'axios';

class VoucherStore extends EventEmitter {

    constructor() {
        super();
        this.vouchers = [];
    }

    get getVouchers(){
        return this.vouchers;
    }
    handleActions(action) {
        switch(action.type) {
            case 'GET_VOUCHERS' : {
                axios({
                    method: 'get',
                    url: 'http://localhost:8080/api/voucher',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    }
                }).then(response => {
                    console.log('Get vouchers ->', response);
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
