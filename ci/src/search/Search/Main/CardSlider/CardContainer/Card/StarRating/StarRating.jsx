
import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'aphrodite';
import shortid from 'shortid';

import { display } from '../../../../../commonStyles.js';
import cardCommonStyles from '../../cardCommonStyles.js';
import styles from './styles.js';

import Star from './Star';

const StarRating = ({
    reviewCount,
    reviewScore
}) => {
    const stars = [];
    for (let i = 0; i < Math.ceil(reviewScore); i += 1) {
        stars.push(
            <Star
                key={shortid.generate()}
            />
        );
    }
    return (
        <div style={{ marginTop: '4px' }}>
            <span className={css(styles.starRatingContainer)}>
                <span role="img" aria-label={`Rating ${reviewScore} out of 5`}>
                    {stars}
                </span>
            </span>
            <span aria-label="17 reviews">
                <span
                    className={css(
                        cardCommonStyles.text,
                        cardCommonStyles.size_micro,
                        display.inline
                    )}
                >
                    <span>{reviewCount} reviews</span>
                </span>
            </span>
        </div>
    );
};

StarRating.propTypes = {
    reviewCount: PropTypes.number.isRequired,
    reviewScore: PropTypes.number.isRequired
};

export default StarRating;
