$(document).ready(function()
{
    clickListener();
    formValidation();
    onInputFocus();
    attachPhoneHelper();
    uploadProfileImg();
});

function clickListener()
{
    $("#zc_update_profile_submit").click(function()
    {
        getFormData();
    });
}

function onInputFocus()
{
    $('#email').focus(function()
    {
        $('#email_confirmation_input').removeClass('hide');
    });
}

function attachPhoneHelper()
{
    $("#phone_number").intlTelInput({ initialCountry: locale_code });
    if (!$("#phone_number").intlTelInput("isValidNumber"))
    {
        $("#phone_number").intlTelInput("setCountry", locale_code);
    }
}

function formValidation()
{
    $('#first_name').change(function()
    {
        $('#firstName').removeClass('has-error');
        $('#Econtact_name').hide();
    });
    $('#last_name').change(function()
    {
        $('#lastName').removeClass('has-error');
        $('#Econtact_name').hide();
    });
    $('#email').change(function()
    {
        $('#email_container').removeClass('has-error');
        $('#Econtact_email').hide();
    });
    $('#phone_number').change(function()
    {
        $('#phone').removeClass('has-error');
        $('#Econtact_phone').hide();
    });
}

function getFormData()
{
    var data = {
        first_name: $("#first_name").val().trim(),
        last_name: $("#last_name").val().trim(),
        email: $("#email").val().trim(),
        phone_number: $("#phone_number").intlTelInput("getNumber", intlTelInputUtils.numberFormat.INTERNATIONAL).trim()
    };
    validateFormData(data);
}

function validateFormData(data)
{
    var emailPassed = checkEmail(data.email);
    if (!emailPassed)
    {
        bootstrapError("Please check the Email field and try again.");
        return;
    }
    var email_confirmation = $("#email_confirmation").val().trim() || data.email;
    var emailConfirmed = confirmEmail(data.email, email_confirmation);
    if (!emailConfirmed)
    {
        bootstrapError("Please check the Confirm Email Address field and try again.");
        return;
    }
    var namePassed = checkName(data.first_name, data.last_name);
    if (!namePassed)
    {
        bootstrapError("Please check the First name and Last name fields and try again.");
        return;
    }
    var phonePassed = captureContactNumber($("#phone_number"));
    if (!phonePassed)
    {
        bootstrapError("Please check your details and try again.");
        return;
    }
    if (emailPassed && emailConfirmed && namePassed && phonePassed)
    {
        submitAction(data);
    }
    else
    {
        bootstrapError("Please check all your details and try again.");
    }
}

function confirmEmail(email, emailConfirmation)
{
    var pass = false;
    if (email == emailConfirmation)
    {
        pass = true;
    }
    return pass;
}

function checkEmail(email)
{
    var pass = true;
    var emailReg = /^([a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?)?$/;
    if (email !== "" && emailReg.test(email.toLowerCase()))
    {
        $('#Econtact_email').hide();
    }
    else
    {
        pass = false;
        $('#email_container').addClass('has-error');
        $('#Econtact_email').show();
    }
    return pass;
}

function checkName(first_name, last_name)
{
    var pass = true;
    if (first_name === "" || last_name === "")
    {
        $('#firstName').addClass('has-error');
        $('#lastName').addClass('has-error');
        $('#Econtact_name').show();
        pass = false;
    }
    else
    {
        $('#Econtact_name').hide();
    }
    return pass;
}

function captureContactNumber(phoneNumber)
{
    var pass = false;
    if (phoneNumber.intlTelInput("isValidNumber"))
    {
        pass = true;
    }
    else
    {
        var error = phoneNumber.intlTelInput("getValidationError");
        var errMsg;
        switch(error)
        {
            case intlTelInputUtils.validationError.IS_POSSIBLE:

                errMsg = 'Your contact number is invalid';
            break;

            case intlTelInputUtils.validationError.INVALID_COUNTRY_CODE:

                errMsg = 'Your country code is invalid';
            break;

            case intlTelInputUtils.validationError.TOO_SHORT:

                errMsg = 'Your contact number is too short';
            break;

            case intlTelInputUtils.validationError.TOO_LONG:

                errMsg = 'Your contact number is too long';
            break;

            case intlTelInputUtils.validationError.NOT_A_NUMBER:

                errMsg = 'Your value is not a number';
            break;

            default:

                errMsg = 'Please enter a valid contact number';
            break;
        }
        $('#phone').addClass('has-error');
        $('body').scrollTop(0);
        $('#Econtact_phone').text(errMsg);
        $('#Econtact_phone').show();
    }
    return pass;
}

function submitAction(data)
{
    disableButton();
    ajaxPost(data);
}

function ajaxPost(data)
{
    data = addNeverBounceStatusField(data, $('input[name="nb-result"]'));
    $.post(base_url + country_lang_url + "/api_json/User_Info_Update/" + user.id, data, null, "json"
    ).done(function(response)
    {
        if (response.error.occurred === true)
        {
            enableButton(true);
            bootstrapError("Server error - " + response.error.message);
        }
        else
        {
            $('#success').removeClass('hide');
            enableButton(false);
        }
    }).fail(function()
    {
        enableButton(true);
        bootstrapError("Ajax call failed, please try again and contact Zipcube if you continue experiencing problems.");
    });
}

function disableButton()
{
    $('#zc_update_profile_submit').hide();
    $('#zc_update_profile_submit').prop('disabled', true);
    $('html').css('cursor', 'wait');
    $('#loader').show();
}

function enableButton(error)
{
    if (error)
    {
        $('#zc_update_profile_submit').val('Try Again!');
    }
    $('#zc_update_profile_submit').show();
    $('#loader').hide();
    $('#zc_update_profile_submit').prop('disabled', false);
    $('html').css('cursor', 'pointer');
}

function uploadProfileImg()
{
    $(".zc_user_photo_upload").click(function()
    {
        $("#zc_upload").trigger("click");
    });
    $("#zc_upload").change(function()
    {
        var formData = new FormData();
        formData.append("upload_image", $("#zc_upload")[0].files[0]);
        formData.append("user", user.id);
        $.ajax({
            url: base_url + "api/v1/images",
            data: formData,
            processData: false,
            contentType: false,
            dataType: "json",
            type: "POST",
            success: function(response) {
                if (response)
                {
                    $("#zc_user_profile_img").attr('src', response);
                }
            },
            error: function(response)
            {
                bootstrapError(response.responseJSON);
            }
        });
    });
}
