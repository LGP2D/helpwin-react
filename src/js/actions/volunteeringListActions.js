import dispatcher from 'app/dispatcher/dispatcher';

export default {
    fetchData: () => {
        dispatcher.dispatch({
            type: 'FETCH_DATA'
        });
    }
}
