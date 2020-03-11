import React, { Component } from 'react';
import CSSModules from 'react-css-modules';
import { attachPhoneHelper } from 'CommonFunctions/plugin_attachment';

import 'intl-tel-input';
import './TelephoneInput.css?global';

import styles from '../Input.css';

class TelephoneInput extends Component {
    componentDidMount() {
        attachPhoneHelper();
    }
    render() {
        const {
            labelText,
            id,
            name,
            value,
            required,
            autocomplete,
        } = this.props;
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
                    className="zc_user_phone_number"
                    styleName="form-control"
                    name={name}
                    type="tel"
                    value={value}
                    autoComplete={autocomplete ? "on" : "off"}
                />
            </div>
        );
    }
}

TelephoneInput.propTypes = {
    labelText: React.PropTypes.string.isRequired,
    id: React.PropTypes.oneOfType([
        React.PropTypes.number,
        React.PropTypes.string
    ]).isRequired,
    name: React.PropTypes.string.isRequired,
    value: React.PropTypes.string,
    required: React.PropTypes.bool.isRequired,
    autocomplete: React.PropTypes.bool,
};

TelephoneInput.defaultProps = {
    required: true,
    autocomplete: false,
};

export default CSSModules(TelephoneInput, styles, {
    allowMultiple: true,
});
