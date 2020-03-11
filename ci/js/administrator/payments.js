$(document).ready(function()
{
    changeSelectors();
    attachJqueryDatePicker();
    postMonthlyTable();
    postFlexibleTable();
    postBookingTypeTable();
    postControlTable();
    postVenueTable();
    postRoomTable();
});

function postMonthlyTable()
{
    var data = {
        start: $("#zc_start_website").val(),
        duration: $("#zc_duration_website").val()
    };
    $('#website_overview').empty();
    $('#website_overview').append('<img src="/images/loading.gif">');
    $.get(base_url + "api/v1/finance/monthly", data, null, "json"
    ).done(function(response)
    {
        if (response.error.occurred === true)
        {
            bootstrapError(response.error.message);
        }
        else
        {
            $('#website_overview').empty();
            $('#website_overview').append(response.data.html);
        }
    }).fail(function()
    {
        bootstrapError("Failed at the overview table update stage.");
    });
}

function postFlexibleTable()
{
    var data = {
        start: $("#zc_start_flexible").val(),
        duration: $("#zc_duration_flexible").val()
    };
    $('#flexible_booking').empty();
    $('#flexible_booking').append('<img src="/images/loading.gif">');
    $.get(base_url + "api/v1/finance/flexible", data, null, "json"
    ).done(function(response)
    {
        if (response.error.occurred === true)
        {
            bootstrapError(response.error.message);
        }
        else
        {
            $('#flexible_booking').empty();
            $('#flexible_booking').append(response.data.html);
        }
    }).fail(function()
    {
        bootstrapError("Failed at the flexible table update stage.");
    });
}

function postBookingTypeTable()
{
    var data = {
        start: $("#zc_start_bookingtype").val(),
        duration: $("#zc_duration_bookingtype").val()
    };
    $('#booking_by_type').empty();
    $('#booking_by_type').append('<img src="/images/loading.gif">');
    $.get(base_url + "api/v1/finance/split", data, null, "json"
    ).done(function(response)
    {
        if (response.error.occurred === true)
        {
            bootstrapError(response.error.message);
        }
        else
        {
            $('#booking_by_type').empty();
            $('#booking_by_type').append(response.data.html);
        }
    }).fail(function()
    {
        bootstrapError("Failed at the booking type table update stage.");
    });
}

function postControlTable()
{
    var data = {
        start: $("#zc_start_control").val()
    };
    $('#venue_control').empty();
    $('#venue_control').append('<img src="/images/loading.gif">');
    $.get(base_url + "api/v1/finance/control", data, null, "json"
    ).done(function(response)
    {
        if (response.error.occurred === true)
        {
            bootstrapError(response.error.message);
        }
        else
        {
            $('#venue_control').empty();
            $('#venue_control').append(response.data.html);
        }
    }).fail(function()
    {
        bootstrapError("Failed at the control table update stage.");
    });
}

function postVenueTable()
{
    var data = {
        start: $("#zc_start_venues").val(),
        duration: $("#zc_duration_venues").val()
    };
    $('#venues').empty();
    $('#venues').append('<img src="/images/loading.gif">');
    $.get(base_url + "api/v1/finance/venue", data, null, "json"
    ).done(function(response)
    {
        if (response.error.occurred === true)
        {
            bootstrapError(response.error.message);
        }
        else
        {
            $('#venues').empty();
            $('#venues').append(response.data.html);
        }
    }).fail(function()
    {
        bootstrapError("Failed at the venue table update stage.");
    });
}

function postRoomTable()
{
    var data = {
        start: $("#zc_start_rooms").val(),
        duration: $("#zc_duration_rooms").val()
    };
    $('#rooms').empty();
    $('#rooms').append('<img src="/images/loading.gif">');
    $.get(base_url + "api/v1/finance/room", data, null, "json"
    ).done(function(response)
    {
        if (response.error.occurred === true)
        {
            bootstrapError(response.error.message);
        }
        else
        {
            $('#rooms').empty();
            $('#rooms').append(response.data.html);
        }
    }).fail(function()
    {
        bootstrapError("Failed at the room table update stage.");
    });
}

function changeSelectors()
{
    $("#zc_start_website, #zc_duration_website").change(function()
    {
        postMonthlyTable();
    });
    $("#zc_start_flexible, #zc_duration_flexible").change(function()
    {
        postFlexibleTable();
    });
    $("#zc_start_bookingtype, #zc_duration_bookingtype").change(function()
    {
        postBookingTypeTable();
    });
    $("#zc_start_control").change(function()
    {
        postControlTable();
    });
    $("#zc_start_venues, #zc_duration_venues").change(function()
    {
        postVenueTable();
    });
    $("#zc_start_rooms, #zc_duration_rooms").change(function()
    {
        postRoomTable();
    });
}

function attachJqueryDatePicker()
{
    $.datepicker.setDefaults($.datepicker.regional[language_code]);
    $('#zc_start_website, #zc_start_flexible, #zc_start_bookingtype, #zc_start_control, #zc_start_venues, #zc_start_rooms').datepicker({
        dateFormat: "yy-mm-dd",
        minDate: null
    });
}