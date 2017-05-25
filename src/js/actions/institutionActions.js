import dispatcher from 'app/dispatcher/dispatcher';

export default {
    getProposals: () => {
        dispatcher.dispatch({
            type: 'GET_INSTITUTION_PROPOSALS'
        });
    },

    getCandidates: (volunteeringProposal) => {
        dispatcher.dispatch({
            type: 'GET_PROPOSAL_CANDIDATES',
            volunteeringProposal: volunteeringProposal
        });
    }
}
