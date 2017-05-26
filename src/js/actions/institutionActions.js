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

    acceptVolunteer: (uniqueId, userUniqueId) => {
        dispatcher.dispatch({
            type: 'ACCEPT_VOLUNTEER',
            uniqueId: uniqueId,
            userUniqueId: userUniqueId
        });
    },

    rejectVolunteer: (uniqueId, userUniqueId) => {
        dispatcher.dispatch({
            type: 'REJECT_VOLUNTEER',
            uniqueId: uniqueId,
            userUniqueId: userUniqueId
        });
    }
}
