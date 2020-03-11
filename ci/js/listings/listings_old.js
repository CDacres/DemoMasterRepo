$(document).ready(function()
{
    $("#zc_venue_basics_submit").click(function()
    {
        var errorMessage = '';
        if ($("#zc_venue_type").val() == null)
        {
            errorMessage = "the venue type is chosen";
        }
        else if ($("#zc_venue_name").val() == '')
        {
            errorMessage = "the venue name is filled in";
        }
        if (errorMessage == '')
        {
            var data = {
                name: $("#zc_venue_name").val(),
                venue_type: $("#zc_venue_type").val(),
                website: $("#zc_venue_website").val(),
                company_id: companyId
            };
            $("#saving_title").show();
            $("#saved_title").hide();
            $.post(base_url + "api_json/OVenue" + ((typeof venueId != 'undefined')?'/' + venueId:''), data, null, "json"
            ).done(function(response)
            {
                if (response.error.occurred === true)
                {
                    bootstrapError(response.error.message);
                }
                else
                {
                    $(location).attr('href', '/dashboard/edit_venue/location/' + response.data.id);
                }
            }).fail(function(response)
            {
                bootstrapError("Failed at the venue insert stage.");
            });
        }
        else
        {
            bootstrapError("Please ensure " + errorMessage + ".");
        }
    });
    $("#zc_venue_location_submit").click(function()
    {
        var errorMessage = '';
        if ($("span[zc_input_type='text'][zc_data_type='address']").attr('zc_data_value') == null)
        {
            errorMessage = "the address is entered";
        }
        if (errorMessage == '')
        {
            $(location).attr('href', '/dashboard/edit_venue/description/' + venueId);
        }
        else
        {
            bootstrapError("Please ensure " + errorMessage + ".");
        }
    });
    $("#zc_venue_description_submit").click(function()
    {
        var errorMessage = '';
        if ($("#zc_venue_description").val() == '')
        {
            errorMessage = "the venue description is filled in";
        }
        if (errorMessage == '')
        {
            var data = {
                description: nl2br($("#zc_venue_description").val()),
                transport: nl2br($("#zc_venue_transport").val())
            };
            $("#saving_title").show();
            $("#saved_title").hide();
            $.post(base_url + "api_json/OVenue/" + venueId, data, null, "json"
            ).done(function(response)
            {
                if (response.error.occurred === true)
                {
                    bootstrapError(response.error.message);
                }
                else
                {
                    $(location).attr('href', '/dashboard/edit_venue/cancellation/' + response.data.id);
                }
            }).fail(function(response)
            {
                bootstrapError("Failed at the venue description stage.");
            });
        }
        else
        {
            bootstrapError("Please ensure " + errorMessage + ".");
        }
    });
    $("#zc_venue_cancellation_import").change(function()
    {
        var data = {};
        if ($(this).val() != '')
        {
            data.asset_id = $(this).val();
        }
        else
        {
            data.asset_id = assetId;
        }
        $.post(base_url + "asset/get_cancellation", data, null, "json"
        ).done(function(response)
        {
            if (response.error.occurred === true)
            {
                bootstrapError(response.error.message);
            }
            else
            {
                $(".zc_venue_cancellation_type").each(function()
                {
                    if (typeof response.data.cancellation_type != 'undefined' && $(this).val() == response.data.cancellation_type)
                    {
                        $(this).prop('checked', true);
                        if ($(this).val() == 4)
                        {
                            $("#custom_cancellation").show();
                        }
                        else
                        {
                            $("#custom_cancellation").hide();
                            find_cancellation_details($(this).val());
                        }
                    }
                    else
                    {
                        $(this).prop('checked', false);
                        $("#custom_cancellation").hide();
                    }
                });
            }
        }).fail(function(response)
        {
            bootstrapError("Failed at finding the cancellation.");
        });
    });
    $(".zc_venue_cancellation_type").click(function()
    {
        if ($(this).val() == 4)
        {
            $("#custom_cancellation").show();
        }
        else
        {
            $("#custom_cancellation").hide();
            find_cancellation_details($(this).val());
        }
    });
    if ($(".zc_venue_cancellation_type:checked").val() == 4)
    {
        $("#custom_cancellation").show();
    }
    $("#zc_venue_cancellation_submit").click(function()
    {
        var errorMessage = '';
        if ($(".zc_venue_cancellation_type:checked").val() == null)
        {
            errorMessage = "the venue cancellation policy type is selected";
        }
        if ($(".zc_venue_cancellation_type:checked").val() == 4)
        {
            if ($("#zc_venue_cancellation_percentage").val() == '')
            {
                errorMessage = "the cancellation percentage is filled out";
            }
            else if ($("#zc_venue_cancellation_period").val() == '')
            {
                errorMessage = "the cancellation period is filled out";
            }
        }
        if (errorMessage == '')
        {
            var data = {
                asset_id: assetId,
                cancellation_type: $(".zc_venue_cancellation_type:checked").val()
            };
            if ($(".zc_venue_cancellation_type:checked").val() == 4)
            {
                data.cancellation_percentage = $("#zc_venue_cancellation_percentage").val();
                data.cancellation_period = $("#zc_venue_cancellation_period").val();
            }
            else if (typeof cancel_percent != 'undefined' && typeof cancel_period != 'undefined')
            {
                data.cancellation_percentage = cancel_percent;
                data.cancellation_period = cancel_period;
            }
            $("#saving_title").show();
            $("#saved_title").hide();
            $.post(base_url + "api_json/Runt_Asset_Cancellation/", data, null, "json"
            ).done(function(response)
            {
                if (response.error.occurred === true)
                {
                    bootstrapError(response.error.message);
                }
                else
                {
                    $(location).attr('href', '/dashboard/edit_venue/hours/' + venueId);
                }
            }).fail(function(response)
            {
                bootstrapError("Failed at the venue cancellation stage.");
            });
        }
        else
        {
            bootstrapError("Please ensure " + errorMessage + ".");
        }
    });
    $(".zc_venue_opening_type").click(function()
    {
        if ($(this).val() == 5)
        {
            $("#custom_hours").show();
        }
        else
        {
            $("#custom_hours").hide();
        }
    });
    if ($(".zc_venue_opening_type:checked").val() == 5)
    {
        $("#custom_hours").show();
    }
    $(".zc_venue_opening_split_check").each(function()
    {
        var scopeThis = $(this);
        $(this).click(function()
        {
            $("#zc_venue_opening_split_" + scopeThis.val()).toggle(this.checked);
        });
        if (this.checked)
        {
            $("#zc_venue_opening_split_" + scopeThis.val()).toggle(this.checked);
        }
    });
    $("#zc_venue_hours_submit").click(function()
    {
        var errorMessage = '';
        var openTimes = {};
        if ($("#zc_venue_min_duration").val() == null)
        {
            errorMessage = "the minimum duration is chosen";
        }
        else if ($(".zc_venue_opening_type:checked").val() == null)
        {
            errorMessage = "the venue opening hours are chosen";
        }
        if ($(".zc_venue_opening_type:checked").val() == 5)
        {
            var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
            openTimes.start = [];
            openTimes.end = [];
            for (var d = 0; d < 7; ++d)
            {
                if (!$("#zc_venue_closed_" + d).is(":checked"))
                {
                    openTimes.start[d] = [];
                    openTimes.end[d] = [];
                    if ($("#zc_venue_opening_allday_" + d).is(":checked"))
                    {
                        openTimes.start[d].push(0);
                        openTimes.end[d].push(1440);
                    }
                    else
                    {
                        if (Number($("#zc_venue_opening_hours_start_" + d).val()) >= Number($("#zc_venue_opening_hours_end_" + d).val()) || ($("#split_" + d).is(":checked") && (Number($("#zc_venue_opening_hours_split_start_" + d).val()) >= Number($("#zc_venue_opening_hours_split_end_" + d).val()))))
                        {
                            errorMessage = "the start time is before the end time on " + days[d];
                        }
                        else if ($("#split_" + d).is(":checked") && (Number($("#zc_venue_opening_hours_start_" + d).val()) >= Number($("#zc_venue_opening_hours_split_start_" + d).val()) || Number($("#zc_venue_opening_hours_end_" + d).val()) > Number($("#zc_venue_opening_hours_split_start_" + d).val())))
                        {
                            errorMessage = "the times do not overlap on " + days[d];
                        }
                        else
                        {
                            openTimes.start[d].push($("#zc_venue_opening_hours_start_" + d).val());
                            openTimes.end[d].push($("#zc_venue_opening_hours_end_" + d).val());
                            if ($("#split_" + d).is(":checked"))
                            {
                                openTimes.start[d].push($("#zc_venue_opening_hours_split_start_" + d).val());
                                openTimes.end[d].push($("#zc_venue_opening_hours_split_end_" + d).val());
                            }
                        }
                    }
                }
            }
        }
        if (errorMessage == '')
        {
            var data = {
                opening_type: $(".zc_venue_opening_type:checked").val(),
                minimum_minutes: $("#zc_venue_min_duration").val()
            };
            if ($(".zc_venue_opening_type:checked").val() == 5)
            {
                data.openTimes = openTimes;
            }
            $("#saving_title").show();
            $("#saved_title").hide();
            $.post(base_url + "api_json/Venue_Opening_Hour_Type/" + venueId, data, null, "json"
            ).done(function(response)
            {
                if (response.error.occurred === true)
                {
                    bootstrapError(response.error.message);
                }
                else
                {
                    $.post(base_url + "venues/has_rooms/" + venueId, {}, null, "json"
                    ).done(function(response)
                    {
                        if (response.error.occurred === true)
                        {
                            bootstrapError(response.error.message);
                        }
                        else
                        {
                            if (response.data.room_count > 0)
                            {
                                $(location).attr('href', '/dashboard/listing_venue');
                            }
                            else
                            {
                                $(location).attr('href', '/rooms/new_room/' + venueId);
                            }
                        }
                    }).fail(function(response)
                    {
                        bootstrapError("Failed at finding the venue rooms stage.");
                    });
                }
            }).fail(function(response)
            {
                bootstrapError("Failed at the venue opening hours insert stage.");
            });
        }
        else
        {
            bootstrapError("Please ensure " + errorMessage + ".");
        }
    });
    $("#zc_room_venue_submit").click(function()
    {
        var errorMessage = '';
        if ($("#zc_venue_id").val() == null)
        {
            errorMessage = "the venue name is chosen";
        }
        if (errorMessage == '')
        {
            var data = {
                venue_id: $("#zc_venue_id").val()
            };
            $("#saving_title").show();
            $("#saved_title").hide();
            $.post(base_url + "api_json/Room_Skeleton", data, null, "json"
            ).done(function(response)
            {
                if (response.error.occurred === true)
                {
                    bootstrapError(response.error.message);
                }
                else
                {
                    $(location).attr('href', '/dashboard/edit_room/info/' + response.data.id);
                }
            }).fail(function(response)
            {
                bootstrapError("Failed at the room insert stage.");
            });
        }
        else
        {
            bootstrapError("Please ensure " + errorMessage + ".");
        }
    });
    $("#zc_room_capacity_import").change(function()
    {
        var data = {};
        if ($(this).val() != '')
        {
            data.asset_id = $(this).val();
        }
        else
        {
            data.asset_id = assetId;
        }
        $.post(base_url + "asset/get_configurations", data, null, "json"
        ).done(function(response)
        {
            if (response.error.occurred === true)
            {
                bootstrapError(response.error.message);
            }
            else
            {
                var config = [];
                var capacity = [];
                $.each(response.data.objects, function(key, params)
                {
                    config.push(params.id);
                    capacity[params.id] = params.max_capacity;
                });
                $(".zc_config_check").each(function()
                {
                    if ($.inArray($(this).val(), config) != -1)
                    {
                        $(this).prop('checked', true);
                        $("#zc_max_capacity_" + $(this).val()).val(capacity[$(this).val()]);
                    }
                    else
                    {
                        $(this).prop('checked', false);
                        $("#zc_max_capacity_" + $(this).val()).val('');
                    }
                });
            }
        }).fail(function(response)
        {
            bootstrapError("Failed at finding the configurations.");
        });
    });
    $(".zc_max_capacity").on("change keyup paste", function()
    {
        var scopeThis = $(this);
        $(".zc_config_check").each(function()
        {
            if ($(this).val() == scopeThis.attr('zc_data_id'))
            {
                if (scopeThis.val() != '' && !this.checked)
                {
                    $(this).prop('checked', true);
                }
                else if (scopeThis.val() == '')
                {
                    $(this).prop('checked', false);
                }
            }
        });
    });
    $("#zc_room_info_submit").click(function()
    {
        var errorMessage = '';
        if ($("#zc_room_name").val() == '')
        {
            errorMessage = "the space name is filled in";
        }
        else
        {
            var tickedconfigs = 0;
            var configs = {};
            configs.type = [];
            configs.capacity = [];
            $(".zc_config_check").each(function()
            {
                if (this.checked)
                {
                    ++tickedconfigs;
                    if ($("#zc_max_capacity_" + $(this).val()).val() == '')
                    {
                        errorMessage = "that the max capacity for the " + $("#zc_config_desc_" + $(this).val()).text() + " is filled out";
                    }
                    else
                    {
                        configs.type.push($(this).val());
                        configs.capacity.push($("#zc_max_capacity_" + $(this).val()).val());
                    }
                }
            });
            if (tickedconfigs == 0)
            {
                errorMessage = "that at least one configuration is selected";
            }
        }
        if (errorMessage == '')
        {
            var data = {
                title: $("#zc_room_name").val(),
                description: nl2br($("#zc_room_description").val()),
                configs: configs
            };
            $("#saving_title").show();
            $("#saved_title").hide();
            $.post(base_url + "api_json/Room_Skeleton/" + roomId, data, null, "json"
            ).done(function(response)
            {
                if (response.error.occurred === true)
                {
                    bootstrapError(response.error.message);
                }
                else
                {
                    $(location).attr('href', '/dashboard/edit_room/price/' + roomId);
                }
            }).fail(function(response)
            {
                bootstrapError("Failed at the room insert stage.");
            });
        }
        else
        {
            bootstrapError("Please ensure " + errorMessage + ".");
        }
    });
    $("#zc_venue_price_submit").click(function()
    {
        var errorMessage = '';
        if ($("#zc_hourly_rate").val() == '' && $("#zc_daily_rate").val() == '')
        {
            errorMessage = "at least one of per hour or per day is filled in";
        }
        if ($("#zc_hourly_rate").val() != '' && $("#zc_daily_rate").val() != '' && Number($("#zc_hourly_rate").val()) > Number($("#zc_daily_rate").val()))
        {
            errorMessage = "the per hour price is not larger than the per day price";
        }
        if (errorMessage == '')
        {
            var data = {};
            if ($("#zc_hourly_rate").val() != '')
            {
                data.hourly_rate = $("#zc_hourly_rate").val();
            }
            if ($("#zc_daily_rate").val() != '')
            {
                data.daily_rate = $("#zc_daily_rate").val();
            }
            $("#saving_title").show();
            $("#saved_title").hide();
            $.post(base_url + "api_json/Price_Update/" + roomId, data, null, "json"
            ).done(function(response)
            {
                if (response.error.occurred === true)
                {
                    bootstrapError(response.error.message);
                }
                else
                {
                    $(location).attr('href', '/dashboard/edit_room/photos/' + roomId);
                }
            }).fail(function(response)
            {
                bootstrapError("Failed at the price insert stage.");
            });
        }
        else
        {
            bootstrapError("Please ensure " + errorMessage + ".");
        }
    });
    $(".zc_room_photo_upload").click(function()
    {
        $("#zc_upload").trigger("click");
    });
    $("#zc_upload").change(function()
    {
        var formData = new FormData();
        formData.append("zc_room_image", $("#zc_upload")[0].files[0]);
        formData.append("subject_id", assetId);
        showLoader();
        $.ajax({
            url: base_url + "api_json/Image_Upload/",
            data: formData,
            processData: false,
            contentType: false,
            dataType: "json",
            type: "POST",
            success: function(response)
            {
                if (response.error.occurred === true)
                {
                    hideLoader();
                    bootstrapError(response.error.message);
                }
                else
                {
                    location.reload();
                }
            },
            error: function(response)
            {
                hideLoader();
                bootstrapError("Failed at the image upload stage.");
            }
        });
    });
    $("input[name=zc_featured_radio]:radio").change(function()
    {
        $("input[name=zc_featured_radio]").each(function()
        {
            var data = {
                subject_id: assetId,
                represents: this.checked
            };
            $.post(base_url + "api_json/Image/" + $(this).attr('zc_object_id'), data, null, "json"
            ).done(function(response)
            {
                if (response.error.occurred === true)
                {
                    bootstrapError(response.error.message);
                }
            }).fail(function(response)
            {
                bootstrapError("Failed at the image update stage.");
            });
        });
    });
    $(".zc_room_photo_configuration").change(function()
    {
        var data = {
            configuration_id: $(this).val()
        };
        $.post(base_url + "api_json/Image/" + $(this).attr('zc_object_id'), data, null, "json"
        ).done(function(response)
        {
            if (response.error.occurred === true)
            {
                bootstrapError(response.error.message);
            }
        }).fail(function(response)
        {
            bootstrapError("Failed at the image update stage - " + response.error.message + ".");
        });
    });
    $(".zc_room_delete_image").click(function()
    {
        var data = {
            id: $(this).attr('zc_object_id'),
            asset_id: assetId
        };
        $.post(base_url + "images/delete_image", data, null, "json"
        ).done(function(response)
        {
            if (response.error.occurred === true)
            {
                bootstrapError(response.error.message);
            }
            else
            {
                location.reload();
            }
        }).fail(function(response)
        {
            bootstrapError("Failed at the image update stage - " + response.error.message + ".");
        });
    });
    $("#zc_room_photos_submit").click(function()
    {
        var errorMessage = '';
        if ($(".zc_uploaded_room_image").length == 0)
        {
            errorMessage = "that at least one image is uploaded";
        }
        if (errorMessage == '')
        {
            $(location).attr('href', '/dashboard/listing');
        }
        else
        {
            bootstrapError("Please ensure " + errorMessage + ".");
        }
    });
    $("#zc_venue_address").click(function()
    {
        $("[zc_input_type='text'][zc_data_type='address']").each(function()
        {
            init_modal_address($(this)); //defined in modals/address.js
        });
    });
    importCapacityToggle();
    importCancellationToggle();
    attach_map_modals();
    attach_address_modals();
    toggleCollapseIcon();
    loadTooltips();
});

function loadTooltips()
{
  $('.listing_tooltips').tooltip();
}

function toggleCollapseIcon()
{
    $(".zc_venue_room").click(function()
    {
        $(this).next('div').toggle();
        if ($(this).find('.chevron').hasClass('glyphicon-menu-right'))
        {
            $(this).find('.chevron').removeClass('glyphicon-menu-right');
            $(this).find('.chevron').addClass('glyphicon-menu-down');
        }
        else
        {
            $(this).find('.chevron').removeClass('glyphicon-menu-down');
            $(this).find('.chevron').addClass('glyphicon-menu-right');
        }
    });
}

function importCapacityToggle()
{
    $('#import_capacity_toggle').click(function()
    {
        var text = $('#import_capacity_toggle').text();
        $('#import_capacity_toggle').text(((text == "+ Import capacity from another space")?"-":"+") + "Import capacity from another space");
    });
}

function importCancellationToggle()
{
    $('#import_cancellation_toggle').click(function()
    {
        var text = $('#import_cancellation_toggle').text();
        $('#import_cancellation_toggle').text(((text == "+ Import cancellation policy from another venue")?"-":"+") + " Import cancellation policy from another venue");
    });
}

function attach_map_modals()
{
    $(".zc_map_input").each(function()
    {
        var scopeThis=$(this);
        $(this).click(function()
        {
            init_modal_map($(this)); //defined in modals/map.js
        });
        $(this).change(function()
        {
            var data = {
                lat: $(this).data('lat'),
                long: $(this).data('long')
            };
            $.post(base_url + "api_json/" + $(this).attr('zc_object_type') + "/" + $(this).attr('zc_object_id'),data,null,"json"
            ).done(function(response)
            {
                if (response.error.occurred === true)
                {
                    bootstrapError(response.error.message);
                }
                else
                {
                    scopeThis.attr("src", response.data.map_url_200_200);
                }
            }).fail(function(response)
            {
                bootstrapError("Failed for some reason - " + response.error.message + ".");
            });
        });
    });
}

function attach_address_modals()
{
    $("[zc_input_type='text'][zc_data_type='address']").each(function()
    {
        $(this).click(function()
        {
            init_modal_address($(this)); //defined in modals/address.js
        });
        var $scopeThis = $(this);
        $(this).change(function()
        {
            var dataType = $(this).attr('zc_data_type');
            var data = {
                city: $(this).data('city'),
                country: $(this).data('country'),
                country_code: $(this).data('country_code'),
                street_number: $(this).data('street_number'),
                road: $(this).data('road'),
                town: $(this).data('town'),
                county: $(this).data('county'),
                post_code: $(this).data('post_code'),
                lat: $(this).data('lat'),
                long: $(this).data('long')
            };
            data[dataType] = $(this).attr('zc_data_value');
            $.post(base_url + "api_json/" + $(this).attr('zc_object_type') + "/" + $(this).attr('zc_object_id'),data,null,"json"
            ).done(function(response)
            {
                if (response.error.occurred === true)
                {
                    bootstrapError(response.error.message);
                }
                else
                {
                    update_html($scopeThis, response.data[dataType]);
                    $(".zc_map_input").attr("src", response.data.map_url_200_200);
                    $(".zc_map_input").data("lat", response.data.lat);
                    $(".zc_map_input").data("long", response.data.long);
                }
            }).fail(function(response)
            {
                bootstrapError("Failed for some reason - " + response.error.message + ".");
            });
        });
    });
}

function update_html(object, value)
{
    object.html(value);
}

function find_cancellation_details(cancellation_type)
{
    var data = {
        cancellation_type: cancellation_type
    };
    $.post(base_url + "asset/get_cancellation_details", data, null, "json"
    ).done(function(response)
    {
        if (response.error.occurred === true)
        {
            bootstrapError(response.error.message);
        }
        else
        {
            cancel_percent = response.data.cancellation_percentage;
            cancel_period = response.data.cancellation_period;
        }
    }).fail(function(response)
    {
        bootstrapError("Failed at finding the cancellation - " + response.error.message + ".");
    });
}

function showLoader()
{
    $('.zc_room_photo_upload').hide();
    $('.loading-gif').show();
}

function hideLoader()
{
    $('.loading-gif').hide();
    $('.zc_room_photo_upload').show();
}
