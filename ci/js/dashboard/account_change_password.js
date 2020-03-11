$(document).ready(function()
{
    $("#zc_change_password_submit").click(function()
    {
        validateFormData();
    });
});

function validateFormData()
{
    var errorMessage = '';
    var old_password = $("#zc_old_password").val();
    var password = $("#zc_new_password").val();
    var password_confirmation = $("#zc_new_password_confirmation").val();
    if (password === '')
    {
        errorMessage = "you enter a new password";
    }
    else if (password_confirmation === '')
    {
        errorMessage = "you confirm your new password";
    }
    else if (password != password_confirmation)
    {
        errorMessage = "your password and password confirmation fields match";
    }
    if (errorMessage === '')
    {
        var data = {
            old_password: old_password,
            password: password,
            password_confirmation: password_confirmation
        };
        submitAction(data);
    }
    else
    {
        bootstrapError("Please ensure " + errorMessage + ".");
    }
}

function submitAction(data)
{
    disableButton();
    ajaxPost(data);
}

function ajaxPost(data)
{
    $.post(base_url + country_lang_url + "/api_json/Password_Update/" + user.id, data, null, "json"
    ).done(function(response)
    {
        if (response.error.occurred === true)
        {
            enableButton(true);
            bootstrapError("Server error - " + response.error.message);
        }
        else
        {
            clearForm();
        }
    }).fail(function()
    {
        enableButton();
        bootstrapError("Ajax call failed, please try again and contact Zipcube if you continue experiencing problems.");
    });
}

function disableButton()
{
    $('#zc_change_password_submit').hide();
    $('#zc_change_password_submit').prop('disabled', true);
    $('html').css('cursor', 'wait');
    if ($('#loader').length)
    {
        $('#loader').show();
    }
    else
    {
        $('.panel-footer').append('<img id="loader" src="/images/loading.gif">');
    }
}

function enableButton(error)
{
    if (error)
    {
        $('#zc_change_password_submit').val('Try Again!');
    }
    $('#zc_change_password_submit').show();
    $('#loader').hide();
    $('#zc_change_password_submit').prop('disabled', false);
    $('html').css('cursor', 'pointer');
}

function clearForm()
{
    $("#zc_old_password").val('');
    $("#zc_new_password").val('');
    $("#zc_new_password_confirmation").val('');
    $('#success').removeClass('hide');
    enableButton(false);
}