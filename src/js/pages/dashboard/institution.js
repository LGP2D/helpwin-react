import React from 'react';

import InstitutionActions from 'app/actions/institutionActions';
import InstitutionStore from 'app/stores/institutionStore';

export default class Institution extends React.Component {

    constructor () {
        super();

        this.state = {
            data: [],
            candidates: 0
        };
    }

    componentWillMount () {
        InstitutionStore.on('UPDATE_INSTITUTION_PROPOSALS', this.updateTable);
        InstitutionStore.on('GET_PROPOSAL_CANDIDATES', this.updateCandidates);
        InstitutionActions.getProposals();
    }

    componentWillUnmount () {
        InstitutionStore.removeListener('UPDATE_INSTITUTION_PROPOSALS', this.updateTable);
        InstitutionStore.removeListener('GET_PROPOSAL_CANDIDATES', this.updateCandidates);
    }

    render () {

        return (
            <div class='panel panel-headline'>
                <div class='panel-heading'>
                    <h3 class='panel-title'>Dashboard</h3>
                    <p class='panel-subtitle'>Here you can see an overview of what's happening</p>
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
                    <div class='row'>
                        <div class='col-md-6'>
                            <div class='metric'>
                                <span class='icon toast-info'><i class='fa fa-group' /></span>
                                <p>
                                    <span class='number'>{ this.state.data.length }</span>
                                    <span class='title'>Proposals</span>
                                </p>
                            </div>
                        </div>
                        <div class='col-md-6'>
                            <div class='metric'>
                                <span class='icon toast-danger'><i class='fa fa-heart' /></span>
                                <p>
                                    <span class='number'>{ this.state.candidates }</span>
                                    <span class='title'>Total Candidates</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    updateTable = () => {
        this.setState({
            data: InstitutionStore.getAll()
        });
        for(let i in this.state.data) {
            InstitutionActions.getCandidates(this.state.data[i].uniqueId);
        }
    };

    updateCandidates = () => {
        let store = InstitutionStore.getAll();
        this.setState({
            candidates: this.state.candidates += (store !== null ? store.length : 0)
        });
    };
}
