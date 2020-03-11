function onSubmitSearch(locationSelected, location_desc) {
    const form = $('#search_form');
    const input = $('#location_string');

    // use geocode if no location data assigned from autocomplete.
    if (!form.data('location') && input.val() !== '') {
        // hard-coding uk to results to bias region..
        // todo: add user country to location results.
        const geocoder = new google.maps.Geocoder();
        geocoder.geocode({ address: input.val(), region: $.cookie('user_cctld') }, (results, status) => {
            if (status == google.maps.GeocoderStatus.OK && results.length > 0) {
                const place = results[0];
                form.find('input[name="lat"]').val(place.geometry.location.lat());
                form.find('input[name="lon"]').val(place.geometry.location.lng());
                const bounds = place.geometry.viewport;
                const ne = bounds.getNorthEast();
                const sw = bounds.getSouthWest();
                form.find('input[name="ne_lon"]').val(ne.lng());
                form.find('input[name="ne_lat"]').val(ne.lat());
                form.find('input[name="sw_lon"]').val(sw.lng());
                form.find('input[name="sw_lat"]').val(sw.lat());
                if (!locationSelected && typeof location_desc === 'undefined') {
                    let newVal;
                    if (typeof place.address_components !== 'undefined') {
                        const address = place.address_components;
                        if (address.length > 1) {
                            newVal = `${address[0].long_name}, ${address[address.length - 1].long_name}`;
                        } else {
                            newVal = place.formatted_address;
                        }
                    } else {
                        newVal = place.formatted_address;
                    }
                    form.get(0).action = form.find('input[name="action"]').val() + newVal.replace(/[-]/g, '~').replace(/[, ]/g, '-').replace(/[/()]/g, '');
                    input.val(newVal);
                } else {
                    form.get(0).action = form.find('input[name="action"]').val() + input.val().replace(/[-]/g, '~').replace(/[, ]/g, '-').replace(/[/()]/g, '');
                }
            }
            form.get(0).submit();
        });
    } else if (input.val() === '') {
        form.get(0).action = form.find('input[name="action"]').val() + location_desc.replace(/[-]/g, '~').replace(/[, ]/g, '-').replace(/[/()]/g, '');
        form.get(0).submit();
    }
}

export {
    onSubmitSearch
};
