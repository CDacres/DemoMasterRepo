import React from 'react';
import CSSModules from 'react-css-modules';

import styles from './DealLabel.css';

const DealLabel = ({ className, text }) => <span styleName={`deal-label ${className}`}>{text}</span>;

DealLabel.propTypes = {
    className: React.PropTypes.string.isRequired,
    text: React.PropTypes.string.isRequired
};

export default CSSModules(DealLabel, styles, {
    allowMultiple: true
});
