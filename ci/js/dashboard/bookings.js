$(document).ready(function()
{
    userbookingSelector();
    receiptModal();
    appendTableOrderingListeners();
});

function userbookingSelector()
{
    $(".zc_booking_list").click(function()
    {
        var data = {
            value: $(this).text(),
            page_type: $(this).attr('page_type')
        };
        if ($(this).attr('zc_object_id'))
        {
            data.reservation_status_id = $(this).attr('zc_object_id');
            assignOrderingData('reservation_status_id', $(this).attr('zc_object_id'));
        }
        else
        {
            data.option = $(this).attr('filter_type');
            assignOrderingData('option', $(this).attr('filter_type'));
        }
        $.post(base_url + country_lang_url + "/dashboard/update_user_booking_list", data, null, "json"
        ).done(function(response)
        {
            if (response.error.occurred === true)
            {
                bootstrapError(response.error.message);
            }
            else
            {
                $('#zc_booking_rows').empty();
                $('#zc_booking_rows').append(response.data.html);
                $('#zc_booking_option_btn').contents().first().replaceWith(response.data.buttonText);
                receiptModal();
            }
        }).fail(function()
        {
            bootstrapError("Failed at the booking list update stage.");
        });
    });
}

function receiptModal()
{
    $(".zc_receipt_page").each(function()
    {
        $(this).click(function()
        {
            clearFullModal();
            $("#full_modal").on("shown.bs.modal", function()
            {
                $("#full_modal").on("hidden.bs.modal", function()
                {
                    $("#full_modal").off("shown.bs.modal");
                });
            });
            $('#full_modal_content').load(base_url + country_lang_url + '/dashboard/message_request_modal/' + $(this).attr('zc_object_id'), function()
            {
                $('#full_modal').modal('show');
            });
        });
    });
}

function appendTableOrderingListeners()
{
    $(".zc_bookings_ordering").click(function()
    {
        var scopeThis = $(this);
        var data = {
            value: $("#zc_booking_option_btn").text().trim(),
            page_type: $(this).attr('page_type'),
            order_field: $(this).attr('ordering_field'),
            order_direction: $(this).attr('zc_current_order')
        };
        if ($(this).attr('zc_booking_type') == 'reservation_status_id')
        {
            data.reservation_status_id = $(this).attr('zc_booking_option');
        }
        else
        {
            data.option = $(this).attr('zc_booking_option');
        }
        $.post(base_url + country_lang_url + "/dashboard/update_user_booking_list", data, null, "json"
        ).done(function(response)
        {
            if (response.error.occurred === true)
            {
                bootstrapError(response.error.message);
            }
            else
            {
                $('#zc_booking_rows').empty();
                $('#zc_booking_rows').append(response.data.html);
                $('#zc_booking_option_btn').contents().first().replaceWith(response.data.buttonText);
                scopeThis.attr('zc_current_order', scopeThis.attr('zc_current_order') * -1);
                receiptModal();
            }
        }).fail(function()
        {
            bootstrapError("Failed at the booking list update stage.");
        });
    });
}

function assignOrderingData(type, option)
{
    $(".zc_bookings_ordering").each(function()
    {
        $(this).attr('zc_booking_type', type);
        $(this).attr('zc_booking_option', option);
        $(this).attr('zc_current_order', -1);
    });
}
