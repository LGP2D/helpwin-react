import React from 'react';
import { Link } from 'react-router';
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
        VolunteeringStore.on('FETCH_VALID_PROPOSALS', this.onUpdateProposals);
        VolunteeringStore.on('UPDATE_USER_PROPOSALS', this.onUpdateUserProposals);
        VolunteeringActions.fetchUserProposals();
        VolunteeringActions.fetchValidProposals();
    }

    componentWillUnmount () {
        VolunteeringStore.removeListener('FETCH_VALID_PROPOSALS', this.onUpdateProposals);
        VolunteeringStore.removeListener('UPDATE_USER_PROPOSALS', this.onUpdateUserProposals);
    }

    render () {

        return (

            <div className='panel panel-headline'>
                <div className='panel-heading'>
                    <h3 className='panel-title'>My Volunteering Proposals</h3>
                    <p className='panel-subtitle'>A list with the proposals you are involved in</p>
                    <div className='right'>
                        <button type='button' className='btn-toggle-collapse'>
                            <i className='ti ti-angle-up' />
                        </button>
                        <button type='button' className='btn-remove'>
                            <i className='ti ti-close' />
                        </button>
                    </div>
                </div>
                <div className='panel-body'>
                    <BootstrapTable data={ this.state.data } striped = { true } bordered = { false }  hover={ true } search>
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
                        <TableHeaderColumn dataFormat={ this.helpFormatter } />
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
            <img height='50' src={ config.API_STATIC_URL + cell.user.imageUrl } />
        );
    }

    nameFormatter (cell, row) {
        return (
            cell.user.name
        );
    }

    dateFormatter (cell, row, extra) {
        let dateStart = new Date(row.action.startDate);
        let dateEnd = new Date(row.action.endDate);
        let diffStart = Math.round((dateStart - new Date()) / (1000*60*60*24));
        let diffEnd = Math.round((dateEnd - new Date()) / (1000*60*60*24));
        return (
            <span> { row.action.startDate } { diffStart > 0 ? <span class='badge badge-info'>{ diffStart } days to go</span> :
                (diffEnd > 0 ? <span class='badge badge-success'>ONGOING</span> :
                    <span class='badge badge-danger'>EXPIRED</span>) } </span>
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
                break;
            case 'SUCCEED':
                state = 'default';
                description = 'COMPLETED';
                break;
        }
        return (
            <span className={ 'label label-' + state }>{ description }</span>
        );
    }

    helpFormatter (cell, row) {
        return (
            <Link to={ '/dashboard/proposals/' + row.action.id }>
                <button className='btn btn-info' type='button'>
                    Details
                </button>
            </Link>
        );
    }
}
