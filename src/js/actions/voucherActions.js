import dispatcher from 'app/dispatcher/dispatcher';

export function fetchData () {
    dispatcher.dispatch({
        type: 'GET_VOUCHERS'
    });
}
