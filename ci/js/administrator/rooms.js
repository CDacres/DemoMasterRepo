$(document).ready(function()
{
    updateRoomFields();
    editDescText();
    saveDescText();
});

function updateRoomFields()
{
    $('.zc_ranking').change(function()
    {
        var data = {
            ranking: $(this).val(),
            id: $(this).attr('zc_object_id')
        };
        roomFieldsAPI(data);
    });
    $('.zc_room_approval').change(function()
    {
        var data = {
            approved: +$(this).is(':checked'),
            id: $(this).val()
        };
        roomFieldsAPI(data);
    });
    $('.zc_room_hidden').change(function()
    {
        var data = {
            hidden: +$(this).is(':checked'),
            id: $(this).val()
        };
        roomFieldsAPI(data);
    });
    $('.zc_venue_approval').change(function()
    {
        var data = {
            approved: +$(this).is(':checked'),
            id: $(this).val()
        };
        venueFieldsAPI(data);
    });
    $('.zc_room_non_original_desc').change(function()
    {
        var data = {
            non_original_desc: +$(this).is(':checked'),
            id: $(this).val()
        };
        roomFieldsAPI(data);
    });
    $('.zc_price_control_percent').change(function()
    {
        var data = {
            price_control_percent: $(this).val(),
            id: $(this).attr('zc_object_id')
        };
        roomFieldsAPI(data);
    });
    $('.zc_flexible_percent').change(function()
    {
        var data = {
            flexible_percent: $(this).val(),
            id: $(this).attr('zc_object_id')
        };
        roomFieldsAPI(data);
    });
    $('.zc_flexible_enabled').change(function()
    {
        var data = {
            flexible_enabled: +$(this).is(':checked'),
            id: $(this).val()
        };
        roomFieldsAPI(data);
    });
    $('.zc_delete_room_btn').click(function()
    {
        var data = {
            message: "Are you sure you want to remove this room?",
            roomData: {
                id: $(this).data('id')
            }
        };
        init_modal_delete(data, room_delete);
    });
    $('.btn-attribute').click(function()
    {
        if (isLoggedIn)
        {
            var state = $(this).data('state');
            $(this).data('state', (state) ? 0 : 1);
            var icon = $(this).find('.state-icon');
            icon.removeClass();
            if (state)
            {
                $(this).removeClass();
                $(this).addClass('btn btn-xs btn-attribute');
                icon.addClass('state-icon glyphicon glyphicon-unchecked');
            }
            else
            {
                $(this).addClass('selected');
                icon.addClass('state-icon glyphicon glyphicon-check');
            }
            var data = {
                asset_id: $(this).data('assetid'),
                attribute_id: $(this).data('attributeid')
            };
            return new Promise(function(resolve, reject) {
                $.ajax({
                    url: base_url + "api/v1/rooms/attribute",
                    data: data,
                    dataType: "json",
                    type: "GET",
                    statusCode: {
                        403: function(err) {
                            bootstrapError(err.responseJSON);
                            reject(err.responseJSON);
                        }
                    }
                }).done(function(response) {
                    var type;
                    if (typeof response.room_attributes != 'undefined' && response.room_attributes.length > 0) {
                        var counter = 0;
                        for (var i = 0; i < response.room_attributes.length; i += 1) {
                            if (Number(response.room_attributes[i].attribute_id) === Number(response.attribute_id)) {
                                type = "PUT";
                            }
                            counter += 1;
                        }
                        if (counter === response.room_attributes.length && type != 'PUT') {
                            type = "POST";
                        }
                    } else {
                        type = "POST";
                    }
                    $.ajax({
                        url: base_url + "api/v1/rooms/attribute",
                        dataType: "json",
                        type: type,
                        data: {
                            asset_id: response.asset_id,
                            attribute_id: response.attribute_id
                        },
                        statusCode: {
                            403: function(err) {
                                bootstrapError(err.responseJSON);
                                reject(err.responseJSON);
                            },
                            405: function(err) {
                                bootstrapError(err.responseJSON);
                                reject(err.responseJSON);
                            }
                        },
                        error: function()
                        {
                            bootstrapError("There was a general error.");
                        }
                    });
                })
                .fail(reject);
            });
        }
        else
        {
            location.reload();
        }
    });
    $('.btn-config').click(function()
    {
        if (isLoggedIn)
        {
            var state = $(this).data('state');
            $($(this).parent().find('button')).each(function()
            {
                $(this).data('state', 0);
                var icon = $(this).find('.state-icon');
                icon.removeClass();
                $(this).removeClass();
                $(this).addClass('btn btn-xs btn-config');
                icon.addClass('state-icon glyphicon glyphicon-unchecked');
            });
            $(this).data('state', (state) ? 0 : 1);
            var selicon = $(this).find('.state-icon');
            selicon.removeClass();
            if (state)
            {
                $(this).removeClass();
                $(this).addClass('btn btn-xs btn-config');
                selicon.addClass('state-icon glyphicon glyphicon-unchecked');
            }
            else
            {
                $(this).addClass('selected');
                selicon.addClass('state-icon glyphicon glyphicon-check');
            }
            var data = {
                id: $(this).data('id'),
                asset_id: $(this).data('asset-id'),
                configuration_id: $(this).data('configid')
            };
            $.ajax({
                url: base_url + "api/v1/images",
                dataType: "json",
                type: 'PUT',
                data: data,
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
                    bootstrapError("There was a general error.");
                }
            });
        }
        else
        {
            location.reload();
        }
    });
}

function editDescText()
{
    $("#zc_room_desc_edit").click(function()
    {
        add_editor($('#zc_room_desc'));
        $("#zc_room_desc_save").show();
        $(this).hide();
    });
}

function saveDescText()
{
    $("#zc_room_desc_save").click(function()
    {
        var scopeThis = $(this);
        var newData = check_editor_data($("#zc_room_desc"), $("#room_desc"));
        if (newData !== false)
        {
            var data = {
                id: $(this).data("id"),
                description: newData
            };
            $.ajax({
                url: base_url + "api/v1/rooms",
                data: data,
                dataType: "json",
                type: "PUT",
                statusCode: {
                    200: function(response) {
                        remove_editor($('#zc_room_desc'));
                        scopeThis.hide();
                        if (typeof response != 'undefined' && response.length)
                        {
                            var room_data = JSON.parse(response).data;
                            $("#room_desc").html(room_data.description);
                        }
                        $("#zc_room_desc_edit").show();
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
            remove_editor($('#zc_room_desc'));
            scopeThis.hide();
            $("#zc_room_desc_edit").show();
        }
    });
}

function room_delete(data)
{
    $.ajax({
        url: base_url + "api/v1/rooms",
        data: data.roomData,
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
            bootstrapError("There was a general error while deleting the room.");
        }
    });
}

function roomFieldsAPI(data)
{
    $.ajax({
        url: base_url + "api/v1/rooms",
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

function venueFieldsAPI(data, suburl = '')
{
    $.ajax({
        url: base_url + "api/v1/venues" + suburl,
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