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
    },
    //TODO create activate/deactivate actions
    activate: (id) => {
        dispatcher.dispatch({
            type: 'ACTIVATE_PROPOSAL_SUCCESSFUL',
            actionId: id
        });
    },
    deactivate: (id) => {
        dispatcher.dispatch({
            type: 'DEACTIVATE_PROPOSAL_SUCCESSFUL',
            actionId: id
        });
    }
}
