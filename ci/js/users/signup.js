
var googleUser = {};

var facebookUser = {
    isLoggedIn: false
};

function attachSignin(element) {
    auth2.attachClickHandler(element, {}, function (googleUser) {
        var profile = googleUser.getBasicProfile();
        var idToken = googleUser.getAuthResponse().id_token;
        $.post('/api/v1/auth/google', {
            id_token: idToken,
            id: profile.getId()
        })
        .done(function (response) {
            if (response.success) {
                location.reload();
            }
        })
        .fail(console.log);
    }, function (error) {
        console.log(JSON.stringify(error, undefined, 2));
    });
}

function statusChangeCallback(response) {
    if (response.status === 'connected') {
        facebookLogin(response.authResponse.accessToken);
    } else {
        FB.login(function (res) {
            facebookLogin(res.authResponse.accessToken);
        }, { scope: 'email,public_profile' });
    }
}

function checkLoginState() {
    FB.getLoginStatus(function (response) {
        statusChangeCallback(response);
    });
}

window.fbAsyncInit = function () {
    FB.init({
        appId: '286304788451093',
        cookie: true,
        xfbml: true,
        version: 'v2.8'
    });
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

function signupPost() {
    $('#submit_button').hide();
    $('#loader-container').show();
    var data = {
        first_name: $('#first_name').val(),
        last_name: $('#last_name').val(),
        email: $('#user_email').val(),
        password: $('#password').val(),
        confirmpassword: $('#confirmpassword').val(),
        ga_id: $('#ga_id').val()
    };
    $.post('/users/new_signup', data, null, 'json')
    .done(function (response) {
        if (response.error.occurred === true) {
            $('#submit_button').show();
            $('#loader-container').hide();
            if (isMobileVariable) {
                $('#error-message').text(response.error.message);
                $('#error-popup').popup('open', {
                    transition: 'pop'
                });
            } else {
                bootstrapError(response.error.message);
            }
        } else {
            location.reload();
        }
    })
    .fail(function (response) {
        var message = 'Failed for some reason - ' + response.error.message + '.';
        $('#submit_button').show();
        $('#loader-container').hide();
        if (isMobileVariable) {
            $('#error-message').text(message);
            $('#error-popup').popup('open', {
                transition: 'pop'
            });
        } else {
            bootstrapError(message);
        }
    });
}

function checkDetailFields() {
    var namePassed = checkName($('#first_name').val(), $('#last_name').val());
    var emailPassed = checkEmail($('#user_email').val());
    var passPassed = checkPasswords($('#password').val(), $('#confirmpassword').val());
    return namePassed && emailPassed && passPassed;
}

function checkName(firstName, lastName) {
    var pass = true;
    var message = 'Please enter a valid first name and last name.';
    if (firstName === '' || lastName === '') {
        if (isMobileVariable) {
            $('#error-message').text(message);
            $('#error-popup').popup('open', {
                transition: 'pop'
            });
        } else {
            bootstrapError(message);
        }
        pass = false;
    }
    return pass;
}

function checkEmail(email) {
    var pass = true;
    var message = 'Please enter a valid email address.';
    if (email === '' || typeof email === 'undefined') {
        if (isMobileVariable) {
            $('#error-message').text(message);
            $('#error-popup').popup('open', {
                transition: 'pop'
            });
        } else {
            bootstrapError(message);
        }
        pass = false;
    }
    return pass;
}

function checkPasswords(password, confirmPassword) {
    var pass = true;
    var message = 'Please enter a valid password and ensure both passwords match.';
    if (password === '' || confirmPassword === '' || password !== confirmPassword) {
        if (isMobileVariable) {
            $('#error-message').text(message);
            $('#error-popup').popup('open', {
                transition: 'pop'
            });
        } else {
            bootstrapError(message);
        }
    }
    return pass;
}

function attachSocialSignupListeners() {
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
}

$(document).ready(function () {
    if (typeof ga != 'undefined') {
        ga(function (tracker) {
            var clId = tracker.get('clientId');
            $('#ga_id').val(clId);
        });
    }
    attachSocialSignupListeners();
    $('#signup').submit(function (event) {
        event.preventDefault();
        signupPost();
    });
});