import dispatcher from 'app/dispatcher/dispatcher';

export default {
    fetchData: () => {
        dispatcher.dispatch({
            type: 'FETCH_DATA'
        });
    },
    fetchValidProposals: () => {
        dispatcher.dispatch({
            type: 'FETCH_VALID_PROPOSALS'
        });
    },
    fetchUserProposals: () => {
        dispatcher.dispatch({
            type: 'FETCH_USER_PROPOSALS'
        });
    },
    applyToAction: (id) => {
        dispatcher.dispatch({
            type: 'APPLY_TO_ACTION',
            actionId: id
        });
    }
}
