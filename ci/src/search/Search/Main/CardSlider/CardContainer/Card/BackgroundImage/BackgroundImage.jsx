
import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'aphrodite';

import {
    position
} from '../../../../../commonStyles.js';
import styles from './styles.js';

const BackgroundImage = ({ imageUrl, isUpdating }) => {
    if (isUpdating) {
        return (
            <div className={css(styles.shimmer)}>
                <span
                    aria-busy="true"
                    className={css(styles.shimmerAnimation)}
                    style={{
                        width: '100%',
                        height: '100%'
                    }}
                />
            </div>
        );
    }
    return (
        <div
            className={css(
                position.absolute,
                styles.background,
                styles.backgroundSize_cover,
                styles.fadeIn
            )}
            style={{
                width: '100%',
                height: '100%',
                backgroundImage: `url("${imageUrl}")`
            }}
        />
    );
};

BackgroundImage.propTypes = {
    imageUrl: PropTypes.string.isRequired,
    isUpdating: PropTypes.bool
};

export default BackgroundImage;
