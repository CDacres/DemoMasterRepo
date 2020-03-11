/* global linkedin_login_link */

import React from 'react';
import { render } from 'react-dom';

import CheckoutProvider from './CheckoutProvider';

import {
    setBookNowTooltip
} from 'Payments/components';
import { setStarRatings } from 'CommonFunctions';
import { loadLang, parseLangLine } from '../lang';

setBookNowTooltip();
setStarRatings();

let facebookUser = {
    isLoggedIn: false
};

function attachSignin(element) {
    loadLang(['users']).then((lang) => {
        auth2.attachClickHandler(element, {}, (googleUser) => {
            if (typeof googleUser !== 'undefined') {
                if ($('#google_button_text').length) {
                    document.getElementById('google_button_text').innerText =
                        parseLangLine(lang.users.users_login_signing_in, ` ${googleUser.getBasicProfile().getName()}`);
                }
                const idToken = googleUser.getAuthResponse().id_token;
                $.post('/api/v1/auth/google', {
                    id_token: idToken
                })
                    .done((response) => {
                        if (response.success) {
                            location.reload();
                        }
                    })
                    .fail(console.log);
            }
        }, (error) => {
            console.log(JSON.stringify(error, undefined, 2));
        });
    });
}

function checkLoginState() {
    FB.getLoginStatus((response) => {
        if (response.status === 'connected') {
            facebookUser = {
                isLoggedIn: true,
                authToken: response.authResponse.accessToken
            };
        }
    });
}

window.fbAsyncInit = () => {
    FB.init({
        appId: '286304788451093',
        cookie: true,
        xfbml: true,
        version: 'v2.8'
    });
    checkLoginState();
};

function facebookLogin(accessToken) {
    $.post('/api/v1/auth/facebook', {
        accessToken
    })
        .done((response) => {
            if (response.success) {
                location.reload();
            }
        })
        .fail(console.log);
}

function renderCheckout() {
    render(
        <CheckoutProvider
            address={window.__props__.address}
            amenities={window.__props__.amenities}
            btToken={window.__props__.btToken}
            bookingRequest={window.__props__.bookingRequest}
            configurations={window.__props__.configurations}
            defaultConfiguration={window.__props__.defaultConfiguration}
            country_lang_url={window.__props__.country_lang_url}
            fullAddress={window.__props__.fullAddress}
            lang={window.__props__.lang}
            linkedin_login_link={window.__props__.linkedin_login_link}
            room={window.__props__.room}
            user={window.__props__.user}
        />, document.querySelector('#root')
    );
    if (window.__props__.user && !window.__props__.user.is_logged_in) {
        gapi.load('auth2', () => {
            window.auth2 = gapi.auth2.init({
                client_id: '315597152419-ustu5t4je8o87mfmq4v5koltq673lgg1.apps.googleusercontent.com',
                cookiepolicy: 'single_host_origin'
            });
            attachSignin(document.getElementById('google_login_button'));
        });
        $('#facebook_login_button').click(() => {
            if (facebookUser.isLoggedIn) {
                facebookLogin(facebookUser.authToken);
            } else {
                FB.login(() => {
                    FB.getLoginStatus((response) => {
                        if (response.status === 'connected') {
                            facebookUser = {
                                isLoggedIn: true,
                                authToken: response.authResponse.accessToken
                            };
                            facebookLogin(facebookUser.authToken);
                        }
                    });
                }, { scope: 'email,public_profile' });
            }
        });
        $('#linkedin_login_button').click(() => {
            window.open(linkedin_login_link, 'linkedinAuth', 'height=450, width=550, top=' + ($(window).height() / 2) + ', left=' + ($(window).width() / 2 - 225) + ', toolbar=0, location=0, menubar=0, directories=0, scrollbars=0');
            return false;
        });
    }
}

renderCheckout();

$(document).ready(() => {
    const icons = Array.prototype.slice.call(document.getElementsByClassName('tippy'));
    icons.map((icon) => {
        new Tippy(icon, {
            html: `#${icon.dataset.amenityId}-tooltip-template`,
            position: 'right',
            animation: 'scale',
            duration: 300,
            arrow: true
        });
    });
});
