$(document).ready(function()
{
    $(".zc_venue_list").click(function()
    {
        updateVenueListing($(this).attr('zc_object_id'));
    });
    toggleAmenity();
    attach_edit_amenity_modals();
    attach_add_amenity_modals();
    multiSelectDropdown();
});

function updateVenueListing(asset_id)
{
    var data = {
        asset_id: asset_id
    };
    $.post(base_url + "dashboard/update_venue_amenities_list", data, null, "json"
    ).done(function(response)
    {
        if (response.error.occurred === true)
        {
            customAlert(response.error);
        }
        else
        {
            $('#zc_venue_amenity_list').empty();
            $('#zc_venue_amenity_list').append(response.data.html);
            $('#zc_venue_option_btn').contents().first().replaceWith(response.data.buttonText);
            applySwitchesToCheckboxes();
            toggleAmenity();
            attach_edit_amenity_modals();
            attach_add_amenity_modals();
            multiSelectDropdown();
        }
    }).fail(function(response)
    {
        var alertData = {
            message: "Failed at the amenity list update stage."
        };
        customAlert(alertData);
    });
}

function toggleAmenity()
{
    $(".zc_amenity_available").change(function()
    {
        var data = {
            available: this.checked
        };
        var asset_id = $(this).attr('zc_asset_id');
        $.post(base_url + "api_json/Runt_Asset_Amenity/" + $(this).attr('zc_object_id'), data, null, "json"
        ).done(function(response)
        {
            if (response.error.occurred === true)
            {
                customAlert(response.error);
            }
            else
            {
                updateVenueListing(asset_id);
            }
        }).fail(function(response)
        {
            var alertData = {
                message: "Failed at the amenity availability stage."
            };
            customAlert(alertData);
        });
    });
}

function attach_edit_amenity_modals()
{
    $('.editItem').each(function()
    {
        $(this).click(function()
        {
            init_modal_edit_amenities($(this)); //defined in modals/listing/amenities.js
        });
    });
}

function attach_add_amenity_modals()
{
    $('.addInfo').each(function()
    {
        $(this).click(function()
        {
            init_modal_add_amenities($(this)); //defined in modals/listing/amenities.js
        });
    });
}

function multiSelectDropdown()
{
    $(".multidropdown button").click(function()
    {
        var opened_amenity_id = $(this).attr('zc_object_id');
        $(".multidropdown ul").each(function()
        {
            if ($(this).attr('zc_object_id') == opened_amenity_id)
            {
                $(this).toggle();
            }
        });
    });
    $('.zc_room_all_asset_check').change(function()
    {
        var opened_amenity = $(this);
        $(".multidropdown button").each(function()
        {
            if ($(this).attr('zc_object_id') == opened_amenity.val())
            {
                if (opened_amenity.is(':checked'))
                {
                    $(this).contents().first().replaceWith('All Workspace');
                }
                else
                {
                    $(this).contents().first().replaceWith('Select');
                }
            }
        });
        $('.zc_room_asset_check').each(function()
        {
            if ($(this).val() == opened_amenity.val())
            {
                if (opened_amenity.is(':checked'))
                {
                    if (!$(this).is(':checked'))
                    {
                        $(this).prop('checked', true);
                        check_room_asset_amenity($(this), true);
                    }
                }
                else
                {
                    if ($(this).is(':checked'))
                    {
                        $(this).prop('checked', false);
                        check_room_asset_amenity($(this), false);
                    }
                }
            }
        });
    });
    $('.zc_room_asset_check').change(function()
    {
        var opened_amenity = $(this);
        check_room_asset_amenity(opened_amenity, opened_amenity.is(':checked'));
        if (!opened_amenity.is(':checked'))
        {
            $('.zc_room_all_asset_check').each(function()
            {
                if ($(this).val() == opened_amenity.val())
                {
                    $(this).prop('checked', false);
                }
            });
            $(".multidropdown button").each(function()
            {
                if ($(this).attr('zc_object_id') == opened_amenity.val())
                {
                    $(this).contents().first().replaceWith('Select');
                }
            });
        }
    });
    $(document).bind('click', function(e)
    {
        var $clicked = $(e.target);
        if (!$clicked.parents().hasClass("multidropdown"))
        {
            $(".multidropdown ul").hide();
        }
    });
}

function check_room_asset_amenity($check, checkedStatus)
{
    var data = {
        id: $check.val(),
        asset_id: $check.attr('zc_asset_id')
    };
    if (!checkedStatus)
    {
        data.remove = true;
    }
    $.post(base_url + "api_json/Asset_Amenity_Update/", data, null, "json"
    ).done(function(response)
    {
        if (response.error.occurred === true)
        {
            customAlert(response.error);
        }
    }).fail(function(response)
    {
        var alertData = {
            message: "Failed at the room amenity insert/update stage."
        };
        customAlert(alertData);
    });
}