import React from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

import { VoucherActions } from 'app/actions';
import VoucherStore from 'app/stores/voucherStore';
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
        this.state[key] = store.getAll();
        this.setState(this.state);
    };

    render () {

        return (

            <div class='panel panel-headline'>
                <div class='panel-heading'>
                    <h3 class='panel-title'>Vouchers</h3>
                    <p class='panel-subtitle'>A list with existing vouchers</p>
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
                    <ImgGrid>
                        { this.state.vouchers.map(function (result) {
                            return <ImgOnGrid imagePath={ result.imagePath } />;
                        }) }
                    </ImgGrid>
                </div>
            </div>

        );
    }
}
