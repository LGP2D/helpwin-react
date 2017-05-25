import React from 'react';
import AuthorizedComponent from 'app/components/dashboard/authorization';

import VoucherStore from 'app/stores/voucherStore';
import VoucherActions from 'app/actions/voucherActions';

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
        VoucherStore.on('CHANGE_VOUCHERS', this.handleVouchers);
        VoucherStore.on('ACTIVATE_VOUCHER_SUCCESSFUL', this.handleActivate);
        VoucherStore.on('DEACTIVATE_VOUCHER_SUCCESSFUL', this.handleDeactivate);
        VoucherActions.fetchData();
    }

    componentWillUnmount () {
        VoucherStore.removeListener('CHANGE_VOUCHERS', this.handleVouchers);
    }

    handleActivate = () => {
        window.location.reload();
    };

    handleDeactivate = () => {
        window.location.reload();
    };

    handleVouchers = () => {
        this.setState({
           data: VoucherStore.getVouchers()
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
            VoucherActions.activate(id);
        }
    };

    buttonDeactivateFormat = (cell, row) => {
        return(
            <button onClick={ activate.bind(null, event, row.uniqueId) } name={ row.uniqueId }>Deactivate</button>
        );

        function activate (event, id) {
            VoucherActions.deactivate(id);
        }
    };

    render () {
        return (
            <div className='panel panel-headline'>
                <div className='panel-heading'>
                    <h3 className='panel-title'>Voucher List</h3>
                    <p className='panel-subtitle'>A list with all the vouchers</p>
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
                        <TableHeaderColumn isKey={ true } dataField='id'>
                            ID
                        </TableHeaderColumn>
                        <TableHeaderColumn dataField='company'>
                            Company
                        </TableHeaderColumn>
                        <TableHeaderColumn dataField='quantity'>
                            Quantity
                        </TableHeaderColumn>
                        <TableHeaderColumn dataField='type'>
                            Type
                        </TableHeaderColumn>
                        <TableHeaderColumn dataField='description'>
                            Description
                        </TableHeaderColumn>
                        <TableHeaderColumn dataField='valid'>
                            Valid
                        </TableHeaderColumn>
                        <TableHeaderColumn dataFormat={ this.buttonActivateFormat }/>
                        <TableHeaderColumn dataFormat={ this.buttonDeactivateFormat }/>
                    </BootstrapTable>
                </div>
            </div>
        );
    }
}
