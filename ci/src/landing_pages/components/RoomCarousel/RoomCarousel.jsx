
import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, css } from 'aphrodite/no-important';
import Slider from 'custom-react-slick';
import shortid from 'shortid';

import ReviewSection from './ReviewSection';

import { shortenString } from '../../../common_functions';

const RoomCarousel = ({ title, cards, lang, is_admin, needs_url, url }) => {
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3
    };
    const cardElements = cards.map((card) => {
        let reviewSection = null;
        if (card.venue_review_score > 0) {
            reviewSection = <ReviewSection room={card} lang={lang} />;
        }
        let desc = card.desc;
        if (typeof desc !== 'undefined' && desc.length > 270) {
            desc = shortenString(card.desc, 270);
        }
        return (
            <div key={shortid.generate()} className="col-md-4 col-sm-4 col-xs-4">
                <div className={`room ${css(styles.room)}`}>
                    <div className={`front ${css(styles.front)}`}>
                        <span className={`corner-triangle ${css(styles.cornerTriangle)}`} />
                        {is_admin ?
                            <div className="listing-btns">
                                <a href={card.edit_room_url} className="btn btn-xs btn-edit" target="_blank">Edit Room</a>
                                <a href={card.edit_venue_url} className="btn btn-xs btn-edit" target="_blank">Edit Venue</a>
                            </div>
                        : null}
                        <a target="_blank" href={card.room_url} title={card.name}>
                            <div
                                className={css(styles.roomImg)}
                                style={{ backgroundImage: `url(${card.image})` }}
                            />
                        </a>
                        <div className={css(styles.info)}>
                            <a
                                target="_blank"
                                href={card.room_url}
                                title={card.name}
                                className={css(styles.infoText)}
                            >
                                <b>
                                    <span>{card.currency}</span>
                                    {Math.floor(card.price)}
                                </b> {card.parent_name}
                            </a>
                            <p className={css(styles.infoFront)}>{desc}</p>
                        </div>
                        {reviewSection}
                    </div>
                    <div
                        className={`back ${css(styles.back)}`}
                        style={{ backfaceVisibility: 'hidden' }}
                    >
                        <span
                            className={`
                                corner-triangle ${
                                    css(styles.cornerTriangle, styles.cornerTriangleBack)
                                }
                            `}
                        />
                        <div className={css(styles.backRow)}>
                            <div className="col-md-12">
                                <a target="_blank" href={card.room_url} title={card.name}>
                                    <h4 className={css(styles.backHeading)}>{card.venue_name}</h4>
                                </a>
                            </div>
                            <div className="col-md-12">
                                <p className={css(styles.venueAddress)}>
                                    {card.parent_name}<br />
                                    {card.address}
                                </p>
                            </div>
                            <div className="col-md-12">
                                <p className={css(styles.infoBack)}>{desc}</p>
                            </div>
                            <div className="col-md-12 text-center">
                                <a
                                    target="_blank"
                                    href={card.room_url}
                                    title={card.name}
                                    className="btn btn-primary btn-sm"
                                >
                                    {lang.common['Book Now']}
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    });
    if (cardElements.length < 3) {
        const blankCount = 3 - cardElements.length;
        for (let i = 0; i < blankCount; i += 1) {
            cardElements.push(
                <div key={shortid.generate()} className="col-md-4 col-sm-4 col-xs-4" />
            );
        }
    }
    return (
        <div>
            <div className="row">
                <div className="col-xs-10">
                    <h2 className={css(styles.carouselTitle)}>
                        {title}
                    </h2>
                </div>
                {needs_url ?
                    <div className="col-xs-2">
                        <h3 className={css(styles.carouselsubTitle)}>
                            <a href={url} title={lang.home.home_landing_carousel_link} target="_blank">
                                {lang.home.home_landing_carousel_link} >
                            </a>
                        </h3>
                    </div>
                : null}
            </div>
            <div className="row">
                <Slider {...settings}>
                    {cardElements}
                </Slider>
            </div>
        </div>
    );
};

RoomCarousel.propTypes = {
    cards: PropTypes.array.isRequired,
    is_admin: PropTypes.bool,
    lang: PropTypes.object.isRequired,
    title: PropTypes.string.isRequired
};

const styles = StyleSheet.create({
    carouselTitle: {
        fontSize: '18px',
        lineHeight: '24px',
        paddingTop: '0px',
        paddingBottom: '0px',
        color: '#484848',
        margin: '0px',
        marginBottom: '24px'
    },
    carouselsubTitle: {
        fontSize: '16px',
        lineHeight: '24px',
        paddingTop: '0px',
        paddingBottom: '0px',
        color: '#484848',
        margin: '0px',
        marginBottom: '24px',
        textAlign: 'right'
    },
    room: {
        height: '325px'
    },
    front: {
        position: 'relative'
    },
    cornerTriangle: {
        ':hover': {
            cursor: 'pointer'
        },
        zIndex: 10,
        position: 'absolute',
        right: '0px',
        width: 0,
        height: 0,
        borderStyle: 'solid',
        borderWidth: '0 50px 50px 0',
        borderColor: 'transparent #00c8ff transparent transparent',
        opacity: 0.8,
        filter: 'alpha(opacity = 80)'
    },
    cornerTriangleBack: {
        top: '-10px'
    },
    info: {
        padding: '5px 0 2px'
    },
    infoText: {
        color: '#484848',
        fontWeight: 400,
        wordWrap: 'break-word',
        fontSize: '15px',
        lineHeight: '18px',
        letterSpacing: '.2px',
        ':visited': {
            color: '#484848'
        },
        ':active': {
            color: '#484848'
        }
    },
    roomImg: {
        width: '100%',
        height: '240px',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
    },
    backRow: {
        padding: '0px 10px'
    },
    backHeading: {
        margin: '0 0 10px 0'
    },
    venueAddress: {
        margin: 0
    },
    back: {
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: '#FFF',
        padding: '0px 5px',
        border: '2px solid #E8E8E8'
    },
    infoFront: {
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
    },
    infoBack: {
        lineHeight: '1.5em',
        maxHeight: '10.5em',
        fontSize: '12px',
        margin: '0 0 10px 0'
    }
});

export default RoomCarousel;
