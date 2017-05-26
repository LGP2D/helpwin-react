import React, { PropTypes } from 'react';
import GoogleMap from 'google-map-react';

import { VolunteeringActions } from 'app/actions';
import { VolunteeringStore } from 'app/stores';

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

        this.state = {
            data: null
        };
    }

    componentWillMount () {
        const { router } = this.context;
        VolunteeringStore.on('UPDATE_PROPOSAL', this.onUpdate);
        VolunteeringActions.fetchProposal(router.params.id);
    }

    componentWillUnmount () {
        VolunteeringStore.removeListener('UPDATE_PROPOSAL', this.onUpdate);
    }

    render () {
        const { router } = this.context;

        let proposal = this.state.data;

        return (
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
                                    <span class='number'>{ proposal && proposal.isActive ? 'Active' : 'Inactive' }</span>
                                    <span class='title'>{ proposal && proposal.isActive ? 'Feel free to sign up' :
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
                                <p><i class='fa fa-calendar-plus-o' /> Starting by { proposal && proposal.startDate }</p>
                                <p><i class='fa fa-calendar-minus-o' /> Ending by { proposal && proposal.endDate }</p>
                                <p><i class='fa fa-location-arrow' /> { proposal && proposal.location }</p>
                            </div>
                        </div>
                        <div class='col-md-8'>
                            <div class='map' style={ { height: '300px', width: '100%' } }>
                                <GoogleMap
                                    bootstrapURLKeys= { {
                                        key: 'AIzaSyCjHXXZhBYA5DUaSIjEq-4Y-b3QES9IH6k'
                                    } }
                                    defaultCenter= { this.props.center }
                                    defaultZoom= { this.props.zoom } >
                                    <Marker
                                        lat= { 41.1579438 }
                                        lng= { -8.629105299999992 }
                                        text= { 'Porto' }
                                    />
                                </GoogleMap>
                            </div>
                        </div>
                    </div>
                </div>
                <div class='panel-footer'>
                    <button className='btn btn-primary' style={ { marginRight: '10px' } }
                            onClick={ this.helpButton.bind(this, event, proposal && proposal.id) }
                            type='button' name={ proposal && proposal.id }>
                        Help
                    </button>
                    <button className='btn btn-danger' onClick={ this.context.router.goBack }>Return to previous page
                    </button>
                </div>
            </div>
        );
    }

    helpButton (event, id) {
        VolunteeringActions.applyToAction(id);
    }

    update = (key) => {
        this.state[key] = VolunteeringStore.getActions();
        this.setState(this.state);
    };
}
