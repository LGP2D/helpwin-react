import React from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

import { VolunteeringActions } from 'app/actions';
import { VolunteeringStore } from 'app/stores';

import 'react-bootstrap-table/dist/react-bootstrap-table.min.css';
import config from 'app/stores/config';

export default class MyVolunteerProposals extends React.Component {

    constructor () {
        super();

        this.onUpdateProposals = this.update.bind(this, 'actions');
        this.onUpdateUserProposals = this.update.bind(this, 'data');

        this.state = {
            data: [],
            actions: []
        };
    }

    componentWillMount () {
        VolunteeringStore.on('UPDATE_VOLUNTEERING', this.onUpdateProposals);
        VolunteeringStore.on('UPDATE_USER_PROPOSALS', this.onUpdateUserProposals);
        VolunteeringActions.fetchUserProposals();
        VolunteeringActions.fetchValidProposals();
    }

    componentWillUnmount () {
        VolunteeringStore.removeListener('UPDATE_VOLUNTEERING', this.onUpdateProposals);
        VolunteeringStore.removeListener('UPDATE_USER_PROPOSALS', this.onUpdateUserProposals);
    }

    render () {

        return (

            <div class='panel panel-headline'>
                <div class='panel-heading'>
                    <h3 class='panel-title'>My Volunteering Proposals</h3>
                    <p class='panel-subtitle'>A list with the proposals you are involved in</p>
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
                    <BootstrapTable data={ this.state.data } striped = { true } bordered = { false }  hover={ true }>
                        <TableHeaderColumn dataField='action'
                                           dataFormat={ this.imageFormatter.bind(this) }>
                            Logo
                        </TableHeaderColumn>
                        <TableHeaderColumn dataField='action' dataFormat={ this.nameFormatter.bind(this) }
                                           isKey={ true } dataSort={ true }>
                            Name
                        </TableHeaderColumn>
                        <TableHeaderColumn dataField='action' dataFormat={ this.fieldFormatter }
                                           formatExtraData={ 'location' }>
                            Location
                        </TableHeaderColumn>
                        <TableHeaderColumn dataField='action' dataFormat={ this.dateFormatter }
                                           formatExtraData={ 'startDate' }>
                            Starting
                        </TableHeaderColumn>
                        <TableHeaderColumn dataField='action' dataFormat={ this.fieldFormatter }
                                           formatExtraData={ 'endDate' }>
                            Ending
                        </TableHeaderColumn>
                        <TableHeaderColumn dataField='action' dataFormat={ this.fieldFormatter }
                                           formatExtraData={ 'description' }>
                            Description
                        </TableHeaderColumn>
                        <TableHeaderColumn dataFormat={ this.stateFormatter }>
                            State
                        </TableHeaderColumn>
                    </BootstrapTable>
                </div>
            </div>

        );
    }

    update = (key) => {
        this.state[key] = VolunteeringStore.getActions();
        this.setState(this.state);
    };

    getActionById (id) {
        for (let actionId in this.state.actions) {
            let action = this.state.actions[actionId];
            if(action.id === id) {
                return action;
            }
        }
    }

    imageFormatter (cell, row) {
        return (
            <img height='50' src={ config.API_STATIC_URL + this.getActionById(cell.id).user.imageUrl } />
        );
    }

    nameFormatter (cell, row) {
        return (
            this.getActionById(cell.id).user.name
        );
    }

    dateFormatter (cell, row, extra) {
        let date = new Date(cell[extra]);
        let diff = Math.round((date - new Date()) / (1000*60*60*24));
        return (
            <span> { cell[extra] } { diff > 0 ? <span class='badge badge-info'>{ diff } days to go</span> :
                <span class='badge badge-success'>ONGOING</span> }</span>
        );
    }

    fieldFormatter (cell, row, extra) {
        return (
            cell[extra]
        );
    }

    stateFormatter (cell, row) {
        let state = 'default';
        let description = 'FAILED';
        switch(row.evaluationStatus.description) {
            case 'PENDING':
                state =  row.elected ? 'success' : 'warning';
                description = row.elected ? 'ACCEPTED' : 'PENDING APPROVAL';
                break;
            case 'FAILED':
                state = 'danger';
                description = 'FAILED';
                break;
            case 'REJECTED':
                state = 'danger';
                description = 'REJECTED';
            case 'SUCCEED':
                state = 'success';
                description = '';
                break;
        }
        return (
            <span class={ 'label label-' + state }>{ description }</span>
        );
    }
}
