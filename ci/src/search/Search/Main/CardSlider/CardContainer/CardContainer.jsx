
import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'aphrodite';

import styles from './styles.js';

import LoadingAnimatedCard from './LoadingAnimatedCard';
import Card from './Card';

const CardContainer = ({
    card,
    cardProportions,
    domContentLoading,
    isListing,
    sliderDisabled
}) => {
    const { padding } = cardProportions;
    return (
        <div
            className={css(
                sliderDisabled ?
                    styles.cardContainer :
                    styles.cardContainer,
                    styles.cardContainerDisabled_CarouselLg,
                    styles.cardContainerDisabled_CarouselMd,
                    styles.cardContainerDisabled_CarouselSm
            )}
        >
            <div className={css(styles.containerRelative)}>
                {
                    domContentLoading ?
                        <LoadingAnimatedCard
                            cardPadding={padding}
                        /> :
                        <Card
                            card={card}
                            cardPadding={padding}
                            isListing={isListing}
                        />
                }
            </div>
        </div>
    );
};

CardContainer.defaultProps = {
    cardSize: 'landscape'
};

CardContainer.propTypes = {
    card: PropTypes.object.isRequired,
    cardProportions: PropTypes.object.isRequired,
    domContentLoading: PropTypes.bool.isRequired,
    isListing: PropTypes.bool,
    sliderDisabled: PropTypes.bool
};

export default CardContainer;
