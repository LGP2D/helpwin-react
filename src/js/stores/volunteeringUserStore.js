import { EventEmitter } from 'events';
import dispatcher from 'app/dispatcher/dispatcher';
import axios from 'axios';

class VolunteeringUserStore extends EventEmitter {
    constructor (){
        super();

        this.data = [
            {
                id: 1,
                credits: 10,
                location: 'Porto',
                description: ' Lorem ipsum dolor sit amet, vis no dicit noluisse suscipit, ea quo regione convenire facilisis, ad mea affert mentitum.',
                dateStart: '2016-01-01',
                dateEnd: '2017-01-01',
                type: 'Children',
                institution: {
                    name: 'Institution A',
                    imageUrl: 'http://static.tumblr.com/7fe363a1c068ff7e845610221b642183/gdukfof/a17mh6k58/tumblr_static_logo_msf.jpg'
                }
            },
            {
                id: 2,
                credits: 15,
                location: 'Braga',
                description: ' Lorem ipsum dolor sit amet, vis no dicit noluisse suscipit, ea quo regione convenire facilisis, ad mea affert mentitum.',
                dateStart: '2016-01-01',
                dateEnd: '2017-01-01',
                type: 'Children',
                institution: {
                    name: 'Institution B',
                    imageUrl: 'http://static.tumblr.com/7fe363a1c068ff7e845610221b642183/gdukfof/a17mh6k58/tumblr_static_logo_msf.jpg'
                }
            },
            {
                id: 3,
                credits: 25,
                location: 'Lisboa',
                description: ' Lorem ipsum dolor sit amet, vis no dicit noluisse suscipit, ea quo regione convenire facilisis, ad mea affert mentitum.',
                dateStart: '2016-01-01',
                dateEnd: '2017-01-01',
                type: 'Children',
                institution: {
                    name: 'Institution C',
                    imageUrl: 'http://static.tumblr.com/7fe363a1c068ff7e845610221b642183/gdukfof/a17mh6k58/tumblr_static_logo_msf.jpg'
                }
            }
        ]
    }

    getAll(){
        return this.data;
    }

    handleActions(action){
        switch(action.type){
            case 'FETCH_DATA_USER':{
                axios({
                    method: 'get',
                    url: 'http://localhost:8080/api/actions',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    }
                }).then (response =>{
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

const volunteeringUserStore = new VolunteeringUserStore;
dispatcher.register(volunteeringUserStore.handleActions.bind(volunteeringUserStore));

export default volunteeringUserStore;
