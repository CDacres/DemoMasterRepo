//The ids, update button, etc, are all intimately linked with common_protected/reservation_details and associated view

function init_cancel_booking($object)
{
    clearMainModal();
    $("#mainModal").on("shown.bs.modal", function()
    {
        $("#mainModal").on("hidden.bs.modal", function()
        {
            $("#mainModal").off("shown.bs.modal");
        });
    });
    $("#modal_slide_up_content").load(base_url + country_lang_url + '/common_protected/modal_cancel_reservation/' + $object.data("id"), function()
    {
        $("#mainModal").modal('show');
        verticallyCenterModal();
        $("#confirm_cancel_host").click(function()
        {
            var data = {
                message: "Are you sure you want to cancel this reservation?",
                reservation_id: $object.data("id"),
                new_status_id: $("#zc_status_host").val(),
                new_price: $("#zc_reservation_commissionable_amount").val(),
                new_toVenue: $("#zc_reservation_toVenue").val(),
                new_extra_fee: $("#zc_reservation_extra_fee").val(),
                new_flexible_applied: $("input:radio[name='zc_reservation_flexible_applied']:checked").val(),
                new_flexible_fee: $("#zc_reservation_flexible_fee").val(),
                new_price_control_fee: $("#zc_reservation_price_control_fee").val(),
                new_add_on_price: $("#zc_reservation_add_on_price").val(),
                new_comments: $("#zc_reservation_comments").val(),
                new_add_ons: $("#zc_reservation_add_ons").val(),
                new_zipcube_notes: $("#zc_reservation_notes").val()
            };
            init_modal_confirm(data, cancelreservation);
        });
        $("#confirm_cancel_user").click(function()
        {
            var data = {
                message: "Are you sure you want to cancel this reservation?",
                reservation_id: $object.data("id"),
                new_status_id: $("#zc_status_user").val(),
                new_price: $("#zc_reservation_commissionable_amount").val(),
                new_toVenue: $("#zc_reservation_toVenue").val(),
                new_extra_fee: $("#zc_reservation_extra_fee").val(),
                new_flexible_applied: $("input:radio[name='zc_reservation_flexible_applied']:checked").val(),
                new_flexible_fee: $("#zc_reservation_flexible_fee").val(),
                new_price_control_fee: $("#zc_reservation_price_control_fee").val(),
                new_add_on_price: $("#zc_reservation_add_on_price").val(),
                new_comments: $("#zc_reservation_comments").val(),
                new_add_ons: $("#zc_reservation_add_ons").val(),
                new_zipcube_notes: $("#zc_reservation_notes").val()
            };
            init_modal_confirm(data, cancelreservation);
        });
        activate_modal_listeners($object.data("id"));
        activate_cancel_modal_listeners();
        cancelButtonListener();
    });
}

function init_view_booking($object)
{
    clearMainModal();
    $("#mainModal").on("shown.bs.modal", function()
    {
        $("#mainModal").on("hidden.bs.modal", function()
        {
            $("#mainModal").off("shown.bs.modal");
        });
    });
    $("#modal_slide_up_content").load(base_url + country_lang_url + '/common_protected/modal_reservation_details/' + $object.data("id"), function()
    {
        $("#mainModal").modal('show');
        verticallyCenterModal();
        attachModals();
        activate_reservation_modal_listeners($object.data("id"));
        cancelButtonListener();
    });
}

function activate_reservation_modal_listeners(reservationId)
{
    $("#mark_switch").click(function()
    {
        mark_reservation_as_switch(reservationId);
        closeMainModal();
    });
    $("#delete_reservation").click(function()
    {
        delete_reservation(reservationId, $("#delete_reservation").attr('zc_status_id'));
        closeMainModal();
    });
    $("#accept_reservation").click(function()
    {
        var data = {
            message: "Are you sure you want to accept this request?",
            reservation_id: reservationId,
            new_status_id: $("#accept_reservation").attr('zc_status_id')
        };
        init_modal_confirm(data, accept_reservation);
    });
    $("#accept_reservation_venue_not_agree_to_list").click(function()
    {
        bootstrapError("This request cannot be accepted as the venue is not set to agree to list.");
    });
    $("#decline_reservation").click(function()
    {
        var data = {
            message: "Are you sure you want to decline this request?",
            reservation_id: reservationId,
            new_status_id: $("#decline_reservation").attr('zc_status_id')
        };
        init_modal_confirm(data, decline_reservation);
    });
    $("#update_reservation").click(function()
    {
        update_reservation(reservationId);
    });
    $("#resend_request_email").click(function()
    {
        var data = {
            message: 'Are you sure you want to resend the request email?',
            reservation_id: reservationId,
            status_id: $("#resend_request_email").attr('zc_status_id'),
            suppress_client: 1
        };
        init_modal_confirm(data, resend_reservation_email);
    });
    $("#resend_accept_email").click(function()
    {
        var data = {
            message: 'Are you sure you want to resend the acceptance email?',
            reservation_id: reservationId,
            status_id: $("#resend_accept_email").attr('zc_status_id')
        };
        init_modal_confirm(data, resend_reservation_email);
    });
    $("#resend_decline_email").click(function()
    {
        var data = {
            message: 'Are you sure you want to resend the declining email?',
            reservation_id: reservationId,
            status_id: $("#resend_decline_email").attr('zc_status_id')
        };
        init_modal_confirm(data, resend_reservation_email);
    });
    $("#resend_cancel_email").click(function()
    {
        var data = {
            message: 'Are you sure you want to resend the cancelling email?',
            reservation_id: reservationId,
            status_id: $("#resend_cancel_email").attr('zc_status_id')
        };
        init_modal_confirm(data, resend_reservation_email);
    });
    $("#mark_as_paid").click(function()
    {
        pay_reservation(reservationId);
    });
}

function resend_reservation_email(data)
{
    var postData = {
        reservation_id: data.reservation_id,
        status_id: data.status_id
    };
    if (typeof data.suppress_client != 'undefined' && data.suppress_client != null)
    {
        postData.suppress_client = data.suppress_client;
    }
    $.post(base_url + 'messages/resend_reservation_email', postData, null, "json"
    ).done(function(response)
    {
        if (response.error.occurred === true)
        {
            bootstrapError(response.error.message);
            enableModalButton(data.button);
        }
        else
        {
            enableModalButton(data.button);
            closeMainModal();
            bootstrapSuccess('Emails sent successfully (as long as venue is set to agree to list and the receiving email is not a zipcube email).');
        }
    }).fail(function()
    {
        bootstrapError('Failed at resending the email.');
    });
}

function update_venue_vat()
{
    var data = {
        room_id: $("#zc_reservation_room_id").val()
    };
    $.ajax({
        url: base_url + "api/v1/rooms/vatrate",
        data: data,
        dataType: "json",
        type: "GET",
        statusCode: {
            200: function(response) {
                if (typeof response != 'undefined' && response.length)
                {
                    response = JSON.parse(response);
                    $("#zc_venue_vat").val(response.data);
                }
            },
            403: function(err) {
                bootstrapError(err.responseJSON);
            }
        },
        error: function()
        {
            bootstrapError("Failed at finding the venue vat rate.");
        }
    });
}

function update_configuration()
{
    var data = {
        room_id: $("#zc_reservation_room_id").val()
    };
    $.ajax({
        url: base_url + "api/v1/rooms/configurations",
        data: data,
        dataType: "json",
        type: "GET",
        statusCode: {
            200: function(response) {
                if (typeof response != 'undefined' && response.length)
                {
                    var selectedConfig = $("#zc_reservation_configuration").val();
                    $("#zc_reservation_configuration option").remove();
                    if (typeof $("#zc_reservation_configuration").get(0) != 'undefined')
                    {
                        var configs = JSON.parse(response).data.objects;
                        $.each(configs, function(key, params)
                        {
                            var isSelected = (params.desc === selectedConfig);
                            $("#zc_reservation_configuration").get(0).options.add(new Option(params.desc + ' (' + params.max_capacity + ')', params.desc, isSelected, isSelected));
                        });
                    }
                }
            },
            403: function(err) {
                bootstrapError(err.responseJSON);
            },
            405: function(err) {
                bootstrapError(err.responseJSON);
            }
        },
        error: function()
        {
            bootstrapError("Failed at finding the configurations.");
        }
    });
}

function update_hours(reservationId)
{
    var data = {
        room_id: $("#zc_reservation_room_id").val(),
        reservation_id: reservationId
    };
    $.ajax({
        url: base_url + "api/v1/reservations/openinghours",
        data: data,
        dataType: "json",
        type: "GET",
        statusCode: {
            200: function(response) {
                if (typeof response != 'undefined' && response.length)
                {
                    response = JSON.parse(response);
                    if (typeof response.data.objects != 'undefined')
                    {
                        if (typeof $("#zc_reservation_start_time").get(0) != 'undefined')
                        {
                            var startDate = new Date(moment($("#zc_reservation_start_date").val(), 'DD-MM-YYYY').format('YYYY-MM-DD'));
                            if (typeof response.data.objects[startDate.getDay()] != 'undefined')
                            {
                                $("#zc_reservation_start_time").val(response.data.objects[startDate.getDay()].objects[0].start_formatted);
                            }
                        }
                        if (typeof $("#zc_reservation_end_time").get(0) != 'undefined')
                        {
                            var endDate = new Date(moment($("#zc_reservation_end_date").val(), 'DD-MM-YYYY').format('YYYY-MM-DD'));
                            if (typeof response.data.objects[endDate.getDay()] != 'undefined')
                            {
                                $("#zc_reservation_end_time").val(response.data.objects[endDate.getDay()].objects[0].end_formatted);
                            }
                        }
                    }
                }
            },
            403: function(err) {
                bootstrapError(err.responseJSON);
            },
            405: function(err) {
                bootstrapError(err.responseJSON);
            }
        },
        error: function()
        {
            bootstrapError("Failed at finding the hours.");
        }
    });
}

function update_commission_rate(reservationId)
{
    var data = {
        room_id: $("#zc_reservation_room_id").val(),
        reservation_id: reservationId
    };
    $.ajax({
        url: base_url + "api/v1/reservations/commission",
        data: data,
        dataType: "json",
        type: "GET",
        statusCode: {
            200: function(response) {
                if (typeof response != 'undefined' && response.length)
                {
                    response = JSON.parse(response);
                    update_commission_percentage(response.data);
                }
            },
            403: function(err) {
                bootstrapError(err.responseJSON);
            },
            405: function(err) {
                bootstrapError(err.responseJSON);
            }
        },
        error: function()
        {
            bootstrapError("Failed at finding the commission.");
        }
    });
}

function update_transaction_base_price(reservationId)
{
    var data = {
        room_id: $("#zc_reservation_room_id").val(),
        reservation_id: reservationId
    };
    $.ajax({
        url: base_url + "api/v1/reservations/baseprice",
        data: data,
        dataType: "json",
        type: "GET",
        statusCode: {
            200: function(response) {
                if (typeof response != 'undefined' && response.length)
                {
                    response = JSON.parse(response);
                    if (typeof response.data.trans_non != 'undefined')
                    {
                        var unformattedAddons = $("#zc_reservation_add_on_price").val().replace(/\,/g, '');
                        if ($("input:radio[name='zc_reservation_flexible_applied']:checked").val() == 1)
                        {
                            $("#zc_reservation_total_price").val(Number(response.data.trans_flex) + Number(unformattedAddons));
                        }
                        else
                        {
                            $("#zc_reservation_total_price").val(Number(response.data.trans_non) + Number(unformattedAddons));
                        }
                        $("#zc_reservation_base_price").val(Number(response.data.base));
                    }
                    update_price_control_fee();
                    update_commissionable_amount();
                }
            },
            403: function(err) {
                bootstrapError(err.responseJSON);
            },
            405: function(err) {
                bootstrapError(err.responseJSON);
            }
        },
        error: function()
        {
            bootstrapError("Failed at finding the new prices.");
        }
    });
}

function update_price_control_fee()
{
    var data = {
        room_id: $("#zc_reservation_room_id").val()
    };
    $.ajax({
        url: base_url + "api/v1/rooms/pricecontrolpercent",
        data: data,
        dataType: "json",
        type: "GET",
        statusCode: {
            200: function(response) {
                if (typeof response != 'undefined' && response.length)
                {
                    response = JSON.parse(response);
                    $("#zc_reservation_price_control_applied").val(response.data);
                    var unformattedPrice = $("#zc_reservation_base_price").val().replace(/\,/g, '');
                    $("#zc_reservation_price_control_fee").val(Number(Number(unformattedPrice) * (Number(response.data) / 100)).toFixed(4));
                    update_display_amount();
                }
            },
            403: function(err) {
                bootstrapError(err.responseJSON);
            }
        },
        error: function()
        {
            bootstrapError("Failed at finding the price control percentage.");
        }
    });
}

function update_commission_percentage(percent, updateComm = true)
{
    $("#zc_reservation_commission").val(percent);
    if ($("#zc_reservation_commission").val() == null && typeof $("#zc_reservation_commission").get(0) != 'undefined')
    {
        $("#zc_reservation_commission").get(0).options.add(new Option(percent + '%', percent, true, true));
    }
    $("#zc_reservation_commission option[value='" + percent + "']").prop('selected', 'selected');
    if (updateComm)
    {
        update_commission();
    }
}

function update_commission()
{
    if ($("#zc_reservation_commission").val() != null)
    {
        var unformattedPrice = $("#zc_reservation_commissionable_amount").val().replace(/\,/g, '');
        var toVenue = Number(unformattedPrice * ((100 - $("#zc_reservation_commission option:selected").val()) / 100));
        var toZipcube = Number(unformattedPrice - toVenue);
        var toVenue_vat = Number(toZipcube * ($("#zc_venue_vat").val() / 100));
        $("#zc_reservation_toZipcube").val(Number(toZipcube).toFixed(4));
        $("#zc_reservation_toVenue").val(Number(toVenue).toFixed(4));
        $("#zc_reservation_toVenue_with_vat").val(Number(toVenue - toVenue_vat).toFixed(4));
    }
}

function update_display_amount()
{
    var unformattedPrice = $("#zc_reservation_base_price").val().replace(/\,/g, '');
    var price_control_fee = Number(Number(unformattedPrice) * (Number($("#zc_reservation_price_control_applied").val()) / 100)).toFixed(4);
    $("#zc_reservation_price_control_fee").val(price_control_fee);
    $("#zc_reservation_display_price").val(Number(Number(unformattedPrice) + Number(price_control_fee)).toFixed(4));
    update_flexible_fee();
}

function update_extra_fee()
{
    var unformattedTotal = $("#zc_reservation_total_price").val().replace(/\,/g, '');
    var unformattedFlex = $("#zc_reservation_flexible_fee").val().replace(/\,/g, '');
    var unformattedAddons = $("#zc_reservation_add_on_price").val().replace(/\,/g, '');
    var unformattedDisplay = $("#zc_reservation_display_price").val().replace(/\,/g, '');
    var extra_fee = Number(Number(unformattedTotal) - Number(unformattedFlex) - Number(unformattedAddons) - Number(unformattedDisplay));
    if (Math.abs(extra_fee).toFixed(4) == 0)
    {
        $("#zc_reservation_extra_fee").val(0);
    }
    else
    {
        $("#zc_reservation_extra_fee").val(Number(Number(unformattedTotal) - Number(unformattedFlex) - Number(unformattedAddons) - Number(unformattedDisplay)).toFixed(4));
    }
}

function update_flexible_fee()
{
    if ($("input:radio[name='zc_reservation_flexible_applied']").length > 0)
    {
        var data = {
            room_id: $("#zc_reservation_room_id").val()
        };
        $.ajax({
            url: base_url + "api/v1/rooms/flexiblepercent",
            data: data,
            dataType: "json",
            type: "GET",
            statusCode: {
                200: function(response) {
                    if (typeof response != 'undefined' && response.length)
                    {
                        response = JSON.parse(response);
                        $("#zc_reservation_flexible_percent").text(response.data);
                        if ($("input:radio[name='zc_reservation_flexible_applied']:checked").val() == 1)
                        {
                            var unformattedDisplay = $("#zc_reservation_display_price").val().replace(/\,/g, '');
                            $("#zc_reservation_flexible_fee").val(Number(Number(unformattedDisplay) * (Number(response.data) / 100)).toFixed(4));
                        }
                        else
                        {
                            $("#zc_reservation_flexible_fee").val(0);
                        }
                        update_extra_fee();
                    }
                },
                403: function(err) {
                    bootstrapError(err.responseJSON);
                }
            },
            error: function()
            {
                bootstrapError("Failed at finding the flexible percentage.");
            }
        });
    }
    else
    {
        var unformattedDisplay = $("#zc_reservation_display_price").val().replace(/\,/g, '');
        $("#zc_reservation_flexible_fee").val(Number(Number(unformattedDisplay) * (Number($("#zc_reservation_flexible_percent").text()) / 100)).toFixed(4));
        update_extra_fee();
    }
}

function update_addons_amount()
{
    var unformattedAddons = $("#zc_reservation_add_on_price").val().replace(/\,/g, '');
    $("#zc_reservation_add_on_price_readonly").val(unformattedAddons);
}

function update_commissionable_amount()
{
    var unformattedPrice = $("#zc_reservation_base_price").val().replace(/\,/g, '');
    var unformattedAddons = $("#zc_reservation_add_on_price").val().replace(/\,/g, '');
    var CommAmount = Number(Number(unformattedPrice) + Number(unformattedAddons)).toFixed(4);
    $("#zc_reservation_commissionable_amount").val(CommAmount);
    if (CommAmount == 0)
    {
        update_commission_percentage(0, true);
    }
    else
    {
        update_commission();
    }
}

function update_payout()
{
    var unformattedPayout = $("#zc_reservation_toVenue_with_vat").val().replace(/\,/g, '');
    var unformattedCommAmount = $("#zc_reservation_commissionable_amount").val().replace(/\,/g, '');
    var commAmount = (Number(unformattedCommAmount) - Number(unformattedPayout)) / (1 + ($("#zc_venue_vat").val() / 100));
    var toVenue_vat = Number(commAmount * ($("#zc_venue_vat").val() / 100));
    $("#zc_reservation_toZipcube").val(Number(commAmount).toFixed(4));
    $("#zc_reservation_toVenue").val(Number(Number(unformattedPayout) + toVenue_vat).toFixed(4));
    if (unformattedCommAmount > 0)
    {
        var commPercent = Number(Number(commAmount / unformattedCommAmount) * 100).toFixed(2);
        update_commission_percentage(commPercent, false);
    }
    else
    {
        update_commission_percentage(0, false);
    }
}

function reload_modal(reservationId)
{
    clearMainModal();
    $("#modal_slide_up_content").load(base_url + country_lang_url + '/common_protected/modal_reservation_details/' + reservationId, function()
    {
        verticallyCenterModal();
        activate_reservation_modal_listeners(reservationId);
        cancelButtonListener();
        $("#mainModal").on("hidden.bs.modal", function()
        {
            location.reload();
        });
    });
}

function cancelreservation(data)
{
    var postData = {
        new_status_id: data.new_status_id,
        price: data.new_price,
        toVenue: data.new_toVenue,
        extra_fee: data.new_extra_fee,
        flexible_applied: data.new_flexible_applied,
        flexible_fee: data.new_flexible_fee,
        price_control_fee: data.new_price_control_fee,
        add_on_price: data.new_add_on_price,
        comments: data.new_comments,
        add_ons: data.new_add_ons,
        zipcube_notes: data.new_zipcube_notes
    };
    $.post(base_url + country_lang_url + '/api_json/Reservation_Update/' + data.reservation_id, postData, null, "json"
    ).done(function(response)
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
    }).fail(function(response)
    {
        bootstrapError("Something went wrong - " + response);
        enableModalButton(data.button);
    });
}

function mark_reservation_as_switch(reservation_id)
{
    var data = {
        requires_switch: true,
        id: reservation_id
    };
    $.ajax({
        url: base_url + "api/v1/reservations",
        data: data,
        dataType: "json",
        type: "PUT",
        statusCode: {
            200: function() {
                location.reload();
            },
            403: function(err) {
                bootstrapError(err.responseJSON);
            },
            405: function(err) {
                bootstrapError(err.responseJSON);
            }
        },
        error: function()
        {
            bootstrapError("There was a general error while updating the field.");
        }
    });
}

function delete_reservation(reservation_id, deletionConstant)
{
    var data = {
        new_status_id: deletionConstant
    };
    $.post(base_url + country_lang_url + '/api_json/Reservation_Update/' + reservation_id, data, null, "json"
    ).done(function(response)
    {
        if (response.error.occurred === true)
        {
            bootstrapError(response.error.message);
        }
        else
        {
            $('#calendar').fullCalendar('removeEvents', reservation_id);
        }
    }).fail(function(response)
    {
        bootstrapError("Failed for some reason - " + response.error.message + ".");
    });
}

function accept_reservation(data)
{
    var postData = {
        new_status_id: data.new_status_id
    };
    $.ajax({
        url: '/' + country_lang_url + '/api_json/Reservation_Update/' + data.reservation_id,
        data: postData,
        dataType: 'json',
        type: 'POST',
        success: function()
        {
            enableModalButton(data.button);
            reload_modal(data.reservation_id);
        },
        error: function(response)
        {
            bootstrapError("Something went wrong - " + response);
            enableModalButton(data.button);
        }
    });
}

function decline_reservation(data)
{
    var postData = {
        new_status_id: data.new_status_id
    };
    $.ajax({
        url: '/' + country_lang_url + '/api_json/Reservation_Update/' + data.reservation_id,
        data: postData,
        dataType: 'json',
        type: 'POST',
        success: function()
        {
            enableModalButton(data.button);
            closeMainModal();
            location.reload();
        },
        error: function(response)
        {
            bootstrapError("Something went wrong - " + response);
            enableModalButton(data.button);
        }
    });
}

function mark_as_paid(reservationId)
{
    var data = {
        reservation_id: reservationId,
        amount: $("#zc_reservation_venue_payment").val()
    };
    $.ajax({
        url: '/' + country_lang_url + '/api_json/Reservation_Venue_Payment/',
        data: data,
        dataType: 'json',
        type: 'POST',
        success: function()
        {
            enableModalButton(data.button);
            closeMainModal();
            location.reload();
        },
        error: function(response)
        {
            bootstrapError("Something went wrong - " + response);
            enableModalButton(data.button);
        }
    });
}

function pay_reservation(reservationId)
{
    clearMainModal();
    $("#modal_slide_up_content").load(base_url + country_lang_url + '/common_protected/modal_pay_reservation/' + reservationId, function()
    {
        verticallyCenterModal();
        activate_pay_modal_listeners(reservationId);
        cancelButtonListener();
    });
}

function activate_pay_modal_listeners(reservationId)
{
    $("#mark_as_paid").click(function()
    {
        mark_as_paid(reservationId);
    });
}

function update_reservation(reservationId)
{
    clearMainModal();
    $("#modal_slide_up_content").load(base_url + country_lang_url + '/common_protected/modal_update_reservation/' + reservationId, function()
    {
        verticallyCenterModal();
        activate_modal_listeners(reservationId);
        activate_update_modal_listeners(reservationId);
        cancelButtonListener();
        $('#zc_reservation_start_date, #zc_reservation_end_date').datepicker({
            dateFormat: "dd/mm/yy",
            minDate: null
        });
        $.datepicker.setDefaults($.datepicker.regional[language_code]);
    });
}

function activate_modal_listeners()
{
    $("#zc_reservation_total_price").change(function()
    {
        var unformattedVal = $(this).val().replace(/\,/g, '');
        if (isNaN(unformattedVal) || unformattedVal < 0)
        {
            bootstrapError("Please enter a positive number.");
        }
        else
        {
            update_extra_fee();
        }
    });
    $("#zc_reservation_commission").change(function()
    {
        update_commission();
    });
    $("#zc_reservation_base_price").change(function()
    {
        var unformattedVal = $(this).val().replace(/\,/g, '');
        if (isNaN(unformattedVal) || unformattedVal < 0)
        {
            bootstrapError("Please enter a positive number.");
        }
        else
        {
            update_display_amount();
            update_commissionable_amount();
        }
    });
    $("#zc_reservation_add_on_price").change(function()
    {
        var unformattedVal = $(this).val().replace(/\,/g, '');
        if (isNaN(unformattedVal) || unformattedVal < 0)
        {
            bootstrapError("Please enter a positive number.");
        }
        else
        {
            update_addons_amount();
            update_extra_fee();
            update_commissionable_amount();
        }
    });
    $("#zc_reservation_toVenue_with_vat").change(function()
    {
        var unformattedVal = $(this).val().replace(/\,/g, '');
        if (isNaN(unformattedVal) || unformattedVal < 0)
        {
            bootstrapError("Please enter a positive number.");
        }
        else
        {
            update_payout();
        }
    });
}

function activate_update_modal_listeners(reservationId)
{
    $("#zc_reservation_room_id").change(function()
    {
        if (isNaN($(this).val()) || $(this).val() < 0)
        {
            bootstrapError("Please enter a positive number.");
        }
        else
        {
            update_venue_vat();
            update_configuration();
            update_hours(reservationId);
            update_commission_rate(reservationId);
            update_transaction_base_price(reservationId);
        }
    });
    $("#confirm_update").click(function()
    {
        getUpdateData(reservationId);
    });
    $("input:radio[name='zc_reservation_flexible_applied']").change(function()
    {
        update_flexible_fee();
    });
}

function activate_cancel_modal_listeners()
{
    $("#full_refund_btn").click(function()
    {
        $("#zc_reservation_total_price").val(0);
        $("#zc_reservation_base_price").val(0);
        $("#zc_reservation_extra_fee").val(0);
        $("#zc_reservation_flexible_fee").val(0);
        $("#zc_reservation_display_price").val(0);
        $("#zc_reservation_price_control_fee").val(0);
        $("#zc_reservation_commissionable_amount").val(0);
        $("#zc_reservation_add_on_price").val(0);
        $("#zc_reservation_add_on_price_readonly").val(0);
        update_commission_percentage(0);
    });
}

function getUpdateData(reservationId)
{
    var data = {
        reservation_id: reservationId
    };
    var unformattedCommAmount = $("#zc_reservation_commissionable_amount").val().replace(/\,/g, '');
    var unformattedPayout = $("#zc_reservation_toVenue_with_vat").val().replace(/\,/g, '');
    var unformattedTotal = $("#zc_reservation_total_price").val().replace(/\,/g, '');
    var unformattedPrice = $("#zc_reservation_base_price").val().replace(/\,/g, '');
    var unformattedAddons = $("#zc_reservation_add_on_price").val().replace(/\,/g, '');
    var startDateTimeMoment = moment($("#zc_reservation_start_date").val() + " " + $("#zc_reservation_start_time").val() + ":00", 'DD-MM-YYYY HH:mm:ss');
    var endDateTimeMoment = moment($("#zc_reservation_end_date").val() + " " + $("#zc_reservation_end_time").val() + ":00", 'DD-MM-YYYY HH:mm:ss');
    if ($("#zc_reservation_room_id").val() == "" ||
            $("#zc_reservation_start_date").val() == "" ||
            $("#zc_reservation_end_date").val() == "" ||
            $("#zc_reservation_start_time").val() == "" ||
            $("#zc_reservation_end_time").val() == "" ||
            $("#zc_reservation_guests").val() == "" ||
            $("#zc_reservation_base_price").val() == "" ||
            $("#zc_reservation_toVenue_with_vat").val() == "")
    {
        bootstrapError("Please ensure all relevant fields are filled in.");
    }
    else if(Number(unformattedCommAmount) < Number(unformattedPayout) || Number(unformattedTotal) < Number(unformattedPayout) || Number(unformattedTotal) < Number(unformattedCommAmount))
    {
        bootstrapError("Please ensure the commissionable amount, total price and payout are correct.");
    }
    else if (isNaN(unformattedTotal) || isNaN(unformattedPrice) || isNaN(unformattedAddons) || isNaN($("#zc_reservation_commission").val()) || isNaN(unformattedPayout) || isNaN($("#zc_reservation_room_id").val()))
    {
        bootstrapError("Please ensure that only numbers are entered into the number fields.");
    }
    else if (endDateTimeMoment.isBefore(startDateTimeMoment))
    {
        bootstrapError("Please ensure that the start and end dates are correct.");
    }
    else
    {
        data.message = "Are you sure you want to update this reservation?";
        data.redundant_reservation_id = $("#zc_redundant_reservation_id").val();
        var postData = {
            room_id: $("#zc_reservation_room_id").val(),
            start_date_time: startDateTimeMoment.format('YYYY-MM-DD HH:mm:ss'),
            end_date_time: endDateTimeMoment.format('YYYY-MM-DD HH:mm:ss'),
            guests: $("#zc_reservation_guests").val(),
            price: $("#zc_reservation_commissionable_amount").val(),
            toVenue: $("#zc_reservation_toVenue").val(),
            extra_fee: $("#zc_reservation_extra_fee").val(),
            flexible_applied: $("input:radio[name='zc_reservation_flexible_applied']:checked").val(),
            flexible_fee: $("#zc_reservation_flexible_fee").val(),
            price_control_applied: $("#zc_reservation_price_control_applied").val(),
            price_control_fee: $("#zc_reservation_price_control_fee").val(),
            add_on_price: $("#zc_reservation_add_on_price").val(),
            comments: $("#zc_reservation_comments").val(),
            add_ons: $("#zc_reservation_add_ons").val(),
            configuration: $("#zc_reservation_configuration").val(),
            zipcube_notes: $("#zc_reservation_notes").val()
        };
        data.post_data = postData;
        init_modal_confirm(data, make_update);
    }
}

function make_update(data)
{
    $.ajax({
        url: '/' + country_lang_url + '/api_json/Reservation_Update/' + data.redundant_reservation_id,
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
