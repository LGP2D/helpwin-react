import { EventEmitter } from 'events';

import dispatcher from 'app/dispatcher/dispatcher';

class PostItStore extends EventEmitter {

    constructor() {
        super();
        this.postIts = [
            {
                id: 1,
                key_id: 1,
                title: 'hello',
                text: 'world!',
                tags: ['tag1', 'tag2', 'tag3']
            }
        ];
    }

    getAll() {
        return this.postIts;
    }

    addPostIt(title, text, tags) {
        const id = Date.now();

        this.postIts.push({
            id,
            title,
            text,
            tags
        });
        this.emit('change');
    }

    deletePostIt(id) {
        this.postIts = this.postIts.filter(postIt => postIt.id !== id);
        this.emit('change');
    }


    handleActions(action) {
        switch (action.type) {
            case 'ADD_POST_IT': {
                this.addPostIt(action.title, action.text, action.tags);
                break;
            }

            case 'DELETE_POST_IT': {
                this.deletePostIt(action.id);
                break;
            }
        }
    }

}

const postItStore = new PostItStore();
dispatcher.register(postItStore.handleActions.bind(postItStore));
export default postItStore;
