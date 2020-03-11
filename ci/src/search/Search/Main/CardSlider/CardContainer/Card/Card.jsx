
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { css } from 'aphrodite';
import shortid from 'shortid';

import {
    display,
    position
} from '../../../../commonStyles.js';
import cardCommonStyles from '../cardCommonStyles.js';
import styles from './styles.js';

import WishlistHeart from './WishlistHeart';
import ImageCarouselNav from './ImageCarouselNav';
import BackgroundImage from './BackgroundImage';
import StarRating from './StarRating';
import CornerTriangle from './CornerTriangle';

class Card extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeImageIndex: 0,
            id: shortid.generate(),
            images: props.card.images,
            isChangingImage: false
        };
        this.flipCard = this.flipCard.bind(this);
        this.setActiveImage = this.setActiveImage.bind(this);
    }

    componentDidMount() {
        const { id } = this.state;
        $(`#${id}`).flip({
            trigger: 'manual'
        });
    }

    flipCard() {
        const { id } = this.state;
        $(`#${id}`).flip('toggle');
    }

    setActiveImage(e) {
        this.setState({ isChangingImage: true });
        const { activeImageIndex, images } = this.state;
        let index = activeImageIndex;
        if (e.target.dataset.direction === 'next') {
            index += 1;
            if (index > (images.length - 1)) {
                index = 0;
            }
        } else if (e.target.dataset.direction === 'previous') {
            index -= 1;
            if (index < 0) {
                index = images.length - 1;
            }
        }
        this.setState({
            activeImageIndex: index
        }, () => {
            setTimeout(() => {
                this.setState({
                    isChangingImage: false
                });
            }, 10);
        });
    }

    render() {
        const { flipCard, setActiveImage } = this;
        const { card, cardPadding, isListing } = this.props;
        const { activeImageIndex, id, images, isChangingImage } = this.state;
        const activeImageUrl = images[activeImageIndex];
        const dataImage = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAADCAIAAADUVFKvAAAAO0lEQVQIHQEwAM//AVaMo+ny9ub19/X5/P39/QGVmJERDg7y9ffe4eXy9fgBh2I0Gg8EAwQFCwsL8/b6AlYbs3x20IQAAAAASUVORK5CYII=';
        const currency = Currency.getCurrency(card.currency_code);
        if (isListing) {
            return (
                <div id={id} className="card">
                    <div className="front">
                        <CornerTriangle
                            handleClick={flipCard}
                        />
                        <div
                            className={css(styles.container_fullWidth)}
                            style={{
                                paddingTop: `${cardPadding}%`,
                                backgroundImage: `url('${dataImage}')`,
                                backgroundSize: '100% 100%'
                            }}
                        >
                            <div className={css(styles.children)}>
                                <div
                                    className={css(styles.fullWidth_fullHeight)}
                                >
                                    <div
                                        className={
                                            css(position.relative, styles.fullWidth_fullHeight)
                                        }
                                    >
                                        <WishlistHeart roomId={Number(card.id)} />
                                        <BackgroundImage
                                            imageUrl={activeImageUrl}
                                            isUpdating={isChangingImage}
                                        />
                                    </div>
                                </div>
                                <ImageCarouselNav
                                    setActiveImage={setActiveImage}
                                />
                            </div>
                            {
                                card.type === 'square' ?
                                    <div className={css(styles.imageOverlay)}>
                                        <div style={{ marginBottom: '4px' }}>
                                            <div className={css(styles.typeTag)}>GUIDE</div>
                                        </div>
                                        <div
                                            className={css(
                                                styles.name,
                                                styles.extraBold
                                            )}
                                        >LITERARY LONDON</div>
                                    </div> : null
                            }
                        </div>
                        <div
                            style={{
                                marginTop: '8px'
                            }}
                        >
                            <div className={css(styles.twoLineTitle)}>
                                <a href={card.room_url} target="_blank" rel="noopener noreferrer">
                                    <div
                                        className={css(styles.roomInfoContainer)}
                                    >
                                        <span
                                            className={css(
                                                cardCommonStyles.text,
                                                cardCommonStyles.size_small,
                                                cardCommonStyles.weight_bold,
                                                display.inline
                                            )}
                                        >{card.title}</span>
                                        <br />
                                        <span
                                            className={css(
                                                cardCommonStyles.text,
                                                cardCommonStyles.size_small,
                                                cardCommonStyles.weight_light,
                                                display.inline
                                            )}
                                        >Up to {card.max_capacity} {(card.max_capacity > 1) ? 'people' : 'person'}</span>
                                    </div>
                                    <div
                                        className={css(styles.roomInfoContainer)}
                                        style={{ textAlign: 'right' }}
                                    >
                                        <span
                                            className={css(
                                                cardCommonStyles.text,
                                                cardCommonStyles.size_small,
                                                cardCommonStyles.weight_bold,
                                                display.inline
                                            )}
                                        >{currency.symbol}{Number(card.hourly_rate).toFixed(2)}</span>
                                    </div>
                                </a>
                            </div>
                        </div>
                        {
                            card.type !== 'square' && card.type !== 'portraitSmall' ?
                                <StarRating
                                    reviewCount={Number(card.review_count)}
                                    reviewScore={Number(card.review_score)}
                                /> : null
                        }
                    </div>
                    <div
                        className={`back ${css(styles.back)}`}
                        style={{ backfaceVisibility: 'hidden' }}
                    >
                        <CornerTriangle
                            handleClick={flipCard}
                            isBack
                        />
                        <div
                            className={css(styles.container_fullWidth)}
                            style={{
                                paddingTop: `${cardPadding + 20}%`,
                                backgroundSize: '100% 100%'
                            }}
                        >
                            <div
                                style={{
                                    position: 'absolute',
                                    top: 0,
                                    right: 0,
                                    bottom: 0,
                                    left: 0
                                }}
                            >
                                <a
                                    href={card.room_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    title={card.title}
                                >
                                    <h4>{card.title}</h4>
                                    <p>{card.venue_name}</p>
                                </a>
                                <p
                                    dangerouslySetInnerHTML={{ __html: card.room_desc }}
                                />
                                <center>
                                    <a
                                        className="btn btn-sm btn-primary"
                                        href={card.room_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >Book Now</a>
                                </center>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
        return (
            <div>
                <div
                    className={css(styles.container_fullWidth)}
                    style={{
                        paddingTop: `${cardPadding}%`,
                        backgroundImage: `url('${dataImage}')`,
                        backgroundSize: '100% 100%'
                    }}
                >
                    <div className={css(styles.children)}>
                        <div
                            className={css(styles.fullWidth_fullHeight)}
                        >
                            <div
                                className={css(position.relative, styles.fullWidth_fullHeight)}
                            >
                                <BackgroundImage
                                    imageUrl={activeImageUrl}
                                    isUpdating={isChangingImage}
                                />
                            </div>
                        </div>
                    </div>
                    {
                        card.type === 'square' ?
                            <div className={css(styles.imageOverlay)}>
                                <div style={{ marginBottom: '4px' }}>
                                    <div className={css(styles.typeTag)}>GUIDE</div>
                                </div>
                                <div
                                    className={css(
                                        styles.name,
                                        styles.extraBold
                                    )}
                                >LITERARY LONDON</div>
                            </div> : null
                    }
                </div>
                <div
                    style={{
                        marginTop: '8px'
                    }}
                >
                    <div className={css(styles.twoLineTitle)}>
                        <span className={css(
                            cardCommonStyles.text,
                            cardCommonStyles.size_small,
                            cardCommonStyles.weight_bold,
                            display.inline
                        )}>$36</span>
                        <div
                            className={css(display.inline)}
                            style={{ marginLeft: '4px' }}
                        >
                            <span
                                className={css(
                                    cardCommonStyles.text,
                                    cardCommonStyles.size_small,
                                    cardCommonStyles.weight_light,
                                    display.inline
                                )}
                            >Salvage food and Enjoy amazing home-style dishes!</span>
                        </div>
                    </div>
                </div>
                {
                    card.type !== 'square' && card.type !== 'portraitSmall' ?
                        <StarRating
                            reviewCount={Number(card.review_count)}
                            reviewScore={Number(card.review_score)}
                        /> : null
                }
            </div>
        );
    }
}

Card.propTypes = {
    card: PropTypes.object.isRequired,
    cardPadding: PropTypes.number.isRequired,
    isListing: PropTypes.bool,
    user: PropTypes.object
};

export default Card;
