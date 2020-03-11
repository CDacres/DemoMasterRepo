function init_venue_sponsor($object)
{
    clearMainModal();
    $("#mainModal").on("shown.bs.modal", function()
    {
        $("#mainModal").on("hidden.bs.modal", function()
        {
            $("#mainModal").off("shown.bs.modal");
        });
    });
    $("#modal_slide_up_content").load(base_url + country_lang_url + '/common_protected/modal_venue_sponsor/' + $object.data("id"), function()
    {
        $("#mainModal").modal('show');
        verticallyCenterModal();
        applySwitchesToCheckboxes();
        activate_venue_sponsor_modal_listeners($object.data("id"));
        cancelButtonListener();
    });
}

function init_venue_approve($object)
{
    clearMainModal();
    $("#mainModal").on("shown.bs.modal", function()
    {
        $("#mainModal").on("hidden.bs.modal", function()
        {
            $("#mainModal").off("shown.bs.modal");
        });
    });
    $("#modal_slide_up_content").load(base_url + country_lang_url + '/common_protected/modal_venue_approve/' + $object.data("id"), function()
    {
        $("#mainModal").modal('show');
        verticallyCenterModal();
        applySwitchesToCheckboxes();
        activate_venue_approve_modal_listeners($object.data("id"));
        cancelButtonListener();
    });
}

function init_edit_venue($object)
{
    clearMainModal();
    $("#mainModal").on("shown.bs.modal", function()
    {
        $("#mainModal").on("hidden.bs.modal", function()
        {
            $("#mainModal").off("shown.bs.modal");
        });
    });
    $("#modal_slide_up_content").load(base_url + country_lang_url + '/common_protected/modal_venue_edit_details/' + $object.data("id"), function()
    {
        $("#mainModal").modal('show');
        verticallyCenterModal();
        activate_edit_venue_modal_listeners($object.data("id"));
        cancelButtonListener();
    });
}

function activate_venue_sponsor_modal_listeners(venueId)
{
    $('#zc_venue_sponsored').change(function()
    {
        if ($('#venue_rooms').is(':hidden'))
        {
            $('#venue_rooms').show();
        }
        else
        {
            $('#venue_rooms').hide();
        }
    });
    $('#zc_sponsor_all_rooms').click(function()
    {
        $('.zc_room_sponsored').each(function()
        {
            var alreadyChecked = +$(this).is(':checked');
            if (!alreadyChecked)
            {
                var switchElement = $(this).parent().find('.switchery')[0];
                switchElement.click();
                $(this).prop("checked", true);
            }
        });
    });
    $("#update_venue_sponsor").click(function()
    {
        var venueSponsored = +$('#zc_venue_sponsored').is(':checked');
        var data = {
            sponsored: venueSponsored,
            id: venueId
        };
        return new Promise(function(resolve, reject) {
            $.ajax({
                url: base_url + "api/v1/venues",
                data: data,
                dataType: "json",
                type: "PUT",
                statusCode: {
                    200: function() {
                        resolve();
                    },
                    403: function(err) {
                        bootstrapError(err.responseJSON);
                        reject(err.responseJSON);
                    },
                    405: function(err) {
                        bootstrapError(err.responseJSON);
                        reject(err.responseJSON);
                    },
                    409: function(err) {
                        bootstrapError(err.responseJSON);
                        reject(err.responseJSON);
                    }
                },
                error: function()
                {
                    bootstrapError("There was a general error while updating the venue sponsored field.");
                    reject("There was a general error while updating the venue sponsored field.");
                }
            });
        }).then(function() {
            var promises = [];
            if (venueSponsored && $("#zc_venue_commission_percent").val() != '')
            {
                var commData = {
                    commission_percentage: $("#zc_venue_commission_percent").val(),
                    id: venueId
                };
                promises.push(
                    new Promise(function(resolve, reject) {
                        $.ajax({
                            url: base_url + "api/v1/venues/commission",
                            data: commData,
                            dataType: "json",
                            type: "PUT",
                            statusCode: {
                                200: function() {
                                    resolve();
                                },
                                403: function(err) {
                                    bootstrapError(err.responseJSON);
                                    reject(err.responseJSON);
                                },
                                405: function(err) {
                                    bootstrapError(err.responseJSON);
                                    reject(err.responseJSON);
                                },
                                409: function(err) {
                                    bootstrapError(err.responseJSON);
                                    reject(err.responseJSON);
                                }
                            },
                            error: function()
                            {
                                bootstrapError("There was a general error while updating the venue commission field.");
                                reject("There was a general error while updating the venue commission field.");
                            }
                        });
                    })
                );
            }
            $('.zc_room_sponsored').each(function()
            {
                var roomData = {
                    id: $(this).val()
                };
                if (venueSponsored)
                {
                    roomData.sponsored = +$(this).is(':checked');
                }
                else
                {
                    roomData.sponsored = 0;
                }
                promises.push(
                    new Promise(function(resolve, reject) {
                        $.ajax({
                            url: base_url + "api/v1/rooms",
                            data: roomData,
                            dataType: "json",
                            type: "PUT",
                            statusCode: {
                                200: function() {
                                    resolve();
                                },
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
                                bootstrapError("There was a general error while updating the room sponsored field.");
                                reject("There was a general error while updating the room sponsored field.");
                            }
                        });
                    }).catch(function(error) {
                        reject(error);
                    })
                );
            });
            Promise.all(promises).then(function() {
                location.reload();
            }).catch(console.log);
        }).catch(function(error) {
            reject(error);
        });
    });
}

function activate_venue_approve_modal_listeners(venueId)
{
    $('#zc_venue_approved').change(function()
    {
        if ($('#venue_rooms').is(':hidden'))
        {
            $('#venue_rooms').show();
        }
        else
        {
            $('#venue_rooms').hide();
        }
    });
    $('#zc_approve_all_rooms').click(function()
    {
        $('.zc_room_approved').each(function()
        {
            var alreadyChecked = +$(this).is(':checked');
            if (!alreadyChecked)
            {
                var switchElement = $(this).parent().find('.switchery')[0];
                switchElement.click();
                $(this).prop("checked", true);
            }
        });
    });
    $("#update_venue_approve").click(function()
    {
        var venueApproved = +$('#zc_venue_approved').is(':checked');
        var data = {
            approved: venueApproved,
            id: venueId
        };
        return new Promise(function(resolve, reject) {
            $.ajax({
                url: base_url + "api/v1/venues",
                data: data,
                dataType: "json",
                type: "PUT",
                statusCode: {
                    200: function() {
                        resolve();
                    },
                    403: function(err) {
                        bootstrapError(err.responseJSON);
                        reject(err.responseJSON);
                    },
                    405: function(err) {
                        bootstrapError(err.responseJSON);
                        reject(err.responseJSON);
                    },
                    409: function(err) {
                        bootstrapError(err.responseJSON);
                        reject(err.responseJSON);
                    }
                },
                error: function()
                {
                    bootstrapError("There was a general error while updating the venue approved field.");
                    reject("There was a general error while updating the venue approved field.");
                }
            });
        }).then(function() {
            var promises = [];
            $('.zc_room_approved').each(function()
            {
                var roomData = {
                    id: $(this).val()
                };
                if (venueApproved)
                {
                    roomData.approved = +$(this).is(':checked');
                }
                else
                {
                    roomData.approved = 0;
                }
                promises.push(
                    new Promise(function(resolve, reject) {
                        $.ajax({
                            url: base_url + "api/v1/rooms",
                            data: roomData,
                            dataType: "json",
                            type: "PUT",
                            statusCode: {
                                200: function() {
                                    resolve();
                                },
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
                                bootstrapError("There was a general error while updating the room approved field.");
                                reject("There was a general error while updating the room approved field.");
                            }
                        });
                    }).catch(function(error) {
                        reject(error);
                    })
                );
            });
            $('.zc_price_control_percent').each(function()
            {
                var priceControldata = {
                    price_control_percent: $(this).val(),
                    id: $(this).attr('zc_object_id')
                };
                promises.push(
                    new Promise(function(resolve, reject) {
                        $.ajax({
                            url: base_url + "api/v1/rooms",
                            data: priceControldata,
                            dataType: "json",
                            type: "PUT",
                            statusCode: {
                                200: function() {
                                    resolve();
                                },
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
                                bootstrapError("There was a general error while updating the room price control field.");
                                reject("There was a general error while updating the room price control field.");
                            }
                        });
                    }).catch(function(error) {
                        reject(error);
                    })
                );
            });
            Promise.all(promises).then(function() {
                location.reload();
            }).catch(console.log);
        }).catch(function(error) {
            reject(error);
        });
    });
}

function activate_edit_venue_modal_listeners(venueId)
{
    $("#edit_venue").click(function()
    {
        var scopeThis = $(this);
        var promiseVat, promiseComm;
        if ($("#zc_venue_vat_rate").val() != '')
        {
            var data = {
                vat_rate_id: $("#zc_venue_vat_rate").val(),
                id: venueId
            };
            promiseVat = new Promise(function(resolve, reject) {
                $.ajax({
                    url: base_url + "api/v1/venues",
                    data: data,
                    dataType: "json",
                    type: "PUT",
                    statusCode: {
                        200: function() {
                            resolve();
                        },
                        403: function(err) {
                            bootstrapError(err.responseJSON);
                            reject(err.responseJSON);
                        },
                        405: function(err) {
                            bootstrapError(err.responseJSON);
                            reject(err.responseJSON);
                        },
                        409: function(err) {
                            bootstrapError(err.responseJSON);
                            reject(err.responseJSON);
                        }
                    },
                    error: function()
                    {
                        bootstrapError("There was a general error while updating the vat rate field.");
                        reject("There was a general error while updating the vat rate field.");
                    }
                });
            });
        }
        if ($("#zc_venue_commission_percent").val() != '')
        {
            var commData = {
                commission_percentage: $("#zc_venue_commission_percent").val(),
                id: venueId
            };
            promiseComm = new Promise(function(resolve, reject) {
                $.ajax({
                    url: base_url + "api/v1/venues/commission",
                    data: commData,
                    dataType: "json",
                    type: "PUT",
                    statusCode: {
                        200: function() {
                            resolve();
                        },
                        403: function(err) {
                            bootstrapError(err.responseJSON);
                            reject(err.responseJSON);
                        },
                        405: function(err) {
                            bootstrapError(err.responseJSON);
                            reject(err.responseJSON);
                        },
                        409: function(err) {
                            bootstrapError(err.responseJSON);
                            reject(err.responseJSON);
                        }
                    },
                    error: function()
                    {
                        bootstrapError("There was a general error while updating the commission field.");
                        reject("There was a general error while updating the commission field.");
                    }
                });
            });
        }
        Promise.all([
            promiseVat,
            promiseComm
        ]).then(function() {
            enableModalButton(scopeThis);
            closeMainModal();
        }).catch(console.log);
    });
}