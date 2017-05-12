import { EventEmitter } from 'events';
import dispatcher from 'app/dispatcher/dispatcher';
import axios from 'axios';
import config from './config';

class CompanyVoucherStore extends EventEmitter {
    constructor (){
        super();

        this.data = [
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

    getAll (){
        return this.data;
    }

    handleActions (action) {
        switch (action.type){
            case 'FETCH_DATA_VOUCHER': {
                axios({
                    method: 'get',
                    url: config.API_URL+ 'vouchers',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    }
                }).then(response => {
                    //this.data=response.data;
                    //this.emit('update');
                }).catch(error => {
                    console.log(error);
                });
                this.emit('update');
            }
        }
    }
}

const companyVoucherStore = new CompanyVoucherStore;
dispatcher.register(companyVoucherStore.handleActions.bind(companyVoucherStore));

export default companyVoucherStore;
