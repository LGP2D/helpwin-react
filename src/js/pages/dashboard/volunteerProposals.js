import React from 'react';
import { Link } from 'react-router';
import { BootstrapTable, SearchField, TableHeaderColumn} from 'react-bootstrap-table';

import { VolunteeringActions } from 'app/actions';
import { VolunteeringStore } from 'app/stores';

import 'react-bootstrap-table/dist/react-bootstrap-table.min.css';
import config from 'app/stores/config';

export default class VolunteerProposals extends React.Component {

    constructor () {
        super();

        this.onUpdateProposals = this.updateProposals.bind(this, 'data');
        this.onUpdateUserProposals = this.updateUserProposals.bind(this, 'actions');

        this.state = {
            data: [],
            actions: []
        };
    }

    componentWillMount () {
        VolunteeringStore.on('UPDATE_USER_PROPOSALS', this.onUpdateUserProposals);
        VolunteeringStore.on('UPDATE_VALID_PROPOSALS', this.onUpdateProposals);
        VolunteeringActions.fetchUserProposals();
    }

    componentWillUnmount () {
        VolunteeringStore.removeListener('UPDATE_VALID_PROPOSALS', this.onUpdateProposals);
        VolunteeringStore.removeListener('UPDATE_USER_PROPOSALS', this.onUpdateUserProposals);
    }

    render () {

        return (

            <div class='panel panel-headline'>
                <div class='panel-heading'>
                    <h3 class='panel-title'>Volunteering Proposals</h3>
                    <p class='panel-subtitle'>A list with all active Volunteering proposals from registered Institutions</p>
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
                    <BootstrapTable data={ this.state.data } striped = { true } bordered = { false }  hover={ true } search>
                        <TableHeaderColumn dataField='user' dataFormat={ this.imageFormatter } isKey={ true }>
                            Logo
                        </TableHeaderColumn>
                        <TableHeaderColumn dataField='user' filterFormatted dataFormat={ this.fieldFormatter }
                                           dataSort={ true } formatExtraData={ 'name' }>
                            Name
                        </TableHeaderColumn>
                        <TableHeaderColumn dataField='location'>
                            Location
                        </TableHeaderColumn>
                        <TableHeaderColumn dataSort={ true } filter={ { type: 'DateFilter' } }
                                           dataField='startDate' dataFormat={ this.dateFormatter }>
                            Starting
                        </TableHeaderColumn>
                        <TableHeaderColumn dataSort={ true } filter={ { type: 'DateFilter' } }
                                           dataField='endDate'>
                            Ending
                        </TableHeaderColumn>
                        <TableHeaderColumn dataField='description'>
                            Description
                        </TableHeaderColumn>
                        <TableHeaderColumn dataSort={ true } dataField='credits' dataFormat={ this.rewardFormatter }>
                            Rewards
                        </TableHeaderColumn>
                        <TableHeaderColumn dataFormat={ this.helpFormatter } />
                    </BootstrapTable>
                </div>
            </div>

        );
    }

    updateUserProposals = (key) => {
        this.state[key] = VolunteeringStore.getActions();
        this.setState(this.state);
        VolunteeringActions.fetchValidProposals();
    };

    updateProposals = (key) => {
        let data = VolunteeringStore.getActions();
        for(let pId in data) {
            let proposal = data[pId];
            for (let pUId in this.state.actions) {
                let userProposal = this.state.actions[pUId];
                if(userProposal.id = proposal.id) {
                    data.splice(pId, 1);
                }
            }
        }
        this.state[key] = data;
        this.setState(this.state);
    };

    imageFormatter (cell, row) {
        return (
            <img height='50' src={ config.API_STATIC_URL + cell.imageUrl } />
        );
    }

    dateFormatter (cell, row, extra) {
        let input = extra ? cell[extra] : cell;
        let date = new Date(input);
        let diff = Math.round((date - new Date()) / (1000*60*60*24));
        return (
            <span> { input } { diff > 0 ? <span class='badge badge-info'>{ diff } days to go</span> :
                <span class='badge badge-success'>ONGOING</span> }</span>
        );
    }

    fieldFormatter (cell, row, extra) {
        return (
            cell[extra]
        );
    }

    rewardFormatter (cell, row) {
        return (
            <span><i className='fa fa-database coin'/> { cell }</span>
        );
    }

    helpFormatter (cell, row) {
        return (
            <Link to={ '/dashboard/proposals/' + row.id }>
                <button className='btn btn-primary' type='button'>
                    Details
                </button>
            </Link>
        );
    }
}
