/* global $ google */

// Google maps
const map = new google.maps.Map($('#search_map').get(0), {
//    center: {
//        lat: 51.507351,
//        lng: -0.127758
//    },
    zoom: $.query.GET('zoom') ? $.query.GET('zoom') : 14,
    maxZoom: 16,
    minZoom: 12,
    clickableIcons: false,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    styles: [
        {
            featureType: 'poi.business',
            stylers: [
                {
                    visibility: 'off',
                },
            ],
        },
    ],
    disableDefaultUI: true,
    navigationControl: true,
    navigationControlOptions:
    {
        position: google.maps.ControlPosition.LEFT
    },
    scaleControl: true,
    scrollwheel: false,
    zoomControl: true,
    zoomControlOptions: {
        style: google.maps.ZoomControlStyle.SMALL,
        position: google.maps.ControlPosition.LEFT_TOP
    }
});

export default map;
