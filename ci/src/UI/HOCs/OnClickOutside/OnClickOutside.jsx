
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import onClickOutside from 'react-onclickoutside';

class OnClickOutside extends Component {
    constructor() {
        super();
        this.handleClickOutside = this.handleClickOutside.bind(this);
    }

    handleClickOutside() {
        const { outsideClickAction } = this.props;
        console.log('clicking outside');
        outsideClickAction();
    }

    render() {
        const { children } = this.props;
        return (
            <div>
                {children}
            </div>
        );
    }
}

OnClickOutside.propTypes = {
    children: PropTypes.node,
    outsideClickAction: PropTypes.func.isRequired
};

export default onClickOutside(OnClickOutside);
