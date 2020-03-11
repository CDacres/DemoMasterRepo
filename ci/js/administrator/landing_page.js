$(document).ready(function()
{
    loadLang(['home']).then(function (lang) {
        insertCarouselAssetInput();
        updateCarouselAssetButton();
        removeCarouselAssetInput();
        editLandingText();
        saveLandingText();
        insertSimilarLocInput(lang);
        removeSimilarLocInput();
    });
});

function insertCarouselAssetInput()
{
    $(".carousel-asset-add").click(function()
    {
        var carousel_type = $(this).data('id');
        if (typeof $("#carousel-entry_" + carousel_type) != 'undefined')
        {
            $("#carousel-entry_" + carousel_type).append('<div class="col-xs-2"><div class="input-group"><input id="zc_carousel_asset_new_' + (Math.random() * 1000000000) + '" class="zc_carousel_asset form-control" type="text" data-carousel="' + carousel_type + '" /><div class="input-group-addon carousel_save save_button fa fa-check"></div></div></div>');
            removeSaveCarouselAssetEvent();
            saveCarouselAssetFields();
        }
    });
}

function removeSaveCarouselAssetEvent()
{
    $(".carousel_save").off("click");
}

function removeUpdateCarouselEvent()
{
    $(".update_button").off("click");
}

function removeCloseCarouselEvent()
{
    $(".carousel_close").off("click");
}

function removeSaveSimilarEvent()
{
    $(".similar_save_button").off("click");
}

function removeCloseSimilarEvent()
{
    $(".zc_similar_loc_remove").off("click");
}

function saveCarouselAssetFields()
{
    $(".carousel_save").click(function()
    {
        var scopeThis = $(this);
        if (scopeThis.prev().val() != '')
        {
            var data = {
                landing_page_id: landing_page_id,
                carousel_attribute_id: scopeThis.prev().data('carousel'),
                reference_id: scopeThis.prev().val()
            };
            $.ajax({
                url: base_url + "api/v1/landings/carousel",
                data: data,
                dataType: "json",
                type: "POST",
                statusCode: {
                    201: function(response) {
                        scopeThis.off("click");
                        scopeThis.removeClass("carousel_save save_button fa-check");
                        scopeThis.data("id", response);
                        scopeThis.addClass("carousel_close close_button fa-times");
                        scopeThis.prev().prop('id', 'zc_carousel_asset_' + response);
                        removeCloseCarouselEvent();
                        removeCarouselAssetInput();
                        updateCarouselAssetButton();
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
                    bootstrapError("There was a general error while inserting the field.");
                }
            });
        }
    });
}

function updateCarouselAssetButton()
{
    $(".zc_carousel_asset").change(function()
    {
        var scopeThis = $(this);
        scopeThis.next().off("click");
        scopeThis.next().empty();
        scopeThis.next().removeClass("carousel_close close_button fa-times");
        scopeThis.next().addClass("update_button fa-check");
        removeUpdateCarouselEvent();
        updateCarouselAssetInput();
    });
}

function updateCarouselAssetInput()
{
    $(".update_button").click(function()
    {
        var scopeThis = $(this);
        if (scopeThis.prev().val() != '')
        {
            var data = {
                id: scopeThis.data('id'),
                landing_page_id: landing_page_id,
                carousel_attribute_id: scopeThis.prev().data('carousel'),
                reference_id: scopeThis.prev().val()
            };
            $.ajax({
                url: base_url + "api/v1/landings/carousel",
                data: data,
                dataType: "json",
                type: "PUT",
                statusCode: {
                    200: function() {
                        scopeThis.off("click");
                        scopeThis.removeClass("update_button fa-check");
                        scopeThis.addClass("carousel_close close_button fa-times");
                        removeCloseCarouselEvent();
                        removeCarouselAssetInput();
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
    });
}

function removeCarouselAssetInput()
{
    $(".carousel_close").click(function()
    {
        var scopeThis = $(this);
        if (typeof $("#zc_carousel_asset_" + scopeThis.data('id')) != 'undefined')
        {
            var data = {
                id: scopeThis.data('id')
            };
            $.ajax({
                url: base_url + "api/v1/landings/carousel",
                data: data,
                dataType: "json",
                type: "DELETE",
                statusCode: {
                    200: function() {
                        scopeThis.parent().parent().remove();
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
                    bootstrapError("There was a general error while deleting the field.");
                }
            });
        }
    });
}

function editLandingText()
{
    $("#zc_landing_edit").click(function()
    {
        add_editor($('#zc_landing'));
        $("#zc_landing_save").show();
        $(this).hide();
    });
    $("#zc_landing_desc_top_edit").click(function()
    {
        add_editor($('#zc_landing_desc_top'));
        $("#zc_landing_desc_top_save").show();
        $(this).hide();
    });
    $("#zc_landing_title_edit").click(function()
    {
        $("#zc_landing_title").show();
        $("#zc_landing_title_save").show();
        $(this).hide();
    });
    $("#zc_landing_type_title_edit").click(function()
    {
        $("#zc_landing_type_title").show();
        $("#zc_landing_type_title_save").show();
        $(this).hide();
    });
    $("#zc_landing_meta_desc_edit").click(function()
    {
        $("#zc_landing_meta_desc").show();
        $("#zc_landing_meta_desc_save").show();
        $(this).hide();
    });
    $("#zc_landing_meta_keywords_edit").click(function()
    {
        $("#zc_landing_meta_keywords").show();
        $("#zc_landing_meta_keywords_save").show();
        $(this).hide();
    });
}

function saveLandingText()
{
    $("#zc_landing_save").click(function()
    {
        var scopeThis = $(this);
        var newData = check_editor_data($("#zc_landing"), $("#landing_page"));
        if (newData !== false)
        {
            var data = {
                id: $(this).data("id"),
                desc_text: newData
            };
            $.ajax({
                url: base_url + "api/v1/landings",
                data: data,
                dataType: "json",
                type: "PUT",
                statusCode: {
                    200: function(response) {
                        remove_editor($('#zc_landing'));
                        scopeThis.hide();
                        if (typeof response != 'undefined' && response.length)
                        {
                            var landing_page = JSON.parse(response).data;
                            $("#landing_page").html(landing_page.desc_text);
                        }
                        $("#zc_landing_edit").show();
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
            remove_editor($('#zc_landing'));
            scopeThis.hide();
            $("#zc_landing_edit").show();
        }
    });

    $("#zc_landing_desc_top_save").click(function()
    {
        var scopeThis = $(this);
        var newData = check_editor_data($("#zc_landing_desc_top"), $("#landing_page_desc_top"));
        if (newData !== false)
        {
            var data = {
                id: $(this).data("id"),
                desc_text_top: newData
            };
            $.ajax({
                url: base_url + "api/v1/landings",
                data: data,
                dataType: "json",
                type: "PUT",
                statusCode: {
                    200: function(response) {
                        remove_editor($("#zc_landing_desc_top"));
                        scopeThis.hide();
                        if (typeof response != 'undefined' && response.length)
                        {
                            var landing_page = JSON.parse(response).data;
                            $("#landing_page_desc_top").html(landing_page.desc_text_top);
                        }
                        $("#zc_landing_desc_top_edit").show();
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
            remove_editor($("#zc_landing_desc_top"));
            scopeThis.hide();
            $("#zc_landing_desc_top_edit").show();
        }
    });

//    $("#zc_landing_new_save").click(function()
//    {
//        var scopeThis = $(this);
//        var data = {
//            location_id: location_id,
//            usageSuperset_id: usagesuperset_id,
//            lang_code: language_code,
//            desc_text: nl2br($("#zc_landing_new").val())
//        };
//        $.ajax({
//            url: base_url + "api/v1/landings",
//            data: data,
//            dataType: "json",
//            type: "POST",
//            statusCode: {
//                201: function() {
//                    scopeThis.hide();
//                    location.reload();
//                },
//                403: function(err) {
//                    bootstrapError(err.responseJSON);
//                },
//                405: function(err) {
//                    bootstrapError(err.responseJSON);
//                }
//            },
//            error: function()
//            {
//                bootstrapError("There was a general error while inserting the field.");
//            }
//        });
//    });

    $("#zc_landing_title_save").click(function()
    {
        var scopeThis = $(this);
        if ($("#zc_landing_title").val() != $("#zc_curr_landing_title").text())
        {
            var data = {
                id: $(this).data("id"),
                meta_title: $("#zc_landing_title").val()
            };
            $.ajax({
                url: base_url + "api/v1/landings",
                data: data,
                dataType: "json",
                type: "PUT",
                statusCode: {
                    200: function(response) {
                        scopeThis.hide();
                        if (typeof response != 'undefined' && response.length)
                        {
                            var landing_page = JSON.parse(response).data;
                            $("#zc_curr_landing_title").text(landing_page.meta_title);
                        }
                        $("#zc_landing_title").hide();
                        $("#zc_landing_title_edit").show();
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
            scopeThis.hide();
            $("#zc_landing_title").hide();
            $("#zc_landing_title_edit").show();
        }
    });
    $("#zc_landing_type_title_save").click(function()
    {
        var scopeThis = $(this);
        if ($("#zc_landing_type_title").val() != $("#zc_curr_landing_type_title").text())
        {
            var data = {
                id: $(this).data("id"),
                carousel_title: $("#zc_landing_type_title").val()
            };
            $.ajax({
                url: base_url + "api/v1/landings",
                data: data,
                dataType: "json",
                type: "PUT",
                statusCode: {
                    200: function(response) {
                        scopeThis.hide();
                        if (typeof response != 'undefined' && response.length)
                        {
                            var landing_page = JSON.parse(response).data;
                            $("#zc_curr_landing_type_title").text(landing_page.carousel_title);
                        }
                        $("#zc_landing_type_title").hide();
                        $("#zc_landing_type_title_edit").show();
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
            scopeThis.hide();
            $("#zc_landing_type_title").hide();
            $("#zc_landing_type_title_edit").show();
        }
    });
    $("#zc_landing_meta_desc_save").click(function()
    {
        var scopeThis = $(this);
        if ($("#zc_landing_meta_desc").val() != $("#zc_curr_landing_meta_desc").text())
        {
            var data = {
                id: $(this).data("id"),
                meta_desc: $("#zc_landing_meta_desc").val()
            };
            $.ajax({
                url: base_url + "api/v1/landings",
                data: data,
                dataType: "json",
                type: "PUT",
                statusCode: {
                    200: function(response) {
                        scopeThis.hide();
                        if (typeof response != 'undefined' && response.length)
                        {
                            var landing_page = JSON.parse(response).data;
                            $("#zc_curr_landing_meta_desc").text(landing_page.meta_desc);
                        }
                        $("#zc_landing_meta_desc").hide();
                        $("#zc_landing_meta_desc_edit").show();
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
            scopeThis.hide();
            $("#zc_landing_meta_desc").hide();
            $("#zc_landing_meta_desc_edit").show();
        }
    });
    $("#zc_landing_meta_keywords_save").click(function()
    {
        var scopeThis = $(this);
        if ($("#zc_landing_meta_keywords").val() != $("#zc_curr_landing_meta_keywords").text())
        {
            var data = {
                id: $(this).data("id"),
                meta_keyword: $("#zc_landing_meta_keywords").val()
            };
            $.ajax({
                url: base_url + "api/v1/landings",
                data: data,
                dataType: "json",
                type: "PUT",
                statusCode: {
                    200: function(response) {
                        scopeThis.hide();
                        if (typeof response != 'undefined' && response.length)
                        {
                            var landing_page = JSON.parse(response).data;
                            $("#zc_curr_landing_meta_keywords").text(landing_page.meta_keyword);
                        }
                        $("#zc_landing_meta_keywords").hide();
                        $("#zc_landing_meta_keywords_edit").show();
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
            scopeThis.hide();
            $("#zc_landing_meta_keywords").hide();
            $("#zc_landing_meta_keywords_edit").show();
        }
    });
}

function insertSimilarLocInput(lang)
{
    $("#zc_similar_loc_add").click(function()
    {
        $.ajax({
            url: base_url + "api/v1/landings/vertical?id=" + $(this).data("vertical"),
            dataType: "json",
            type: "GET",
            statusCode: {
                200: function(response) {
                    if (typeof response != 'undefined' && response.length)
                    {
                        var landingPages = JSON.parse(response).data.objects;
                        var landPageOpts = '<option value="-1" selected disabled>Select...</option>';
                        $.each(landingPages, function(index) {
                            landPageOpts += '<option value="' + landingPages[index].landing_page_id + '">' + parseLangLine(lang.home.home_landing_similar_link, ((typeof landingPages[index].landing_page_attribute_desc != 'undefined')?landingPages[index].landing_page_attribute_desc:''), landingPages[index].landing_page_tag_label, landingPages[index].landing_page_location_desc) + '</option>';
                        });
                        var newId = Math.round(Math.random() * 1000000000);
                        $("#similar_locations_new").append('<div class="new-similar" id="new-similar_' + newId + '"><div class="select select-block input-group"><select id="zc_similar_land_new_' + newId + '">' + landPageOpts + '</select></div><div class="similar_reciprocal"><label for="zc_similar_reciprocal_new_' + newId + '">Include opposite?</label><input id="zc_similar_reciprocal_new_' + newId + '" type="checkbox" checked /></div><div class="similar_save"><div class="input-group-addon similar_save_button save_button fa fa-check" data-id="' + newId + '"></div></div>');
                        removeSaveSimilarEvent();
                        saveSimilarFields();
                    }
                },
                403: function(err) {
                    bootstrapError(err.responseJSON);
                }
            },
            error: function()
            {
                bootstrapError("There was a general error while finding the data.");
            }
        });
    });
}

function saveSimilarFields()
{
    $(".similar_save_button").click(function()
    {
        var scopeThis = $(this);
        if ($("#zc_similar_land_new_" + scopeThis.data('id')).val() != null)
        {
            var data = {
                landing_page_id: landing_page_id,
                linked_landing_page_id: $("#zc_similar_land_new_" + scopeThis.data('id')).val(),
                reciprocal: +$("#zc_similar_reciprocal_new_" + scopeThis.data('id')).is(':checked')
            };
            $.ajax({
                url: base_url + "api/v1/landings/similar",
                data: data,
                dataType: "json",
                type: "POST",
                statusCode: {
                    201: function(response) {
                        if (typeof response != 'undefined' && response.length)
                        {
                            var sim_link = JSON.parse(response).data;
                            loadLang(['home']).then(function (lang) {
                                var title = parseLangLine(lang.home.home_landing_similar_link, ((typeof sim_link.attr_desc != 'undefined')?sim_link.attr_desc:''), sim_link.tag_label, sim_link.location_desc);
                                $("#new-similar_" + scopeThis.data('id')).hide();
                                $("#similar_land_add").append('<li><a href="/' + country_lang_url + '/' + sim_link.lang_url + '" title="' + title + '" id="zc_similar_loc_' + sim_link.id + '">' + title + '</a><a class="zc_similar_loc_remove btn btn-primary btn-xs" data-id="' + sim_link.id + '"><span class="fa fa-times"></span></a></li>');
                                removeCloseSimilarEvent();
                                removeSimilarLocInput();
                            });
                        }
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
                    bootstrapError("There was a general error while inserting the field.");
                }
            });
        }
    });
}

function removeSimilarLocInput()
{
    $(".zc_similar_loc_remove").click(function()
    {
        var scopeThis = $(this);
        if (typeof $("#zc_similar_loc_" + scopeThis.data('id')) != 'undefined')
        {
            var data = {
                id: scopeThis.data('id')
            };
            $.ajax({
                url: base_url + "api/v1/landings/similar",
                data: data,
                dataType: "json",
                type: "DELETE",
                statusCode: {
                    200: function() {
                        scopeThis.parent().remove();
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
                    bootstrapError("There was a general error while deleting the field.");
                }
            });
        }
    });
}