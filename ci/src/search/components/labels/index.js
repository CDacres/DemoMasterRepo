/* global $ _ moment */

import {
    reduce as Reduce,
    filter as Rfilter,
} from 'ramda';

function getHighestPageViews(roomsArr) {
    const highestPageViews = (accum, value) => {
        if (Number(accum.page_viewed) >= Number(value.page_viewed)) {
            return accum;
        }
        return value;
    };

    const highest = Reduce(highestPageViews, 0, roomsArr);

    const secondHighest = (accum, value) => {
        if (Number(accum.page_viewed) >= Number(value.page_viewed) ||
        Number(value.page_viewed) >= Number(highest.page_viewed)) {
            return accum;
        }
        return value;
    };

    const second = Reduce(secondHighest, 0, roomsArr);

    return [second, highest];
}

function getHighlyRated(roomsArr) {
    const isHighlyRated = (room) => {
        if (Number(room.review_score) > 4.5 &&
        room.review_count > 10 && Number(room.hourly_rate) > 30) {
            return room;
        }
        return false;
    };

    return Rfilter(isHighlyRated, roomsArr);
}

function getRegularlyBooked(roomsArr) {
    const regularlyBooked = (room) => {
        const date = moment(room.last_booked);
        const today = moment();
        const sevenDaysAgo = today.clone().subtract(7, 'days').startOf('day');
        if (date.isAfter(sevenDaysAgo)) {
            return room;
        }
        return false;
    };

    return Rfilter(regularlyBooked, roomsArr);
}

function getExcellentDeals(roomsArr) {
    return roomsArr;
}

export {
    getHighestPageViews,
    getHighlyRated,
    getRegularlyBooked,
    getExcellentDeals,
};
