/* global document */

export { addClass, removeClass } from './dom';
export { createCookie, readCookie, eraseCookie } from './cookies';
export { clearErrorNotification, clearSuccessNotification, errorNotification, successNotification } from './notifications';
export { setStarRatings } from './reviews';
export { getFullDateObj } from './date_and_time';
export { batchMap } from './data_manipulation';
export { attachPhoneHelper } from './plugin_attachment';
export { compareObjects, diffArraysOfObjects } from './data_comparison';
export { shortenString } from './string_manipulation';
export {
    getDistance,
    geocoderGetLocationObj,
} from './distance';
