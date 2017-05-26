import React from 'react';
import { Link } from 'react-router';
import AuthorizedComponent from 'app/components/dashboard/authorization';

import VolunteeringActions from 'app/actions/volunteeringActions';
import VolunteeringStore from 'app/stores/volunteeringStore';

import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table.min.css';

import config from 'app/stores/config';

export default class ListVouchersCollaborator extends AuthorizedComponent {
    constructor () {
        super();

        this.authorize = [1];
        this.state = {
            data: []
        }
    }

    componentWillMount () {
        super.componentWillMount();
        VolunteeringStore.on('UPDATE_VOLUNTEERING', this.handleProposals);
        VolunteeringStore.on('ACTIVATE_PROPOSAL_SUCCESSFUL', this.handleActivate);
        VolunteeringStore.on('DEACTIVATE_PROPOSAL_SUCCESSFUL', this.handleDeactivate);
        VolunteeringActions.fetchData();
    }

    componentWillUnmount () {
        VolunteeringStore.removeListener('UPDATE_VOLUNTEERING', this.handleProposals);
        VolunteeringStore.removeListener('ACTIVATE_PROPOSAL_SUCCESSFUL', this.handleActivate);
        VolunteeringStore.removeListener('DEACTIVATE_PROPOSAL_SUCCESSFUL', this.handleDeactivate);
    }

    handleActivate = () => {
        window.location.reload();
    };

    handleDeactivate = () => {
        window.location.reload();
    };

    handleProposals = () => {
        this.setState({
           data: VolunteeringStore.getActions()
        });
    };

    buttonFormat = (cell, row) => {
        return(
            <span>
                <button onClick={ activate.bind(null, event, row.uniqueId) } name={ row.uniqueId }>Activate</button>
                <button onClick={ deactivate.bind(null, event, row.uniqueId) } name={ row.uniqueId }>Deactivate</button>
            </span>
        );

        function activate (event, id) {
            VolunteeringActions.activate(id);
        }
        function deactivate (event, id) {
            VolunteeringActions.deactivate(id);
        }
    };

    render () {
        console.log(this.state.data);
        return (
            <div className='panel panel-headline'>
                <div className='panel-heading'>
                    <h3 className='panel-title'>Proposals List</h3>
                    <p className='panel-subtitle'>A list with all the volunteering proposals</p>
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
                    <BootstrapTable data={ this.state.data } striped = { true } bordered = { false }  hover={ true }>
                        <TableHeaderColumn dataField='user' dataFormat={ this.imageFormatter }>
                            Logo
                        </TableHeaderColumn>
                        <TableHeaderColumn dataField='user' dataFormat={ this.fieldFormatter } isKey={ true }
                                           dataSort={ true } formatExtraData={ 'name' }>
                            Name
                        </TableHeaderColumn>
                        <TableHeaderColumn dataField='location'>
                            Location
                        </TableHeaderColumn>
                        <TableHeaderColumn dataField='startDate' dataFormat={ this.dateFormatter }>
                            Starting
                        </TableHeaderColumn>
                        <TableHeaderColumn dataField='endDate'>
                            Ending
                        </TableHeaderColumn>
                        <TableHeaderColumn dataField='description'>
                            Description
                        </TableHeaderColumn>
                        <TableHeaderColumn dataField='verified'>
                            Verified
                        </TableHeaderColumn>
                        <TableHeaderColumn dataFormat={ this.helpFormatter } />
                        <TableHeaderColumn dataFormat={ this.buttonFormat }/>
                    </BootstrapTable>
                </div>
            </div>

        );
    }

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
