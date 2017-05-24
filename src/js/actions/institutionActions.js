import dispatcher from 'app/dispatcher/dispatcher';

export default {
    getProposals: () => {
        dispatcher.dispatch({
            type: 'GET_PROPOSALS'
        });
    },

    getCandidates: (volunteeringProposal) => {
        dispatcher.dispatch({
            type: 'EDIT_USER',
            volunteeringProposal: volunteeringProposal
        });
    }
}
