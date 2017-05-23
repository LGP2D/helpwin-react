import React from 'react';
import { VoucherStore } from 'app/stores';
import { VoucherActions } from 'app/actions';
import 'react-widgets/lib/less/react-widgets.less';
import ImgGrid from 'app/components/shared/imgs/ImgGrid';
import ImgOnGrid from 'app/components/shared/imgs/ImgOnGrid';

require('./voucherList.scss');

export default class VoucherList extends React.Component {
    constructor (){
        super();

        this.onUpdateVouchers = this.update.bind(null, 'vouchers', VoucherStore);

        this.state = {
            vouchers : []
        };
    }

    update = (key, store) => {
        this.state[key] = store.getVouchers();
        this.setState(this.state);
    };

    componentWillMount () {
        VoucherStore.on('CHANGE_VOUCHERS', this.onUpdateVouchers);
        VoucherActions.fetchData();
    }

    componentWillUnmount () {
        VoucherStore.removeListener('CHANGE_VOUCHERS', this.onUpdateVouchers);
    }

    render (){
        return(
            <div className='container'>
                <h1> Vouchers </h1>
                <ImgGrid>
                    { this.state.vouchers.map(function (result) {
                        return <ImgOnGrid key={ result.imagePath } imagePath={ result.imagePath }/>;
                    }) }
                </ImgGrid>
            </div>

        );
    }
}
