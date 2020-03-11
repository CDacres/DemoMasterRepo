import React from 'react';
import CSSModules from 'react-css-modules';

import styles from './SubmitButton.css';

const SubmitButton = ({ value }) => {
    return <input type="submit" styleName="btn btn-primary" value={value} />;
};

SubmitButton.propTypes = {
    text: React.PropTypes.string.isRequired,
};

SubmitButton.defaultProps = {
    text: '',
};

export default CSSModules(SubmitButton, styles, {
    allowMultiple: true,
});
