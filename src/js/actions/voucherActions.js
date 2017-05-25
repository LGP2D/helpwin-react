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
    },

    activate: (uniqueId) => {
        dispatcher.dispatch({
            type: 'ACTIVATE_VOUCHER',
            uniqueId: uniqueId
        });
    },

    deactivate: (uniqueId) => {
        dispatcher.dispatch({
            type: 'DEACTIVATE_VOUCHER',
            uniqueId: uniqueId
        });
    }
}
