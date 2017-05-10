import React from 'react';
import '../../../../assets/css/bootstrap.css';
import PropTypes from 'prop-types';

class Form extends React.Component {
    constructor (props) {
        super(props);
    }

    render () {
        return (
            <form className='form-horizontal' >
                { this.props.children }
            </form>
        );
    }
}

Form.propTypes = {
    children: PropTypes.array.isRequired
};

export default Form;
