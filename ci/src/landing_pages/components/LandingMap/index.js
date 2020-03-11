/* global $ document google */

const markerImage = '/css/images/landing_pages/map/location-dot.png';

const initCardMap = (bounds, pointers) => {
    const map = new google.maps.Map(document.getElementById('lp_map'), {
        zoom: 12,
        minZoom: 12,
        scrollwheel: false,
        disableDoubleClickZoom: true,
        navigationControl: false,
        mapTypeControl: false,
        scaleControl: false,
        draggable: false,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        disableDefaultUI: true,
        center: {
            lat: parseFloat(bounds.lat),
            lng: parseFloat(bounds.lon)
        }
    });
    $.each(pointers, (markerIndex, markerData) => {
        const marker = new google.maps.Marker({
            position: new google.maps.LatLng(markerData.lat, markerData.long),
            icon: markerImage
        });
        marker.setMap(map);
    });
    const mapBounds = new google.maps.LatLngBounds();
    const swLatLng = new google.maps.LatLng(bounds.sw_lat, bounds.sw_lon);
    mapBounds.extend(swLatLng);
    const neLatLng = new google.maps.LatLng(bounds.ne_lat, bounds.ne_lon);
    mapBounds.extend(neLatLng);
    map.fitBounds(mapBounds);
};

export default initCardMap;
