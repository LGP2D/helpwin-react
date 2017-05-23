import React from 'react'
import ReactTable from 'react-table'
import 'react-table/react-table.css';
import 'assets/scss/volunteeringtable.scss';

import { VoucherActions } from 'app/actions';
import { VoucherStore } from 'app/stores';

export default class CompanyVoucher extends React.Component {
    constructor () {
        super();

        this.state = {
            data: []
        };

        this.columns = [
            {
                //header: 'type & quantity',
                maxWidth: 180,
                render: row => (
                    <div>
                        <p> { row.row.type }</p>
                        <p> Quantity: { row.row.quantity }</p>
                    </div>
                )
            },
            {
                header: 'Description',
                render: row => (
                    <div>
                        <p> { row.row.description }</p>
                    </div>
                )
            },
            {
                header: 'validity',
                maxWidth: 160,
                render: row => (
                    <div>
                        <p>Starting:  { row.row.dateStart }</p>
                        <p>Ending:    { row.row.dateEnd }</p>
                    </div>
                )
            },
            {
                header: 'value',
                maxWidth: 110,
                render: row => (
                    <div>
                        <p>Credits:</p>
                        <p> { row.row.credits }</p>
                    </div>
                )
            }
        ]
    }

    updateTable = () => {
        this.setState({
            data: VoucherStore.getCompanyVouchers()
        });
        console.log(VoucherStore.getCompanyVouchers());
    };

    handleClick = (event) => {
        console.log(event.target.name)
    };

    componentWillMount (){
        VoucherStore.on('UPDATE_COMPANY_VOUCHER', this.updateTable);
        VoucherActions.fetchCompany();
    }

    componentWillUnmount () {
        VoucherStore.removeListener('UPDATE_COMPANY_VOUCHER', this.updateTable);
    }

    render (){
        return(
            <ReactTable
            className= 'company-voucher-table'
            data={ this.state.data }
            columns={ this.columns }
            defaultPageSize={ 10 }
            resizable={ false }
            />
        )
    }
}
