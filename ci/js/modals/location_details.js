function init_edit_location($object)
{
    clearMainModal();
    $("#mainModal").on("shown.bs.modal", function()
    {
        $("#mainModal").on("hidden.bs.modal", function()
        {
            $("#mainModal").off("shown.bs.modal");
        });
    });
    $("#modal_slide_up_content").load(base_url + country_lang_url + '/common_protected/modal_location_edit_details/' + $object.data("id"), function()
    {
        $("#mainModal").modal('show');
        verticallyCenterModal();
        activate_location_modal_listeners($object.data("id"));
        cancelButtonListener();
    });
}

function init_add_location()
{
    clearMainModal();
    $("#mainModal").on("shown.bs.modal", function()
    {
        $("#mainModal").on("hidden.bs.modal", function()
        {
            $("#mainModal").off("shown.bs.modal");
        });
    });
    $("#modal_slide_up_content").load(base_url + country_lang_url + '/common_protected/modal_location_add_details/', function()
    {
        $("#mainModal").modal('show');
        verticallyCenterModal();
        activate_location_modal_listeners(null);
        cancelButtonListener();
    });
}

function activate_location_modal_listeners(locationId)
{
    attach_location_finder();
    $("#zc_location_place").change(function()
    {
        $("#zc_location_url").val(create_location_url($(this).val()));
        $("#zc_location_url").change();
    });
    $("#edit_location").click(function()
    {
        var scopeThis = $(this);
        if ($("#zc_location_place").val() == '' || $("#zc_location_url").val() == '' || $("#zc_location_category").val() == null)
        {
            bootstrapError("Please ensure all relevant fields are filled in.");
        }
        else if ($("#zc_location_parent").val() == null && $("#zc_location_category").val() != null && $("#zc_location_category").val() != 1)
        {
            bootstrapError("Please ensure the parent is chosen.");
        }
        else if ($("#zc_location_parent").val() == locationId)
        {
            bootstrapError("Parent location cannot be itself");
        }
        else if ($("#zc_redirect_loc").val() == locationId)
        {
            bootstrapError("Redirected location cannot be itself");
        }
        else
        {
            var data = {
                id: locationId,
                search_url: $("#zc_location_search_url").val(),
                human_desc: $("#zc_location_place").val(),
                url_desc: $("#zc_location_url").val(),
                parent_id: $("#zc_location_parent").val(),
                parent_desc: $("#zc_location_parent").find(':selected').text(),
                in_sitemap: +$("#zc_location_crawl_check").is(":checked"),
                lat: $("#zc_location_lat").val(), //to allow change
                long: $("#zc_location_long").val(), //to allow change
                bounds_distance: $("#zc_bounds_distance").val(),
                locationcategorie_id: $("#zc_location_category").val()
            };
            $.ajax({
                url: base_url + "api/v1/locations",
                data: data,
                dataType: "json",
                type: "PUT",
                statusCode: {
                    200: function() {
                        enableModalButton(scopeThis);
                        closeMainModal();
                        location.reload();
                    },
                    403: function(err) {
                        enableModalButton(scopeThis);
                        bootstrapError(err.responseJSON);
                    },
                    405: function(err) {
                        enableModalButton(scopeThis);
                        bootstrapError(err.responseJSON);
                    }
                },
                error: function()
                {
                    bootstrapError("There was a general error while updating the location.");
                    enableModalButton(scopeThis);
                }
            });
        }
    });
    $("#add_location").click(function()
    {
        var errorMessage = '';
        if ($("#zc_location_place").val() == '')
        {
            errorMessage = "the place is filled in";
        }
        else if ($("#zc_location_url").val() == '')
        {
            errorMessage = "the url is filled in";
        }
        else if ($("#zc_location_category").val() == null)
        {
            errorMessage = "the category is chosen";
        }
        else if ($("#zc_location_parent").val() == null && $("#zc_location_category").val() != null && $("#zc_location_category").val() != 1)
        {
            errorMessage = "the parent is chosen";
        }
        if (errorMessage == '')
        {
            //don't post lat/long to allow server side geocode to pickup correct bounds
            var data = {
                search_url: $("#zc_location_search_url").val(),
                human_desc: $("#zc_location_place").val(),
                url_desc: $("#zc_location_url").val(),
                parent_id: $("#zc_location_parent").val(),
                parent_desc: $("#zc_location_parent").find(':selected').text(),
                in_sitemap: +$("#zc_location_crawl_check").is(":checked"),
                bounds_distance: $("#zc_bounds_distance").val(),
                locationcategorie_id: $("#zc_location_category").val()
            };
            $.ajax({
                url: base_url + "api/v1/locations",
                data: data,
                dataType: "json",
                type: "POST",
                statusCode: {
                    201: function() {
                        closeMainModal();
                        location.reload();
                    },
                    403: function(err) {
                        bootstrapError(err.responseJSON);
                    }
                },
                error: function()
                {
                    bootstrapError("There was a general error while inserting the location.");
                }
            });
        }
        else
        {
            bootstrapError("Please ensure " + errorMessage + ".");
        }
    });
}

function attach_location_finder()
{
    var $input = $('#modal_autocomplete');
    var options = {};
    var autocomplete = new google.maps.places.Autocomplete($input.get(0), options);
    google.maps.event.addListener(autocomplete, 'place_changed', function()
    {
        var place = autocomplete.getPlace();
        var search_url = $input.val().replace(/[-]/g, '~').replace(/[, ]/g, '-').replace(/[/()]/g, '');
        $("#zc_location_search_url").val(search_url);
        $("#search_url").text(search_url);
        $("#zc_location_place").val(place.name);
        if (typeof place.geometry !== "undefined")
        {
            $("#zc_location_lat").val(place.geometry.location.lat());
            $("#zc_location_long").val(place.geometry.location.lng());
            $("#zc_location_url").val(create_location_url(place.name));
            $("#zc_location_url").change();
            var city, country, countryCode, town;
            for (var i = 0; i < place.address_components.length; i++)
            {
                var addr = place.address_components[i];
                switch (addr.types[0])
                {
                    case 'locality':

                        city = addr.long_name;
                    break;

                    case 'country':

                        country = addr.long_name;
                        countryCode = addr.short_name;
                    break;

                    case 'postal_town':

                        town = addr.long_name;
                    break;
                }
            }
            find_location_parent(place.name, city, country, town, countryCode);
        }
    });
}

function create_location_url(place)
{
    return place.replace(/[-]/g, '~').replace(/[, ]/g, "-").replace(/[/()]/g, '').toLowerCase();
}

function find_location_parent(origPlace, city, country, town, countryCode)
{
    var placeName;
    if (city != null && city != origPlace)
    {
        placeName = city;
    }
    else if (town != null && town != origPlace)
    {
        placeName = town;
    }
    else if (country != null && country != origPlace)
    {
        placeName = country;
    }
    var data = {
        human_desc: placeName,
        country: countryCode
    };
    $.ajax({
        url: base_url + "api/v1/locations",
        data: data,
        dataType: "json",
        type: "GET",
        statusCode: {
            200: function(response) {
                if (typeof response != 'undefined' && response.length)
                {
                    response = JSON.parse(response);
                    if (response.data.id != null)
                    {
                        $("#zc_location_parent").val(response.data.id);
                        $("#zc_location_parent").change();
                    }
                    else
                    {
                        $("#zc_location_parent").val(-1);
                        $("#zc_location_parent").change();
                    }
                }
                else
                {
                    $("#zc_location_parent").val(-1);
                    $("#zc_location_parent").change();
                }
            },
            403: function(err) {
                bootstrapError(err.responseJSON);
            },
            405: function(err) {
                bootstrapError(err.responseJSON);
            }
        }
    });
}