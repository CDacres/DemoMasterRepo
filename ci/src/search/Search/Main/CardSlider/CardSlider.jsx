
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { css } from 'aphrodite';
import shortid from 'shortid';

import CardContainer from './CardContainer';
import FloatingChevron from './FloatingChevron';

import styles from './styles.js';

import { getCardProportions } from './methods';

// import matchMedia from 'match-media';

class CardSlider extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cardProportions: getCardProportions(props.cardType),
            xPosition: 0
        };
        this.handleSlideLeft = this.handleSlideLeft.bind(this);
        this.handleSlideRight = this.handleSlideRight.bind(this);
    }

    // shouldComponentUpdate(nextProps) {
    //     const { cards, domContentLoading } = this.props;
    //     if (domContentLoading !== nextProps.domContentLoading) {
    //         return true;
    //     }
    //     if (JSON.stringify(cards) !== JSON.stringify(nextProps.cards)) {
    //         return true;
    //     }
    //     return false;
    // }

    handleSlideLeft() {
        const { cardProportions } = this.state;
        const { width } = cardProportions;
        this.setState(prevState => ({ xPosition: prevState.xPosition += width }));
    }

    handleSlideRight() {
        const { cardProportions } = this.state;
        const { width } = cardProportions;
        this.setState(prevState => ({ xPosition: prevState.xPosition -= width }));
    }

    render() {
        const { handleSlideLeft, handleSlideRight } = this;
        const { cardProportions, xPosition } = this.state;
        const {
            cards,
            containerClass,
            domContentLoading,
            isListing,
            sliderDisabled,
            user
        } = this.props;
        const { width } = cardProportions;
        if (!sliderDisabled) {
            return (
                <div>
                    <div className={css(styles.cardSliderContainer)}>
                        <div
                            className={css(
                                styles.cardSlider,
                                styles.cardSlider_enableCarouselMd,
                                styles.cardSlider_enableCarouselLg
                            )}
                            style={{
                                transform: `translateX(${xPosition}%)`
                            }}
                        >
                            {
                                cards.map(card => (
                                    <div
                                        key={shortid.generate()}
                                        className={css(styles[containerClass])}
                                        style={{
                                            width: `${width}%`
                                        }}
                                    >
                                        <CardContainer
                                            card={card}
                                            cardProportions={cardProportions}
                                            domContentLoading={domContentLoading}
                                            isListing={isListing}
                                            sliderDisabled={sliderDisabled}
                                            user={user}
                                        />
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                    {
                        xPosition < 0 ?
                            <FloatingChevron
                                clickAction={handleSlideLeft}
                                direction="left"
                            /> : null
                    }
                    {
                        xPosition > Math.ceil(
                            (-(width * ((cards.length) - (Math.ceil(100 / width)))))
                        ) ?
                            <FloatingChevron
                                clickAction={handleSlideRight}
                                direction="right"
                            /> : null
                    }
                </div>
            );
        }
        return (
            <div>
                <div className={css(styles.cardSliderContainer)}>
                    <div
                        className={css(
                            styles.cardSlider,
                            styles.cardSlider_disableSliderXs,
                            styles.cardSlider_disableSliderSm,
                            styles.cardSlider_disableSliderMd,
                            styles.cardSlider_disableCarouselLg
                        )}
                    >
                        {
                            cards.map(card => (
                                <div
                                    key={shortid.generate()}
                                    className={css(styles[containerClass])}
                                    style={{
                                        width: `${width}%`
                                    }}
                                >
                                    <CardContainer
                                        card={card}
                                        cardProportions={cardProportions}
                                        domContentLoading={domContentLoading}
                                        isListing={isListing}
                                        sliderDisabled={sliderDisabled}
                                        user={user}
                                    />
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        );
    }
}

CardSlider.defaultProps = {
    containerClass: 'responsiveContainer_search'
};

CardSlider.propTypes = {
    cardType: PropTypes.string.isRequired,
    cards: PropTypes.array.isRequired,
    containerClass: PropTypes.string,
    domContentLoading: PropTypes.bool.isRequired,
    isListing: PropTypes.bool,
    sliderDisabled: PropTypes.bool,
    user: PropTypes.object
};

export default CardSlider;
