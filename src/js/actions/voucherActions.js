import dispatcher from 'app/dispatcher/dispatcher';

export default {
    fetchData: () => {
        dispatcher.dispatch({
            type: 'GET_VOUCHERS'
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
    },

    companyVouchers: () => {
        dispatcher.dispatch({
            type: 'GET_VOUCHERS_COMPANY'
        });
    },

    redeemVoucher: (uniqueId) => {
        dispatcher.dispatch({
            type: 'REDEEM_VOUCHER',
            uniqueId: uniqueId
        });
    },

    deleteVoucher: (uniqueId) => {
        dispatcher.dispatch({
            type: 'DELETE_VOUCHER',
            uniqueId: uniqueId

        });
    }
}
