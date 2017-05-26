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
    },

    evaluationApproved: (uniqueId) => {
        dispatcher.dispatch({
            type: 'APPROVE_EVALUATION',
            uniqueId: uniqueId
        });
    },

    evaluationRejected: (uniqueId) => {
        dispatcher.dispatch({
            type: 'REJECT_EVALUATION',
            uniqueId: uniqueId
        });
    }
}
