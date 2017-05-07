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

        this.getVouchers = this.getVouchers.bind(this);
    }

    getVouchers (){
        console.log('vouchers get succeed');
    }

    componentWillMount() {''
        VoucherStore.on('getVouchers', this.getVouchers);
    }

    componentWillUnmount() {
        VoucherStore.removeListener('getVoucher', this.getVouchers);
    }

    render (){
        return(
            <div class='container'>
                <ImgGrid>
                    <ImgOnGrid  imagePath='http://2.bp.blogspot.com/-H6MAoWN-UIE/TuRwLbHRSWI/AAAAAAAABBk/89iiEulVsyg/s400/Free%2BNature%2BPhoto.jpg'/>
                </ImgGrid>
            </div>

        );
    }
}
