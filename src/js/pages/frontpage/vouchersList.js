import React from 'react';
import VoucherStore from 'app/stores/voucherStore';
import * as VoucherActions from 'app/actions/voucherActions';
import 'react-widgets/lib/less/react-widgets.less';
import ImgGrid from 'app/components/frontpage/imgs/ImgGrid';
import ImgOnGrid from 'app/components/frontpage/imgs/ImgOnGrid';

require('./voucherList.scss');

export default class VoucherList extends React.Component {
    constructor (){
        super();
        this.state = {
            vouchers : []
        }
        this.getVouchers = this.getVouchers.bind(this);
    }

    getVouchers (){
        this.setState({
            vouchers : VoucherStore.getVouchers()
        })
        window.location.vouchers = this.state.vouchers;
    }

    componentWillMount() {
        VoucherActions.getVouchers();
        VoucherStore.on('CHANGE_VOUCHERS', this.getVouchers);
    }

    componentWillUnmount() {
        VoucherStore.removeListener('CHANGE_VOUCHERS', this.getVouchers);
    }

    render (){
        return(
            <div class='container'>
                <ImgGrid>
                    { this.state.vouchers.map(voucher => (
                        <ImgOnGrid imagePath = { voucher.imagePath } />
                    )) }
                </ImgGrid>
            </div>

        );
    }




}
