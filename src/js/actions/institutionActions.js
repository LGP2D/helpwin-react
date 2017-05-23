import dispatcher from 'app/dispatcher/dispatcher';

export function getProposals (institution){
    dispatcher.dispatch({
        type: 'GET_PROPOSALS',
        institution: institution
    })
}
