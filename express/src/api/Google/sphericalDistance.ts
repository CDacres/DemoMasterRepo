/* tslint:disable:max-line-length */
import { GeoLocation } from '@src/core';

export const toLatLng = (location: GeoLocation) => new google.maps.LatLng(location.lat, location.lng);
export const sphericalDistance = (from: google.maps.LatLng, to: google.maps.LatLng): number => google.maps.geometry.spherical.computeDistanceBetween(from, to);
