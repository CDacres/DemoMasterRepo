
import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'aphrodite';

import styles from './styles.js';

const ToggleSwitch = ({
    filterIndex,
    id,
    label,
    name,
    subtitle,
    handleFilterChange,
    value
}) => {
    return (
        <label
            role="switch"
            aria-checked="false"
            aria-labelledby={label}
            aria-describedby={subtitle}
            type="button"
            className={css(styles.uncheckedBackground)}

        >
            <input
                type="checkbox"
                id={id}
                checked={value}
                className={css(styles.checkboxInput)}
                data-filter-index={filterIndex}
                data-input-type="checkbox"
                name={name}
                onChange={handleFilterChange}
            />
            <div
                className={
                    value ?
                        css(styles.checkedBackground, styles.checkedBackground_on) :
                        css(styles.checkedBackground)
                }
            />
            <div
                className={
                    value ?
                        css(styles.slider, styles.sliderChecked) :
                        css(styles.slider)
                }
            >
                <div className={css(styles.iconContainer)}>
                    <div
                        className={
                            value ?
                                css(styles.checkmarkCover, styles.checkmarkCover_on) :
                                css(styles.checkmarkCover)
                        }
                    />
                    <svg
                        viewBox="0 0 52 52"
                        fill="currentColor"
                        fillOpacity="0"
                        stroke="currentColor"
                        strokeWidth="3"
                        aria-hidden="true"
                        role="presentation"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        style={{
                            height: '30px',
                            width: '30px',
                            display: 'block'
                        }}
                    >
                        <path d="M19.1 25.2l4.7 6.2 12.1-11.2" />
                    </svg>
                </div>
                <div
                    className={
                        value ?
                            css(styles.iconContainer, styles.times) :
                            css(styles.iconContainer, styles.times, styles.times_on)
                    }
                >
                    <div
                        className={
                            value ?
                                css(styles.timesScale) :
                                css(styles.timesScale, styles.timesScale_on)
                        }
                    >
                        <svg viewBox="0 0 52 52" className={css(styles.icon)}>
                            <path d="M19.1 19.1 l14 14 m 0 -14 l -14 14" />
                        </svg>
                    </div>
                </div>
            </div>
        </label>
    );
};

ToggleSwitch.propTypes = {
    filterIndex: PropTypes.number.isRequired,
    handleFilterChange: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired,
    label: PropTypes.string,
    name: PropTypes.string.isRequired,
    subtitle: PropTypes.string,
    value: PropTypes.bool.isRequired
};

export default ToggleSwitch;
