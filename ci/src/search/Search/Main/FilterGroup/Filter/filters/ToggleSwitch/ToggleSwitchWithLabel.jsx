
import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'aphrodite';

import ToggleSwitch from './ToggleSwitch.jsx';

import styles from './styles.js';

const ToggleSwitchWithLabel = ({
    handleFilterChange,
    filterIndex,
    id,
    label,
    name,
    subtitle,
    value
}) => {
    return (
        <div className={css(styles.baseContainer)}>
            <div className={css(styles.container)}>
                <div className={css(styles.childContainer)}>
                    <div
                        style={{
                            marginRight: '8px'
                        }}
                    >
                        <span className={css(styles.text)}>
                            <label
                                className={css(styles.label)}
                                htmlFor={id}
                            >
                                <span>{label}</span>
                            </label>
                        </span>
                    </div>
                </div>
                <div className={css(styles.childContainer)}>
                    <ToggleSwitch
                        handleFilterChange={handleFilterChange}
                        filterIndex={filterIndex}
                        id={id}
                        label={label}
                        name={name}
                        subtitle={subtitle}
                        value={value}
                    />
                </div>
            </div>
            <div>
                <div className={css(styles.subText)}>
                    <span>{subtitle}</span>
                </div>
            </div>
        </div>
    );
};

ToggleSwitchWithLabel.propTypes = {
    handleFilterChange: PropTypes.func.isRequired,
    filterIndex: PropTypes.number.isRequired,
    id: PropTypes.string.isRequired,
    label: PropTypes.string,
    name: PropTypes.string.isRequired,
    subtitle: PropTypes.string,
    value: PropTypes.bool.isRequired
};

export default ToggleSwitchWithLabel;
