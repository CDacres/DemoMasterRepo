
import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'aphrodite';

import styles from '../styles.js';

const CornerTriangle = ({ handleClick, isBack }) => {
    return (
        <span
            className={
                isBack ?
                    `corner-triangle ${css(styles.cornerTriangle, styles.cornerTriangleBack)}` :
                    `corner-triangle ${css(styles.cornerTriangle)}`
            }
            onClick={handleClick}
        />
    );
};

CornerTriangle.propTypes = {
    handleClick: PropTypes.func.isRequired,
    isBack: PropTypes.bool
};

export default CornerTriangle;
