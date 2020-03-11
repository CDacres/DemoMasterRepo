function init_add_payment($object)
{
    clearMainModal();
    $("#mainModal").on("shown.bs.modal", function()
    {
        $("#mainModal").on("hidden.bs.modal", function()
        {
            $("#mainModal").off("shown.bs.modal");
        });
    });
    $("#modal_slide_up_content").load(base_url + country_lang_url + '/common_protected/modal_add_payment/' + $object.data("id"), function()
    {
        $("#mainModal").modal('show');
        verticallyCenterModal();
        changePaymentType();
        activate_add_payment_modal_listeners($object.data("id"));
        cancelButtonListener();
        $('#zc_paid_date').datepicker({
            dateFormat: "dd/mm/yy",
            minDate: null
        });
        $.datepicker.setDefaults($.datepicker.regional[language_code]);
    });
}

function init_view_payment($object)
{
    clearMainModal();
    $("#mainModal").on("shown.bs.modal", function()
    {
        $("#mainModal").on("hidden.bs.modal", function()
        {
            $("#mainModal").off("shown.bs.modal");
        });
    });
    $("#modal_slide_up_content").load(base_url + country_lang_url + '/common_protected/modal_update_payment_ref/' + $object.attr("zc_reservation_id") + '/' + $object.attr("zc_object_id"), function()
    {
        $("#mainModal").modal('show');
        verticallyCenterModal();
        changePaymentType();
        activate_payment_modal_listeners($object.attr("zc_object_id"));
        cancelButtonListener();
        $('#zc_paid_date').datepicker({
            dateFormat: "dd/mm/yy",
            minDate: null
        });
        $.datepicker.setDefaults($.datepicker.regional[language_code]);
    });
}

function changePaymentType()
{
    $('input:radio[name="payment_type"]').change(function()
    {
        if ($(this).val() == 7)
        {
            $('#bacs_invoice').show();
        }
        else
        {
            $('#bacs_invoice').hide();
        }
        if ($(this).val() == 5)
        {
            $('#braintree_card_details').show();
        }
        else
        {
            $('#braintree_card_details').hide();
        }
    });
}

function activate_payment_modal_listeners(paymentId)
{
    $("#update_payment").click(function()
    {
        var scopeThis = $(this);
        disableModalButton(scopeThis);
        var errorMessage = '';
        if ($("#zc_external_reference").val() == '')
        {
            errorMessage = "the reference is filled in";
        }
        if (errorMessage == '')
        {
            var data = {
                notes: $("#zc_payment_notes").val(),
                payment_type_id: $('input:radio[name="payment_type"]:checked').val()
            };
            if ($('input:radio[name="payment_type"]:checked').val() == 7)
            {
                data.paid_date = moment($("#zc_paid_date").val(), 'DD-MM-YYYY').format('YYYY-MM-DD');
                data.account = $("#zc_account").val();
                data.external_reference = $("#zc_external_reference").val();
            }
            else if ($('input:radio[name="payment_type"]:checked').val() == 5)
            {
                data.external_reference = $("#zc_external_reference").val().toLowerCase();
            }
            $.post(base_url + country_lang_url + '/api_json/Payment_Update/' + paymentId, data, null, "json"
            ).done(function(response)
            {
                if (response.error.occurred === false)
                {
                    closeMainModal();
                    location.reload();
                }
                else
                {
                    enableModalButton(scopeThis);
                    bootstrapError(response.error.message);
                }
            }).fail(function(response)
            {
                bootstrapError("Something went wrong - " + response);
                enableModalButton(scopeThis);
            });
        }
        else
        {
            enableModalButton(scopeThis);
            bootstrapError('Please ensure ' + errorMessage + '.');
        }
    });
}

function activate_add_payment_modal_listeners(reservationId)
{
    $("#zc_reservation_pay_price, #zc_reservation_pay_extra_fee, #zc_reservation_pay_flexible_fee").change(function()
    {
        if (isNaN($(this).val()) || $(this).val() < 0)
        {
            bootstrapError("Please enter a positive number.");
        }
        else
        {
            var unformattedPrice = $("#zc_reservation_pay_price").val().replace(/\,/g,'');
            var unformattedExtraFee = $("#zc_reservation_pay_extra_fee").val().replace(/\,/g,'');
            var unformattedFlexFee = $("#zc_reservation_pay_flexible_fee").val().replace(/\,/g,'');
            var total = Number(unformattedPrice) + Number(unformattedExtraFee) + Number(unformattedFlexFee);
            var grandTotal = $("#zc_grand_total").text().replace(/\,/g,'');
            $("#zc_payment_total").text(Number(total).toFixed(2));
            $("#zc_total").text(Number(total + Number(grandTotal)).toFixed(2));
            $("#zc_payment_total_amount").val(Number(total).toFixed(4));
        }
    });
    $("#add_payment").click(function()
    {
        getPaymentData(reservationId);
    });
}

function getPaymentData(reservationId)
{
    var data = {
        reservation_id: reservationId
    };
    if ($("#zc_reservation_pay_price").val() == "" && $("#zc_reservation_pay_extra_fee").val() == "" && $("#zc_reservation_pay_flexible_fee").val() == "")
    {
        bootstrapError("Please ensure all relevant fields are filled in.");
    }
    else if ($("#zc_payment_total").text() <= 0)
    {
        bootstrapError("Please ensure the payment total is greater than 0.");
    }
    else
    {
        if (($('input:radio[name="payment_type"]:checked').val() == 5 && checkCreditCardDetails()) || $('input:radio[name="payment_type"]:checked').val() == 4 || ($('input:radio[name="payment_type"]:checked').val() == 7 && checkBacsFields()))
        {
            data.message = "Are you sure you want to add this payment?";
            var postData = {
                payment_amount: $("#zc_payment_total_amount").val(),
                payment_type_id: $('input:radio[name="payment_type"]:checked').val(),
                payment_price: $("#zc_reservation_pay_price").val(),
                payment_extra_fee: $("#zc_reservation_pay_extra_fee").val(),
                payment_flexible_fee: $("#zc_reservation_pay_flexible_fee").val(),
                notes: $("#zc_payment_notes").val()
            };
            if ($('input:radio[name="payment_type"]:checked').val() == 5)
            {
                var braintreeData = {
                    client_token: $("#braintree_client_token").val(),
                    card_number: $('#braintree_card_number').val(),
                    card_name: $('#braintree_card_name').val(),
                    card_month: $('#braintree_card_month').val(),
                    card_year: $('#braintree_card_year').val()
                };
                data.braintreeData = braintreeData;
            }
            else if ($('input:radio[name="payment_type"]:checked').val() == 7)
            {
                if ($("#zc_paid_date").val() != null && $("#zc_paid_date").val() != "")
                {
                    postData.paid_date = moment($("#zc_paid_date").val(), 'DD-MM-YYYY').format('YYYY-MM-DD');
                }
                postData.account = $("#zc_account").val();
                postData.external_reference = $("#zc_external_reference").val();
            }
            data.post_data = postData;
            init_modal_confirm(data, makePayment);
        }
    }
}

function makePayment(data)
{
    if (data.post_data.payment_type_id == 5)
    {
        var client = new braintree.api.Client({clientToken: data.braintreeData.client_token});
        client.tokenizeCard(
        {
            number: data.braintreeData.card_number,
            cardholderName: data.braintreeData.card_name,
            expirationMonth: data.braintreeData.card_month,
            expirationYear: data.braintreeData.card_year
        }, function (err, nonce)
        {
            if (err === null)
            {
                data.post_data.payment_nonce = nonce;
                insertPayment(data);
            }
            else
            {
                bootstrapError("Network error. Please wait a few minutes and try again. Thank you.");
            }
        });
    }
    else if (data.post_data.payment_type_id == 4 || data.post_data.payment_type_id == 7)
    {
        insertPayment(data);
    }
}

function insertPayment(data)
{
    $.ajax({
        url: '/' + country_lang_url + '/api_json/Payment_Insert/' + data.reservation_id,
        data: data.post_data,
        dataType: 'json',
        type: 'POST',
        success: function(response)
        {
            if (response.error.occurred === false)
            {
                enableModalButton(data.button);
                closeMainModal();
                location.reload();
            }
            else
            {
                enableModalButton(data.button);
                bootstrapError(response.error.message);
            }
        },
        error: function(response)
        {
            bootstrapError("Something went wrong - " + response);
            enableModalButton(data.button);
        }
    });
}

function checkBacsFields()
{
    var pass = true;
    if ($("#zc_paid_date").val() == "" || $("#zc_account").val() == "" || $("#zc_external_reference").val() == "")
    {
        bootstrapError("Please ensure all required fields are filled in.");
        pass = false;
    }
    return pass;
}

function checkCreditCardDetails()
{
    var numberPassed = checkCardNumber();
    var namePassed = checkCardName();
    var datePassed = checkCardDate();
    return numberPassed && namePassed && datePassed;
}

function checkCardNumber()
{
    var card_number = $('#braintree_card_number').val();
    var pass = true;
    if (card_number.length < 15 || card_number.length > 16 || card_number != Number(card_number))
    {
        bootstrapError("Please enter a valid 16 digit card number.");
        pass = false;
    }
    return pass;
}

function checkCardName()
{
    var pass = true;
    if ($('#braintree_card_name').val() == "")
    {
        bootstrapError("Please enter the card name.");
        pass = false;
    }
    return pass;
}

function checkCardDate()
{
    var expiryMonth = $('#braintree_card_month').val();
    var expiryYear = $('#braintree_card_year').val();
    var monthPassed = checkCardDateMonth(expiryMonth);
    var yearPassed = checkCardDateYear(expiryYear);
    var expiryPassed = checkCardExpiryInFuture(expiryMonth,expiryYear);
    var overAllPass = monthPassed && yearPassed && expiryPassed;
    if (!overAllPass)
    {
        bootstrapError("Please enter a valid card expiry date.");
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