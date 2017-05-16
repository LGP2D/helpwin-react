import React from 'react';

import { VolunteeringActions, VoucherActions } from 'app/actions';
import VolunteeringStore from 'app/stores/volunteeringListStore';
import VoucherStore from 'app/stores/voucherStore';

export default class Volunteer extends React.Component {

    constructor () {
        super();

        this.state = {
            proposals: [],
            vouchers: [],
            applications: []
        };
    }

    componentWillMount () {
        VolunteeringStore.on('update', this.update.bind(null, 'proposals', VolunteeringStore));
        VoucherStore.on('CHANGE_VOUCHERS', this.update.bind(null, 'vouchers', VoucherStore));
        VolunteeringActions.fetchData();
        VoucherActions.fetchData();
    }

    componentWillUnmount () {
        VolunteeringStore.removeListener('update', this.update);
        VoucherStore.removeListener('CHANGE_VOUCHERS', this.update);
    }

    update = (key, store) => {
        this.state[key] = store.getAll();
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
