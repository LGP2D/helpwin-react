import React from 'react';
import VoucherStore from 'app/stores/voucherStore';
import { VoucherActions } from 'app/actions';
import 'react-widgets/lib/less/react-widgets.less';
import ImgGrid from 'app/components/shared/imgs/ImgGrid';
import ImgOnGrid from 'app/components/shared/imgs/ImgOnGrid';

require('./voucherList.scss');

export default class VoucherList extends React.Component {
    constructor (){
        super();
        this.state = {
            vouchers : []
        };
        this.getVouchers = this.getVouchers.bind(this);
    }

    getVouchers (){
        this.setState({
            vouchers : VoucherStore.getAll()
        });
        window.location.vouchers = this.state.vouchers;
    }

    componentWillMount () {
        VoucherActions.fetchData();
        VoucherStore.on('CHANGE_VOUCHERS', this.getVouchers);
    }

    componentWillUnmount () {
        VoucherStore.removeListener('CHANGE_VOUCHERS', this.getVouchers);
    }

    render (){
        return(
            <div className='container'>
                <h1> Vouchers </h1>
                <ImgGrid>
                    { this.state.vouchers.map(function (result) {
                        return < ImgOnGrid imagePath={ result.imagePath }/>;
                    }) }
                </ImgGrid>
            </div>

        );
    }
}
