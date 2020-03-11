import React from 'react';
import { render } from 'react-dom';

import { loadLang } from '../../../lang';

import DealLabelFramed from './DealLabelFramed.jsx';

function setDealLabelFramed(room, containerId) {
    let labelType;
    let lang = {};
    loadLang(['common'])
    .then((language) => {
        lang = language;
        if (Number(room.review_score) > 4.5 &&
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
        let glyphicon;
        switch (labelType) {
        case 2:
            text = 'common_highly_rated';
            className = 'highly-rated';
            glyphicon = 'star';
            break;
        case 3:
            text = 'common_best_seller';
            className = 'regularly-booked';
            glyphicon = 'certificate';
            break;
        case 4:
            text = 'common_excellent_deal';
            className = 'excellent-deal';
            glyphicon = 'fire';
            break;
        default:
            return;
        }
        if (labelType) {
            const container = document.querySelector(`#${containerId}`);
            render(<DealLabelFramed text={lang.common[text]} className={className} glyphicon={glyphicon} />, container);
        }
    })
    .catch(console.log);
}

export {
    DealLabelFramed,
    setDealLabelFramed
};
