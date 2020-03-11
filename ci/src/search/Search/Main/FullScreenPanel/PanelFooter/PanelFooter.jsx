
import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'aphrodite';

import styles from './styles.js';

const PanelFooter = ({ handleButtonClick }) => {
    return (
        <div className={css(styles.container)}>
            <button
                aria-disabled="false"
                type="button"
                className={css(styles.button)}
                onClick={handleButtonClick}
            >
                <span>See spaces</span>
            </button>
        </div>
    );
};

PanelFooter.propTypes = {
    handleButtonClick: PropTypes.func.isRequired
};

export default PanelFooter;
