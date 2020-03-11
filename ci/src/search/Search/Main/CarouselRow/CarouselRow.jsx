
import React from 'react';
import { css } from 'aphrodite';
import PropTypes from 'prop-types';

import styles from './styles.js';

const CarouselRow = ({ children, heading }) => {
    return (
        <div className={css(styles.carouselRow)}>
            <span className={css(styles.breakingSpace)} />
                <div className={css(styles.headerContainer)}>
                    <div className={css(styles.titleContainer)}>
                        <div className={css(styles.rowHeaderContainer)}>
                            <h3 className={css(styles.rowHeader)}>
                                {heading}
                            </h3>
                        </div>
                    </div>
                    <div className={css(styles.seeMoreColumn)}>
                        <div className={css(styles.seeMoreContainer)}>
                            <button
                                className={css(
                                    styles.buttonText,
                                    styles.text,
                                    styles.button_flushRight
                                )}
                            >
                                <span
                                    className={css(
                                        styles.text,
                                        styles.span_marginRight
                                    )}
                                >
                                    <span>See all</span>
                                </span>
                                <svg
                                    className={css(styles.chevronRight)}
                                    viewBox="0 0 18 18"
                                    role="presentation"
                                    aria-hidden="true"
                                    focusable="false"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M4.293 1.707A1 1 0 1 1 5.708.293l7.995 8a1 1 0 0 1 0 1.414l-7.995 8a1 1 0 1 1-1.415-1.414L11.583 9l-7.29-7.293z"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            <div className={css(styles.container)}>
                {children}
            </div>
        </div>
    );
};

CarouselRow.propTypes = {
    children: PropTypes.node,
    heading: PropTypes.string
};

export default CarouselRow;
