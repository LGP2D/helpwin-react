import React, { PropTypes } from 'react';

let If = React.createClass({
    render: function () {
        if (this.props.test) {
            return this.props.children;
        }
        else {
            return false;
        }
    }
});

export default If;
