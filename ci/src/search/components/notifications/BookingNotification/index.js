/* global $ */

import {
    contains as Rcontains,
    filter as Rfilter,
} from 'ramda';

import { batchMap } from 'CommonFunctions';
import '../GrowlNotification/GrowlNotification.css';
import './BookingNotification.css';
import { loadLang } from 'Lang';

function getVertical(usages) {
    if (Rcontains(1, usages)) {
        return 'search_new_booking_office';
    } else if (Rcontains(6, usages)) {
        return 'search_new_booking_event';
    } else if (Rfilter((usage) => {
        Rcontains(usage, usages);
    }, [5, 13, 14]).length) {
        return 'search_new_booking_desk';
    } else if (Rcontains(3, usages)) {
        return 'search_new_booking_meeting';
    } else if (Rcontains(4, usages)) {
        return 'search_new_booking_conference';
    } else if (Rcontains(12, usages)) {
        return 'search_new_booking_training';
    }
    return 'search_new_booking_space';
}

function setNotificationText(usages, booking, lang) {
    const vertical = getVertical(usages);
    let message = `${booking.name}. ${lang.search[vertical]}`;
    return message;
}

function showNotification(booking, lang) {
    const usages = $.query.GET('usages') ? JSON.parse($.query.GET('usages')) : [3];
    const message = setNotificationText(usages, booking, lang);
    $.bootstrapGrowl(
        `
        <div class="row">
            <div class="col-xs-4">
                <img class="notification-image" src="${booking.image}" />
            </div>
            <div class="col-xs-8 left-p-0">
                ${lang.search.search_new_booking} ${message}
            </div>
        </div>`,
        {
            ele: 'body',
            type: 'warning',
            offset: {
                from: 'right',
                amount: 10,
            },
            width: 'auto',
            delay: 8000,
            allow_dismiss: false,
        }
    );
}

function getRecentBookings(search) {
    return new Promise((resolve, reject) => {
        $.getJSON(`/api/v1/reservations/recent${search}`)
        .done(response => resolve(response))
        .fail(reject);
    });
}

function sortBookings(bookings, lang) {
    if (bookings.length) {
        batchMap(bookings, showNotification, { initialTimeout: 5000, batchSize: 1, random: true }, false, lang);
    }
}

function recentBookingNotifications(lang, search) {
    getRecentBookings(search).then((response) => {
        sortBookings(response, lang);
    });
};

export default recentBookingNotifications;
