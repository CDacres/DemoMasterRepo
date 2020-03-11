var ConfirmationClass = {
    assetId: null,
    bookingType: null,
    start: null,
    finish:  null,
    slots: null,
    guests: null,
    phone: null,
    paypalNonce: null,
    braintreeNonce: null,
    journeyToken: null,
    token: null,
    paymentType: null,
    disabled: true,
    basePrice: null,
    totalPrice: null,
    cancelPrice: null,
    extraFee: null,
    priceForced: false,
    awaitingServerResponse: false,
    widgetMode: false,
    extras: {},

    init: function(btToken, res, widgetMode, journeyToken)
    {
        this.token=btToken;
        this.widgetMode=widgetMode;
        this.journeyToken=journeyToken;
        this.parseReservation(res);
        this.initialisePaypal();
        this.attachPaymentTypeToggles();
        this.attachChangeListeners();
        this.attachBookButtonListener();
        this.setPaymentType('braintree');
    },

    parseReservation: function(res)
    {
        this.assetId=res.asset_id;
        this.bookingType=res.booking_type;
        this.start=res.start_date;
        this.finish=res.end_date;
        this.guests=res.guests;
        this.basePrice=res.base_price;
        this.totalPrice=res.base_price;
        this.cancelPrice=res.cancel_price;
        this.extraFee=0;
        if (this.bookingType===0)
        {
            this.slots=res.slots.objects;
        }
    },

    setPaymentType: function(type)
    {
        this.paymentType = type;
        this.hideAllPaymentOptions();
        this.showPaymentOption(type);
    },

    showPaymentOption: function(type)
    {
        $('#toggler_'+type).show();
        if (type == 'paypal')
        {
            if (this.paypalNonce === null)
            {
                $('#book_button').hide();
                $('#paypal-button').show();
            }
        }
        else
        {
            $('#paypal-button').hide();
            $('#book_button').show();
        }
    },

    paypalValidated: function(nonce)
    {
        this.paypalNonce = nonce;
        this.confirmBooking();
    },

    alertNoPaypal: function()
    {
        var message = "Apologies, but your browser does not support paypal payment at present. Please use a credit card or ring our helpline to complete your order.";
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
    },

    initialisePaypal: function()
    {
        var scopeThis = this;
        braintree.setup(this.token, "paypal", {
            container: "paypal-button",
            singleUse: true,
            onSuccess: function(nonce)
            {
                scopeThis.paypalValidated(nonce);
            },
            onUnsupported: scopeThis.alertNoPaypal
        });
    },

    checkFields: function()
    {
        var detailsPopulated = this.checkDetailFields();
        var paymentPassed = this.checkPaymentFields();
        return detailsPopulated && paymentPassed;
    },

    checkDetailFields: function()
    {
        var contactPassed = this.checkContactDetails();
        var confPassed = this.checkConfigSelected();
        // if ($('#no').is(':checked'))
        // {
        //   var benContactPassed = this.checkBenContactDetails();
        //   return contactPassed && benContactPassed && confPassed;
        // }
        // else
        // {
        return contactPassed && confPassed;
        // }
    },

    checkContactDetails: function()
    {
        var phonePassed = this.captureContactNumber($('#phone_number'));
        var emailPassed = this.checkEmail($('#email').val());
        var namePassed = this.checkName($('#first_name').val(), $('#last_name').val());

        return namePassed && emailPassed && phonePassed;
    },

    // checkBenContactDetails: function()
    // {
    //     var isBeneficiary = true;
    //     var benFirstName = $('#beneficiary_first_name').val();
    //     var benLastName = $('#beneficiary_last_name').val();
    //     var benEmail = $('#beneficiary_email').val();
    //     var benPhone = $('#beneficiary_phone_number');
    //
    //     var benPhonePassed = this.captureContactNumber(benPhone);
    //     var benEmailPassed = this.checkEmail(benEmail, isBeneficiary);
    //     var benNamePassed = this.checkName(benFirstName, benLastName, isBeneficiary);
    //
    //     return benNamePassed && benEmailPassed && benPhonePassed;
    // },

    checkEmail: function(email, isBeneficiary)
    {
        var pass = true;
        var emailReg = /^([a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?)?$/;
        if (email !== "" && emailReg.test(email.toLowerCase()))
        {
            if (isBeneficiary === true)
            {
                $('#Eben_contact_email').hide();
            }
            else
            {
                $('#Econtact_email').hide();
            }
        }
        else
        {
            if (isBeneficiary === true)
            {
                pass = false;
                $('#Eben_contact_email').show();
            }
            else
            {
                pass = false;
                $('#email_container').addClass('has-error');
                $('#Econtact_email').show();
                if (mobileSite)
                {
                    $('#error-message').text("Please enter a valid email address.");
                    $('#error-popup').popup('open', {
                        transition: "pop"
                    });
                }
            }
        }
        return pass;
    },

    checkName: function(firstName, lastName, isBeneficiary)
    {
        var pass = true;
        if (firstName === "" || lastName === "")
        {
            if (isBeneficiary === true)
            {
                $('#Eben_contact_name').show();
                pass = false;
            }
            else
            {
                $('#firstName').addClass('has-error');
                $('#lastName').addClass('has-error');
                $('#Econtact_name').show();
                if (mobileSite)
                {
                    $('#error-message').text("Please enter a valid first name and last name.");
                    $('#error-popup').popup('open', {
                        transition: "pop"
                    });
                }
                pass = false;
            }
        }
        else
        {
            if (isBeneficiary === true)
            {
                $('#Eben_contact_name').hide();
            }
            else
            {
                $('#Econtact_name').hide();
            }
        }
        return pass;
    },

    captureContactNumber: function(phoneNumber)
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
            if (mobileSite)
            {
                $('#error-message').text(errMsg);
                $('#error-popup').popup('open', {
                    transition: "pop"
                });
            }
        }
        return pass;
    },

    checkConfigSelected: function()
    {
        var pass = true;
        if ($('input[name="roomconf"]:checked').val() === undefined)
        {
            $('#Eroomconf').show();
            pass = false;
            if (mobileSite)
            {
                $('#error-message').text("Please select a room configuration.");
                $('#error-popup').popup('open', {
                    transition: "pop"
                });
            }
        }
        else
        {
            $('#Eroomconf').hide();
        }
        return pass;
    },

    checkPaymentFields: function()
    {
        var pass = true;
        if (this.paymentType == 'braintree')
        {
            pass = this.checkCreditCardDetails();
        }
        return pass;
    },

    checkCreditCardDetails: function()
    {
        var numberPassed = this.checkCardNumber();
        var datePassed = this.checkCardDate();
        return numberPassed && datePassed;
    },

    checkCardNumber: function()
    {
        var pass = true;
        var valid = $.payment.validateCardNumber($('#braintree_card_number').val());
        if (!valid) {
            $('#card_number').addClass('has-error');
            $('#Ebtree_card_number').show();
            if (mobileSite) {
                $('#error-message').text('The card number entered is not valid');
                $('#error-popup').popup('open', {
                    transition: 'pop'
                });
            }
            pass = false;
        } else {
            $('#Ebtree_card_number').hide();
        }
        return pass;
    },

    checkCardDate: function()
    {
        var expiryMonth = $('#braintree_card_month').val();
        var expiryYear = $('#braintree_card_year').val();
        var monthPassed = this.checkCardDateMonth(expiryMonth);
        var yearPassed = this.checkCardDateYear(expiryYear);
        var expiryPassed = this.checkCardExpiryInFuture(expiryMonth,expiryYear);
        var overAllPass = monthPassed && yearPassed && expiryPassed;
        if (!overAllPass)
        {
            $('#Ebtree_exp_date').show();
            if (mobileSite)
            {
                $('#error-message').text("Please enter a valid card expiry date.");
                $('#error-popup').popup('open', {
                    transition: "pop"
                });
            }
            $('#expiry-selector').addClass('has-error');
        }
        else
        {
            $('#Ebtree_exp_date').hide();
        }
        return overAllPass;
    },

    checkCardDateMonth: function(expiryMonth)
    {
        var pass = true;
        if (expiryMonth === '' || expiryMonth === 0 || expiryMonth != Number(expiryMonth) || expiryMonth > 12)
        {
            pass = false;
        }
        return pass;
    },

    checkCardDateYear: function(expiryYear)
    {
        var pass = true;
        if (expiryYear === '' || expiryYear === 0 || expiryYear != Number(expiryYear))
        {
            pass = false;
        }
        return pass;
    },

    checkCardExpiryInFuture: function(expiryMonth, expiryYear)
    {
        var pass = true;
        var today = new Date();
        var expiry_date = new Date(expiryYear, expiryMonth, 0);
        if (expiry_date < today)
        {
            pass = false;
        }
        return pass;
    },

    getRelevantBookingData: function()
    {
        var comments = String($('#comments').val());
        if (comments == 'undefined')
        {
            comments = '';
        }
        var data = {
            email: $('#email').val(),
            first_name: $('#first_name').val(),
            last_name: $('#last_name').val(),
            phone_number: $('#phone_number').intlTelInput("getNumber", intlTelInputUtils.numberFormat.INTERNATIONAL),
            asset_id: this.assetId,
            booking_type: this.bookingType,
            start_date: this.start,
            end_date: this.finish,
            slots: this.slots,
            guests: this.guests,
            comments: comments,
            configuration_id: $('input[name="roomconf"]:checked').val(),
            extras: this.extras,
            given_price: this.totalPrice,
            cancel_applied: $('#flexible').is(":checked"),
            extra_fee: this.extraFee,
            payment_type: this.paymentType,
            payment_nonce: this.getRelevantNonce(),
            journey_token: this.journeyToken,
            bookingChannel_id: 1
        };
//        if ($('#no').is(':checked'))
//        {
//            data.beneficiary_email = $('#beneficiary_email').val();
//            data.beneficiary_first_name = $('#beneficiary_first_name').val();
//            data.beneficiary_last_name = $('#beneficiary_last_name').val();
//            data.beneficiary_phone_number = $('#beneficiary_phone_number').intlTelInput("getNumber", intlTelInputUtils.numberFormat.INTERNATIONAL);
//        }
        return data;
    },

    getRelevantNonce: function()
    {
        switch(this.paymentType)
        {
            case 'braintree':
                return this.braintreeNonce;

            case 'paypal':
                return this.paypalNonce;

            default:
                return null;
        }
    },

    confirmBooking: function()
    {
        this.disableBooking();
        if (!this.awaitingServerResponse)
        {
            if (this.checkFields())
            {
                this.launchReservation();
            }
            else
            {
                this.enableBooking();
            }
        }
    },

    makeReservation: function()
    {
        var scopeThis = this;
        this.awaitingServerResponse = true;
        $.post(base_url + country_lang_url + "/api_json/Booking_Request",this.getRelevantBookingData(),null,"json"
        ).done(function(response)
        {
            $('body').css('cursor', 'default');
            if (response.error.occurred === true)
            {
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
                scopeThis.enableBooking();
            }
            else
            {
                if (response.data.user_requires_password)
                {
                    window.location.href = base_url + country_lang_url + '/save-your-details?reservation_id=' + response.data.reservation.id + '&asset_id=' + response.data.asset_id + '&token=' + response.data.booker.token + scopeThis.passThroughVariables();
                }
                else
                {
                    window.location.href = base_url + country_lang_url + '/booking-confirmed?reservation_id=' + response.data.reservation.id + '&asset_id=' + response.data.asset_id + scopeThis.passThroughVariables();
                }
            }
        }).fail(function(error)
        {
            console.log(error);
            var message = "Server Error. Please wait a few minutes and try again. Thank you.";
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
            scopeThis.enableBooking();
        }).always(function()
        {
            scopeThis.awaitingServerResponse = false;
        });
    },

    passThroughVariables: function()
    {
        var retString = '';
        if (this.widgetMode)
        {
            retString = "&widget=1";
        }
        return retString;
    },

    launchReservation: function()
    {
        if (this.paymentType === 'braintree' && this.braintreeNonce === null)
        {
            this.awaitingServerResponse = true;
            var client = new braintree.api.Client({clientToken: braintree_client_token});
            var scopeThis = this;
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
                    scopeThis.braintreeNonce = nonce;
                    scopeThis.awaitingServerResponse = false;
                    scopeThis.makeReservation();
                }
                else
                {
                    scopeThis.awaitingServerResponse = false;
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
                    scopeThis.enableBooking();
                }
            });
        }
        else
        {
            this.makeReservation();
        }
    },

    harvestGoogleAdsId: function()
    {
        var ga_id;
        ga(function(tracker)
        {
            ga_id = tracker.get('clientId');
        });
        return ga_id;
    },

    disableBooking: function()
    {
        $('#book_button').hide();
        $('body').css('cursor', 'wait');
        $('#book_loading').show();
    },

    enableBooking: function()
    {
        $('#paypal-button').hide();
        $('#book_button').val('Try Again!');
        $('#book_button').show();
        $('#book_button').prop('disabled', false);
        $('#book_button').css('cursor', 'pointer');
        $('#book_loading').hide();
    },

    attachPaymentTypeToggles: function()
    {
        var scopeThis = this;
        $('.zc_payment_type_toggle').change(function()
        {
            scopeThis.setPaymentType($(this).val());
        });
    },

    hideAllPaymentOptions: function()
    {
        $('.toggler__content').hide();
    },

    attachBookButtonListener: function()
    {
        var scopeThis = this;
        $('#book_button').click(function()
        {
            scopeThis.pushToDataLayer();
            scopeThis.confirmBooking();
        });
    },

    pushToDataLayer: function() {
        dataLayer.push({
            "ecommerce": {
                "currencyCode": zc_currency,
                "checkout": {
                    "actionField": {
                        "step": 2
                    },
                    "products": [
                        {
                            "name": zc_room_name,
                            "id": dynx_itemid,
                            "price": zc_revenue.toString(),
                            "brand": zc_venue_name,
                            "category": zc_booking_type,
                            "variant": "",
                            "quantity": 1,
                            "coupon": ""
                        }
                    ]
                }
            },
            "event": "checkout"
        });
    },

    attachChangeListeners: function()
    {
        this.attachPriceOverrideListener();
        if ($('#zc_admin_extra_fee').length && $('#zc_admin_price_override').length)
        {
            $('#zc_admin_price_override').change();
        }
        this.attachPriceUpdateListeners();
        this.attachPriceCancelListener();
    },

    attachPriceUpdateListeners: function()
    {
        this.attachAddOnsListeners();
    },

    attachAddOnsListeners: function()
    {
        var scopeThis = this;
        $('.add_ons_selector').change(function()
        {
            $selected = $(this).find(':selected');
            scopeThis.updateExtras($(this).attr('zc_add_on_id'), $selected.attr('zc_add_on_price'), $selected.attr('zc_add_on_number'));
        });
    },

    updateExtras: function(id,price,number)
    {
        this.extras[id] = {};
        this.extras[id].id = id;
        this.extras[id].quantity = number;
        this.extras[id].price = price;
        if ($('#zc_admin_extra_fee').length && $('#zc_admin_price_override').length && (Number($('#zc_admin_extra_fee').val()) != '' || Number($('#zc_admin_price_override').val()) != ''))
        {
            this.updatePrices(Number(this.getExtrasCost()) + Number($('#zc_admin_price_override').val()), true);
            this.updateTotalCostNum(Number(this.getExtrasCost()) + Number($('#zc_admin_extra_fee').val()) + Number($('#zc_admin_price_override').val()));
        }
        else
        {
            if ($('#flexible').is(':checked'))
            {
                this.updatePrices(Number(this.getExtrasCost()) + Number(this.cancelPrice));
                this.updateTotalCostNum(Number(this.getExtrasCost()) + Number(this.cancelPrice));
            }
            else
            {
                this.updatePrices(Number(this.getExtrasCost()) + Number(this.basePrice));
                this.updateTotalCostNum(Number(this.getExtrasCost()) + Number(this.basePrice));
            }
        }
    },

    getExtrasCost: function()
    {
        var totalExtras = 0;
        $.each(this.extras, function(key, value)
        {
            totalExtras += Number(value.price);
        });
        return totalExtras;
    },

    attachPriceCancelListener: function()
    {
        var scopeThis = this;
        $('.radio-container .check').click(function()
        {
            var input = $(this).parent().find('input');
            input.prop('checked', true);
            if (input.attr('id') === 'flexible' && input.is(':checked'))
            {
                if ($('#zc_admin_extra_fee').length && $('#zc_admin_price_override').length)
                {
                    $('#zc_admin_price_override').val(scopeThis.cancelPrice);
                    scopeThis.updatePrices(Number(scopeThis.getExtrasCost()) + Number(scopeThis.cancelPrice), true);
                    scopeThis.updateTotalCostNum(Number(scopeThis.getExtrasCost()) + Number($('#zc_admin_extra_fee').val()) + Number(scopeThis.cancelPrice));
                }
                else
                {
                    scopeThis.updatePrices(Number(scopeThis.getExtrasCost()) + Number(scopeThis.cancelPrice));
                    scopeThis.updateTotalCostNum(Number(scopeThis.getExtrasCost()) + Number(scopeThis.cancelPrice));
                }
                $('#flexible-tooltip').hide();
            }
            else
            {
                if ($('#zc_admin_extra_fee').length && $('#zc_admin_price_override').length)
                {
                    $('#zc_admin_price_override').val(scopeThis.basePrice);
                    scopeThis.updatePrices(Number(scopeThis.getExtrasCost()) + Number(scopeThis.basePrice), true);
                    scopeThis.updateTotalCostNum(Number(scopeThis.getExtrasCost()) + Number($('#zc_admin_extra_fee').val()) + Number(scopeThis.basePrice));
                }
                else
                {
                    scopeThis.updatePrices(Number(scopeThis.getExtrasCost()) + Number(scopeThis.basePrice));
                    scopeThis.updateTotalCostNum(Number(scopeThis.getExtrasCost()) + Number(scopeThis.basePrice));
                }
                $('#flexible-tooltip').show();
            }
        });
    },

    attachPriceOverrideListener: function()
    {
        var scopeThis = this;
        $('#zc_admin_price_override').change(function()
        {
            if (isNaN($(this).val()) || $(this).val() < 0)
            {
                bootstrapError("Please enter a positive number.");
            }
            else
            {
                scopeThis.updatePrices(Number(scopeThis.getExtrasCost()) + Number($(this).val()), true);
                scopeThis.updateTotalCostNum(Number(scopeThis.getExtrasCost()) + Number($('#zc_admin_extra_fee').val()) + Number($(this).val()));
            }
        });
        $('#zc_admin_extra_fee').change(function()
        {
            if (isNaN($(this).val()) || $(this).val() < 0)
            {
                bootstrapError("Please enter a positive number.");
            }
            else
            {
                scopeThis.setExtraFee($(this).val());
                scopeThis.updateTotalCostNum(Number(scopeThis.getExtrasCost()) + Number($('#zc_admin_price_override').val()) + Number($(this).val()));
            }
        });
    },

    updatePrices: function(newPrice, force)
    {
        force = force?force:false;
        if (force || !this.priceForced)
        {
            this.setPrice(newPrice);
        }
        this.priceForced = this.priceForced || force; //It can only go true; can't be sent false again.
    },

    updateTotalCostNum : function(newPrice)
    {
        var roundedPrice = Number(newPrice).toFixed(2);
        $('.zc_total_cost').val(roundedPrice);
        $('.zc_total_cost').html(roundedPrice);
    },

    setPrice: function(newPrice)
    {
        this.totalPrice = newPrice;
    },

    setExtraFee: function(amount)
    {
        this.extraFee = amount;
    },

    modalAlert: function(message)
    {
        $("#payments_modal").load(base_url + country_lang_url + '/common/modal_error', function()
        {
            $('#message').text(message);
            $("#payments_modal").modal('show');
        });
    }
};