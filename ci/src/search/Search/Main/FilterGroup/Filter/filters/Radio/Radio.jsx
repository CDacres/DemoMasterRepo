
import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'aphrodite';

import styles from './styles.js';

const Radio = ({ checked, filterIndex, handleRadioChange, id, label, name, value }) => {
    return (
        <div className={css(styles.radioButtonContainer)}>
            <label className={css(styles.containerTable)} htmlFor={id}>
                <div className={css(styles.column)}>
                    <span className={css(styles.container)}>
                        <input
                            type="radio"
                            id={id}
                            className={css(styles.radioInput)}
                            name={name}
                            value={value}
                            data-filter-index={filterIndex}
                            data-input-type="radio"
                            onChange={handleRadioChange}
                        />
                        <div
                            data-fake-radio="true"
                            className={css(styles.radioButton)}
                        >
                            {checked ?
                                <div className={css(styles.checked)} /> : null
                            }
                        </div>
                    </span>
                </div>
                <div className={css(styles.column, styles.labelSpacing)}>
                    <div className={css(styles.label)}>
                        <div className={css(styles.text)}>{label}</div>
                    </div>
                </div>
            </label>
        </div>
    );
};

Radio.propTypes = {
    checked: PropTypes.bool.isRequired,
    filterIndex: PropTypes.number.isRequired,
    handleRadioChange: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]).isRequired
};

export default Radio;
