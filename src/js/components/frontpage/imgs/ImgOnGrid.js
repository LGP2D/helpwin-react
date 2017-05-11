import React from 'react';
import '../../../../assets/css/bootstrap.css';
import PropTypes from 'prop-types';

class ImgOnGrid extends React.Component {
    constructor () {
        super();
    }

    render () {
        return (
            <div className='col-md-3 col-sm-4 col-xs-6'>
                <img id='gridImage' className='img-responsive' src={ this.props.imagePath }/>
            </div>
        );
    }
}

ImgOnGrid.propTypes = {
    imagePath: PropTypes.string.isRequired
}

ImgOnGrid.defaultProps = {
    imagePath: 'http://2.bp.blogspot.com/-H6MAoWN-UIE/TuRwLbHRSWI/AAAAAAAABBk/89iiEulVsyg/s400/Free%2BNature%2BPhoto.jpg'
};

export default ImgOnGrid;
