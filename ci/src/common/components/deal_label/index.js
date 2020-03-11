import React from 'react';
import { render } from 'react-dom';


import DealLabel from './DealLabel.jsx';

function setDealLabel(room, containerId, lang) {
    let labelType;
    if (room.review_score &&
    Number(room.review_score) > 4.5 &&
    room.review_count > 10 && Number(room.hourly_rate) > 30) {
        labelType = 2;
    }
    if (room.last_booked) {
        const date = moment(room.last_booked);
        const today = moment();
        const sevenDaysAgo = today.clone().subtract(7, 'days').startOf('day');
        if (date.isAfter(sevenDaysAgo)) {
            labelType = 3;
        }
    }
    let text;
    let className;
    switch (labelType) {
    case 2:
        text = 'common_highly_rated';
        className = 'highly-rated';
        break;
    case 3:
        text = 'common_best_seller';
        className = 'regularly-booked';
        break;
    case 4:
        text = 'common_excellent_deal';
        className = 'excellent-deal';
        break;
    default:
        return;
    }
    if (labelType) {
        const container = document.querySelector(`#${containerId}`);
        render(<DealLabel text={lang.common[text]} className={className} />, container);
    }
}

export {
    DealLabel,
    setDealLabel
};
