/* global auth2 ConfirmationClass FB */

var confotron = ConfirmationClass;

var facebookUser = {
    isLoggedIn: false
};

function attachSignin(element) {
    if (element) {
        auth2.attachClickHandler(element, {}, function (googleUser) {
            if (typeof googleUser !== 'undefined') {
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
    }
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

function cardTypeListener() {
    $('#braintree_card_number').change(function () {
        $('span.card').each(function () {
            $(this).find('.card_overlay').addClass('card_overlay__opaque');
        });
        var type = $.payment.cardType($(this).val());
        switch (type) {
            case 'mastercard':
                $('span.card').each(function () {
                    $(this).find('.card_overlay').addClass('card_overlay__opaque');
                });
                $('.site-card-mastercard').find('.card_overlay').removeClass('card_overlay__opaque');
            break;

            case 'amex':
                $('.site-card-amex').find('.card_overlay').removeClass('card_overlay__opaque');
            break;

            default:
                $('.site-card-visa').find('.card_overlay').removeClass('card_overlay__opaque');
            break;
        }
    });
}

function promoCodeListener() {
    $('#promo_code_submit').click(function () {
        promoCodeError();
    });
}

function promoCodeError() {
    $('#Epromo_code').show();
    setTimeout(function (){
        $('#Epromo_code').fadeOut('slow');
    }, 3000);
}

function formValidation() {
    $('#first_name').change(function () {
        $('#firstName').removeClass('has-error');
        $('#Econtact_name').hide();
    });
    $('#last_name').change(function () {
        $('#lastName').removeClass('has-error');
        $('#Econtact_name').hide();
    });
    $('#email').change(function () {
        $('#email_container').removeClass('has-error');
        $('#Econtact_email').hide();
    });
    $('#phone_number').change(function () {
        $('#phone').removeClass('has-error');
        $('#Econtact_phone').hide();
    });
    $('body').click(function () {
        if ($("input[name='roomconf']").prop('checked')) {
            $('#Eroomconf').hide();
        }
    });
    $('#braintree_card_number').change(function () {
        $('#card_number').removeClass('has-error');
        $('#Ebtree_card_number').hide();
    });
    $('#braintree_card_month').change(function () {
        $('#expiry-selector').removeClass('has-error');
        $('#Ebtree_exp_date').hide();
    });
    $('#braintree_card_year').change(function () {
        $('#expiry-selector').removeClass('has-error');
        $('#Ebtree_exp_date').hide();
    });
}

function showAttendeeForm() {
    $('input[name=other-attendee]:radio').click(function () {
        if ($('#no').is(':checked')) {
            $('.other-attendee-wrapper').removeClass('hide');
        } else {
            $('.other-attendee-wrapper').addClass('hide');
        }
    });
}

function securityCodeTooltip() {
    $('[data-toggle="tooltip"]').tooltip();
}

function showCommentTextBox(language) {
    $('#add-comments-link').click(function () {
        $('#comments-text-area').toggleClass('hide');
        $('#add-comments-link').text($('#add-comments-link').text() == '+ ' + language.payments.payments_index_form_event_add_comments ? '- ' + language.payments.payments_index_form_event_add_comments : '+ ' + language.payments.payments_index_form_event_add_comments);
    });
}

function attachAutoNamer() {
    $('#first_name').change(function () {
        updateCreditCardName();
    });
    $('#last_name').change(function () {
        updateCreditCardName();
    });
}

function attachPhoneHelper() {
    $('.zc_user_phone_number').intlTelInput({ initialCountry: locale_code });
    if (!$('.zc_user_phone_number').intlTelInput('isValidNumber')) {
        $('.zc_user_phone_number').intlTelInput('setCountry', locale_code);
    }
}

function updateCreditCardName() {
    $('#braintree_card_name').val($('#first_name').val() + ' ' + $('#last_name').val());
}

function preliminary_form_submit() {
    if (flag == 1) {
        if (payment_method_value === 'braintree') {
            $('#payment_method').val('braintree');
            var client = new braintree.api.Client({ clientToken: braintree_client_token });
            var card_number = $('#braintree_card_number').val();
            var card_name = $('#braintree_card_name').val();
            var expiry_month = $('#braintree_card_month').val();
            var expiry_year = $('#braintree_card_year').val();
            client.tokenizeCard({
            number: card_number,
            cardholderName: card_name,
            expirationMonth: expiry_month,
            expirationYear: expiry_year
            }, function (err, nonce) {
                if (err === null) {
                    $('#braintree_nonce').val(nonce);
                    final_form_submit('Braintree');
                } else {
                    bootstrapError('Network error. Please wait a few minutes and try again. Thank you.');
                    $('#book_button').prop('disabled', false);
                }
            });
        } else if (payment_method_value === 'paypal') {
            $('#payment_method').val('braintree');
            $('#braintree_nonce').val(jQuery('#paypal_nonce').val());
            final_form_submit('Paypal_Braintree');
        } else {
            $('#payment_method').val('admin');
            final_form_submit('Admin');
        }
    }
}

function loginFormListener() {
    if ($('#zc_login_user_name').focus() || $('#zc_login_password').focus()) {
        $('#login_form_container').keypress(function (event) {
            if (event.keyCode === 13) {
                postLogin();
            }
        });
    }
    $('#zc_login_button').click(function () {
        postLogin();
    });
}

function postLogin() {
    var data = {
        zc_login_user_name: $('#zc_login_user_name').val(),
        zc_login_password: $('#zc_login_password').val()
    };
    $.post('users/remote_signin', data, null, 'json')
    .done(function (response) {
        if (response.error.occurred === true) {
            bootstrapError(response.error.message);
        } else {
            var user = response.data;
            $('.zc_user_first_name').val(user.first_name);
            $('.zc_user_last_name').val(user.last_name);
            $('.zc_user_email').val(user.email);
            $('.zc_user_email').prop('readonly', true);
            $('.zc_user_phone_number').val(user.phone_number);
            $('.zc_login_prompt').hide();
            updateCreditCardName();
            userIsLoggedIn = true;
            client_id = user.id;
            postDiscount();
        }
    })
    .fail(function () {
        bootstrapError('Network error. Please wait a few minutes and try again. Thank you.');
    });
}

function postDiscount() {
    var data = {
        asset_id: confotron.assetId,
        start: confotron.start,
        end: confotron.finish,
        slots: confotron.slots
    };
    $.ajax({
        url: base_url + "api/v1/users/discount",
        data: data,
        dataType: "json",
        type: "GET",
        statusCode: {
            200: function(response) {
                if (typeof response != 'undefined' && response.length)
                {
                    response = JSON.parse(response);
                    if (response.data.enabled) {
                        $('#discount_wrapper').removeClass('hide');
                        $('#discount_percent').html(Number(response.data.discount).toFixed(2) + '%');
                        confotron.basePrice = response.data.new_price;
                        confotron.setPrice(response.data.new_price);
                        confotron.updatePrices(response.data.new_price);
                    }
                }
            },
            403: function(err) {
                bootstrapError(err.responseJSON);
            },
            405: function(err) {
                bootstrapError(err.responseJSON);
            }
        },
        error: function()
        {
            bootstrapError("Failed at finding the user discount.");
        }
    });
}

$(document).ready(function () {
    if (typeof gapi !== 'undefined') {
        gapi.load('auth2', function () {
            auth2 = gapi.auth2.init({
                client_id: '315597152419-ustu5t4je8o87mfmq4v5koltq673lgg1.apps.googleusercontent.com',
                cookiepolicy: 'single_host_origin'
            });
            attachSignin(document.getElementById('google_login_button'));
        });
    }
    if ($('#facebook_login_button').length) {
        $('#facebook_login_button').click(function () {
            if (facebookUser.isLoggedIn) {
                facebookLogin(facebookUser.authToken);
            } else {
                FB.login(function (res) {
                    facebookLogin(res.authResponse.accessToken);
                }, { scope: 'email,public_profile' });
            }
        });
    }
    if ($('#linkedin_login_button').length) {
        $('#linkedin_login_button').click(function () {
            window.open($('#form-root').data('linkedin-url'), 'linkedinAuth', 'height=450, width=550, top=' + ($(window).height() / 2) + ', left=' + ($(window).width() / 2 - 225) + ', toolbar=0, location=0, menubar=0, directories=0, scrollbars=0');
            return false;
        });
    }
    loadLang(['payments']).then(function (language) {
        confotron.init(braintree_client_token, reservation, isWidget, _r_jt);
        attachPhoneHelper();
        $('#braintree_card_number').payment('formatCardNumber');
        cardTypeListener();
        attachAutoNamer();
        // loginFormListener();
        if (!mobileSite) {
            securityCodeTooltip();
        }
        showAttendeeForm();
        formValidation();
        showCommentTextBox(language);
        promoCodeListener();
        postDiscount();
    });
});