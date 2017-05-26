import React from 'react';

import AuthorizedComponent from 'app/components/dashboard/authorization';
import { VolunteeringActions, VoucherActions } from 'app/actions';
import { VolunteeringStore, VoucherStore } from 'app/stores';

export default class Volunteer extends AuthorizedComponent {

    constructor () {
        super();

        this.authorize = [3];
        this.onUpdate = this.updateVolun.bind(this, 'proposals', VolunteeringStore);
        this.onUpdateVouchers = this.updateVouchers.bind(this, 'vouchers', VoucherStore);

        this.state = {
            proposals: [],
            vouchers: [],
            applications: []
        };
    }

    componentWillMount () {
        super.componentWillMount();

        VolunteeringStore.on('UPDATE_VALID_PROPOSALS', this.onUpdate);
        VoucherStore.on('CHANGE_VOUCHERS', this.onUpdateVouchers);
        VolunteeringActions.fetchUserProposals();
        VoucherActions.fetchData();
    }

    componentWillUnmount () {
        VolunteeringStore.removeListener('UPDATE_VALID_PROPOSALS', this.onUpdate);
        VoucherStore.removeListener('CHANGE_VOUCHERS', this.onUpdateVouchers);
    }

    updateVouchers = (key, store) => {
        this.state[key] = store.getVouchers();
        this.setState(this.state);
    };

    updateVolun = (key, store) => {
        this.state[key] = store.getActions();
        this.setState(this.state);
    };

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
                        <div class='col-md-4'>
                            <div class='metric'>
                                <span class='icon toast-info'><i class='fa fa-group' /></span>
                                <p>
                                    <span class='number'>{ this.state.proposals.length }</span>
                                    <span class='title'>Proposals</span>
                                </p>
                            </div>
                        </div>
                        <div class='col-md-4'>
                            <div class='metric'>
                                <span class='icon toast-danger'><i class='fa fa-heart' /></span>
                                <p>
                                    <span class='number'>{ this.state.applications.length }</span>
                                    <span class='title'>Applications</span>
                                </p>
                            </div>
                        </div>
                        <div class='col-md-4'>
                            <div class='metric'>
                                <span class='icon toast-success'><i class='fa fa-gift' /></span>
                                <p>
                                    <span class='number'>{ this.state.vouchers.length }</span>
                                    <span class='title'>Vouchers</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
