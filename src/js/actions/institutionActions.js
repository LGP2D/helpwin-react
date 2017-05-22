import dispatcher from 'app/dispatcher/dispatcher';

export function getProposals (){
    dispatcher.dispatch({
        type: 'GET_PROPOSALS'
    })
}
