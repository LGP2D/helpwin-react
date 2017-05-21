import { EventEmitter } from 'events';
import dispatcher from 'app/dispatcher/dispatcher';
import axios from 'axios';
import config from './config';

class VolunteeringListStore extends EventEmitter {
    constructor (){
        super();

        this.data = [
            {
                id: 1,
                credits: 10,
                location: 'Porto',
                description: 'Lorem ipsum dolor sit amet, vis no dicit noluisse suscipit, ea quo regione convenire facilisis, ad mea affert mentitum.',
                dateStart: '2016-01-01',
                dateEnd: '2017-01-01',
                type: 'Children',
                institution: {
                    name: 'Assistência Médica Internacional (AMI)',
                    imageUrl: 'http://www.opticaldas.com/wp-content/uploads/logotipos/Logo-ami.png'
                }
            },
            {
                id: 2,
                credits: 15,
                location: 'Braga',
                description: 'Lorem ipsum dolor sit amet, vis no dicit noluisse suscipit, ea quo regione convenire facilisis, ad mea affert mentitum.',
                dateStart: '2016-01-01',
                dateEnd: '2017-01-01',
                type: 'Children',
                institution: {
                    name: 'Cruz Vermelha',
                    imageUrl: 'http://www.focandoanoticia.com.br/wp-content/uploads/2014/07/auditoria-comprova-desvio-de-recursos-na-cruz-vermelha1.png'
                }
            },
            {
                id: 3,
                credits: 25,
                location: 'Lisboa',
                description: 'Lorem ipsum dolor sit amet, vis no dicit noluisse suscipit, ea quo regione convenire facilisis, ad mea affert mentitum.',
                dateStart: '2016-01-01',
                dateEnd: '2017-01-01',
                type: 'Food',
                institution: {
                    name: 'Banco Alimentar',
                    imageUrl: 'https://upload.wikimedia.org/wikipedia/pt/a/ab/Log%C3%B3tipo_do_Banco_Alimentar_Contra_a_Fome.png'
                }
            }
        ]
    }

    getAll (){
        return this.data;
    }

    handleActions (action) {
        switch (action.type) {
            case 'FETCH_DATA': {
                axios({
                    method: 'get',
                    url: config.API_URL + 'actions',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    }
                }).then(response => {
                    this.data = response.data;
                    this.emit('update');
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
