function init_modal_add_user_member($object)
{
    clearMainModal();
    $("#mainModal").on("shown.bs.modal", function()
    {
        $("#mainModal").on("hidden.bs.modal", function()
        {
            $("#mainModal").off("shown.bs.modal");
        });
    });
    $("#modal_slide_up_content").load(base_url + country_lang_url + '/common_protected/modal_add_user_member/' + $object.data("assetid"), function()
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

function activate_member_modal_listeners()
{
    $(".zc_user_phone_number").intlTelInput({ initialCountry: locale_code });
    if (!$(".zc_user_phone_number").intlTelInput("isValidNumber"))
    {
        $(".zc_user_phone_number").intlTelInput("setCountry", locale_code);
    }
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
    else if (isNaN(parseFloat($("#zc_person_discount").val())) || !isFinite($("#zc_person_discount").val()))
    {
        errorMessage = "the discount percentage is correct";
    }
    if (errorMessage == '')
    {
        var data = {
            asset_id: assetId,
            discount: $("#zc_person_discount").val(),
            first_name: $("#zc_first_name").val(),
            last_name: $("#zc_last_name").val(),
            email: $("#zc_email_address").val(),
            phone_number: $("#zc_user_phone_number").intlTelInput("getNumber", intlTelInputUtils.numberFormat.INTERNATIONAL)
        };
        data = addNeverBounceStatusField(data, $('input[name="nb-result"]'));
        $.post(base_url + country_lang_url + "/api_json/Asset_User_Member", data, null, "json"
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
                closeMainModal();
                var listData = {
                    option: 'all'
                };
                $.post(base_url + "dashboard/update_user_members_list", listData, null, "json"
                ).done(function(response)
                {
                    if (response.error.occurred === true)
                    {
                        bootstrapError(response.error.message);
                    }
                    else
                    {
                        $('#no-members').remove();
                        $('#member-list').show();
                        $('#zc_member_rows').empty();
                        $('#zc_member_rows').append(response.data.html);
                    }
                }).fail(function()
                {
                    bootstrapError('Failed at the member list update stage.');
                });
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
