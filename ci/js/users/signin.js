
var googleUser = {};

var facebookUser = {
    isLoggedIn: false
};

function attachSignin(element) {
    loadLang(['users']).then(function (language) {
        auth2.attachClickHandler(element, {}, function (googleUser) {
            if (typeof googleUser !== 'undefined') {
                if ($('#google_button_text').length) {
                    document.getElementById('google_button_text').innerText =
                        parseLangLine(language.users.users_login_signing_in, ` ${googleUser.getBasicProfile().getName()}`);
                }
                var idToken = googleUser.getAuthResponse().id_token;
                $.post('/api/v1/auth/google', {
                    id_token: idToken
                })
                .done(function (response) {
                    if (response.success) {
                        location.reload();
                    }
                })
                .fail(console.log);
            }
        }, function (error) {
            console.log(JSON.stringify(error, undefined, 2));
        });
    });
}

function checkLoginState() {
    FB.getLoginStatus(function (response) {
        if (response.status === 'connected') {
            facebookUser = {
                isLoggedIn: true,
                authToken: response.authResponse.accessToken
            }
        }
    });
}

window.fbAsyncInit = function () {
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
        accessToken: accessToken
    })
    .done(function (response) {
        if (response.success) {
            location.reload();
        }
    })
    .fail(console.log);
}

function signInListener() {
    $('#signin').submit(function (event) {
        event.preventDefault();
        var data = {
            'zc_login_user_name': $('#zc_login_user_name').val(),
            'zc_login_password': $('#zc_login_password').val()
        };
        $.post(base_url + 'users/remote_signin', data, null, 'json')
        .done(function (response) {
            if (response.error.occurred === true) {
                if (isMobileVariable) {
                    $('#error-message').text(response.error.message);
                    $('#error-popup').popup('open', {
                        transition: 'pop'
                    });
                }
                else {
                    bootstrapError(response.error.message);
                }
            }
            else {
                location.reload();
            }
        })
        .fail(function () {
            var message = 'Log in failed, please try again...';
            if (isMobileVariable) {
                $('#error-message').text(message);
                $('#error-popup').popup('open', {
                    transition: 'pop'
                });
            } else {
                bootstrapError(message);
            }
        });
    });
}

$(document).ready(function () {
    gapi.load('auth2', function () {
        auth2 = gapi.auth2.init({
            client_id: '315597152419-ustu5t4je8o87mfmq4v5koltq673lgg1.apps.googleusercontent.com',
            cookiepolicy: 'single_host_origin'
        });
        attachSignin(document.getElementById('google_login_button'));
    });
    $('#facebook_login_button').click(function () {
        if (facebookUser.isLoggedIn) {
            facebookLogin(facebookUser.authToken);
        } else {
            FB.login(function () {
                FB.getLoginStatus(function (response) {
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
    $('#linkedin_login_button').click(function () {
        window.open($('#form-root').data('linkedin-url'), 'linkedinAuth', 'height=450, width=550, top=' + ($(window).height() / 2) + ', left=' + ($(window).width() / 2 - 225) + ', toolbar=0, location=0, menubar=0, directories=0, scrollbars=0');
        return false;
    });
    signInListener();
});