import dispatcher from 'app/dispatcher/dispatcher';

export default {
    fetchData: () => {
        dispatcher.dispatch({
            type: 'FETCH_DATA'
        });
    },
    fetchProposal: (id) => {
        dispatcher.dispatch({
            type: 'FETCH_PROPOSAL',
            actionId: id
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
    },
    activate: (id) => {
        dispatcher.dispatch({
            type: 'ACTIVATE_PROPOSAL',
            actionId: id
        });
    },
    deactivate: (id) => {
        dispatcher.dispatch({
            type: 'DEACTIVATE_PROPOSAL',
            actionId: id
        });
    }
}
