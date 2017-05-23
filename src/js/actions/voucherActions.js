import dispatcher from 'app/dispatcher/dispatcher';

export default {
    fetchData: () => {
        dispatcher.dispatch({
            type: 'GET_VOUCHERS'
        });
    },

    fetchCompany: () => {
        dispatcher.dispatch({
            type: 'FETCH_COMPANY_VOUCHER'
        });
    }
}
