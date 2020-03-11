
import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'aphrodite';

import ZipcubeLogo from './ZipcubeLogo';

import styles from './styles.js';

const Logo = ({ flyoutOpen, handleFlyoutMenu }) => {
    return (
        <div className={css(styles.logoContainer)}>
            <div>
                <a href="/" className={css(styles.logoContainerLink)}>
                    <div className={css(styles.content)}>
                        <div className={css(styles.logo)}>
                            <ZipcubeLogo />
                        </div>
                        <div className={css(styles.menuIndicator)}>
                            <div
                                className={css(styles.iconWrapper)}
                                style={{ transform: 'rotate(0deg)' }}
                            >
                                <svg
                                    viewBox="0 0 18 18"
                                    role="presentation"
                                    aria-hidden="true"
                                    focusable="false"
                                    style={{
                                        display: 'block',
                                        fill: 'currentcolor',
                                        height: '1em',
                                        width: '1em'
                                    }}
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M16.291 4.295a1 1 0 1 1 1.414 1.415l-8 7.995a1 1 0 0 1-1.414 0l-8-7.995a1 1 0 1 1 1.414-1.415l7.293 7.29 7.293-7.29z"
                                    />
                                </svg>
                            </div>
                        </div>
                    </div>
                </a>
                <button
                    aria-label="Main navigation menu"
                    aria-haspopup="true"
                    className={css(styles.buttonContainer)}
                    onClick={handleFlyoutMenu}
                >
                    <div className={css(styles.content)}>
                        <div className={css(styles.logo)}>
                            <ZipcubeLogo />
                        </div>
                        <div className={css(styles.menuIndicator)}>
                            <div
                                className={css(styles.iconWrapper)}
                                style={
                                    flyoutOpen ?
                                        { transform: 'rotate(180deg)' } :
                                        { transform: 'rotate(0deg)' }
                                }
                            >
                                <svg
                                    viewBox="0 0 18 18"
                                    role="presentation"
                                    aria-hidden="true"
                                    focusable="false"
                                    style={{
                                        display: 'block',
                                        fill: 'currentcolor',
                                        height: '1em',
                                        width: '1em'
                                    }}
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M16.291 4.295a1 1 0 1 1 1.414 1.415l-8 7.995a1 1 0 0 1-1.414 0l-8-7.995a1 1 0 1 1 1.414-1.415l7.293 7.29 7.293-7.29z"
                                    />
                                </svg>
                            </div>
                        </div>
                    </div>
                </button>
            </div>
        </div>
    );
};

Logo.propTypes = {
    flyoutOpen: PropTypes.bool.isRequired,
    handleFlyoutMenu: PropTypes.func.isRequired
};

export default Logo;
