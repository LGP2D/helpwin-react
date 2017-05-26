import React from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

import VoucherActions from 'app/actions/voucherActions';
import VoucherStore from 'app/stores/voucherStore';
import UserStore from 'app/stores/userStore';

import config from 'app/stores/config'

import 'react-bootstrap-table/dist/react-bootstrap-table.min.css';

export default class CompanyVoucher extends React.Component {
    constructor () {
        super();

        this.state = {
            data: []
        };
    }

    componentWillMount () {
        VoucherStore.on('CHANGE_VOUCHERS_COMPANY', this.updateTable);
        VoucherStore.on('VOUCHER_DELETED', this.updateDeletedTable);
        VoucherActions.companyVouchers();
    }


    componentWillUnmount () {
        VoucherStore.removeListener('CHANGE_VOUCHERS_COMPANY', this.updateTable);
        VoucherStore.removeListener('VOUCHER_DELETED', this.updateDeletedTable);

    }

    render () {
        const { location } = this.props;

        return (

            <div class='panel panel-headline'>
                <div class='panel-heading'>
                    <h3 class='panel-title'>Volunteering Proposals</h3>
                    <p class='panel-subtitle'>A list with all your registered volunteering proposals</p>
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
                    <BootstrapTable data={ this.state.data } striped={ true } hover={ true }>
                        <TableHeaderColumn dataField='institution' dataFormat={ this.imageFormatter } isKey={ true }/>
                        <TableHeaderColumn dataFormat={ this.descriptionFormatter }>
                            Description
                        </TableHeaderColumn>
                        <TableHeaderColumn dataFormat={ this.typeFormatter }>
                            Type
                        </TableHeaderColumn>
                        <TableHeaderColumn dataFormat={ this.datesFormatter }>
                            Dates
                        </TableHeaderColumn>
                        <TableHeaderColumn dataFormat={ this.buttonDelete }/>
                    </BootstrapTable>
                </div>
            </div>

        );
    }

    updateTable = () => {
        this.setState({
            data: VoucherStore.getCompanyVouchers()
        });
    };

    updateDeletedTable = () => {
        window.location.reload();
    };

    imageFormatter (cell, row) {
        return (
            <img height='50' src={  row.imagePath } />
        );
    }

    descriptionFormatter (cell, row) {
        return (
            <div className='text-center'>
                <span className='volunteering-table-text-margin'>{ row.description }</span>
            </div>
        );
    }

    typeFormatter (cell, row) {
        return (
            <div className='text-center'>
                <span className='volunteering-table-text-margin'>{ row.type }</span>
            </div>
        );
    }
    datesFormatter (cell, row) {
        return (
            <div className='text-center'>
                <i className='fa fa-calendar'/><span
                className='volunteering-table-text-margin'>Starting: { row.startDate }</span>
                <br />
                <i className='fa fa-calendar'/><span
                className='volunteering-table-text-margin'>Ending: { row.endDate }</span>
            </div>
        );
    }

    buttonDelete = (cell, row) => {
        return(
            <button onClick={ deleteV.bind(null, event, row.uniqueId) } name={ row.uniqueId }>Delete</button>
        );

        function deleteV (event, id) {
            VoucherActions.deleteVoucher(id)
        }
    };

}
