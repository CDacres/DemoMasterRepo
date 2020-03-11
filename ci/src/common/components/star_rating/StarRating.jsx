import React from 'react';
import CSSModules from 'react-css-modules';
import shortId from 'shortid';

import styles from './StarRating.css';

function getStarNodes(rating) {
    const fullStars = Math.floor(rating);
    const starNodes = [];
    for (let i = fullStars; i > 0; i--) {
        starNodes.push(<span key={shortId.generate()} styleName="star filled-star">&#x2606;</span>);
    }
    if (rating % 1 !== 0) {
        starNodes.push(<span key={shortId.generate()} styleName="star half-star">&#x2606;</span>);
    }
    const emptyCount = 5 - starNodes.length;
    if (emptyCount) {
        for (let i = emptyCount; i > 0; i--) {
            starNodes.push(<span key={shortId.generate()} styleName="star">&#x2606;</span>);
        }
    }
    return starNodes;
}

const StarRating = ({ isAggregate, isSchema, rating }) => {
    const starNodes = getStarNodes(rating);
    if (isSchema) {
        let itemProp = 'review';
        let itemType = 'http://schema.org/Review';
        if (isAggregate) {
            itemProp = 'aggregateRating';
            itemType = 'http://schema.org/AggregateRating';
        }
        return (
            <div styleName="star_rating" itemProp={itemProp} itemType={itemType}>
                {starNodes}
            </div>
        );
    }
    return (
        <div styleName="star_rating">
            {starNodes}
        </div>
    );
};

StarRating.propTypes = {
    isAggregate: React.PropTypes.bool,
    isSchema: React.PropTypes.bool,
    rating: React.PropTypes.string.isRequired
};

export default CSSModules(StarRating, styles, {
    allowMultiple: true
});
