$(document).ready(function()
{
    loadLang(['users']).then(function (language) {
        $("#zc_create_account_button").click(function()
        {
            saveDetails(language);
        });
    });
});

function saveDetails(language)
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
        submitAction(data, language);
    }
    else
    {
        bootstrapError("Please ensure " + errorMessage + ".");
    }
}

function submitAction(data, language)
{
    disableButton();
    savePassword(data, language);
}

function savePassword(data, language)
{
    $.post(base_url + country_lang_url + "/api_json/Password_Update/" + userId, data, null, "json"
    ).done(function(response)
    {
        if (response.error.occurred === true)
        {
            enableButton();
            bootstrapError("Server error - " + response.error.message);
        }
        else
        {
            postLogin(data, language);
        }
    }).fail(function()
    {
        enableButton();
        bootstrapError("Ajax call failed, please try again and contact Zipcube if you continue experiencing problems.");
    });
}

function postLogin(postData, language)
{
    var data = {
        zc_login_user_name: $('#user_email').text(),
        zc_login_password: postData.password
    };
    $.post(base_url + "users/remote_signin", data, null, "json"
    ).done(function(response)
    {
        if (response.error.occurred === true)
        {
            enableButton();
            bootstrapError(response.error.message);
        }
        else
        {
            settingSuccess(language);
            bootstrapSuccess('Congratulatons you have added a password to your account.');
        }
    }).fail(function()
    {
        enableButton();
        bootstrapError('Network error. Please wait a few minutes and try again. Thank you.');
    });
}

function disableButton()
{
    $('#zc_create_account_button').hide();
    $('#zc_create_account_button').prop('disabled', true);
    $('body').css('cursor', 'wait');
    $('#confirm_loading').append('<img src="/images/loading.gif">');
    $('#confirm_loading').toggleClass('hide');
}

function enableButton()
{
    $('#zc_create_account_button').val('Try Again!');
    $('#zc_create_account_button').show();
    $('#zc_create_account_button').prop('disabled', false);
    $('body').css('cursor', 'pointer');
    $('#confirm_loading').hide();
    $('#confirm_loading').empty();
}

function settingSuccess(language)
{
    $('body').css('cursor', 'pointer');
    $('#confirm_loading').html(language.users.users_set_password_success);
    $('#zc_create_account_password_enc').remove();
    $('#zc_create_account_password_conf_enc').remove();
    $('#zc_create_account_button_enc').remove();
}