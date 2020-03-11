$(document).ready(function()
{
    attachModals();
    updateBookingFields();
});

function attachModals()
{
    $(".zc_view_booking_btn").each(function()
    {
        $(this).off('click');
        $(this).click(function()
        {
            init_view_booking($(this)); //From modal/reservation_details.js
        });
    });
    $(".zc_cancel_booking_btn").each(function()
    {
        $(this).off('click');
        $(this).click(function()
        {
            init_cancel_booking($(this)); //From modal/reservation_details.js
        });
    });
    $(".zc_onboard_venue_btn").each(function()
    {
        $(this).off('click');
        $(this).click(function()
        {
            init_onboard_venue($(this)); //From modal/onboard_venues.js
        });
    });
    $(".zc_invoice_payment").each(function()
    {
        $(this).off('click');
        $(this).click(function()
        {
            init_view_payment($(this)); //From modal/booking_payments.js
        });
    });
    $(".zc_add_payment").each(function()
    {
        $(this).off('click');
        $(this).click(function()
        {
            init_add_payment($(this)); //From modal/booking_payments.js
        });
    });
    $(".zc_reservation_audit").each(function()
    {
        $(this).off('click');
        $(this).click(function()
        {
            init_reservation_audit($(this)); //From modal/reservation_audit.js
        });
    });
    $(".zc_reservation_messages").each(function()
    {
        $(this).off('click');
        $(this).click(function()
        {
            init_reservation_messages($(this)); //From modal/reservation_audit.js
        });
    });
    $(".zc_reservation_payment_audit").each(function()
    {
        $(this).off('click');
        $(this).click(function()
        {
            init_reservation_payment_audit($(this)); //From modal/reservation_audit.js
        });
    });
}

function updateBookingFields()
{
    $('.zc_source').change(function()
    {
        var data = {
            source: $(this).val(),
            id: $(this).attr('zc_object_id')
        };
        bookingFieldsAPI(data);
    });
    $('.zc_assigned_user').change(function()
    {
        var data = {
            assigned_user: $(this).val(),
            id: $(this).attr('zc_object_id')
        };
        bookingFieldsAPI(data);
    });
    $('.zc_notes_edit').click(function()
    {
        var res_id = $(this).data('id');
        $('.zc_notes').each(function()
        {
            if (res_id == $(this).data('id'))
            {
                var $textarea = $("<textarea>", {
                    val: $(this).text()
                });
                $textarea.addClass("zc_notes");
                $textarea.attr('data-id', res_id);
                $textarea.attr('data-oldtext', $(this).text());
                $(this).replaceWith($textarea);
                $textarea.focus();
            }
        });
        $('.zc_notes_save, .zc_notes_cancel').each(function()
        {
            if (res_id == $(this).data('id'))
            {
                $(this).show();
            }
        });
        $(this).hide();
    });
    $('.zc_notes_save').click(function()
    {
        var res_id = $(this).data('id');
        $('.zc_notes').each(function()
        {
            if (res_id == $(this).data('id'))
            {
                var $span = $("<span>", {
                    text: $(this).val()
                });
                $span.addClass("zc_notes");
                $span.attr('data-id', res_id);
                $(this).replaceWith($span);
                var data = {
                    zipcube_notes: $(this).val(),
                    id: res_id
                };
                bookingFieldsAPI(data);
            }
        });
        $('.zc_notes_edit').each(function()
        {
            if (res_id == $(this).data('id'))
            {
                $(this).show();
            }
        });
        $('.zc_notes_cancel').each(function()
        {
            if (res_id == $(this).data('id'))
            {
                $(this).hide();
            }
        });
        $(this).hide();
    });
    $('.zc_notes_cancel').click(function()
    {
        var res_id = $(this).data('id');
        $('.zc_notes').each(function()
        {
            if (res_id == $(this).data('id'))
            {
                var $span = $("<span>", {
                    text: $(this).data('oldtext')
                });
                $span.addClass("zc_notes");
                $span.attr('data-id', res_id);
                $(this).replaceWith($span);
            }
        });
        $('.zc_notes_edit').each(function()
        {
            if (res_id == $(this).data('id'))
            {
                $(this).show();
            }
        });
        $('.zc_notes_save').each(function()
        {
            if (res_id == $(this).data('id'))
            {
                $(this).hide();
            }
        });
        $(this).hide();
    });
}

function bookingFieldsAPI(data)
{
    $.ajax({
        url: base_url + "api/v1/reservations",
        data: data,
        dataType: "json",
        type: "PUT",
        statusCode: {
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