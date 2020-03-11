
import React from 'react';
import PropTypes from 'prop-types';
// import { StyleSheet, css } from 'aphrodite/no-important';

const ReviewSection = ({ room, lang }) => {
    const word = ((Number(room.venue_review_count) === 1) ?
        lang.common.common_review_lower :
        lang.common.common_reviews_lower);
    return (
        <a target="_blank" href={`${room.venue_url}#reviews_link`} title="">
            <div className="star_rating" data-zc_rating={room.venue_review_score}>
                <span>&#x2606;</span>
                <span>&#x2606;</span>
                <span>&#x2606;</span>
                <span>&#x2606;</span>
                <span>&#x2606;</span>
            </div>
            <span className="reviews_right_space"> {room.venue_review_count} {word}</span>
        </a>
    );
};

ReviewSection.propTypes = {
    lang: PropTypes.object.isRequired,
    room: PropTypes.object.isRequired
};

export default ReviewSection;
