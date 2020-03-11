function init_onboard_venue($object)
{
    clearMainModal();
    $("#mainModal").on("shown.bs.modal", function()
    {
        $("#mainModal").on("hidden.bs.modal", function()
        {
            $("#mainModal").off("shown.bs.modal");
        });
    });
    $("#modal_slide_up_content").load(base_url + country_lang_url + '/common_protected/modal_onboard_venue/' + $object.data("id"), function()
    {
        $("#mainModal").modal('show');
        verticallyCenterModal();
        activate_onboard_modal_listeners();
        cancelButtonListener();
    });
}

function activate_onboard_modal_listeners()
{
    $(".zc_user_phone_number").intlTelInput({ initialCountry: "gb" });
    if (!$(".zc_user_phone_number").intlTelInput("isValidNumber"))
    {
        $(".zc_user_phone_number").intlTelInput({ initialCountry: locale_code });
        if (!$(".zc_user_phone_number").intlTelInput("isValidNumber"))
        {
            $(".zc_user_phone_number").intlTelInput("setCountry", locale_code);
        }
    }
    $("#onboard_update").click(function()
    {
        var data = {
            id: $(this).data('venueid'),
            agree_to_list: +$("#zc_agree_to_list").is(":checked")
        };
        $.ajax({
            url: base_url + "api/v1/venues",
            data: data,
            dataType: "json",
            type: "PUT",
            statusCode: {
                200: function() {
                    enableModalButton($(this));
                },
                405: function(err) {
                    bootstrapError(err.responseJSON);
                },
                409: function(err) {
                    bootstrapError(err.responseJSON);
                }
            },
            error: function()
            {
                bootstrapError("There was a general error while updating the field.");
            }
        });
    });
    $(".onboard_user_update").click(function()
    {
        disableModalButton($(this));
        var errorMessage = '';
        if (!checkContactDetails($(this).data('venueuserid')))
        {
            errorMessage = "the user details fields are filled in";
        }
        else if ($("#zc_user_phone_number_" + $(this).data('venueuserid')).val() != '' && !validContactNumber($("#zc_user_phone_number_" + $(this).data('venueuserid'), $(this).data('venueuserid'))))
        {
            errorMessage = "the phone number is correct";
        }
        else if ($("#zc_user_password_" + $(this).data('venueuserid')).val() == "" || $("#zc_user_password_confirmation_" + $(this).data('venueuserid')).val() == "")
        {
            errorMessage = "both password fields are filled in";
        }
        if (errorMessage == '')
        {
            var data = {
                id: $("#zc_user_id_" + $(this).data('venueuserid')).val(),
                Fname: $("#zc_first_name_" + $(this).data('venueuserid')).val(),
                Lname: $("#zc_last_name_" + $(this).data('venueuserid')).val(),
                email: $("#zc_email_address_" + $(this).data('venueuserid')).val(),
                phnum: $("#zc_user_phone_number_" + $(this).data('venueuserid')).intlTelInput("getNumber", intlTelInputUtils.numberFormat.INTERNATIONAL),
                password: $("#zc_user_password_" + $(this).data('venueuserid')).val(),
                password_confirmation: $("#zc_user_password_confirmation_" + $(this).data('venueuserid')).val()
            };
            $.ajax({
                url: base_url + "api/v1/users/onboardvenueusers",
                data: data,
                dataType: "json",
                type: "PUT",
                statusCode: {
                    200: function() {
                        enableModalButton($(this));
                    },
                    405: function(err) {
                        bootstrapError(err.responseJSON);
                    },
                    409: function(err) {
                        bootstrapError(err.responseJSON);
                    }
                },
                error: function()
                {
                    bootstrapError("There was a general error while updating the field.");
                }
            });
        }
        else
        {
            enableModalButton($(this));
            bootstrapError("Please ensure " + errorMessage + ".");
        }
    });
}

function checkContactDetails(venueUserID)
{
    return checkName($('#zc_first_name_' + venueUserID).val(), $('#zc_last_name_' + venueUserID).val(), venueUserID) && checkEmail($('#zc_email_address_' + venueUserID).val(), venueUserID);
}

function checkName(firstName, lastName, venueUserID)
{
    var pass = true;
    if (firstName === "")
    {
        $('#Econtact_first_name_' + venueUserID).show();
        $('#zc_first_name_' + venueUserID).addClass('has-error');
        pass = false;
        $('#zc_first_name_' + venueUserID).change(function()
        {
            $('#zc_first_name_' + venueUserID).removeClass('has-error');
            $('#Econtact_first_name_' + venueUserID).hide();
        });
    }
    if (lastName === "")
    {
        $('#Econtact_last_name_' + venueUserID).show();
        $('#zc_last_name_' + venueUserID).addClass('has-error');
        pass = false;
        $('#zc_last_name_' + venueUserID).change(function()
        {
            $('#zc_last_name_' + venueUserID).removeClass('has-error');
            $('#Econtact_last_name_' + venueUserID).hide();
        });
    }
    if (firstName !== "" && lastName !== "")
    {
        $('#Econtact_first_name_' + venueUserID).hide();
        $('#Econtact_last_name_' + venueUserID).hide();
    }
    return pass;
}

function checkEmail(email, venueUserID)
{
    var pass = true;
    var emailReg = /^([a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?)?$/;
    if (email !== "" && emailReg.test(email.toLowerCase()))
    {
        $('#Econtact_email_' + venueUserID).hide();
    }
    else
    {
        pass = false;
        $('#Econtact_email_' + venueUserID).show();
        $('#email_' + venueUserID).addClass('has-error');
        $('#zc_email_address_' + venueUserID).change(function()
        {
            $('#email_' + venueUserID).removeClass('has-error');
            $('#Econtact_email_' + venueUserID).hide();
        });
    }
    return pass;
}

function validContactNumber(phoneNumber, venueUserID)
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
        $('#phone_' + venueUserID).addClass('has-error');
        $('#zc_user_phone_number_' + venueUserID).change(function()
        {
            $('#phone_' + venueUserID).removeClass('has-error');
            $('#Econtact_phone_' + venueUserID).hide();
        });
        $('#Econtact_phone_' + venueUserID).text(errMsg);
        $('#Econtact_phone_' + venueUserID).show();
   }
   return pass;
}
