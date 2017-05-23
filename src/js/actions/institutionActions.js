import dispatcher from 'app/dispatcher/dispatcher';

export function getProposals (token){
    dispatcher.dispatch({
        type: 'GET_PROPOSALS',
        token: token
    })
}
