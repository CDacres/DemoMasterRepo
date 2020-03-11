
import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, css } from 'aphrodite/no-important';
import Slider from 'custom-react-slick';
import shortid from 'shortid';

import { shortenString } from 'CommonFunctions';

const LocationCarousel = ({ title, cards, lang }) => {
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 6,
        slidesToScroll: 6
    };
    const cardElements = cards.map((card) => {
        let desc = card.desc_text;
        if (typeof desc !== 'undefined') {
            if (desc.length > 135) {
                desc = shortenString(card.desc_text, 135);
            }
        }
        return (
            <div key={shortid.generate()} className="col-xs-2">
                <div className={`city ${css(styles.city)}`}>
                    <div className={`front ${css(styles.front)}`}>
                        <span className={`corner-triangle ${css(styles.cornerTriangle)}`} />
                        <a target="_blank" href={card.city_url} title={card.city_short_desc}>
                            <div className={css(styles.roomImg)} style={{ backgroundImage: `url('${card.image}')` }} />
                        </a>
                        <div className={css(styles.info)}>
                            <a
                                target="_blank"
                                href={card.city_url}
                                title={card.city_short_desc}
                                className={css(styles.infoText)}
                            >
                                <b>{card.locality}</b>
                            </a>
                        </div>
                    </div>
                    <div
                        className={`back ${css(styles.back)}`}
                        style={{ backfaceVisibility: 'hidden' }}
                    >
                        <span
                            className={`
                                corner-triangle ${css(styles.cornerTriangle, styles.cornerTriangleBack)}
                            `}
                        />
                        <div className={`row ${css(styles.backRow)}`}>
                            <div className="col-md-12">
                                <h4 className={css(styles.backHeading)}>{card.locality}</h4>
                                <p className={css(styles.infoBack)}>{desc}</p>
                            </div>
                            <div className="col-md-12">
                                <a href={card.city_url} title={card.city_short_desc}>
                                    {card.locality} {card.collective_title}
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    });
    return (
        <div>
            <div className="row">
                <div className="col-xs-12">
                    <h2 className={css(styles.carouselTitle)}>
                        {title}
                    </h2>
                </div>
            </div>
            <div className="row">
                <Slider {...settings}>
                    {cardElements}
                </Slider>
            </div>
        </div>
    );
};

LocationCarousel.propTypes = {
    cards: PropTypes.array.isRequired,
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
    city: {
        height: '280px'
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
    infoBack: {
        lineHeight: '1.5em',
        maxHeight: '10.5em',
        fontSize: '12px',
        margin: '0 0 10px 0'
    }
});

export default LocationCarousel;
