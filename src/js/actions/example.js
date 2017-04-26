import dispatcher from '../dispatcher/dispatcher';

export function doSomething(title, text, tags) {
    dispatcher.dispatch({
        type: 'ADD_POST_IT',
        title,
        text,
        tags
    });
}
