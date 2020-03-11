import React from 'react';
import CSSModules from 'react-css-modules';

import styles from './Select.css';

const Select = ({ id, name, className, defaultOption, options }) => {
    const {
        value,
        text,
        disabled,
    } = defaultOption;
    return (
        <div styleName="select">
            <select id={id} className={className} styleName="select-element" name={name}>
                {disabled &&
                    <option value={value} disabled selected style={{ display: 'none' }}>{text}</option>
                }
                {options.map(option => <option value={option.value}>{option.text}</option>)}
            </select>
        </div>
    );
}

export default CSSModules(Select, styles, {
    allowMultiple: true,
});
