
import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'aphrodite';

import styles from './styles.js';

const PanelHeader = ({ handleClose, headerText, headerAction, headerActionText }) => {
    return (
        <div className={css(styles.containerHeader)}>
            <div className={css(styles.containerHeaderLeft)}>
                <button
                    type="button"
                    className={css(styles.buttonContainer)}
                    aria-expanded="false"
                    onClick={handleClose}
                >
                    <svg
                        className={css(styles.closeButtonSvg)}
                        viewBox="0 0 12 12"
                        role="img"
                        aria-label="Close"
                        focusable="false"
                    >
                        <path
                            fillRule="evenodd"
                            d="M11.5 10.5c.3.3.3.8 0 1.1-.3.3-.8.3-1.1 0L6 7.1l-4.5 4.5c-.3.3-.8.3-1.1 0-.3-.3-.3-.8 0-1.1L4.9 6 .5 1.5C.2 1.2.2.7.5.4c.3-.3.8-.3 1.1 0L6 4.9 10.5.4c.3-.3.8-.3 1.1 0 .3.3.3.8 0 1.1L7.1 6l4.4 4.5z"
                        />
                    </svg>
                </button>
            </div>
            <div className={css(styles.containerHeaderCenter)}>
                <div className={css(styles.text, styles.size_small)}>
                    <span>{headerText}</span>
                </div>
            </div>
            {
                headerAction ?
                    <div className={css(styles.containerHeaderRight)}>
                        <div className={css(styles.text, styles.size_small)}>
                            <button
                                type="button"
                                className={css(styles.componentButton)}
                                aria-disabled="false"
                                onClick={headerAction}
                            >
                                <span>{headerActionText}</span>
                            </button>
                        </div>
                    </div> : null
            }
        </div>
    );
};

PanelHeader.propTypes = {
    handleClose: PropTypes.func,
    headerAction: PropTypes.func,
    headerActionText: PropTypes.string,
    headerText: PropTypes.string
};

export default PanelHeader;
