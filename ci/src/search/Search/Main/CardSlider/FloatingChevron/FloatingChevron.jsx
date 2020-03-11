
import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'aphrodite';

import styles from './styles.js';

const FloatingChevron = ({ clickAction, direction }) => {
    return (
        <div
            className={css(
                styles.floatingChevronContainer,
                direction === 'left' ?
                    styles.floatingChevronContainer_left :
                    styles.floatingChevronContainer_right
            )}
        >
            <button
                type="button"
                className={css(
                    styles.button,
                    styles.button_styleInverse,
                    styles.button_floating
                )}
                style={{
                    width: '40px',
                    height: '40px'
                }}
                onClick={clickAction}
            >
                <span
                    className={css(styles.icon, styles.icon_styleInverse)}
                    style={{
                        fontSize: '20px'
                    }}
                >
                    {
                        direction === 'left' ?
                            <svg
                                className={css(styles.iconLeftSvg)}
                                viewBox="0 0 18 18"
                                role="img"
                                aria-label="Previous"
                                focusable="false"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M13.703 16.293a1 1 0 1 1-1.415 1.414l-7.995-8a1 1 0 0 1 0-1.414l7.995-8a1 1 0 1 1 1.415 1.414L6.413 9l7.29 7.293z"
                                />
                            </svg> :
                            <svg
                                className={css(styles.iconRightSvg)}
                                viewBox="0 0 18 18"
                                role="img"
                                aria-label="Next"
                                focusable="false"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M4.293 1.707A1 1 0 1 1 5.708.293l7.995 8a1 1 0 0 1 0 1.414l-7.995 8a1 1 0 1 1-1.415-1.414L11.583 9l-7.29-7.293z"
                                />
                            </svg>
                    }
                </span>
            </button>
        </div>
    );
};

FloatingChevron.propTypes = {
    clickAction: PropTypes.func.isRequired,
    direction: PropTypes.string.isRequired
};

export default FloatingChevron;
