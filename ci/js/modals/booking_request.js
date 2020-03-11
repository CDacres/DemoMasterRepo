function checkFields(paymentType)
{
    var detailsPopulated = checkDetailFields();
    var paymentPassed = checkPaymentFields(paymentType);
    return detailsPopulated && paymentPassed;
}

function checkDetailFields()
{
    var contactPassed = checkContactDetails();
    var bookingDetailsPassed = checkBookingDetails();
    var confPassed = checkConfigSelected();
    return contactPassed && bookingDetailsPassed && confPassed;
}

function checkContactDetails()
{
    var phonePassed = captureContactNumber($('#phone_number'));
    var emailPassed = checkEmail($('#email_address').val());
    var namePassed = checkName($('#first_name').val(), $('#last_name').val());
    return namePassed && emailPassed && phonePassed;
}

function checkEmail(beneficiaryEmail)
{
    var pass = true;
    var emailReg = /^([a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?)?$/;
    if (beneficiaryEmail !== "" && emailReg.test(beneficiaryEmail.toLowerCase()))
    {
        $('#Econtact_email').hide();
    }
    else
    {
        pass = false;
        $('#Econtact_email').show();
        $('#email').addClass('has-error');
        $('#email_address').change(function()
        {
            $('#email').removeClass('has-error');
            $('#Econtact_email').hide();
        });
    }
    return pass;
}

function checkName(beneficiaryFirstName, beneficiaryLastName)
{
    var pass = true;
    if (beneficiaryFirstName === "")
    {
        $('#Econtact_first_name').show();
        $('#firstName').addClass('has-error');
        pass = false;
        $('#first_name').change(function()
        {
            $('#firstName').removeClass('has-error');
            $('#Econtact_first_name').hide();
        });
    }
    if (beneficiaryLastName === "")
    {
        $('#Econtact_last_name').show();
        $('#lastName').addClass('has-error');
        pass = false;
        $('#last_name').change(function()
        {
            $('#lastName').removeClass('has-error');
            $('#Econtact_last_name').hide();
        });
    }
    if (beneficiaryFirstName !== "" && beneficiaryLastName !== "")
    {
        $('#Econtact_first_name').hide();
        $('#Econtact_last_name').hide();
    }
    return pass;
}

function captureContactNumber(beneficiaryPhoneNumber)
{
    var pass = false;
    if (beneficiaryPhoneNumber.intlTelInput("isValidNumber"))
    {
        pass = true;
    }
    else
    {
        var error = beneficiaryPhoneNumber.intlTelInput("getValidationError");
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
        $('#phone_number').change(function()
        {
            $('#phone').removeClass('has-error');
            $('#Econtact_phone').hide();
        });
        $('#Econtact_phone').text(errMsg);
        $('#Econtact_phone').show();
    }
    return pass;
}

function checkBookingDetails()
{
    var pricePassed = checkPrice($('#price').val());
    var guestsPassed = checkGuests($('#guests').val());
    var datesPassed = checkDates($('#zc_schedule_booking_start_date').val(), $('#zc_schedule_booking_end_date').val());
    return pricePassed && guestsPassed && datesPassed;
}

function checkPrice(price)
{
    var pass = true;
    if (!$.isNumeric(price))
    {
        $('#Econtact_price').show();
        $('#price_container').addClass('has-error');
        pass = false;
        $('#price').change(function()
        {
            $('#price_container').removeClass('has-error');
            $('#Econtact_price').hide();
        });
    }
    else
    {
        $('#Econtact_price').hide();
    }
    return pass;
}

function checkGuests(guests)
{
    var pass = true;
    if (!$.isNumeric(guests) || guests == 0)
    {
        $('#Econtact_guests').show();
        $('#guests_container').addClass('has-error');
        pass = false;
        $('#guests').change(function()
        {
            $('#guests_container').removeClass('has-error');
            $('#Econtact_guests').hide();
        });
    }
    else
    {
        $('#Econtact_guests').hide();
    }
    return pass;
}

function checkDates(startDate, endDate)
{
    var pass = true;
    var startDateTimeMoment = moment(startDate + " " + $('#zc_schedule_booking_start_time').val() + ":00", "DD-MM-YYYY HH:mm:ss");
    var endDateTimeMoment = moment(endDate + " " + $('#zc_schedule_booking_end_time').val() + ":00", "DD-MM-YYYY HH:mm:ss");
    if (startDate == '' || endDate == '' || startDate != endDate || endDateTimeMoment.isBefore(startDateTimeMoment))
    {
        $('#Econtact_dates').show();
        $('.date_input').addClass('has-error');
        pass = false;
        $('.datepicker').change(function()
        {
            $('.date_input').removeClass('has-error');
            $('#Econtact_dates').hide();
        });
    }
    else
    {
        $('#Econtact_dates').hide();
    }
    return pass;
}

function checkConfigSelected()
{
    var pass = true;
    if ($('input[name="roomconf"]:checked').val() === undefined)
    {
        $('#Eroomconf').show();
        pass = false;
        $('input[name="roomconf"]').change(function()
        {
          $('#Eroomconf').hide();
        });
    }
    else
    {
        $('#Eroomconf').hide();
    }
    return pass;
}

function checkPaymentFields(paymentType)
{
    var pass = true;
    if (paymentType == 'braintree')
    {
        pass = checkCreditCardDetails();
    }
    return pass;
}

function checkCreditCardDetails()
{
    var numberPassed = checkCardNumber();
    var datePassed = checkCardDate();
    return numberPassed && datePassed;
}

function checkCardNumber()
{
    var card_number = $('#braintree_card_number').val();
    var pass = true;
    if (card_number.length < 15 || card_number.length > 16 || card_number != Number(card_number))
    {
        pass = false;
        $('#Ebtree_card_number').show();
        $('#card_number').addClass('has-error');
        $('#braintree_card_number').change(function()
        {
            $('#card_number').removeClass('has-error');
            $('#Ebtree_card_number').hide();
        });
    }
    else
    {
        $('#Ebtree_card_number').hide();
    }
    return pass;
}

function checkCardDate()
{
    var expiryMonth = $('#braintree_card_month').val();
    var expiryYear = $('#braintree_card_year').val();
    var monthPassed = this.checkCardDateMonth(expiryMonth);
    var yearPassed = this.checkCardDateYear(expiryYear);
    var expiryPassed = this.checkCardExpiryInFuture(expiryMonth, expiryYear);
    var overAllPass = monthPassed && yearPassed && expiryPassed;
    if (!overAllPass)
    {
        $('#Ebtree_exp_date').show();
        $('#expiry-selector').addClass('has-error');
        $('#braintree_card_month').change(function()
        {
            $('#expiry-selector').removeClass('has-error');
            $('#Ebtree_exp_date').hide();
        });
    }
    else
    {
        $('#Ebtree_exp_date').hide();
    }
    return overAllPass;
}

function checkCardDateMonth(expiryMonth)
{
    var pass = true;
    if (expiryMonth === '' || expiryMonth === 0 || expiryMonth != Number(expiryMonth) || expiryMonth > 12)
    {
        pass = false;
    }
    return pass;
}

function checkCardDateYear(expiryYear)
{
    var pass = true;
    if (expiryYear === '' || expiryYear === 0 || expiryYear != Number(expiryYear))
    {
        pass = false;
    }
    return pass;
}

function checkCardExpiryInFuture(expiryMonth, expiryYear)
{
    var pass = true;
    var today = new Date();
    var expiry_date = new Date(expiryYear, expiryMonth, 0);
    if (expiry_date < today)
    {
        pass = false;
    }
    return pass;
}

function getRelevantBookingData(resource, paymentType)
{
    var start = moment($('#zc_schedule_booking_start_date').val() + " " + $('#zc_schedule_booking_start_time').val() + ":00", "DD-MM-YYYY HH:mm:ss");
    var end = moment($('#zc_schedule_booking_end_date').val() + " " + $('#zc_schedule_booking_end_time').val() + ":00", "DD-MM-YYYY HH:mm:ss");
    var data = {
        beneficiary_email: $('#email_address').val(),
        beneficiary_first_name: $('#first_name').val(),
        beneficiary_last_name: $('#last_name').val(),
        beneficiary_phone_number: $('#phone_number').intlTelInput("getNumber", intlTelInputUtils.numberFormat.INTERNATIONAL),
        asset_id: resource.asset_id,
        booking_type: 0,
        period: {
            start: start.format('YYYY-MM-DD HH:mm:ss'),
            end: end.format('YYYY-MM-DD HH:mm:ss')
        },
        guests: $('#guests').val(),
        comments: $('#comments').val(),
        configuration_id: $('input[name="roomconf"]:checked').val(),
        given_price: $('#price').val(),
        external_reference: $('#payment_reference').val(),
        payment_type: paymentType,
        payment_nonce: $('#braintree_nonce').val(),
        bookingChannel_id: 2
    };
    data = addNeverBounceStatusField(data, $('input[name="nb-result"]'));
    return data;
}

function launchBookingRequest(resource)
{
    var paymentType = null;
    paymentType = $('input[name="checkout_form[booking][payment_type]"]:checked').val();
    disableBooking();
    if (checkFields(paymentType))
    {
        if (paymentType === 'braintree')
        {
            var client = new braintree.api.Client({clientToken: $('#zc_bt_client_token').val()});
            client.tokenizeCard(
            {
                number: $('#braintree_card_number').val(),
                cardholderName: $('#braintree_card_name').val(),
                expirationMonth: $('#braintree_card_month').val(),
                expirationYear: $('#braintree_card_year').val()
            }, function (err, nonce)
            {
                if (err === null)
                {
                    $('#braintree_nonce').val(nonce);
                    submitBookingRequest(resource, paymentType);
                }
                else
                {
                    enableBooking();
                    bootstrapError('Network error. Please wait a few minutes and try again. Thank you.');
                }
            });
        }
        else
        {
            submitBookingRequest(resource, paymentType);
        }
    }
    else
    {
        enableBooking();
        bootstrapError('Something went wrong - please check all required fields and try again. Thank you.');
    }
}

function disableBooking()
{
    $('#request_booking').prop("disabled", true);
    $('body').css('cursor', 'wait');
    $('.modal-footer').prepend('<div id="loader-wrapper"><img src="/images/loading.gif"></div>');
}

function enableBooking()
{
    $('#request_booking').val('Try Again!').prop("disabled", false);
    $('body').css('cursor', 'default');
    $('#loader-wrapper').remove();
}

function submitBookingRequest(resource, paymentType)
{
    $.post(base_url + country_lang_url + "/api_json/Booking_Request", getRelevantBookingData(resource, paymentType), null, "json"
    ).done(function(response)
    {
        if (response.error.occurred === true)
        {
            bootstrapError(response.error.message);
            enableBooking();
        }
        else
        {
            var data=response.data;
            var eventData = {
                id: data.reservation.id,
                title: data.title,
                start: data.start_moment,
                end: data.end_moment,
                color: data.scheduler_event_color,
                textColor: "black",
                resourceId: resource.id,
                asset_id: resource.asset_id
            };
            $('#calendar').fullCalendar('renderEvent', eventData, true);
            paymentConfirmation();
            enableBooking();
            closeMainModal();
        }
    }).fail(function(response)
    {
        bootstrapError("Failed for some reason - " + response.error.message + ".");
    });
}

function attachAutoNamer()
{
    $("#first_name").change(function()
    {
        updateCreditCardName();
    });
    $("#last_name").change(function()
    {
        updateCreditCardName();
    });
}

function updateCreditCardName()
{
    $('#braintree_card_name').val($("#first_name").val() + " " + $("#last_name").val());
}

function changePaymentType(type)
{
    $('#toggler_braintree').hide();
    $('#toggler_venue').hide();
    $('#toggler_'+type).show();
}

function paymentToggleListener()
{
    var type;
    $('.checkout-payment__method-trigger').change(function()
    {
        if ($('#checkout_form_booking_payment_type_venue').is(':checked'))
        {
            type = 'venue';
            paymentType = 'venue';
            changePaymentType(type);
        }
        else if ($('#checkout_form_booking_payment_type_braintree').is(':checked'))
        {
            type = 'braintree';
            paymentType = 'braintree';
            changePaymentType(type);
        }
    });
}
