
import React from 'react';
// import PropTypes from 'prop-types';
import { css } from 'aphrodite';

import styles from './styles.js';

const TopMessage = () => {
    return (
        <div className={css(styles.messageContainer)}>
            <div className={css(styles.pricingDisclaimer)}>
                <div className={css(styles.smallTextMuted)}>
                    <span>Enter dates to see full pricing. Additional fees apply. Taxes may be added after login.</span>
                </div>
            </div>
        </div>
    );
};

// TopMessage.propTypes = {
// };

export default TopMessage;
