$(document).ready(function()
{
    updateVenueTeamListing();
//    updateUserListing();
    changeDiscount();
    attach_edit_member_modals();
    attach_add_team_member_modals();
    attach_add_user_member_modals();
    appendTeamTableOrderingListeners();
    appendUserTableOrderingListeners();
});

function updateVenueTeamListing()
{
    $(".zc_venue_team_list").click(function()
    {
        var data = {};
        if ($(this).attr('zc_object_id'))
        {
            data.asset_id = $(this).attr('zc_object_id');
            assignOrderingData('asset_id', $(this).attr('zc_object_id'));
        }
        else
        {
            data.option = $(this).attr('filter_type');
            assignOrderingData('option', $(this).attr('filter_type'));
        }
        $.post(base_url + country_lang_url + "/dashboard/update_team_members_list", data, null, "json"
        ).done(function(response)
        {
            if (response.error.occurred === true)
            {
                bootstrapError(response.error.message);
            }
            else
            {
                $('#zc_member_rows').empty();
                $('#zc_member_rows').append(response.data.html);
                $('#zc_venue_option_btn').contents().first().replaceWith(response.data.buttonText);
                attach_edit_member_modals();
            }
        }).fail(function()
        {
            bootstrapError("Failed at the members list update stage.");
        });
    });
}

//function updateUserListing()
//{
//    $(".zc_venue_user_list").click(function()
//    {
//        var data = {};
//        if ($(this).attr('zc_object_id'))
//        {
//            data.asset_id = $(this).attr('zc_object_id');
//        }
//        else
//        {
//            data.option = $(this).text();
//        }
//        $.post(base_url + country_lang_url + "/dashboard/update_user_members_list", data, null, "json"
//        ).done(function(response)
//        {
//            if (response.error.occurred === true)
//            {
//                bootstrapError(response.error.message);
//            }
//            else
//            {
//                $('#zc_member_rows').empty();
//                $('#zc_member_rows').append(response.data.html);
//                $('#zc_venue_option_btn').contents().first().replaceWith(response.data.buttonText);
//            }
//        }).fail(function()
//        {
//            bootstrapError("Failed at the members list update stage.");
//        });
//    });
//}

function changeDiscount()
{
    $('.zc_discount').change(function()
    {
        var data = {
            discount: $(this).val()
        };
        $.post(base_url + country_lang_url + "/api_json/Runt_User_Asset_Member/" + $(this).attr('zc_object_id'), data, null, "json"
        ).done(function(response)
        {
            if (response.error.occurred === true)
            {
                bootstrapError(response.error.message);
            }
        }).fail(function()
        {
            bootstrapError("There was a general error while updating the discount.");
        });
    });
}

function attach_edit_member_modals()
{
    $(".zc_edit_member_btn").each(function()
    {
        $(this).click(function()
        {
            init_modal_edit_member($(this)); //defined in modals/dashboard/team_members.js
        });
    });
}

function attach_add_team_member_modals()
{
    $("#add_team_member_modal").click(function()
    {
        init_modal_add_team_member($(this)); //defined in modals/dashboard/team_members.js
    });
}

function attach_add_user_member_modals()
{
    $("#add_user_member_modal").click(function()
    {
        init_modal_add_user_member($(this)); //defined in modals/dashboard/user_members.js
    });
}

function appendTeamTableOrderingListeners()
{
    $(".zc_team_members_ordering").click(function()
    {
        var scopeThis = $(this);
        var data = {
            value: $("#zc_venue_option_btn").text().trim(),
            order_field: $(this).attr('ordering_field'),
            order_direction: $(this).attr('zc_current_order')
        };
        if ($(this).attr('zc_venue_type') == 'asset_id')
        {
            data.asset_id = $(this).attr('zc_venue_option');
        }
        else
        {
            data.option = $(this).attr('zc_venue_option');
        }
        $.post(base_url + country_lang_url + "/dashboard/update_team_members_list", data, null, "json"
        ).done(function(response)
        {
            if (response.error.occurred === true)
            {
                bootstrapError(response.error.message);
            }
            else
            {
                $('#zc_member_rows').empty();
                $('#zc_member_rows').append(response.data.html);
                $('#zc_venue_option_btn').contents().first().replaceWith(response.data.buttonText);
                scopeThis.attr('zc_current_order', scopeThis.attr('zc_current_order') * -1);
                attach_edit_member_modals();
            }
        }).fail(function()
        {
            bootstrapError("Failed at the members list update stage.");
        });
    });
}

function assignOrderingData(type, option)
{
    $(".zc_team_members_ordering").each(function()
    {
        $(this).attr('zc_venue_type', type);
        $(this).attr('zc_venue_option', option);
        $(this).attr('zc_current_order', -1);
    });
}

function appendUserTableOrderingListeners()
{
    $(".zc_user_members_ordering").click(function()
    {
        var scopeThis = $(this);
        var data = {
            value: 'All venues',
            order_field: $(this).attr('ordering_field'),
            order_direction: $(this).attr('zc_current_order'),
            option: $(this).attr('zc_venue_option')
        };
        $.post(base_url + country_lang_url + "/dashboard/update_user_members_list", data, null, "json"
        ).done(function(response)
        {
            if (response.error.occurred === true)
            {
                bootstrapError(response.error.message);
            }
            else
            {
                $('#zc_member_rows').empty();
                $('#zc_member_rows').append(response.data.html);
                $('#zc_venue_option_btn').contents().first().replaceWith(response.data.buttonText);
                scopeThis.attr('zc_current_order', scopeThis.attr('zc_current_order') * -1);
            }
        }).fail(function()
        {
            bootstrapError("Failed at the members list update stage.");
        });
    });
}