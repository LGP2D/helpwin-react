import React from 'react';
import PropTypes from 'prop-types';
import ImgOnGrid from 'app/components/frontpage/imgs/ImgOnGrid';

class ImgGrid extends React.Component {
    constructor () {
        super();
    }

    render () {
        return (
            <div className='row'>
                { this.props.children }
            </div>
        );
    }
}

ImgOnGrid.propTypes = {
    imagePath: PropTypes.array.isRequired
};

export default ImgGrid;
