$(document).ready(function()
{
    attachModals();
    updateVenueFields();
});

function attachModals()
{
    $(".zc_venue_sponsor_btn").each(function()
    {
        $(this).off('click');
        $(this).click(function()
        {
            init_venue_sponsor($(this)); //From modal/venues.js
        });
    });
    $(".zc_venue_approve_btn").each(function()
    {
        $(this).off('click');
        $(this).click(function()
        {
            init_venue_approve($(this)); //From modal/venues.js
        });
    });
    $(".zc_edit_venue_btn").each(function()
    {
        $(this).off('click');
        $(this).click(function()
        {
            init_edit_venue($(this)); //From modal/venues.js
        });
    });
}

function updateVenueFields()
{
    $('.zc_venue_approval').change(function()
    {
        var data = {
            approved: +$(this).is(':checked'),
            id: $(this).val()
        };
        venueFieldsAPI(data);
    });
    $('.zc_venue_live_bookings').change(function()
    {
        var data = {
            uses_live_bookings: +$(this).is(':checked'),
            id: $(this).val()
        };
        venueFieldsAPI(data);
    });
    $('.zc_venue_non_original_desc').change(function()
    {
        var data = {
            non_original_desc: +$(this).is(':checked'),
            id: $(this).val()
        };
        venueFieldsAPI(data);
    });
    $('.zc_venue_city').change(function()
    {
        var data = {
            id: $(this).attr('zc_venue_token'),
            address:  {
                city: $(this).val()
            }
        };
        venueFieldsGQL(data);
    });
    $('.zc_venue_town').change(function()
    {
        var data = {
            id: $(this).attr('zc_venue_token'),
            address:  {
                town: $(this).val()
            }
        };
        venueFieldsGQL(data);
    });
    $('.zc_venue_country').change(function()
    {
        var data = {
            id: $(this).attr('zc_venue_token'),
            address:  {
                country: $(this).val()
            }
        };
        venueFieldsGQL(data);
    });
    $('.zc_delete_venue_btn').click(function()
    {
        var data = {
            message: "Are you sure you want to remove this venue, plus all of it's rooms?",
            venueData: {
                id: $(this).data('id')
            }
        };
        init_modal_delete(data, venue_delete);
    });
    $("#zc_venue_desc_edit").click(function()
    {
        add_editor($('#zc_venue_desc'));
        $("#zc_venue_desc_save").show();
        $(this).hide();
    });
    $("#zc_venue_desc_save").click(function()
    {
        var scopeThis = $(this);
        var newData = check_editor_data($("#zc_venue_desc"), $("#venue_desc"));
        if (newData !== false)
        {
            var data = {
                id: $(this).data("id"),
                description: newData
            };
            $.ajax({
                url: base_url + "api/v1/venues",
                data: data,
                dataType: "json",
                type: "PUT",
                statusCode: {
                    200: function(response) {
                        remove_editor($('#zc_venue_desc'));
                        scopeThis.hide();
                        if (typeof response != 'undefined' && response.length)
                        {
                            var venue_desc = JSON.parse(response).data;
                            $("#venue_desc").html(venue_desc.description);
                        }
                        $("#zc_venue_desc_edit").show();
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
        else
        {
            remove_editor($('#zc_venue_desc'));
            scopeThis.hide();
            $("#zc_venue_desc_edit").show();
        }
    });
     $('.zc_venue_stage').change(function()
    {
        var data = {
            stage: $(this).val(),
            id: $(this).attr('zc_object_id')
        };
        venueFieldsAPI(data);
    });
    $('.zc_venue_assigned_admin').change(function()
    {
        var data = {
            assignedAdmin: $(this).val(),
            id: $(this).attr('zc_object_id')
        };
        venueFieldsAPI(data);
    });
    $('.zc_venue_notes_edit').click(function()
    {
        var venue_id = $(this).data('id');
        $('.zc_venue_notes').each(function()
        {
            if (venue_id == $(this).data('id'))
            {
                var $textarea = $("<textarea>", {
                    val: $(this).text()
                });
                $textarea.addClass("zc_venue_notes");
                $textarea.attr('data-id', venue_id);
                $textarea.attr('data-oldtext', $(this).text());
                $(this).replaceWith($textarea);
                $textarea.focus();
            }
        });
        $('.zc_venue_notes_save, .zc_venue_notes_cancel').each(function()
        {
            if (venue_id == $(this).data('id'))
            {
                $(this).show();
            }
        });
        $(this).hide();
    });
    $('.zc_venue_notes_save').click(function()
    {
        var venue_id = $(this).data('id');
        $('.zc_venue_notes').each(function()
        {
            if (venue_id == $(this).data('id'))
            {
                var $span = $("<span>", {
                    text: $(this).val()
                });
                $span.addClass("zc_venue_notes");
                $span.attr('data-id', venue_id);
                $(this).replaceWith($span);
                var data = {
                    notes: $(this).val(),
                    id: venue_id
                };
                venueFieldsAPI(data);
            }
        });
        $('.zc_venue_notes_edit').each(function()
        {
            if (venue_id == $(this).data('id'))
            {
                $(this).show();
            }
        });
        $('.zc_venue_notes_cancel').each(function()
        {
            if (venue_id == $(this).data('id'))
            {
                $(this).hide();
            }
        });
        $(this).hide();
    });
    $('.zc_venue_notes_cancel').click(function()
    {
        var venue_id = $(this).data('id');
        $('.zc_venue_notes').each(function()
        {
            if (venue_id == $(this).data('id'))
            {
                var $span = $("<span>", {
                    text: $(this).data('oldtext')
                });
                $span.addClass("zc_venue_notes");
                $span.attr('data-id', venue_id);
                $(this).replaceWith($span);
            }
        });
        $('.zc_venue_notes_edit').each(function()
        {
            if (venue_id == $(this).data('id'))
            {
                $(this).show();
            }
        });
        $('.zc_venue_notes_save').each(function()
        {
            if (venue_id == $(this).data('id'))
            {
                $(this).hide();
            }
        });
        $(this).hide();
    });
}

function venue_delete(data)
{
    $.ajax({
        url: base_url + "api/v1/venues",
        data: data.venueData,
        dataType: "json",
        type: "DELETE",
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
            bootstrapError("There was a general error while deleting the venue.");
        }
    });
}

function venueFieldsAPI(data)
{
    $.ajax({
        url: base_url + "api/v1/venues",
        data: data,
        dataType: "json",
        type: "PUT",
        statusCode: {
            403: function(err) {
                bootstrapError(err.responseJSON);
            },
            405: function(err) {
                bootstrapError(err.responseJSON);
            },
            409: function(err) {
                bootstrapError(err.responseJSON);
            }
        },
        error: function()
        {
            bootstrapError("There was a general error while updating the field.");
        }
    });
}

function venueFieldsGQL(data)
{
    var mutation = {
        operationName: 'addressPatch',
        query: 'mutation addressPatch($input: patchAddressInput!) { patchAddress(input: $input) { problems { type message } } }',
        variables: {
            input: data
        }
    };
    $.ajax({
        url: `${zc_api_url}/graphql`,
        data: JSON.stringify(mutation),
        dataType: "json",
        type: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `bearer ${zc_token}`
        }
    }).done(function(response)
    {
        if (response.data.patchAddress.problems.length > 0)
        {
            bootstrapError('There was a general error while updating the field.');
        }
    }).fail(function()
    {
        bootstrapError('There was a general error while updating the field.');
    });
}