import dispatcher from 'app/dispatcher/dispatcher';

export default {
    insertAction: (action) => {
        dispatcher.dispatch({
            type: 'INSERT_ACTION',
            action: action
        });
    }
}
