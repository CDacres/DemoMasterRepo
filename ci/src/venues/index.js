/* global isAdmin adminId */

import React from 'react';
import { render } from 'react-dom';
import { map as Rmap } from 'ramda';
import {
    Map as IMap
} from 'immutable';

import { loadLang } from 'Lang';

import StarRating from 'Common/components/star_rating';
import DailyDeal from 'Common/components/daily_deal';

function setVenueOverallRating() {
    const venueRatingContainers = document.getElementsByClassName('venue_overall_rating');
    Rmap((venueRatingContainer) => {
        const rating = venueRatingContainer.getAttribute('data-venue-rating');
        render(<StarRating rating={rating} isSchema isAggregate />, venueRatingContainer);
    }, venueRatingContainers);
}

function setVenueSubRatings() {
    const subRatingContainers = document.getElementsByClassName('subrating_container');
    Rmap((subRatingContainer) => {
        const rating = subRatingContainer.getAttribute('data-venue-subrating');
        render(<StarRating rating={rating} />, subRatingContainer);
    }, subRatingContainers);
}

function setIndividualReviewRatings() {
    const reviewRatingContainers = document.getElementsByClassName('review_rating_container');
    Rmap((reviewRatingContainer) => {
        const rating = reviewRatingContainer.getAttribute('data-review-rating');
        render(<StarRating rating={rating} isSchema />, reviewRatingContainer);
    }, reviewRatingContainers);
}

function dailyDeal() {
    loadLang(['common', 'venues'])
    .then((lang) => {
        const langMap = IMap(lang);
        $('.daily-deal').each(function() {
            const roomObj = IMap({
                hourly_rate: Number($(this).data('hourly-rate')),
                daily_rate: Number($(this).data('daily-rate')),
                currency_code: $(this).data('currency-code')
            });
            const hourlyDayRate = roomObj.get('daily_deal_hourly_rate');
            const currencyMap = IMap(Currency.getCurrency(roomObj.get('currency_code')));
            if (roomObj.get('daily_rate') && Number(hourlyDayRate) > Number(roomObj.get('daily_rate'))) {
                const dailyRateSavings = ((roomObj.get('daily_rate') - Number(hourlyDayRate)) / Number(hourlyDayRate)) * 100;
                const roomObj1 = roomObj.set('hourly_day_rate', Number(hourlyDayRate));
                const roomObj2 = roomObj1.set('daily_rate_savings', Math.ceil(dailyRateSavings.toFixed(0)));
                const container = document.querySelector(`#${this.id}`);
                render(<DailyDeal roomObj={roomObj2} lang={langMap} currency={currencyMap} perDay={true} />, container);
            }
        });
    });
}

function addParamsToLink() {
    $.query.SET('source', 'zipcube');
    $.query.SET('medium', 'shared_link');
    $.query.SET('admin_id', adminId);

    if (history) {
        history.pushState({}, null, $.query);
    }
}

if (!isMobileVariable) {
    setVenueOverallRating();
    setVenueSubRatings();
    setIndividualReviewRatings();
    dailyDeal();

    if (isAdmin) {
        addParamsToLink();
    }
}
