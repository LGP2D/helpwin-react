import { EventEmitter } from 'events';
import dispatcher from 'app/dispatcher/dispatcher';
import axios from 'axios';

class VolunteeringListStore extends EventEmitter {
    constructor (){
        super();

        this.data = [
            { id: 1, description: 'Lorem ipsum dolor sit amet, tritani dolorum voluptu pro et, mel ipsum...', image: '', coins: 200, date: '2017-05-19', type: 'Children', institution: 'Caritas' },
            { id: 2, description: 'Lorem ipsum dolor sit amet, tritani dolorum voluptu pro et, mel ipsum...', image: '', coins: 300, date: '2017-05-19', type: 'Adult', institution: 'Medicos S. Fronteiras' },
            { id: 3, description: 'Lorem ipsum dolor sit amet, tritani dolorum voluptu pro et, mel ipsum...', image: '', coins: 500, date: '2017-05-19', type: 'Adult', institution: 'Diocesana' },
            { id: 4, description: 'Lorem ipsum dolor sit amet, tritani dolorum voluptu pro et, mel ipsum...', image: '', coins: 1000, date: '2017-05-19', type: 'Homeless', institution: 'AMI' },
            { id: 5, description: 'Lorem ipsum dolor sit amet, tritani dolorum voluptu pro et, mel ipsum...', image: '', coins: 50, date: '2017-05-19', type: 'Food', institution: 'Caritas' },
            { id: 6, description: 'Lorem ipsum dolor sit amet, tritani dolorum voluptu pro et, mel ipsum...', image: '', coins: 100, date: '2017-05-19', type: 'Food', institution: 'Igreja' },
            { id: 7, description: 'Lorem ipsum dolor sit amet, tritani dolorum voluptu pro et, mel ipsum...' +
            'Lorem ipsum dolor sit amet, tritani dolorum voluptu pro et, mel ipsum...' +
            'Lorem ipsum dolor sit amet, tritani dolorum voluptu pro et, mel ipsum...' +
            'Lorem ipsum dolor sit amet, tritani dolorum voluptu pro et, mel ipsum...' +
            'Lorem ipsum dolor sit amet, tritani dolorum voluptu pro et, mel ipsum...', image: '', coins: 2500, date: '2017-05-19', type: 'Homeless', institution: 'Medicos S. Fronteiras' }
        ]
    }

    getAll(){
        return this.data;
    }

    handleActions(action) {
        switch (action.type) {
            case 'FETCH_DATA': {
                axios({
                    method: 'get',
                    url: 'http://localhost:8080/api/proposals',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    }
                }).then(response => {
                    //this.data = response.data;
                    //this.emit('update');
                }).catch(error => {
                    console.log(error);
                });
                this.emit('update');
            }
        }
    }
}

const volunteeringListStore = new VolunteeringListStore;
dispatcher.register(volunteeringListStore.handleActions.bind(volunteeringListStore));

export default volunteeringListStore;
