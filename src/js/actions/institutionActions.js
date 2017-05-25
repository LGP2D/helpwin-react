import dispatcher from 'app/dispatcher/dispatcher';

export default {
    getProposals: () => {
        dispatcher.dispatch({
            type: 'GET_PROPOSALS'
        });
    },

    getInstitutions: () => {
        dispatcher.dispatch({
            type: 'GET_INSTITUTIONS'
        });
    },

    activate: (uniqueId) => {
        dispatcher.dispatch({
            type: 'ACTIVATE_INSTITUTION',
            uniqueId: uniqueId
        });
    },

    deactivate: (uniqueId) => {
        dispatcher.dispatch({
            type: 'DEACTIVATE_INSTITUTION',
            uniqueId: uniqueId
        });
    }
}
