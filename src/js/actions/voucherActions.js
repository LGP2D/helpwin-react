import dispatcher from 'app/dispatcher/dispatcher';

export function getVouchers() {
    dispatcher.dispatch({
        type: 'GET_VOUCHERS'
    });
}
