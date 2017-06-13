import React, { PropTypes } from 'react';
import GoogleMap from 'google-map-react';

import Candidates from 'app/pages/dashboard/viewProposalCandidates';
import Volunteers from 'app/pages/dashboard/view-proposal-volunteers';

import { UserStore } from 'app/stores';
import { VolunteeringActions } from 'app/actions';
import { VolunteeringStore } from 'app/stores';

import If from 'app/components/shared/conditional';
import config from 'app/stores/config';

const Marker = ({ text }) => <img style={ { width: 'auto', height: '30px' } } src='assets/img/map-marker-128.png' />;

export default class ViewProposalDetails extends React.Component {

    static contextTypes = {
        router: PropTypes.object.isRequired
    };

    static defaultProps = {
        center: { lat: 41.1579438, lng: -8.629105299999992 },
        zoom: 11
    };

    constructor () {
        super();

        this.onUpdate = this.update.bind(null, 'data');
        this.onUpdateUserProposals = this.updateActions.bind(null, 'actions');

        this.state = {
            data: null,
            candidates: [],
            actions: [],
            signup: false
        };
    }

    componentWillMount () {
        const { router } = this.context;
        VolunteeringStore.on('UPDATE_USER_PROPOSALS', this.onUpdateUserProposals);
        VolunteeringStore.on('UPDATE_PROPOSAL', this.onUpdate);
        VolunteeringActions.fetchProposal(router.params.id);
        VolunteeringActions.fetchUserProposals();
    }

    componentWillUnmount () {
        VolunteeringStore.removeListener('UPDATE_PROPOSAL', this.onUpdate);
        VolunteeringStore.removeListener('UPDATE_USER_PROPOSALS', this.onUpdateUserProposals);
    }

    render () {
        const { router } = this.context;

        let proposal = this.state.data;

        return (
            <div>
                <If test={ UserStore.getUserRole < 3 }>
                    <div>
                        <Candidates id={ router.params.id } />
                        <Volunteers id={ router.params.id } />
                    </div>
                </If>

                <div class='panel panel-headline'>
                    <div class='panel-heading'>
                        <h3 class='panel-title'>{ proposal && proposal.user.name }</h3>
                        <p class='panel-subtitle'>{ proposal && proposal.description }</p>
                        <div class='right'>
                            <button type='button' class='btn-toggle-collapse'>
                                <i class='ti ti-angle-up'/>
                            </button>
                            <button type='button' class='btn-remove'>
                                <i class='ti ti-close'/>
                            </button>
                        </div>
                    </div>
                    <div class='panel-body'>
                        <div class='row'>
                            <div class='col-md-4'>
                                <div class='metric'>
                                    <span class='icon toast-info'><i class='fa fa-credit-card-alt'/></span>
                                    <p>
                                        <span
                                            class='number'>{ proposal && proposal.isActive ? 'Active' : 'Inactive' }</span>
                                        <span class='title'>{ proposal && proposal.isActive ?
                                            'Sign ups are open' :
                                            'Unable to sign up' }</span>
                                    </p>
                                </div>
                            </div>
                            <div class='col-md-4'>
                                <div class='metric'>
                                    <span class='icon toast-info'><i class='fa fa-credit-card-alt'/></span>
                                    <p>
                                        <span class='number'>{ proposal && proposal.credits }</span>
                                        <span class='title'>Credits</span>
                                    </p>
                                </div>
                            </div>
                            <div class='col-md-4'>
                                <div class='metric'>
                                    <span class='icon toast-danger'><i class='fa fa-paper-plane'/></span>
                                    <p>
                                        <span class='number'>{ proposal && proposal.availablePosition }</span>
                                        <span class='title'>Remaining Applications</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div class='row'>
                            <div class='col-md-4'>
                                <img className='img-responsive'
                                     src={ config.API_STATIC_URL + (proposal && proposal.user.imageUrl) }/>
                                <div className='text-center' style={ { marginTop: '10px' } }>
                                    <p><i class='fa fa-calendar-plus-o'/> Starting by { proposal && proposal.startDate }
                                    </p>
                                    <p><i class='fa fa-calendar-minus-o'/> Ending by { proposal && proposal.endDate }
                                    </p>
                                    <p><i class='fa fa-location-arrow'/> { proposal && proposal.location }</p>
                                </div>
                            </div>
                            <div class='col-md-8'>
                                <div class='map' style={ { height: '300px', width: '100%' } }>
                                    <GoogleMap
                                        bootstrapURLKeys={ {
                                            key: 'AIzaSyCjHXXZhBYA5DUaSIjEq-4Y-b3QES9IH6k'
                                        } }
                                        defaultCenter={ this.props.center }
                                        defaultZoom={ this.props.zoom }>
                                        <Marker
                                            lat={ 41.1579438 }
                                            lng={ -8.629105299999992 }
                                            text={ 'Porto' }
                                        />
                                    </GoogleMap>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class='panel-footer'>
                        <button className='btn btn-primary' style={ { marginRight: '10px' } }
                                type='button' name={ proposal && proposal.id }
                                disabled={ this.state.signup }
                                data-toggle='modal' data-target='#confirm-help' data-href={ proposal && proposal.id }>
                            Help
                        </button>
                        <button className='btn btn-danger' onClick={ this.context.router.goBack }>Return to previous
                            page
                        </button>
                    </div>
                </div>

                <div class='modal fade' id='confirm-help' tabIndex='-1' role='dialog' aria-labelledby='myModalLabel'
                     aria-hidden='true'>
                    <div class='modal-dialog'>
                        <div class='modal-content'>
                            <div class='modal-header'>
                                <p>Signing up to a volunteering proposal</p>
                            </div>
                            <div class='modal-body'>
                                <p>Are you sure you want to participate?</p>
                            </div>
                            <div class='modal-footer'>
                                <button type='button' class='btn btn-default' data-dismiss='modal'>Cancel</button>
                                <a class='btn btn-success btn-ok'
                                   data-dismiss='modal'
                                   onClick={ this.helpButton.bind(this, event, proposal && proposal.id) }>
                                    Confirm
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    helpButton (event, id) {
        VolunteeringActions.applyToAction(id);
        this.context.router.push('dashboard/my-proposals-volunteer');
    }

    containsAction (id) {
        if(id) {
            for (let action in this.state.actions) {
                if (this.state.actions[action].action.id == id) {
                    return true;
                }
            }
        }
        return false;
    }

    update = (key) => {
        this.state[key] = VolunteeringStore.getActions();
        this.setState(this.state);
    };

    updateActions = (key) => {
        this.state[key] = VolunteeringStore.getActions();
        if(UserStore.getUserRole === 3) {
            this.state.signup = this.containsAction(this.context.router.params.id);
        }
        this.setState(this.state);
    };
}
