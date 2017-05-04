import dispatcher from 'app/dispatcher/dispatcher';

export function fetchData(){
    dispatcher.dispatch({
        type: 'FETCH_DATA_USER'
    })
}
