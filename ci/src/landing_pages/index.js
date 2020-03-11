/* global $ document meeting_type language_code */

import React from 'react';
import { render } from 'react-dom';
import axios from 'axios';
import { mapObjIndexed as Rmap } from 'ramda';

import attachUnsliderToHeroSlider from 'Common/components/hero_slider';
import { attachUnsliderToTrustCarousel } from './components/TrustCarousel/methods';
import LoadingAnimation from 'Common/components/loading_animation';

import RoomCarousel from './components/RoomCarousel';
import LocationCarousel from './components/LocationCarousel';

import initCardMap from './components/LandingMap';
import { loadLang, parseLangLine } from '../lang';
import { setStarRatings } from '../common_functions';

attachUnsliderToHeroSlider();
attachUnsliderToTrustCarousel();

function attachJqueryDatePicker() {
    $('#zc_lp_start_date_mobile').datepicker($.datepicker.regional[language_code]);
}

attachJqueryDatePicker();

const loadingContainer = document.querySelector('#loading-container');
const carouselContainers = document.querySelectorAll('.carousel-entry');
render(<LoadingAnimation />, loadingContainer);

const getCarouselTitle = (key, lang) => {
    let type;
    switch (key) {
    case 'favourite':
        type = `${lang.common.favourite}`;
        break;
    case 'review':
        type = `${lang.common.best_reviewed}`;
        break;
    case 'recent':
        type = `${lang.common.recently_booked}`;
        break;
    case 'top':
        type = `${lang.common.popular}`;
        break;
    case 'popular':
        type = `${lang.common.popular_locations}`;
        break;
    case 'cool':
        type = `${lang.common.cool}`;
        break;
    case 'hotel':
        type = `${lang.common.hotel}`;
        break;
    case 'cheap':
        type = `${lang.common.cheap}`;
        break;
    default:
        type = 'Wrong carousel title name';
        break;
    }
    return parseLangLine(type, meeting_type);
};

let url = `/api/v1/landings/rooms?`;

if (typeof landing_page_id !== 'undefined') {
    url += `id=${landing_page_id}`;
} else {
    url += `location_id=${loadingContainer.dataset.locationId}`;
}

axios({
    method: 'get',
    url
})
.then((response) => {
    loadLang(['common', 'home'])
        .then((lang) => {
            loadingContainer.style.display = 'none';
            if (typeof carouselContainers != 'undefined' && carouselContainers != null)
            {
                for (let c = 0; c < carouselContainers.length; c++) {
                    carouselContainers[c].style.display = 'block';
                }
            }
            Rmap((cards, key) => {
                if (cards.length) {
                    if (key !== 'pointers' && key !== 'bounds') {
                        const title = getCarouselTitle(key, lang);
                        const carouselEl = document.getElementById(`${key}-carousel`);
                        if (typeof carouselEl != 'undefined' && carouselEl != null)
                        {
                            if (key === 'popular') {
                                render(
                                    <LocationCarousel
                                        title={title}
                                        cards={cards}
                                        lang={lang}
                                    />, carouselEl
                                );
                            } else {
                                render(
                                    <RoomCarousel
                                        title={title}
                                        cards={cards}
                                        lang={lang}
                                        is_admin={window.__props__.is_admin}
                                        needs_url={!window.__props__.homePage && !window.__props__.browsePage}
                                        url={carouselEl.dataset.url}
                                    />, carouselEl
                                );
                            }
                            carouselEl.style.padding = '30px 0 50px 0';
                        }
                    }
                }
                else if (key == 'bounds' && $('#lp_map').length) {
                    initCardMap(response.data.bounds, response.data.pointers);
                }
            }, response.data);
        })
        .then(() => {
            $('.room').flip({
                trigger: 'manual'
            });
            $('.room .corner-triangle').on('click', function () {
                $(this).closest('.room').flip('toggle');
            });
            $('.city').flip({
                trigger: 'manual'
            });
            $('.city .corner-triangle').on('click', function () {
                $(this).closest('.city').flip('toggle');
            });
            setStarRatings();
            $('#lp-map-container').show();
        });
})
.catch(console.log);
