import React from 'react';
import CSSModules from 'react-css-modules';

import styles from './Button.css';

const Button = ({ text, theme }) => {
    return <button styleName={`btn btn-${theme}`}>{text}</button>;
};

Button.propTypes = {
    text: React.PropTypes.string.isRequired,
    theme: React.PropTypes.string
};

Button.defaultProps = {
    text: '',
    theme: 'primary'
};

export default CSSModules(Button, styles, {
    allowMultiple: true
});
