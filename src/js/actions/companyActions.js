import dispatcher from 'app/dispatcher/dispatcher';

export default {
    getCompanies: () => {
        dispatcher.dispatch({
            type: 'GET_COMPANIES'
        });
    },

    activate: (uniqueId) => {
        dispatcher.dispatch({
            type: 'ACTIVATE_COMPANY',
            uniqueId: uniqueId
        });
    },

    deactivate: (uniqueId) => {
        dispatcher.dispatch({
            type: 'DEACTIVATE_COMPANY',
            uniqueId: uniqueId
        });
    }
}
