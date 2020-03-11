$(document).ready(function()
{
    checkIfUserLoggedIn();
    signInListener();
    paymentType();
    configType();
    flexibleBooking();
    cancelChoice();
    displayChosenAddons();
});

function checkIfUserLoggedIn()
{
    if (isLoggedIn)
    {
        $.mobile.changePage('#checkout-page', {
            transition: "slide"
        });
    }
}

function signInListener()
{
    $('#sign_in').on('tap', function()
    {
        var data = {
            zc_login_user_name: $('#zc_login_user_name').val(),
            zc_login_password: $('#zc_login_password').val()
        };
        $.post(base_url + "users/remote_signin", data, null, "json"
        ).done(function(response)
        {
            if (response.error.occurred === true)
            {
                $('#error-message').text(response.error.message);
                $('#error-popup').popup('open', {
                    transition: "pop"
                });
            }
            else
            {
                $.mobile.changePage('#checkout-page', {
                    transition: "slide"
                });
                insertUserInfo(response.data);
                postDiscount();
            }
        }).fail(function(response)
        {
            var message = "Log in failed, please try again...";
            $('#error-message').text(response.error.message);
            $('#error-popup').popup('open', {
                transition: "pop"
            });
            console.log(response);
        });
    });
}

function insertUserInfo(data)
{
    $('#first_name').val(data.first_name);
    $('#last_name').val(data.last_name);
    $('#email').val(data.email);
    $('#phone_number').val(data.phone_number);
    updateCreditCardName();
}

function paymentType()
{
    $('.payment-type-option').click(function()
    {
        $('.payment-type-option').removeClass('on');
        $(this).addClass('on');
        if ($('#card-payment').hasClass('on'))
        {
            $('#checkout_form_booking_payment_type_braintree').prop("checked", true);
            $('#checkout_form_booking_payment_type_paypal').prop("checked", false);
            $('.pre-pay-paypal-message').hide();
            $('.pre-pay-message').show();
            $('#paypal-button').hide();
            $('#book_button').show();
            ConfirmationClass.paymentType = 'braintree';
        }
        else if ($('#paypal-payment').hasClass('on'))
        {
            $('#checkout_form_booking_payment_type_paypal').prop("checked", true);
            $('#checkout_form_booking_payment_type_braintree').prop("checked", false);
            $('.pre-pay-message').hide();
            $('.pre-pay-paypal-message').show();
            $('#book_button').hide();
            $('#paypal-button').show();
            ConfirmationClass.paymentType = 'paypal';
        }
    });
}

function configType()
{
    $('.room-config-option').click(function()
    {
        $('.room-config-option').removeClass('on');
        $(this).addClass('on');
        if ($(this).hasClass('on'))
        {
            $('.room-config-radio').prop("checked", false);
            $(this).find('.room-config-radio').prop("checked", true);
        }
    });
}

function flexibleBooking()
{
    $('.flexible-option').click(function()
    {
        $('.flexible-option').removeClass('on');
        $(this).addClass('on');
        if ($(this).hasClass('on'))
        {
            $('.flexible-radio').prop("checked", false);
            $(this).find('.flexible-radio').prop("checked", true);
        }
    });
}

function cancelChoice()
{
    $('.cancel-flexible-option').click(function()
    {
        if ($(this).hasClass('on'))
        {
            $('.cancel-flexible-option').removeClass('on');
            $('#flexible').prop("checked", false);
            $("#flexible").trigger("change");
        }
        else
        {
            $(this).addClass('on');
            $('#flexible').prop("checked", true);
            $("#flexible").trigger("change");
        }
    });
}

function displayChosenAddons()
{
    var addonArray = [];
    $('select.add_ons_selector').change(function()
    {
        var id = this.id;
        var name = $(this).attr('zc_amenity_name');
        var value = $(this).val();
        if (addonArray.length > 0)
        {
            for (var i=addonArray.length-1; i>=0; i--)
            {
                if (addonArray[i] !== id)
                {
                    addonArray.push(id);
                }
                else
                {
                    $('div #amenity_' + id).remove();
                }
            }
        }
        else
        {
            addonArray.push(id);
        }
        if (value !== 'None')
        {
            $('.filter-popup').append('<div id="amenity_' + id + '" zc_add_on_id="' + id + '" class="amenity-wrapper"><span class="amenity-block ui-btn ui-corner-all ui-shadow ui-btn-inline ui-btn-icon-right ui-icon-carat-r"><span class="amenity-name">' + name + '</span>: ' + value + '</span><a href="#" class="delete-amenity ui-btn ui-corner-all ui-shadow ui-btn-inline ui-btn-icon-right ui-icon-carat-r"></a></div>');
        }
        $('.ok-filters').click(function()
        {
            $.mobile.silentScroll($('#checkout-page')[0].scrollHeight);
        });
        $('.delete-amenity').click(function()
        {
            var del_id = $(this).parent().attr('zc_add_on_id');
            if (addonArray.length > 0)
            {
                for (var i=addonArray.length-1; i>=0; i--)
                {
                    if (addonArray[i] === del_id)
                    {
                        addonArray.splice(i, 1);
                        break;
                    }
                    else
                    {
                        break;
                    }
                }
            }
            $(this).parent().remove();
            $('select#' + del_id + ' option').removeAttr('selected');
            $('span.' + del_id + '-filter-text').text('None');
            delete ConfirmationClass.extras[del_id];
            ConfirmationClass.updatePrices(Number(ConfirmationClass.getExtrasCost()) + Number(ConfirmationClass.basePrice));
            ConfirmationClass.updateTotalCostNum(Number(ConfirmationClass.getExtrasCost()) + Number(ConfirmationClass.basePrice));
        });
    });
}
