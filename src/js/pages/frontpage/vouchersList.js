import React from 'react';
import VoucherStore from 'app/stores/voucherStore';
import * as VoucherActions from 'app/actions/voucherActions';
import 'react-widgets/lib/less/react-widgets.less';

require('./voucherList.scss');

export default class Register extends React.Component {
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
                <div class='row'>
                    <div class='col-md-3 col-sm-4 col-xs-6'><img class='img-responsive' src='http://2.bp.blogspot.com/-H6MAoWN-UIE/TuRwLbHRSWI/AAAAAAAABBk/89iiEulVsyg/s400/Free%2BNature%2BPhoto.jpg' /></div>
                    <div class='col-md-3 col-sm-4 col-xs-6'><img class='img-responsive' src='http://2.bp.blogspot.com/-H6MAoWN-UIE/TuRwLbHRSWI/AAAAAAAABBk/89iiEulVsyg/s400/Free%2BNature%2BPhoto.jpg' /></div>
                    <div class='col-md-3 col-sm-4 col-xs-6'><img class='img-responsive' src='http://2.bp.blogspot.com/-H6MAoWN-UIE/TuRwLbHRSWI/AAAAAAAABBk/89iiEulVsyg/s400/Free%2BNature%2BPhoto.jpg' /></div>
                    <div class='col-md-3 col-sm-4 col-xs-6'><img class='img-responsive' src='http://2.bp.blogspot.com/-H6MAoWN-UIE/TuRwLbHRSWI/AAAAAAAABBk/89iiEulVsyg/s400/Free%2BNature%2BPhoto.jpg' /></div>
                    <div class='col-md-3 col-sm-4 col-xs-6'><img class='img-responsive' src='http://2.bp.blogspot.com/-H6MAoWN-UIE/TuRwLbHRSWI/AAAAAAAABBk/89iiEulVsyg/s400/Free%2BNature%2BPhoto.jpg' /></div>
                    <div class='col-md-3 col-sm-4 col-xs-6'><img class='img-responsive' src='http://2.bp.blogspot.com/-H6MAoWN-UIE/TuRwLbHRSWI/AAAAAAAABBk/89iiEulVsyg/s400/Free%2BNature%2BPhoto.jpg' /></div>
                    <div class='col-md-3 col-sm-4 col-xs-6'><img class='img-responsive' src='http://2.bp.blogspot.com/-H6MAoWN-UIE/TuRwLbHRSWI/AAAAAAAABBk/89iiEulVsyg/s400/Free%2BNature%2BPhoto.jpg' /></div>
                    <div class='col-md-3 col-sm-4 col-xs-6'><img class='img-responsive' src='http://2.bp.blogspot.com/-H6MAoWN-UIE/TuRwLbHRSWI/AAAAAAAABBk/89iiEulVsyg/s400/Free%2BNature%2BPhoto.jpg' /></div>
                </div>
            </div>

        );
    }
}
