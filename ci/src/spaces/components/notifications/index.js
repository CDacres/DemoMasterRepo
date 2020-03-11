/* global window document */

import { StripeBanner, SidebarAlert } from 'Common/components/notifications';

function updateCount(count) {
    const human = count > 1 ? 'other people are' : 'other person is';
    const element = document.querySelector('#pageViewerCount');
    element.innerHTML = `${count}  ${human}`;
}

const notificationsContainer = document.querySelector('#notifications');

function urgencyPeopleViewing() {
    const text = '<span id="pageViewerCount">1 other person is</span> looking at this space';
    notificationsContainer.innerHTML += StripeBanner({
        theme: 'red',
        icon: 'users',
        text,
    });
}

function bargainPrice() {
    const text = 'Don\'t miss out on our best price, book now!';
    notificationsContainer.innerHTML += StripeBanner({
        theme: 'green',
        icon: 'check',
        text,
    });
}

function urgencyLastAvailable() {
    const venue = 'Savoy Place';
    const text = `Book now!  Meeting rooms at ${venue} are in <b>high demand</b>.`;
    notificationsContainer.innerHTML += StripeBanner({
        theme: 'red',
        icon: 'clock-o',
        text,
    });
}

// function sellingOutFast() {
    // SidebarAlert();
// }

export {
    urgencyPeopleViewing,
    bargainPrice,
    urgencyLastAvailable,
};
