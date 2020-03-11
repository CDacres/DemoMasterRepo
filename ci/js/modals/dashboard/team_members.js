function init_modal_add_team_member($object)
{
    clearMainModal();
    $("#mainModal").on("shown.bs.modal", function()
    {
        $("#mainModal").on("hidden.bs.modal", function()
        {
            $("#mainModal").off("shown.bs.modal");
        });
    });
    $("#modal_slide_up_content").load(base_url + country_lang_url + '/common_protected/modal_add_team_member/' + $object.data("assetid"), function()
    {
        $("#mainModal").modal('show');
        verticallyCenterModal();
        registerNeverBounceFields();
        activate_member_modal_listeners();
        cancelButtonListener();
        $("#add_member").click(function()
        {
            add_member($(this), $object.data("assetid"));
        });
    });
}

function init_modal_edit_member($object)
{
    clearMainModal();
    $("#mainModal").on("shown.bs.modal", function()
    {
        $("#mainModal").on("hidden.bs.modal", function()
        {
            $("#mainModal").off("shown.bs.modal");
        });
    });
    $("#modal_slide_up_content").load(base_url + country_lang_url + '/common_protected/modal_edit_member/' + $object.data("assetid") + '/' + $object.data("id"), function()
    {
        $("#mainModal").modal('show');
        verticallyCenterModal();
        activate_member_modal_listeners();
        cancelButtonListener();
        $("#edit_member").click(function()
        {
            edit_member($(this), $object.data("assetid"), $object.data("id"));
        });
    });
}

function activate_member_modal_listeners()
{
    $(".zc_user_phone_number").intlTelInput({ initialCountry: locale_code });
    if (!$(".zc_user_phone_number").intlTelInput("isValidNumber"))
    {
        $(".zc_user_phone_number").intlTelInput("setCountry", locale_code);
    }
    $('#venue_options').hide();
    $('#password_fields').hide();
    $('#reset_pass').hide();
    $('#change_pass').hide();
    $('.auth_select').click(function()
    {
        if ($('#venueadmin').is(':checked'))
        {
            $('#venue_options').show();
        }
        else
        {
            $('#venue_options').hide();
        }
    });
    if ($(".auth_select:checked").val() == 'venue')
    {
        $('#venue_options').show();
    }
    $('.pass_select').click(function()
    {
        if ($('#usermadepass').is(':checked'))
        {
            $('#password_fields').show();
        }
        else
        {
            $('#password_fields').hide();
        }
    });
    $("#reset_pass_btn").click(function()
    {
        $("#reset_pass").show();
    });
    $("#change_pass_btn").click(function()
    {
        $("#change_pass").show();
    });
}

function checkContactDetails()
{
    return checkName($('#zc_first_name').val(), $('#zc_last_name').val()) && checkEmail($('#zc_email_address').val());
}

function checkName(firstName, lastName)
{
    var pass = true;
    if (firstName === "")
    {
        $('#Econtact_first_name').show();
        $('#zc_first_name').addClass('has-error');
        pass = false;
        $('#zc_first_name').change(function()
        {
            $('#zc_first_name').removeClass('has-error');
            $('#Econtact_first_name').hide();
        });
    }
    if (lastName === "")
    {
        $('#Econtact_last_name').show();
        $('#zc_last_name').addClass('has-error');
        pass = false;
        $('#zc_last_name').change(function()
        {
            $('#zc_last_name').removeClass('has-error');
            $('#Econtact_last_name').hide();
        });
    }
    if (firstName !== "" && lastName !== "")
    {
        $('#Econtact_first_name').hide();
        $('#Econtact_last_name').hide();
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
        $('#Econtact_email').show();
        $('#email').addClass('has-error');
        $('#zc_email_address').change(function()
        {
            $('#email').removeClass('has-error');
            $('#Econtact_email').hide();
        });
    }
    return pass;
}

function validContactNumber(phoneNumber)
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
        $('#zc_user_phone_number').change(function()
        {
            $('#phone').removeClass('has-error');
            $('#Econtact_phone').hide();
        });
        $('#Econtact_phone').text(errMsg);
        $('#Econtact_phone').show();
   }
   return pass;
}

function add_member(button, assetId)
{
    disableModalButton(button);
    var errorMessage = '';
    if (!checkContactDetails())
    {
        errorMessage = "the user details fields are filled in";
    }
    else if ($("#zc_user_phone_number").val() != '' && !validContactNumber($('#zc_user_phone_number')))
    {
        errorMessage = "the phone number is correct";
    }
    else if ($(".pass_select:checked").val() == null)
    {
        errorMessage = "a password option is chosen";
    }
    else if ($(".pass_select:checked").val() == 'usermade' && ($("#zc_user_password").val() == "" || $("#zc_user_password_confirmation").val() == ""))
    {
        errorMessage = "both password fields are filled in";
    }
    else if ($(".auth_select:checked").val() == null)
    {
        errorMessage = "an authorisation option is chosen";
    }
    else if ($(".auth_select:checked").val() == 'venue' && $('.zc_venue_check:checked').length == 0)
    {
        errorMessage = "at least one venue is chosen";
    }
    if (errorMessage == '')
    {
        var data = {
            asset_id: assetId,
            first_name: $("#zc_first_name").val(),
            last_name: $("#zc_last_name").val(),
            email: $("#zc_email_address").val(),
            phone_number: $("#zc_user_phone_number").intlTelInput("getNumber", intlTelInputUtils.numberFormat.INTERNATIONAL)
        };
        if ($(".pass_select:checked").val() == 'generate')
        {
            data.generate_password = 1;
        }
        else if ($(".pass_select:checked").val() == 'usermade' && $("#zc_user_password").val() != "" && $("#zc_user_password_confirmation").val() != "")
        {
            data.password = $("#zc_user_password").val();
            data.password_confirmation = $("#zc_user_password_confirmation").val();
        }
        if ($(".auth_select:checked").val() == 'company')
        {
            data.company_admin = 1;
        }
        else if ($(".auth_select:checked").val() == 'venue')
        {
            data.venue_admin = 1;
            data.venues = [];
            $(".zc_venue_check").each(function()
            {
                if (this.checked)
                {
                    data.venues.push($(this).val());
                }
            });
        }
        data = addNeverBounceStatusField(data, $('input[name="nb-result"]'));
        $.post(base_url + country_lang_url + "/api_json/Asset_Team_Member", data, null, "json"
        ).done(function(response)
        {
            enableModalButton(button);
            if (response.error.occurred === true)
            {
                bootstrapError(response.error.message);
            }
            else
            {
                bootstrapSuccess('User successfully added');
                teamMember_refresh();
            }
        }).fail(function()
        {
            enableModalButton(button);
            bootstrapError('Failed at the member add stage.');
        });
    }
    else
    {
        enableModalButton(button);
        bootstrapError("Please ensure " + errorMessage + ".");
    }
}

function edit_member(button, assetId, userId)
{
    disableModalButton(button);
    var errorMessage = '';
    if (!checkContactDetails())
    {
        errorMessage = "the user details fields are filled in";
    }
    else if ($("#zc_user_phone_number").val() != '' && !validContactNumber($('#zc_user_phone_number')))
    {
        errorMessage = "the phone number is correct";
    }
    else if ($('#reset_pass').is(':visible') && $(".pass_select:checked").val() == null)
    {
        errorMessage = "a password option is chosen";
    }
    else if (($(".pass_select:checked").val() == 'usermade' && ($("#zc_user_password").val() == "" || $("#zc_user_password_confirmation").val() == "")) || (($("#zc_user_password").val() != "" && $("#zc_user_password_confirmation").val() == "") || ($("#zc_user_password").val() == "" && $("#zc_user_password_confirmation").val() != "")))
    {
        errorMessage = "both password fields are filled in";
    }
    else if ($('.auth_select').length > 0 && $(".auth_select:checked").val() == null)
    {
        errorMessage = "an authorisation option is chosen";
    }
    else if ($(".auth_select:checked").val() == 'venue' && $('.zc_venue_check:checked').length == 0)
    {
        errorMessage = "at least one venue is chosen";
    }
    if (errorMessage == '')
    {
        var data = {
            asset_id: assetId,
            first_name: $("#zc_first_name").val(),
            last_name: $("#zc_last_name").val(),
            email: $("#zc_email_address").val(),
            phone_number: $("#zc_user_phone_number").intlTelInput("getNumber", intlTelInputUtils.numberFormat.INTERNATIONAL)
        };
        if ($("#zc_old_password").val() != null && $("#zc_old_password").val() != "")
        {
            data.old_password = $("#zc_old_password").val();
            data.password = $("#zc_user_password").val();
            data.password_confirmation = $("#zc_user_password_confirmation").val();
        }
        else if ($(".pass_select:checked").val() == 'generate')
        {
            data.generate_password = 1;
        }
        else if ($(".pass_select:checked").val() == 'usermade' && $("#zc_user_password").val() != "" && $("#zc_user_password_confirmation").val() != "")
        {
            data.password = $("#zc_user_password").val();
            data.password_confirmation = $("#zc_user_password_confirmation").val();
        }
        if ($(".auth_select:checked").val() == 'company')
        {
            data.company_admin = 1;
        }
        else if ($(".auth_select:checked").val() == 'venue')
        {
            data.venue_admin = 1;
            data.venues = [];
            $(".zc_venue_check").each(function()
            {
                if (this.checked)
                {
                    data.venues.push($(this).val());
                }
            });
        }
        data = addNeverBounceStatusField(data, $('input[name="nb-result"]'));
        $.post(base_url + country_lang_url + "/api_json/Asset_Team_Member/" + userId, data, null, "json"
        ).done(function(response)
        {
            enableModalButton(button);
            if (response.error.occurred === true)
            {
                bootstrapError(response.error.message);
            }
            else
            {
                bootstrapSuccess('User successfully edited');
                teamMember_refresh();
            }
        }).fail(function()
        {
            enableModalButton(button);
            bootstrapError('Failed at the member editing stage.');
        });
    }
    else
    {
        enableModalButton(button);
        bootstrapError("Please ensure " + errorMessage + ".");
    }
}

function teamMember_refresh()
{
    closeMainModal();
    var listData = {
        option: 'all'
    };
    $.post(base_url + "dashboard/update_team_members_list", listData, null, "json"
    ).done(function(response)
    {
        if (response.error.occurred === true)
        {
            bootstrapError(response.error.message);
        }
        else
        {
            $('#zc_member_rows').empty();
            $('#zc_member_rows').append(response.data.html);
            attach_edit_member_modals();
        }
    }).fail(function()
    {
        bootstrapError('Failed at the member list update stage.');
    });
}
