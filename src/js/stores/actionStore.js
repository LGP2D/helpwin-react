import { EventEmitter } from 'events';
import dispatcher from 'app/dispatcher/dispatcher';
import axios from 'axios';
import UserStore from 'app/stores/userStore';

import config from 'app/stores/config';

class ActionStore extends EventEmitter {
    constructor () {
        super();

        this.companiesData = [];
    }

    handleActions (action) {
        switch (action.type) {
            case 'INSERT_ACTION': {
                axios({
                    method: 'post',
                    url: config.API_URL + 'actions',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'Authorization': UserStore.getJwt
                    },
                    data: action.action
                }).then(response => {
                    this.emit('INSERT_ACTION_SUCCESSFUL');
                }).catch(error => {
                    console.log(error);
                });
                break;
            }
            default: {
                break;
            }
        }
    }
}

const actionStore = new ActionStore();
dispatcher.register(actionStore.handleActions.bind(actionStore));

export default actionStore;
