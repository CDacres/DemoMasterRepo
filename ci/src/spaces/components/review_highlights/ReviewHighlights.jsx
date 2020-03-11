import React from 'react';
// import withStyles from 'isomorphic-style-loader/lib/withStyles';
// import s from './ReviewHighlights.css';

import { shortenString } from 'CommonFunctions';

function ReviewHighlight(props) {
    const review = shortenString(props.review.defaulted_review, 5);
    return (
        <div className="review-row">
            <i className="fa fa-certificate" aria-hidden="true"></i>
            <span className="review-text">{review}</span>
        </div>
    )
}

ReviewHighlight.propTypes = {
    review: React.PropTypes.string.isRequired,
};

function ReviewHighlights(props) {
    let reviewHighlights = [];
    const reviews = props.reviews;
    reviews.map((review, i) => {
        reviewHighlights.push(<ReviewHighlight key={i} review={review} />);
    });
    return (
        <div className="review-list-container">
            <h4>Review highlights</h4>
            {reviewHighlights}
        </div>
    )
}

ReviewHighlights.propTypes = {
    reviews: React.PropTypes.array.isRequired,
};

export default ReviewHighlights;
