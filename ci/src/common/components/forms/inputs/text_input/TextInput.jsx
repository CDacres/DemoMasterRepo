import React from 'react';
import CSSModules from 'react-css-modules';

import styles from '../Input.css';

const TextInput = ({
    labelText,
    name,
    required,
    id,
    value,
    autocomplete,
    maxLength,
    minLength,
}) => {
    return (
        <div>
            <label htmlFor={name}>
                {labelText}
                {required &&
                    <span styleName="required">*</span>
                }
            </label>
            <input
                id={id}
                styleName="form-control"
                name={name}
                type="text"
                value={value}
                autoComplete={autocomplete ? "on" : "off"}
                maxLength={maxLength}
                minLength={minLength}
            />
        </div>
    );
};

TextInput.propTypes = {
    labelText: React.PropTypes.string.isRequired,
    id: React.PropTypes.oneOfType([
        React.PropTypes.number,
        React.PropTypes.string
    ]).isRequired,
    name: React.PropTypes.string.isRequired,
    value: React.PropTypes.string,
    required: React.PropTypes.bool.isRequired,
    autocomplete: React.PropTypes.bool,
    maxLength: React.PropTypes.string,
    minLength: React.PropTypes.string,
};

TextInput.defaultProps = {
    id: '',
    name: '',
    value: '',
    required: false,
    autocomplete: false,
    maxLength: '',
    minLength: '0',
};

export default CSSModules(TextInput, styles, {
    allowMultiple: true,
});
