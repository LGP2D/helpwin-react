import dispatcher from 'app/dispatcher/dispatcher';

export default {
    getProposals: () => {
        dispatcher.dispatch({
            type: 'GET_INSTITUTION_PROPOSALS'
        });
    },

    getCandidates: (id) => {
        dispatcher.dispatch({
            type: 'GET_PROPOSAL_CANDIDATES',
            volunteeringProposal: id
        });
    },

    getVolunteers: (id) => {
        dispatcher.dispatch({
            type: 'GET_PROPOSAL_VOLUNTEERS',
            volunteeringProposal: id
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

    acceptVolunteer: (actionId, userUniqueId) => {
        dispatcher.dispatch({
            type: 'ACCEPT_VOLUNTEER',
            proposalId: actionId,
            userUniqueId: userUniqueId
        });
    },

    rejectVolunteer: (actionId, userUniqueId) => {
        dispatcher.dispatch({
            type: 'REJECT_VOLUNTEER',
            actionId: actionId,
            userUniqueId: userUniqueId
        });
    },

    evaluateVolunteer: (actionId, userUniqueId, status) => {
        dispatcher.dispatch({
            type: 'EVALUATE_VOLUNTEER',
            actionId: actionId,
            userUniqueId: userUniqueId,
            status: status
        });
    }
}
