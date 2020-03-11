/* global _ room */

import React from 'react';
import { render } from 'react-dom';

import ReviewHighlights from './ReviewHighlights.jsx';
import './ReviewHighlights.css';

const container = document.querySelector('#review-highlights');

function populateReviewHighlights() {
    if (room.review_count > 0) {
        console.log(room.reviews.objects);
        render(<ReviewHighlights reviews={room.reviews.objects} />, container)
    }
}

export default populateReviewHighlights;
