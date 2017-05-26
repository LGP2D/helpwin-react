import React, { PropTypes } from 'react';

import { VolunteeringActions } from 'app/actions';
import { VolunteeringStore } from 'app/stores';

export default class ViewProposalDetails extends React.Component {

    static contextTypes = {
        router: PropTypes.object.isRequired
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
                            <i class='ti ti-angle-up' />
                        </button>
                        <button type='button' class='btn-remove'>
                            <i class='ti ti-close' />
                        </button>
                    </div>
                </div>
                <div class='panel-body'>
                    <p>Start Date: { proposal && proposal.startDate }</p>
                    <p>End Date: { proposal && proposal.endDate }</p>
                </div>
                <div class='panel-footer'>
                    <button className='btn btn-primary' style={ { marginRight: '10px' } } onClick={ this.helpButton.bind(this, event, proposal && proposal.id) }
                            type='button' name={ proposal && proposal.id }>
                        Help
                    </button>
                    <button className='btn btn-danger' onClick={ this.context.router.goBack }>Return to previous page</button>
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
