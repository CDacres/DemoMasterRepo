$(function()
{
    // tab functionality
    $('#search_tabs li').click(function() {
        var usageSuperset = $(this).data('usage-id');
        $(".row[data-usage-id]").hide();
        $(".row[data-usage-id=" + usageSuperset + "]").show();
    });

    // datepicker
    $('#datepicker2, #datepicker3, #datepicker4, #datepicker5, #datepicker6, #datepicker10').datepicker($.datepicker.regional[language_code]);

    $(".location-autocomplete").each(function() {
        var autocomplete = new google.maps.places.Autocomplete($(this).get(0), {});
        var form = $(this).closest("form");
        var input = $(this);

        form.on('submit', function(e)
        {
            // use geocode if no location data assigned from autocomplete.
            if (!form.data('location') && input.val() != '')
            {
                e.preventDefault();
                // hard-coding uk to results to bias region..
                // todo: add user country to location results.
                var geocoder = new google.maps.Geocoder();
                geocoder.geocode({ "address" : input.val(), "region" : $.cookie("user_cctld") }, function(results, status)
                {
                    if (status == google.maps.GeocoderStatus.OK && results.length > 0)
                    {
                        var place = results[0];
                        form.find("input[name='lat']").val(place.geometry.location.lat());
                        form.find("input[name='lon']").val(place.geometry.location.lng());
                        var bounds = place.geometry.viewport;
                        var ne = bounds.getNorthEast();
                        var sw = bounds.getSouthWest();
                        form.find("input[name='ne_lon']").val(ne.lng());
                        form.find("input[name='ne_lat']").val(ne.lat());
                        form.find("input[name='sw_lon']").val(sw.lng());
                        form.find("input[name='sw_lat']").val(sw.lat());
                        var newVal;
                        if (typeof place.address_components != 'undefined')
                        {
                            var address = place.address_components;
                            if (address.length > 1)
                            {
                                newVal = address[0].long_name + ', ' + address[address.length - 1].long_name;
                            }
                            else
                            {
                                newVal = place.formatted_address;
                            }
                        }
                        else
                        {
                            newVal = place.formatted_address;
                        }
                        form.get(0).action = form.find("input[name='action']").val() + newVal.replace(/[-]/g, '~').replace(/[, ]/g, '-').replace(/[/]/g, '');
                        input.val(newVal);
                    }
                    form.get(0).submit();
                });
            }
            else if (input.val() == '')
            {
                form.get(0).action = form.find("input[name='action']").val() + default_location;
                form.get(0).submit();
            }
            return true;
        });
        // update values when autocomplete
        google.maps.event.addListener(autocomplete, 'place_changed', function()
        {
            var place = autocomplete.getPlace();
            // if lat long
            if (place.geometry && place.geometry.location && place.geometry.viewport)
            {
                form.find("input[name='lat']").val(place.geometry.location.lat());
                form.find("input[name='lon']").val(place.geometry.location.lng());
                var bounds = place.geometry.viewport;
                var ne = bounds.getNorthEast();
                var sw = bounds.getSouthWest();
                form.find("input[name='ne_lon']").val(ne.lng());
                form.find("input[name='ne_lat']").val(ne.lat());
                form.find("input[name='sw_lon']").val(sw.lng());
                form.find("input[name='sw_lat']").val(sw.lat());
                // let form submit know location has been found
                form.get(0).action = form.find("input[name='action']").val() + input.val().replace(/[-]/g, '~').replace(/[, ]/g, '-').replace(/[/]/g, '');
                form.attr('data-location', 'true');
            }
            else
            {
                form.find("input[name='lat']").val("");
                form.find("input[name='lon']").val("");
                form.find("input[name='ne_lon']").val("");
                form.find("input[name='ne_lat']").val("");
                form.find("input[name='sw_lon']").val("");
                form.find("input[name='sw_lat']").val("");
                form.get(0).action = form.find("input[name='action']").val() + default_location;
                form.attr('data-location', 'false');
            }
        });
        input.change(function()
        {
            if ($(this).val() == '')
            {
                form.find("input[name='lat']").val("");
                form.find("input[name='lon']").val("");
                form.find("input[name='ne_lon']").val("");
                form.find("input[name='ne_lat']").val("");
                form.find("input[name='sw_lon']").val("");
                form.find("input[name='sw_lat']").val("");
                form.get(0).action = form.find("input[name='action']").val() + default_location;
                form.attr('data-location', 'false');
            }
        });
    });
});
