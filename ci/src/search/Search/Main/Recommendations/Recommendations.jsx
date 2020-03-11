
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { css } from 'aphrodite';

import CarouselRow from '../CarouselRow';
import CardSlider from '../CardSlider';
import {
    normalCards,
    portraitLargeCards,
    portraitSmallCards,
    squareCards
} from '../data.js';

import styles from '../styles.js';

const Recommendations = ({
    domContentLoading
}) => {
    return (
        <main className={css(styles.main)}>
            <div className={css(styles.pageContainer, styles.pageContainer_fullWidth)}>
                <CarouselRow
                    domContentLoading={domContentLoading}
                    heading="Experiences"
                >
                    <CardSlider
                        cards={portraitLargeCards}
                        containerClass="responsiveColumn_portraitLarge"
                        domContentLoading={domContentLoading}
                        isListing={false}
                    />
                </CarouselRow>
                <CarouselRow
                    domContentLoading={domContentLoading}
                    heading="Cities"
                >
                    <CardSlider
                        cards={portraitSmallCards}
                        containerClass="responsiveColumn_portraitSmall"
                        domContentLoading={domContentLoading}
                        isListing={false}
                    />
                </CarouselRow>
                <CarouselRow
                    domContentLoading={domContentLoading}
                    heading="Rooms"
                >
                    <CardSlider
                        cards={normalCards}
                        containerClass="responsiveColumn_normal"
                        domContentLoading={domContentLoading}
                        isListing={false}
                    />
                </CarouselRow>
                <CarouselRow
                    domContentLoading={domContentLoading}
                    heading="Places"
                >
                    <CardSlider
                        cards={squareCards}
                        containerClass="responsiveColumn_square"
                        domContentLoading={domContentLoading}
                        isListing={false}
                    />
                </CarouselRow>
            </div>
        </main>
    );
};

Recommendations.propTypes = {
    domContentLoading: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => ({
    domContentLoading: state.domContentLoading
});

export default connect(mapStateToProps)(Recommendations);
