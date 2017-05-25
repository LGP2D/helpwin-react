import React from 'react';
import AuthorizedComponent from 'app/components/dashboard/authorization';

import CompanyStore from 'app/stores/companyStore';
import CompanyActions from 'app/actions/companyActions';

import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table.min.css';

import config from 'app/stores/config';

export default class ListCompanies extends AuthorizedComponent {
    constructor () {
        super();

        this.authorize = [1];
        this.state = {
            data: []
        }
    }

    componentWillMount () {
        super.componentWillMount();
        CompanyStore.on('GET_COMPANIES_SUCCESSFUL', this.handleCompanies);
        CompanyStore.on('ACTIVATE_COMPANY_SUCCESSFUL', this.handleActivate);
        CompanyStore.on('DEACTIVATE_COMPANY_SUCCESSFUL', this.handleDeactivate);
        CompanyActions.getCompanies();
    }

    componentWillUnmount () {
        CompanyStore.removeListener('GET_COMPANIES_SUCCESSFUL', this.handleCompanies);
        CompanyStore.removeListener('ACTIVATE_COMPANY_SUCCESSFUL', this.handleActivate);
        CompanyStore.removeListener('DEACTIVATE_COMPANY_SUCCESSFUL', this.handleDeactivate);
    }

    handleActivate = () => {
        window.location.reload();
    };

    handleDeactivate = () => {
        window.location.reload();
    };

    handleCompanies = () => {
        this.setState({
            data: CompanyStore.getCompanies
        });
    };

    imageFormatter = (cell, row) => {
        return (
            <img height='50' src={ config.API_STATIC_URL + row.imageUrl } />
        );
    };

    buttonActivateFormat = (cell, row) => {
        return(
            <button onClick={ activate.bind(null, event, row.uniqueId) } name={ row.uniqueId }>Activate</button>
        );

        function activate (event, id) {
            CompanyActions.activate(id);
        }
    };

    buttonDeactivateFormat = (cell, row) => {
        return(
            <button onClick={ deactivate.bind(null, event, row.uniqueId) } name={ row.uniqueId }>Deactivate</button>
        );

        function deactivate (event, id) {
            CompanyActions.deactivate(id);
        }
    };

    render () {
        const { location } = this.props;
        return (
            <div className='panel panel-headline'>
                <div className='panel-heading'>
                    <h3 className='panel-title'>Companies List</h3>
                    <p className='panel-subtitle'>A list with all registered companies</p>
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
                        <TableHeaderColumn dataFormat={ this.imageFormatter } width='130px' />
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
                        <TableHeaderColumn dataFormat={ this.buttonActivateFormat }/>
                        <TableHeaderColumn dataFormat={ this.buttonDeactivateFormat }/>
                    </BootstrapTable>
                </div>
            </div>
        );
    }
}
