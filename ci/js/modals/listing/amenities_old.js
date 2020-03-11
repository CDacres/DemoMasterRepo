function init_modal_edit_amenities($item)
{
    clearMainModal();
    $("#mainModal").on("shown.bs.modal", function()
    {
        $("#mainModal").on("hidden.bs.modal", function()
        {
            $("#mainModal").off("shown.bs.modal");
        });
    });
    $("#modal_slide_up_content").load(base_url + country_lang_url + '/common_protected/modal_listing_edit_amenities/' + $item.attr("id"), function()
    {
        $('.modal-dialog').addClass('modal-tiny');
        $("#mainModal").modal('show');
        verticallyCenterModal();
        activate_amenity_modal_listeners();
        cancelButtonListener();
        $("#modify_amenity").click(function()
        {
            modify_amenity($(this), $item.attr("id"), $item.attr("assetid"));
        });
    });
}

function close_modal(asset_id)
{
    updateVenueListing(asset_id);
    closeMainModal();
}

function init_modal_add_amenities($item)
{
    clearMainModal();
    $("#mainModal").on("shown.bs.modal", function()
    {
        $("#mainModal").on("hidden.bs.modal", function()
        {
            $("#mainModal").off("shown.bs.modal");
        });
    });
    $("#modal_slide_up_content").load(base_url + country_lang_url + '/common_protected/modal_listing_add_amenities/' + $item.attr("id") + '/' + $item.attr("assetid"), function()
    {
        $('.modal-dialog').addClass('modal-tiny');
        $("#mainModal").modal('show');
        verticallyCenterModal();
        activate_amenity_modal_listeners();
        cancelButtonListener();
        $("#add_amenity").click(function()
        {
            add_amenity($(this), $item.attr("id"), $item.attr("assetid"));
        });
    });
}

function activate_amenity_modal_listeners()
{
    $(".zc_include_list").click(function()
    {
        if ($(this).text() == 'Free')
        {
            $('#zc_amenity_cost_enc').hide();
        }
        else
        {
            $('#zc_amenity_cost_enc').show();
        }
        $('#zc_include_option_btn').contents().first().replaceWith($(this).text());
    });
    if ($("#zc_include_option_btn").text() != 'Free')
    {
        $('#zc_amenity_cost_enc').show();
    }
}

function modify_amenity(button, asset_amenity_id, asset_id)
{
    disableModalButton(button);
    var errorMessage = '';
    if ($("#zc_amenity_name").val() == '')
    {
        errorMessage = "the amenity name is filled in";
    }
    else if ($("#zc_amenity_cost_enc").is(":visible") && $("#zc_amenity_cost").val() == '')
    {
        errorMessage = "the amenity cost is filled in";
    }
    if (errorMessage == '')
    {
        var data = {
            asset_id: asset_id,
            name: $("#zc_amenity_name").val(),
            instructions: nl2br($("#zc_amenity_instructions").val())
        };
        if ($("#zc_amenity_cost_enc").is(":visible"))
        {
            data.cost = $("#zc_amenity_cost").val();
        }
        $.post(base_url + "api_json/Asset_Amenity_Update/" + asset_amenity_id, data, null, "json"
        ).done(function(response)
        {
            enableModalButton(button);
            if (response.error.occurred == true)
            {
                bootstrapError(response.error.message);
            }
            else
            {
                close_modal(asset_id);
            }
        }).fail(function(response)
        {
            enableModalButton(button);
            bootstrapError('Failed at the amenity edit stage.');
        });
    }
    else
    {
        enableModalButton(button);
        bootstrapError("Please ensure " + errorMessage + ".");
    }
}

function add_amenity(button, amenity_type_id, asset_id)
{
    disableModalButton(button);
    var errorMessage = '';
    if ($("#zc_amenity_name").val() == '')
    {
        errorMessage = "the amenity name is filled in";
    }
    else if ($("#zc_amenity_cost_enc").is(":visible") && $("#zc_amenity_cost").val() == '')
    {
        errorMessage = "the amenity cost is filled in";
    }
    if (errorMessage == '')
    {
        var data = {
            amenity_type: amenity_type_id,
            asset_id: asset_id,
            name: $("#zc_amenity_name").val(),
            instructions: nl2br($("#zc_amenity_instructions").val())
        };
        if ($("#zc_amenity_cost_enc").is(":visible"))
        {
            data.cost = $("#zc_amenity_cost").val();
        }
        $.post(base_url + "api_json/Asset_Amenity_Update", data, null, "json"
        ).done(function(response)
        {
            enableModalButton(button);
            if (response.error.occurred == true)
            {
                bootstrapError(response.error.message);
            }
            else
            {
                close_modal(asset_id);
            }
        }).fail(function(response)
        {
            enableModalButton(button);
            bootstrapError('Failed at the amenity add stage.');
        });
    }
    else
    {
        enableModalButton(button);
        bootstrapError("Please ensure " + errorMessage + ".");
    }
}
