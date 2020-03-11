import React from 'react';
import CSSModules from 'react-css-modules';

import styles from './DealLabelFramed.css';

const DealLabelFramed = ({ className, text, glyphicon }) => <span styleName={`deal-label ${className}`}>{text} <span className={`glyphicon glyphicon-${glyphicon}`}></span></span>;

DealLabelFramed.propTypes = {
    className: React.PropTypes.string.isRequired,
    text: React.PropTypes.string.isRequired,
    glyphicon: React.PropTypes.string.isRequired
};

export default CSSModules(DealLabelFramed, styles, {
    allowMultiple: true
});
