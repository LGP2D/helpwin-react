import React from 'react';
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

    imageFormatter = (cell, row) => {
        return (
            <img height='50' width='100%' src={ /*config.API_STATIC_URL + */row.imagePath } />
        );
    };

    buttonActivateFormat = (cell, row) => {
        return(
            <button onClick={ activate.bind(null, event, row.uniqueId) } name={ row.uniqueId }>Activate</button>
        );

        function activate (event, id) {
            VolunteeringActions.activate(id);
        }
    };

    buttonDeactivateFormat = (cell, row) => {
        return(
            <button onClick={ deactivate.bind(null, event, row.uniqueId) } name={ row.uniqueId }>Deactivate</button>
        );

        function deactivate (event, id) {
            VolunteeringActions.deactivate(id);
        }
    };

    render () {
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
                            Verified
                        </TableHeaderColumn>
                        <TableHeaderColumn dataFormat={ this.buttonActivateFormat }/>
                        <TableHeaderColumn dataFormat={ this.buttonDeactivateFormat }/>
                    </BootstrapTable>
                </div>
            </div>

        );
    }

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
            case false:
                state = 'danger';
                description = 'Not verified';
            case true:
                state = 'success';
                description = 'Verified';
                break;
        }
        return (
            <span class={ 'label label-' + state }>{ description }</span>
        );
    }
}
