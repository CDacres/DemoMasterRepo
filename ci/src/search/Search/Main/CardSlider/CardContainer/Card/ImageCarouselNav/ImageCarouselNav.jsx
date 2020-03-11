
import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'aphrodite';

import styles from './styles.js';

const ImageCarouselNav = ({ setActiveImage }) => {
    return (
        <div className={css(styles.navigation)}>
            <div className={css(styles.container_fullWidth_fullHeight)}>
                <a
                    className={css(styles.anchor)}
                    href=""
                    // target={`listing_${card.id}`}
                >
                    <span className={css(styles.accessible)}>Ocean View Malibu Hideaway</span>
                </a>
                <button
                    type="button"
                    aria-label="Previous"
                    className={css(styles.navButton, styles.previous)}
                    data-direction="previous"
                    onClick={setActiveImage}
                >
                    <div className={css(styles.previousIcon)}>
                        <svg
                            viewBox="0 0 18 18"
                            role="img"
                            aria-label="Previous"
                            focusable="false"
                            className={css(styles.previousIconSvg)}
                        >
                            <path
                                fillRule="evenodd"
                                d="M13.703 16.293a1 1 0 1 1-1.415 1.414l-7.995-8a1 1 0 0 1 0-1.414l7.995-8a1 1 0 1 1 1.415 1.414L6.413 9l7.29 7.293z"
                            />
                        </svg>
                    </div>
                </button>
                <button
                    type="button"
                    aria-label="Next"
                    className={css(styles.navButton, styles.next)}
                    data-direction="next"
                    onClick={setActiveImage}
                >
                    <div className={css(styles.nextIcon)}>
                        <svg
                            viewBox="0 0 18 18"
                            role="img"
                            aria-label="Next"
                            focusable="false"
                            className={css(styles.nextIconSvg)}
                        >
                            <path
                                fillRule="evenodd"
                                d="M4.293 1.707A1 1 0 1 1 5.708.293l7.995 8a1 1 0 0 1 0 1.414l-7.995 8a1 1 0 1 1-1.415-1.414L11.583 9l-7.29-7.293z"
                            />
                        </svg>
                    </div>
                </button>
            </div>
        </div>
    );
};

ImageCarouselNav.propTypes = {
    setActiveImage: PropTypes.func.isRequired
};

export default ImageCarouselNav;
