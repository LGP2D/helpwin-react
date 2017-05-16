import React from 'react'
import ReactTable from 'react-table'
import 'react-table/react-table.css';
import 'assets/scss/volunteeringtable.scss';

import { CompanyVoucherActions } from 'app/actions';
import CompanyVoucherStore from 'app/stores/companyVoucherStore';

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
            data: CompanyVoucherStore.getAll()
        })
    };

    handleClick = (event) => {
        console.log(event.target.name)
    };

    componentWillMount (){
        CompanyVoucherStore.on('update',this.updateTable);
        CompanyVoucherActions.fetchData();
    }

    componentWillUnmount () {
        CompanyVoucherStore.removeListener('update',this.updateTable);
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
