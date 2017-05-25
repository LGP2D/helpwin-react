import React from 'react';
import AuthorizedComponent from 'app/components/dashboard/authorization';

import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table.min.css';

import InstitutionStore from 'app/stores/institutionStore';
import InstitutionActions from 'app/actions/institutionActions';

import config from 'app/stores/config';

export default class InstitutionList1 extends AuthorizedComponent {
    constructor () {
        super();

        this.authorize = [1];

        this.state = {
            data: []
        };
    }

    componentWillMount () {
        super.componentWillMount();
        InstitutionStore.on('GET_INSTITUTIONS_SUCCESSFUL', this.handleInstitutions);
        InstitutionStore.on('ACTIVATE_INSTITUTION_SUCCESSFUL', this.handleActivate);
        InstitutionStore.on('DEACTIVATE_INSTITUTION_SUCCESSFUL', this.handleDeactivate);
        InstitutionActions.getInstitutions();
    }

    componentWillUnmount () {
        InstitutionStore.removeListener('GET_INSTITUTIONS_SUCCESSFUL', this.handleInstitutions);
        InstitutionStore.removeListener('ACTIVATE_INSTITUTION_SUCCESSFUL', this.handleActivate);
        InstitutionStore.removeListener('DEACTIVATE_INSTITUTION_SUCCESSFUL', this.handleDeactivate);
    }

    handleInstitutions = () => {
        this.setState({
            data: InstitutionStore.getInstitutions
        });
    };

    handleActivate = () => {
        console.log('activated');
        window.location.reload();
    };

    handleDeactivate = () => {
        console.log('deactivated');
        window.location.reload();
    };

    static imageFormatter (cell, row) {
        return (
            <img height='50' src={ config.API_STATIC_URL + row.imageUrl } />
        );
    };

    static buttonActivateFormat = (cell, row) => {
        return(
            <button onClick={ activate.bind(null, event, row.uniqueId) } name={ row.uniqueId }>Activate</button>
        );

        function activate (event, id) {
            InstitutionActions.activate(id);
        }
    };

    static buttonDeactivateFormat = (cell, row) => {
        return(
            <button onClick={ activate.bind(null, event, row.uniqueId) } name={ row.uniqueId }>Deactivate</button>
        );

        function activate (event, id) {
            InstitutionActions.deactivate(id);
        }
    };

    render () {
        const { location } = this.props;
        console.log(this.state.data);

        return (
            <div className='panel panel-headline'>
                <div className='panel-heading'>
                    <h3 className='panel-title'>Institutions List</h3>
                    <p className='panel-subtitle'>A list with all registered institutions</p>
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
                    <BootstrapTable data={ this.state.data } striped={ true } hover={ true }>
                        <TableHeaderColumn dataFormat={ InstitutionList1.imageFormatter }
                                           width='130px' />
                        <TableHeaderColumn isKey={ true } dataField='uniqueId'>
                            UniqueID
                        </TableHeaderColumn>
                        <TableHeaderColumn dataField='name'>
                            Name
                        </TableHeaderColumn>
                        <TableHeaderColumn dataField='email'>
                            Email
                        </TableHeaderColumn>
                        <TableHeaderColumn dataField='active'>
                            Active
                        </TableHeaderColumn>
                        <TableHeaderColumn dataFormat={ InstitutionList1.buttonActivateFormat }/>
                        <TableHeaderColumn dataFormat={ InstitutionList1.buttonDeactivateFormat }/>
                    </BootstrapTable>
                </div>
            </div>
        );
    }
}
