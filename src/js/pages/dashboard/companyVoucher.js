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
        VoucherStore.on('CHANGE_VOUCHERS', this.updateTable);
        VoucherActions.fetchData();
    }


    componentWillUnmount () {
        VoucherStore.removeListener('CHANGE_VOUCHERS', this.updateTable);
    }

    render () {
        const { location } = this.props;

        return (

            <div class='panel panel-headline'>
                <div class='panel-heading'>
                    <h3 class='panel-title'>Vouchers</h3>
                    <p class='panel-subtitle'>A list with all the vouchers available for redeeming</p>
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
                    <BootstrapTable data={ this.state.data } striped = { true } bordered = { false }
                                    hover={ true } search>
                        <TableHeaderColumn dataField='company' dataFormat={ this.imageFormatter }
                                           isKey={ true } filterFormatted />
                        <TableHeaderColumn dataField='company' dataFormat={ this.fieldFormatter }
                                           formatExtraData={ 'name' }>
                            Company
                        </TableHeaderColumn>
                        <TableHeaderColumn dataField='type' dataFormat={ this.quantityFormatter }>
                            Quantity
                        </TableHeaderColumn>
                        <TableHeaderColumn dataField='type'>
                            Type
                        </TableHeaderColumn>
                        <TableHeaderColumn dataField='description'>
                            Description
                        </TableHeaderColumn>
                        <TableHeaderColumn dataField='credits' dataFormat={ this.coinsFormatter }>
                            Coins
                        </TableHeaderColumn>
                        <TableHeaderColumn dataFormat={ this.redeemFormatter }>
                            Redeem
                        </TableHeaderColumn>
                    </BootstrapTable>
                </div>
            </div>
        );
    }

    updateTable = () => {
        this.setState({
            data: VoucherStore.getVouchers()
        });
    };

    fieldFormatter (cell, row, extra) {
        return (
            cell[extra]
        );
    }

    imageFormatter (cell, row) {
        return (
            <img className='img img-responsive' height='50' src={ row.imagePath } />
        );
    }

    descriptionFormatter (cell, row) {
        return (
            <div className='text-center'>
                <span className='volunteering-table-text-margin'>{ row.description }</span>
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

    quantityFormatter (cell, row) {
        let quantity = row.quantity;
        let label = 'label-default';
        switch(true) {
            case (quantity < 2):
                label = 'label-danger';
                break;
            case (quantity < 10):
                label = 'label-warning';
                break;
            case (quantity < 50):
                label = 'label-success';
                break;
            default:
                quantity = '50+';
                label = 'label-success';
        }
        return (
            <span className={ 'label ' + label }>{ quantity } remaining</span>
        );
    }

    coinsFormatter (cell, row) {
        return (
            <span><i className='fa fa-database coin'/> { cell }</span>
        );
    }

    redeemFormatter (cell, row) {
        return (
            <button className='btn btn-info'>Redeem</button>
        );
    }
}
