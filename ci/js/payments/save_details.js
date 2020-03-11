$(document).ready(function()
{
    saveDetailsClickListener();
    setTagCookie();
    // mixpanel.track("Save Password Page");
});

function saveDetailsClickListener()
{
    $("#zc_create_account_button").click(function()
    {
        saveDetails();
    });
    $("#not_this_time").click(function()
    {
        notThisTime();
    });
}

function saveDetails()
{
    var errorMessage = '';
    var password = $("#zc_create_account_password").val();
    var password_confirmation = $("#zc_create_account_password_confirmation").val();
    if (password === '')
    {
        errorMessage = "you enter a password";
    }
    else if (password_confirmation === '')
    {
        errorMessage = "you enter a password confirmation";
    }
    else if (password != password_confirmation)
    {
        errorMessage = "your password and password confirmation fields match";
    }
    if (errorMessage === '')
    {
        var data = {
            password: password,
            password_confirmation: password_confirmation,
            token: token
        };
        submitAction(data);
    }
    else
    {
        if (mobileSite)
        {
            $('#error-message').text("Please ensure " + errorMessage + ".");
            $('#error-popup').popup('open', {
                transition: "pop"
            });
        }
        else
        {
            bootstrapError("Please ensure " + errorMessage + ".");
        }
    }
}

function notThisTime()
{
    relocateToConfirmation();
}

function submitAction(data)
{
    disableButton();
    savePassword(data);
}

function savePassword(data)
{
    $.post(base_url + country_lang_url + "/api_json/Password_Update/" + reservation.booker_id, data, null, "json"
    ).done(function(response)
    {
        if (response.error.occurred === true)
        {
            enableButton();
            if (mobileSite)
            {
                $('#error-message').text("Server error - " + response.error.message);
                $('#error-popup').popup('open', {
                    transition: "pop"
                });
            }
            else
            {
                bootstrapError("Server error - " + response.error.message);
            }
        }
        else
        {
            postLogin(data);
        }
    }).fail(function()
    {
        enableButton();
        var message = "Ajax call failed, please try again and contact Zipcube if you continue experiencing problems.";
        if (mobileSite)
        {
            $('#error-message').text(message);
            $('#error-popup').popup('open', {
                transition: "pop"
            });
        }
        else
        {
            bootstrapError(message);
        }
    });
}

function postLogin(data)
{
    var info = {
        zc_login_user_name: reservation.client_email,
        zc_login_password: data.password
    };
    $.post(base_url + "users/remote_signin", info, null, "json"
    ).done(function(response)
    {
        if (response.error.occurred === true)
        {
            enableButton();
            if (mobileSite)
            {
                $('#error-message').text(response.error.message);
                $('#error-popup').popup('open', {
                    transition: "pop"
                });
            }
            else
            {
                bootstrapError(response.error.message);
            }
        }
        else
        {
            relocateToConfirmation();
        }
    }).fail(function()
    {
        enableButton();
        var message = 'Network error. Please wait a few minutes and try again. Thank you.';
        if (mobileSite)
        {
            $('#error-message').text(message);
            $('#error-popup').popup('open', {
                transition: "pop"
            });
        }
        else
        {
            bootstrapError(message);
        }
    });
}

function relocateToConfirmation()
{
    window.location.href = base_url + country_lang_url + '/booking-confirmed?reservation_id=' + reservation.id + '&asset_id=' + reservation.asset_id + passThroughVariables();
}

function passThroughVariables()
{
    var retString = '';
    if (isWidget)
    {
        retString = "&widget=1";
    }
    return retString;
}

function disableButton()
{
    $('#not_this_time').hide();
    $('#zc_create_account_button').hide();
    $('#zc_create_account_button').prop('disabled', true);
    $('body').css('cursor', 'wait');
    $('#confirm_loading').append('<img src="/images/loading.gif">');
    $('#confirm_loading').toggleClass('hide');
}

function enableButton()
{
    $('#zc_create_account_button').val('Try Again!');
    $('#not_this_time').show();
    $('#zc_create_account_button').show();
    $('#zc_create_account_button').prop('disabled', false);
    $('body').css('cursor', 'pointer');
    $('#confirm_loading').hide();
    $('#confirm_loading').empty();
}

function setTagCookie()
{
    if (typeof $.cookie('user_reservation_ids') != 'undefined')
    {
        var cvalue = '';
        var resArr = $.cookie('user_reservation_ids').split(',');
        if (resArr.indexOf(zc_reservation_id) === -1)
        {
            var cvalue = ',' + zc_reservation_id;
        }
        $.cookie('user_reservation_ids', $.cookie('user_reservation_ids') + cvalue, { expires: 365, path: '/' });
    }
    else
    {
        $.cookie('user_reservation_ids', zc_reservation_id, { expires: 365, path: '/' });
    }
}