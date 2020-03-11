function attach_location_finder()
{
    var $input = $('#modal_autocomplete');
    var options = {};
    var autocomplete = new google.maps.places.Autocomplete($input.get(0), options);
    google.maps.event.addListener(autocomplete, 'place_changed', function()
    {
        var place = autocomplete.getPlace();
        $input.val(place.formatted_address);
        if (typeof place.geometry !== "undefined")
        {
            $input.data('lat', place.geometry.location.lat());
            $input.data('long', place.geometry.location.lng());
            var city, country, countryCode, streetNumber, road, town, county, postCode;
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
                    case 'street_number':
                        streetNumber = addr.long_name;
                        break;
                    case 'route':
                        road = addr.long_name;
                        break;
                    case 'postal_town':
                        town = addr.long_name;
                        break;
                    case 'administrative_area_level_2':
                        county = addr.long_name;
                        break;
                    case 'postal_code':
                        postCode = addr.long_name;
                        break;
                }
            }
            Venue.lat = place.geometry.location.lat();
            Venue.long = place.geometry.location.lng();
            $('#zc_town_city').val(city);
            if (!isUndefined(city))
                VenueListing.steps.step1.progress = VenueListing.updateProgressBar($('#zc_town_city'), '', VenueListing.steps.step1);
            $('#zc_venue_country').val(country);
            if (!isUndefined(country))
                VenueListing.steps.step1.progress = VenueListing.updateProgressBar($('#zc_venue_country'), '', VenueListing.steps.step1);
            $('#zc_street_number').val(streetNumber);
            if (!isUndefined(streetNumber))
                VenueListing.steps.step1.progress = VenueListing.updateProgressBar($('#zc_street_number'), '', VenueListing.steps.step1);
            $('#zc_street_address').val(road);
            if (!isUndefined(road))
                VenueListing.steps.step1.progress = VenueListing.updateProgressBar($('#zc_street_address'), '', VenueListing.steps.step1);
            $('#zc_county').val(county);
            if (!isUndefined(county))
                VenueListing.steps.step1.progress = VenueListing.updateProgressBar($('#zc_county'), '', VenueListing.steps.step1);
            $('#zc_postcode').val(postCode);
            if (!isUndefined(postCode))
                VenueListing.steps.step1.progress = VenueListing.updateProgressBar($('#zc_postcode'), '', VenueListing.steps.step1)
            $('#fullAddress').show();
            VenueListing.showProgress(VenueListing.steps.step1);
            VenueListing.initiateMap();
        }
    });
}

function isUndefined(value) {
    if (typeof value === 'undefined')
        return true;
    return false;
}

$(document).ready(function()
{
    attach_location_finder();
});
