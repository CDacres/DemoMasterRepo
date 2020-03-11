
import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'aphrodite';

import FlyoutNav from './FlyoutNav';

import styles from './styles.js';

const FlyoutMenu = ({ flyoutOpen }) => {
    return (
        <div>
            <div className={css(styles.flyoutMenuMask)} />
            <div className={css(styles.flyoutMenuContainer)}>
                <div className={css(styles.container)}>
                    {
                        flyoutOpen ?
                            <FlyoutNav /> :
                            null
                    }
                </div>
            </div>
        </div>
    );
};

FlyoutMenu.propTypes = {
    flyoutOpen: PropTypes.bool.isRequired
};

export default FlyoutMenu;
