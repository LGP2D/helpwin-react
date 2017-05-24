import dispatcher from 'app/dispatcher/dispatcher';

export default {
    fetchData: () => {
        dispatcher.dispatch({
            type: 'FETCH_DATA'
        });
    },
    applyToAction: (id) => {
        dispatcher.dispatch({
            type: 'APPLY_TO_ACTION',
            actionId: id
        });
    }
}
