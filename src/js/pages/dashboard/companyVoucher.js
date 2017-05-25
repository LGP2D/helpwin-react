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
        console.log('VOUCHERS COMPANY');
        VoucherStore.on('CHANGE_VOUCHERS_COMPANY', this.updateTable);
        VoucherActions.companyVouchers();
    }


    componentWillUnmount () {
        VoucherStore.removeListener('CHANGE_VOUCHERS_COMPANY', this.updateTable);
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
                    </BootstrapTable>
                </div>
            </div>

        );
    }

    updateTable = () => {
        console.log('UPDATE NIGAH!');
        this.setState({
            data: VoucherStore.getCompanyVouchers()
        });
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

}
