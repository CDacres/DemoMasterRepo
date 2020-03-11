/* global google */

export function getDistance(p1 = { lat: 0, lng: 0 }, p2 = { lat: 0, lng: 0 }) {
    const rad = x => x * (Math.PI / 180);
    const R = 6378137; // Earth’s mean radius in meter
    const dLat = rad(p2.lat - p1.lat);
    const dLong = rad(p2.lng - p1.lng);
    const a = (Math.sin(dLat / 2) * Math.sin(dLat / 2)) +
        (Math.cos(rad(p1.lat)) * Math.cos(rad(p2.lat)) *
            Math.sin(dLong / 2) * Math.sin(dLong / 2));
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c;
    return d; // returns the distance in meter
}

export function geocoderGetLocationObj(lat, lng) {
    return new Promise((resolve, reject) => {
        const geocoder = new google.maps.Geocoder();
        geocoder.geocode({ lat, lng }, (results) => {
            if (results && results.length > 0) {
                resolve([
                    results[0].geometry.location,
                    results[0].geometry.viewport,
                ]);
            } else {
                reject('No results');
            }
        });
    });
}
