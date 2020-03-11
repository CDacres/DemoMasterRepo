/* global isAdmin adminId room */

import React from 'react';
import { render } from 'react-dom';
import {
    Map as IMap,
    fromJS
} from 'immutable';
import {
    map as Rmap
} from 'ramda';

// import {
//     urgencyPeopleViewing,
//     bargainPrice,
//     urgencyLastAvailable,
// } from './components/notifications';
// import populateReviewHighlights from './components/review_highlights';
import { setDealLabelFramed } from 'Common/components/deal_label_framed';
import DailyDeal from 'Common/components/daily_deal';

import {
    attachPhoneHelper,
//    getDistance
} from 'CommonFunctions';
import {
    loadLang,
    parseLangLine
} from '../lang';

import CustomTooltip from 'Common/components/custom_tooltip';

import styles from './spaces.css';

// urgencyPeopleViewing();
// bargainPrice();
// urgencyLastAvailable();
// populateReviewHighlights();

//function setNearbyStation(station, container) {
//    const distance = document.createTextNode(` (${(station.distance / 1000).toFixed(2)}km)`);
//    const paragraph = document.createElement('p');
//    const image = document.createElement('img');
//    image.setAttribute('class', styles['station-icon']);
//    image.setAttribute('onerror', 'this.src="/css/images/transport/generic.svg"');
//
//    if (!room.venue_country_code && !room.venue_city) {
//        image.src = '/css/images/transport/generic.svg';
//    } else if (station.type === 'subway_station') {
//        image.src = `/css/images/transport/${room.venue_country_code ?
//            room.venue_country_code.toLowerCase() :
//            'gb'}/${room.venue_city ?
//                room.venue_city.toLowerCase() :
//                'london'}/${station.type}.svg`;
//    } else if (station.type === 'train_station') {
//        image.src = `/css/images/transport/${room.venue_country_code ?
//            room.venue_country_code.toLowerCase() :
//            'gb'}/${station.type}.svg`;
//    } else {
//        image.src = '/css/images/transport/generic.svg';
//    }
//    const text = document.createTextNode(station.name);
//    paragraph.appendChild(image);
//    paragraph.appendChild(text);
//    paragraph.appendChild(distance);
//    container.appendChild(paragraph);
//}

//function nearestPOI() {
//    const container = document.querySelector('#nearest_poi');
//    const service = new google.maps.places.PlacesService(container);
//    const request = {
//        location: {
//            lat: Number(room.lat),
//            lng: Number(room.long)
//        },
//        radius: '1000',
//        types: ['subway_station', 'train_station']
//    };
//    service.nearbySearch(request, (response) => {
//        const stations = [];
//        Rmap((poi) => {
//            const station = {};
//            const stationLocation = {
//                lat: poi.geometry.location.lat(),
//                lng: poi.geometry.location.lng()
//            };
//            station.name = poi.name;
//            station.distance = getDistance(stationLocation, request.location);
//            station.type = poi.types[0];
//            stations.push(station);
//        }, response);
//        if (stations.length) {
//            stations.sort((a, b) => {
//                return a.distance - b.distance;
//            });
//            Rmap((station) => {
//                setNearbyStation(station, container);
//            }, stations);
//            $('#loading-container').hide();
//        } else {
//            $('#nearby_stations_title').hide();
//            $('#loading-container').hide();
//        }
//    });
//}

function shareMoreDropdown() {
    $('#share_more').hover(() => {
        $('#share_more_dropdown_caret').show();
        $('#share_more_dropdown').show();
    }, () => {
        $('#share_more_dropdown_caret').hide();
        $('#share_more_dropdown').hide();
    });
}

function showSignInModal(blocking = false) {
    return new Promise((resolve, reject) => {
        clearMainModal();
        $('#mainModal').on('shown.bs.modal', () => {
            $('#mainModal').on('hidden.bs.modal', () => {
                $('#mainModal').off('shown.bs.modal');
            });
        });
        const template = _.template($('#signInModal').html());
        $('#modal_slide_up_content').html(template);
        let config = {
            show: true
        };
        if (blocking) {
            config = {
                ...config,
                backdrop: 'static',
                keyboard: false
            };
        }
        $('#mainModal').modal(config);
        verticallyCenterModal();
        attachPhoneHelper();
        registerNeverBounceFields();
        $('#signInLink').click(() => {
            $('#signUpForm').hide();
            $('#signInLinkText').hide();
            $('#forgotPasswordForm').hide();
            $('#forgotPasswordLinkText').show();
            $('#signInForm').show();
            $('#signUpLinkText').show();
            $('#forgotPasswordLinkText').show();
        });
        $('#signUpLink').click(() => {
            $('#signInForm').hide();
            $('#signUpLinkText').hide();
            $('#signUpForm').show();
            $('#signInLinkText').show();
        });
        $('#forgotPasswordLink').click(() => {
            $('#signInForm').hide();
            $('#signUpLinkText').hide();
            $('#forgotPasswordLinkText').hide();
            $('#forgotPasswordForm').show();
            $('#signInLinkText').show();
        });
        $('#signUpForm').submit((event) => {
            event.preventDefault();
            $('#signUpForm .button-container').hide();
            $('#signUpForm .loader-container').show();
            let data = {
                first_name: $('#signUpForm input[name="first_name"]').val(),
                last_name: $('#signUpForm input[name="last_name"]').val(),
                email: $('#signUpForm input[name="email"]').val(),
                phone_number: $('#signUpForm input[name="phone_number"]').val(),
                password: $('#signUpForm input[name="password"]').val(),
                confirmpassword: $('#signUpForm input[name="password"]').val(),
                ga_id: $('#ga_id').val()
            };
            data = addNeverBounceStatusField(data, $('input[name="nb-result"]'));
            $.post('/users/new_signup', data, null, 'json') // eslint-disable-line camelcase
                .done((response) => {
                    if (response.error.occurred === true) {
                        if (isMobileVariable) {
                            $('#error-message').text(response.error.message);
                            $('#error-popup').popup('open', {
                                transition: 'pop'
                            });
                        } else {
                            $('#signUpForm .loader-container').hide();
                            $('#signUpForm .button-container').show();
                            bootstrapError(response.error.message);
                            reject(response.error.message);
                        }
                    } else {
                        closeMainModal();
                        resolve();
                    }
                })
                .fail((response) => {
                    const message = `Failed for some reason - ${response.error.message}.`;
                    if (isMobileVariable) {
                        $('#error-message').text(message);
                        $('#error-popup').popup('open', {
                            transition: 'pop'
                        });
                    } else {
                        $('#signUpForm .loader-container').hide();
                        $('#signUpForm .button-container').show();
                        bootstrapError(message);
                        reject(message);
                    }
                });
        });
        $('#signInForm').submit((event) => {
            event.preventDefault();
            $('#signInForm .button-container').hide();
            $('#signInForm .loader-container').show();
            const data = {
                zc_login_user_name: $('#signInForm input[name="email"]').val(),
                zc_login_password: $('#signInForm input[name="password"]').val()
            };
            $.post('/users/remote_signin', data, null, 'json') // eslint-disable-line camelcase
                .done((response) => {
                    if (response.error.occurred === true) {
                        if (isMobileVariable) {
                            $('#error-message').text(response.error.message);
                            $('#error-popup').popup('open', {
                                transition: 'pop'
                            });
                        } else {
                            $('#signInForm .loader-container').hide();
                            $('#signInForm .button-container').show();
                            bootstrapError(response.error.message);
                            reject(response.error.message);
                        }
                    } else {
                        closeMainModal();
                        resolve();
                    }
                })
                .fail(() => {
                    const message = 'Log in failed, please try again...';
                    if (isMobileVariable) {
                        $('#error-message').text(message);
                        $('#error-popup').popup('open', {
                            transition: 'pop'
                        });
                    } else {
                        $('#signInForm .loader-container').hide();
                        $('#signInForm .button-container').show();
                        bootstrapError(message);
                        reject(message);
                    }
                });
        });
        $('#forgotPasswordForm').submit((event) => {
            event.preventDefault();
            $('#forgotPasswordForm .button-container').hide();
            $('#forgotPasswordForm .loader-container').show();
            const email = $('#forgotPasswordForm input[name="email"]').val();
            if (typeof email !== 'undefined' && email !== null && email !== '') {
                const data = {
                    email
                };
                $.post('/users/forgot_password', data, null, 'json') // eslint-disable-line camelcase max-len
                    .done((response) => {
                        if (response.error.occurred === true) {
                            $('#forgotPasswordForm .loader-container').hide();
                            $('#forgotPasswordForm .button-container').show();
                            bootstrapError(`Request failed: ${response.error.message}`);
                        } else {
                            $('#email_address').val('');
                            $('#signInLink').trigger('click');
                            bootstrapSuccess(response.error.message);
                        }
                    })
                    .fail((response) => {
                        $('#forgotPasswordForm .loader-container').hide();
                        $('#forgotPasswordForm .button-container').show();
                        bootstrapError(`Request failed: ${response}`);
                    });
            } else {
                $('#forgotPasswordForm .loader-container').hide();
                $('#forgotPasswordForm .button-container').show();
                bootstrapError('Please enter an email.');
            }
        });
    });
}

function apiRequest(method, url, data) {
    const settings = {
        async: true,
        crossDomain: true,
        url: `/api/v1/${url}`,
        method,
        headers: {
            accept: 'application/json',
            'content-type': 'application/x-www-form-urlencoded',
            'cache-control': 'no-cache',
        },
        data
    };
    return new Promise((resolve, reject) => {
        $.ajax(settings)
        .done(resolve)
        .fail(reject);
    });
}

function getRoomTotalFavourites() {
    return new Promise((resolve, reject) => {
        apiRequest('GET', `rooms/allfavourites?room_id=${roomId}`)
        .then(resolve)
        .catch(reject);
    });
}

function getFavourites() {
    return new Promise((resolve, reject) => {
        apiRequest('GET', 'rooms/favourite')
        .then(resolve)
        .catch(reject);
    });
}

function checkForMatch(userFavourites) {
    const matching = userFavourites.filter(favourite => favourite.id == roomId);
    if (matching.length) {
        return true;
    }
    return false;
}

function switchButtonState(match, lang) {
    if (match) {
        $('#favourite-heart').removeClass('glyphicon-heart-empty');
        $('#favourite-heart').addClass('glyphicon-heart');
        $('#wishlist_text').text(lang.rooms.rooms_saved_to_wishlist);
        return true;
    }
    $('#favourite-heart').removeClass('glyphicon-heart');
    $('#favourite-heart').addClass('glyphicon-heart-empty');
    $('#wishlist_text').text(lang.rooms.rooms_save_to_wishlist);
    return false;
}

function getFavouritesAndSetElements(method, lang) {
    return new Promise((resolve, reject) => {
        apiRequest(method, 'rooms/favourite', { room_id: roomId })
        .then(() => {
            getFavourites()
            .then((favourites) => {
                switchButtonState(checkForMatch(favourites), lang);
                getRoomTotalFavourites()
                .then((response) => {
                    if (response) {
                        const text = parseLangLine(((response > 1) ?
                            lang.rooms.rooms_add_to_customers_have_saved :
                            lang.rooms.rooms_add_to_customers_has_saved), response);
                        $('#favourite-count').text(`${text}`);
                    } else {
                        $('#favourite-count').empty();
                    }
                    resolve(favourites);
                });
            });
        })
        .catch(reject);
    });
}

function checkUserStatus() {
    return new Promise((resolve, reject) => {
        $.get('/users/is_logged_in', null, null, 'json')
        .done((response) => {
            resolve(response.data);
        })
        .fail(reject);
    });
}

function setUpFavourites(lang) {
    getRoomTotalFavourites()
    .then((response) => {
        if (response) {
            const text = parseLangLine(((response > 1) ?
                lang.rooms.rooms_add_to_customers_have_saved :
                lang.rooms.rooms_add_to_customers_has_saved), response);
            $('#favourite-count').text(`${text}`);
        }
    });
    let userFavourites = [];
    checkUserStatus()
    .then((loggedIn) => {
        if (loggedIn) {
            getFavourites()
            .then((favourites) => {
                userFavourites = favourites;
                switchButtonState(checkForMatch(userFavourites), lang);
            });
        }
    });
    $('#toggle_favourite').click(() => {
        checkUserStatus()
        .then((loggedIn) => {
            let method = 'POST';
            if (loggedIn) {
                if (checkForMatch(userFavourites)) {
                    method = 'PUT';
                }
                getFavouritesAndSetElements(method, lang)
                .then((res) => {
                    userFavourites = res;
                });
            } else {
                showSignInModal()
                .then(() => {
                    getFavourites()
                    .then((res) => {
                        userFavourites = res;
                        if (checkForMatch(userFavourites)) {
                            method = 'PUT';
                        }
                        getFavouritesAndSetElements(method, lang)
                        .then((res) => {
                            userFavourites = res;
                        });
                    });
                });
            }
        });
    });
}

function askQuestionByPhone() {
    $('#ask_question_by_home').click(() => {
        if (isLoggedIn) {
            $('#ask_question_by_home').hide();
            $('#phone_number').show();
        } else {
            showSignInModal()
            .then(() => {
                $('#ask_question_by_home').hide();
                $('#phone_number').show();
            })
            .catch(console.log);
        }
    });
}

function setTooltips() {
    $('.custom-tooltip').each(function () {
        CustomTooltip($(this), '.space-sidebar__why-zipcube');
    });
}

function fadeInMessage() {
    setTimeout(() => {
        $('.space-sidebar__on-peoples-minds').slideDown(600, () => {
            $('.space-sidebar__on-peoples-minds .row').animate({ opacity: '1' }, 600);
        });
    }, 500);
}

function dailyDeal(lang) {
    const roomObj = fromJS(room);
    const currency = Currency.getCurrency(roomObj.get('currency_code'));
    const currencyMap = IMap(currency);
    let hourlyDayRate, dailyDayRate;
    if (typeof roomObj.get('user_discount') !== 'undefined')
    {
        hourlyDayRate = roomObj.get('discount_daily_deal_hourly_rate');
        dailyDayRate = roomObj.get('discount_daily_rate');
    }
    else
    {
        hourlyDayRate = roomObj.get('daily_deal_hourly_rate');
        dailyDayRate = roomObj.get('daily_rate');
    }
    if (typeof dailyDayRate !== 'undefined' && Number(hourlyDayRate) > Number(dailyDayRate)) {
        const dailyRateSavings = ((Number(dailyDayRate) - Number(hourlyDayRate)) / Number(hourlyDayRate)) * 100;
        const roomObj1 = roomObj.set('hourly_day_rate', Number(hourlyDayRate));
        const roomObj2 = roomObj1.set('daily_rate_savings', Math.ceil(dailyRateSavings.toFixed(0)));
        const roomObj3 = roomObj2.set('daily_rate', Number(dailyDayRate));
        const langMap = IMap(lang);
        const container = document.querySelector('#daily-price');
        $('#daily-price').empty();
        render(
            <DailyDeal
                roomObj={roomObj3}
                lang={langMap}
                currency={currencyMap}
                perDay={false}
            />, container
        );
    } else if (typeof dailyDayRate !== 'undefined') {
        $('#daily-price').text(
            `${currency.symbol}${(Number(dailyDayRate) % 1) === 0 ? Number(dailyDayRate) : Number(dailyDayRate).toFixed(2)}`
        );
    }
}

function siblingDailyDeal(lang) {
    const langMap = IMap(lang);
    $('.daily-deal').each(function () {
        const roomObj = IMap({
            id: $(this).data('room-id'),
            hourly_rate: Number($(this).data('hourly-rate')),
            daily_rate: Number($(this).data('daily-rate')),
            currency_code: $(this).data('currency-code')
        });
        const currencyMap = IMap(Currency.getCurrency(roomObj.get('currency_code')));
        const hourlyDayRate = roomObj.get('daily_deal_hourly_rate');
        if (typeof roomObj.get('daily_rate') !== 'undefined' && hourlyDayRate > Number(roomObj.get('daily_rate'))) {
            const dailyRateSavings = ((roomObj.get('daily_rate') - hourlyDayRate) / hourlyDayRate) * 100;
            const roomObj1 = roomObj.set('hourly_day_rate', hourlyDayRate);
            const roomObj2 = roomObj1.set('daily_rate_savings', Math.ceil(dailyRateSavings.toFixed(0)));
            const container = document.querySelector(`#${this.id}`);
            render(
                <DailyDeal
                    roomObj={roomObj2}
                    lang={langMap}
                    currency={currencyMap}
                    perDay
                />, container
            );
        } else if (typeof roomObj.get('daily_rate') !== 'undefined') {
            $(`#daily-deal-${roomObj.get('id')}`)
            .text(` ${currencyMap.get('symbol')}${(roomObj.get('daily_rate') % 1) === 0 ? roomObj.get('daily_rate') : roomObj.get('daily_rate').toFixed(2)} /${lang.common.common_day}`);
        }
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
//    nearestPOI();
    shareMoreDropdown();
    setDealLabelFramed(room, 'deal-label-container');
    let lang = {};
    loadLang(['common', 'rooms', 'venues'])
    .then((language) => {
        lang = language;
        setUpFavourites(lang);
        dailyDeal(lang);
        siblingDailyDeal(lang);
    })
    .catch(console.log);
    askQuestionByPhone();
    setTooltips();
    fadeInMessage();
    if (isAdmin) {
        addParamsToLink();
    }
}
