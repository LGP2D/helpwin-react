import React from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

import { VoucherActions } from 'app/actions';
import { VoucherStore } from 'app/stores';
import ImgGrid from 'app/components/shared/imgs/ImgGrid';
import ImgOnGrid from 'app/components/shared/imgs/ImgOnGrid';

import 'react-bootstrap-table/dist/react-bootstrap-table.min.css';

require('./list-vouchers.scss');

export default class ListVouchers extends React.Component {
    constructor () {
        super();

        this.onUpdateVouchers = this.update.bind(null, 'vouchers', VoucherStore);

        this.state = {
            vouchers: []
        };
    }

    componentWillMount () {
        VoucherStore.on('CHANGE_VOUCHERS', this.onUpdateVouchers);
        VoucherActions.fetchData();
    }

    componentWillUnmount () {
        VoucherStore.removeListener('CHANGE_VOUCHERS', this.onUpdateVouchers);
    }

    update = (key, store) => {
        this.state[key] = store.getVouchers();
        this.setState(this.state);
    };

    render () {

        return (

            <div className='panel panel-headline'>
                <div className='panel-heading'>
                    <h3 className='panel-title'>Vouchers</h3>
                    <p className='panel-subtitle'>A list with existing vouchers</p>
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
                    <ImgGrid>
                        { this.state.vouchers.map(function (result) {
                            return <ImgOnGrid key={ result.imagePath } imagePath={ result.imagePath } />;
                        }) }
                    </ImgGrid>
                </div>
            </div>

        );
    }
}
