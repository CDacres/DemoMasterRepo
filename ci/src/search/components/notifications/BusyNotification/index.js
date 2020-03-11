/* global $ R base_url userLocation moment */

import { getFullDateObj } from 'CommonFunctions';

function isBusy() {
    const today = new Date();
    const day = today.getDay();
    const startTime = '8:00 AM';
    const endTime = '2:00 PM';
    const now = new Date();
    const startDate = getFullDateObj(startTime);
    const endDate = getFullDateObj(endTime);
    if (now < endDate && now > startDate && (day === 1 || day === 2)) return true;
    return false;
}

function busyNotification() {
    if (isBusy()) {
        const location = $.query.GET('location') ? $.query.GET('location') : 'London';
        $.growl.warning({
            title: "Don't miss out!",
            message: `It's busy in ${location} on the dates you've selected, book now so you're not disappointed.`,
            duration: 5000,
        });
    }
}

export default busyNotification;
