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
            <div>
                <span> { proposal && proposal.user.name } </span>
                <button className='btn btn-primary' onClick={ this.helpButton.bind(this, event, proposal && proposal.id) }
                        type='button' name={ proposal && proposal.id }>
                    Help
                </button>
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
