import React from 'react';
import PropTypes from 'prop-types';

export default class FormLabel extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
            <label htmlFor={this.props.htmlFor} className={this.props.className}>{this.props.title}</label>
        );
    }
}

FormLabel.propTypes = {
    htmlFor: PropTypes.string.isRequired,
    className: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired
};
