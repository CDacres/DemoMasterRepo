/* tslint:disable:max-line-length */
import { createSelector } from 'reselect';
import { denormalize } from 'json-api-denormalizr';
import { AllHtmlEntities } from 'html-entities';
import qs from 'qs';

// Helpers
import { TranslationHelper } from '@src/helpers';

// Mungers
// import { generateDateAndTimeText, generateOfficeTypeAndSizeText } from '@src/mungers/search/filters';

// Utils
import { generateSearchUrl } from '@src/store/utils';

const entities = new AllHtmlEntities();

const getAdminFromState = state => state.admin;
const getAuthFromState = state => state.auth;
const getAuthUserFromState = state => state.auth.user;
const getBrowseFromState = state => state.pages.browse;
const getConfigFromState = state => state.config;
const getSearchCuisineFromState = state => state.search.params.cuisines;
const getCurrencySymbolFromSearchObject = state => (state.pages && state.pages.search) ? state.pages.search.results.searchObject.currencySymbolLeft : {};
const getDataFromState = (state, type, id) => denormalize(state, state[type][id]);
const getDefaultTagFromState = state => state.search.tags.defaultTags[0];
const getDomainFromState = state => state.config.domain;
const getErrorsFromState = state => state.error;
const getLandingFromState = state => state.pages.landing;
const getLangFromState = state => state.lang;
const getMetaFromState = state => state.meta;
const getNavigationFromState = state => state.navigation;
const getOrderDetailsFromState = state => state.order;
const getRequestFromState = state => state.request;
const getRequestErrorsFromState = state => state.request.error;
const getResponsiveFromState = state => state.responsive;
const getRoomFromState = state => state.room;
const getSearchFromState = state => state.search;
const getSearchAmenitiesFromState = state => state.search.params.amenities;
const getSearchConfigurationsFromState = state => state.search.params.configurations;
const getSearchDateFromState = state => state.search.params.date;
const getSearchDiningOptionsFromState = state => state.search.params.diningOptions;
const getSearchGuestsFromState = state => state.search.params.guests;
const getSearchLocationFromState = state => state.search.params.location;
const getSearchMapFromState = state => (state.pages && state.pages.search) ? state.pages.search.map : {};
// const getSearchOfficeSizeFromState = state => state.search.params.officeSize;
const getSearchOfficeTypesFromState = state => state.search.params.officeTypes;
const getSearchResultsFromState = state => (state.pages && state.pages.search) ? state.pages.search.results : {};
const getSearchResultByIdFromState = (state, id) => (state.pages && state.pages.search) ? state.pages.search.results.data.find(result => result.id === id) : {};
const getSearchPriceRangeFromState = state => state.search.params.priceRange;
const getSearchTagFromState = state => state.search.params.tag;
const getSearchTypesFromState = state => state.search.params.types;
const getSiteImagesFromState = state => state.admin.siteImages;
const getUiFromState = state => state.ui;
const getUserFromState = state => state.navigation.user;
const getWidgetFromState = state => state.pages.widget;

function arrayFilterHandler(key: string, buttonTransKey: string) {
  return (array, lang) => {
    const isActive = array.length > 0;
    const translationHelper = new TranslationHelper({ messages: lang });
    const defaultButtonText = translationHelper.get(buttonTransKey);
    return {
      buttonText: isActive ? `${defaultButtonText} · ${array.length}` : defaultButtonText,
      defaultButtonText,
      isActive,
      values: { [key]: array },
    };
  };
}

export function countArrayLengths(...arrayArgs: any[]): number {
  return arrayArgs.reduce((acc, curr) => {
    if (curr.length) {
      acc += 1;
    }
    return acc;
  }, 0);
}

export const getAdmin = createSelector([getAdminFromState], admin => admin);
export const getAuth = createSelector([getAuthFromState], auth => auth);
export const getAuthUser = createSelector([getAuthUserFromState], user => user);
export const getBrowse = createSelector([getBrowseFromState], data => data);
export const getConfig = createSelector([getConfigFromState], config => config);
export const getCurrencySymbol = createSelector([getCurrencySymbolFromSearchObject], currencySymbol => currencySymbol);
export const getData = createSelector([getDataFromState], data => data);
export const getDomain = createSelector([getDomainFromState], domain => domain);
export const getErrors = createSelector([getErrorsFromState], errors => errors);
export const getIsMobile = createSelector([getResponsiveFromState], ({ mobile }) => mobile);
export const getLanding = createSelector([getLandingFromState], data => data);
export const getLang = createSelector([getLangFromState], lang => lang);
export const getMeta = createSelector([getMetaFromState], meta => meta);
export const getNavigation = createSelector([getNavigationFromState], navigation => navigation);
export const getUi = createSelector([getUiFromState], ui => ui);
export const getRequest = createSelector([getRequestFromState], request => request);
export const getRequestErrors = createSelector([getRequestErrorsFromState], errors => errors);
export const getSearch = createSelector([getSearchFromState], search => search);
export const getSearchAmenities = createSelector([getSearchAmenitiesFromState], amenities => amenities);
export const getSearchConfigurations = createSelector([getSearchConfigurationsFromState], configurations => configurations);
export const getSearchDate = createSelector([getSearchDateFromState], date => date);
export const getSearchGuests = createSelector([getSearchGuestsFromState], guests => guests);
export const getSearchLocation = createSelector([getSearchLocationFromState], location => location);
export const getSearchResult = createSelector([getSearchResultByIdFromState], result => result);
export const getSearchResults = createSelector([getSearchResultsFromState], results => results);
export const getSearchResultUrl = createSelector([
  getSearchResultByIdFromState,
  getSearchFromState,
], (result, { params }) => (result && result.url) ? `${result.url}?${qs.stringify(params)}` : '');
export const getFullyMungedSearchUrl = createSelector([
  getConfigFromState,
  getSearchFromState,
  getSearchMapFromState,
  getDefaultTagFromState,
], ({ defaultLocation }, { params }, { bounds }, { quickSlug }) => generateSearchUrl(defaultLocation, params, bounds, quickSlug));
export const getSearchMap = createSelector([getSearchMapFromState], map => map);
export const getSearchMapCardByKey = createSelector([getSearchResultByIdFromState], result => result);
export const getSearchMapMarkers = createSelector([getSearchResultsFromState], results =>
  results.data.map(result => ({
    id: result.id,
    currency: result.currency,
    position: {
      lat: Number(result.lat),
      lng: Number(result.long),
    },
    price: result.listing_hourly_rate,
  }))
);
export const getSearchPrice = createSelector([getSearchPriceRangeFromState], price => price);
export const getSearchTag = createSelector([getSearchTagFromState], tag => tag);
export const getSearchUrl = createSelector([getSearchFromState], ({ url: { url } }) => url);
export const getSiteImages = createSelector([getSiteImagesFromState], siteImages => siteImages);
export const getUser = createSelector([getUserFromState], user => user);
export const getUserFavouritesUrl = createSelector([getUserFromState], ({ id }) => `users/${id}/favourites`);
export const getVertical = createSelector([getSearchFromState], ({ verticals: { selected } }) => selected);
export const getWidget = createSelector([getWidgetFromState], data => data);
export const isInfiniteScroll = createSelector([getSearchMapFromState], ({ isVisible }) => isVisible);

// Filter Selectors
export const getAmenitiesFilterState = createSelector([
  getSearchAmenitiesFromState,
  getLangFromState,
], arrayFilterHandler('amenities', 'search.filters_more'));
export const getConfigurationsFilterState = createSelector([
  getSearchConfigurationsFromState,
  getLangFromState,
], arrayFilterHandler('configurations', 'search.filters_layout'));
export const getCuisineFilterState = createSelector([
  getSearchCuisineFromState,
  getLangFromState,
], arrayFilterHandler('cuisines', 'search.filters_cuisine'));
export const getDateFilterState = createSelector([
  getSearchDateFromState,
  getLangFromState,
], (date, lang) => {
  const isActive = date !== '';
  const translationHelper = new TranslationHelper({ messages: lang });
  const defaultButtonText = translationHelper.get('search.filters_dates');
  return {
    buttonText: isActive ? date : defaultButtonText,
    defaultButtonText,
    isActive,
    values: { date },
  };
});
// export const getDateAndTimeFilterState = createSelector([
//   getSearchFromState,
//   getLangFromState
// ], ({ params: { allDay, date, duration, time } }, lang) => {
//   const isActive = (date !== '') || (time !== '') || (duration !== '');
//   const translationHelper = new TranslationHelper({ messages: lang }); // TODO: Translation key
//   const defaultButtonText = translationHelper.get('Date & Time');
//   return {
//     buttonText: isActive ? allDay ? translationHelper.get('common.all_day') : generateDateAndTimeText(date, time, duration) : defaultButtonText,
//     defaultButtonText,
//     isActive,
//     values: {
//       allDay,
//       date,
//       duration,
//       time,
//     },
//   };
// });
export const getDiningOptionsFilterState = createSelector([
  getSearchDiningOptionsFromState,
  getLangFromState,
], arrayFilterHandler('diningOptions', 'search.filters_food_options'));
export const getGuestsFilterState = createSelector([
  getSearchGuestsFromState,
  getLangFromState,
], (guests, lang) => {
  const isActive = guests !== '';
  const translationHelper = new TranslationHelper({ messages: lang });
  const defaultButtonText = translationHelper.get('common.guests');
  return {
    buttonText: isActive ? translationHelper.choice('common.guests_count', guests, { number: guests }) : defaultButtonText,
    defaultButtonText,
    isActive,
    values: { guests },
  };
});
export const getMoveInDateFilterState = createSelector([
  getSearchDateFromState,
  getLangFromState,
], (date, lang) => {
  const isActive = date !== '';
  const translationHelper = new TranslationHelper({ messages: lang });
  const defaultButtonText = translationHelper.get('common.move_in_date');
  return {
    buttonText: isActive ? date : defaultButtonText,
    defaultButtonText,
    isActive,
    values: { date },
  };
});
export const getNoOfPeopleFilterState = createSelector([
  getSearchGuestsFromState,
  getLangFromState,
], (guests, lang) => {
  const isActive = guests !== '';
  const translationHelper = new TranslationHelper({ messages: lang });
  const defaultButtonText = translationHelper.get('common.people');
  return {
    buttonText: isActive ? translationHelper.choice('common.people_count', guests, { number: guests }) : defaultButtonText,
    defaultButtonText,
    isActive,
    values: { guests },
  };
});
export const getOfficeTypeFilterState = createSelector([
  getSearchOfficeTypesFromState,
  getLangFromState,
], arrayFilterHandler('types', 'common.type'));
// export const getOfficeTypeAndSizeState = createSelector([
//   getSearchOfficeTypesFromState,
//   getSearchOfficeSizeFromState,
//   getLangFromState
// ], (officeTypes, officeSize, lang) => {
//   const hasOfficeSize = officeSize !== '';
//   const hasOfficeTypes = officeTypes.length > 0;
//   const isActive = hasOfficeTypes || hasOfficeSize;
//   const translationHelper = new TranslationHelper({ messages: lang });
//   const defaultButtonText = translationHelper.get('Office type & size');
//   const buttonText = generateOfficeTypeAndSizeText(officeSize, officeTypes, translationHelper);
//   return {
//     buttonText: isActive ? buttonText : defaultButtonText,
//     defaultButtonText,
//     isActive,
//     values: {officeSize},
//   };
// });
export const getTypeFilterState = createSelector([
  getSearchTypesFromState,
  getLangFromState,
], arrayFilterHandler('types', 'common.type'));
export const getPeopleFilterState = createSelector([
  getSearchGuestsFromState,
  getLangFromState,
], (guests, lang) => {
  const isActive = guests !== '';
  const translationHelper = new TranslationHelper({ messages: lang });
  const defaultButtonText = translationHelper.get('common.people');
  return {
    buttonText: isActive ?
      translationHelper.choice('common.people_count', guests, { number: guests }) :
      defaultButtonText,
    defaultButtonText,
    isActive,
    values: { guests },
  };
});
export const getPriceFilterState = createSelector([
  getSearchPriceRangeFromState,
  getLangFromState,
  getCurrencySymbolFromSearchObject,
], (priceRange, lang, currencySymbol) => {
  const isActive = priceRange.length > 0;
  const translationHelper = new TranslationHelper({ messages: lang });
  const defaultButtonText = translationHelper.get('common.price');
  const currencySym = entities.decode(currencySymbol) || '£';
  return {
    buttonText: isActive ? `${currencySym}${priceRange[0]} - ${currencySym}${priceRange[1]}` : defaultButtonText,
    defaultButtonText,
    isActive,
    values: { priceRange },
  };
});

// Filters Button Selectors
export const getMeetingMobileFiltersState = createSelector([
  getLangFromState,
  getSearchConfigurationsFromState,
  getSearchPriceRangeFromState,
  getSearchAmenitiesFromState,
], (lang, ...arrayArgs) => {
  const translationHelper = new TranslationHelper({ messages: lang }); // TODO: Translation key
  const defaultButtonText = translationHelper.get('Filters');
  const count = countArrayLengths(...arrayArgs);
  const isActive = count > 0;
  return {
    buttonText: isActive ? `${defaultButtonText} · ${count}` : defaultButtonText,
    defaultButtonText,
    isActive,
    values: { count },
  };
});

// checkout
const addOnsTotal = (addOns) => {
  let totalExtras = 0;
  // tslint:disable-next-line: forin
  for (const addOn in addOns) {
    totalExtras += (Number(addOns[addOn].quantity) * Number(addOns[addOn].price));
  }
  return totalExtras;
};

const getAddOns = ({ step }: any) => step[3];
const getBookingRequest = ({ bookingRequest }) => bookingRequest;
const getExtraFee = ({ extraFee }) => extraFee;

export const getBookingTotal = createSelector([getBookingRequest], (bookingRequest) => `${bookingRequest.total}`);

export const getFinalBookingTotal = createSelector([
  getAddOns,
  getBookingRequest,
  getExtraFee,
], (step, bookingRequest, extraFee) => {
  let total = Number(bookingRequest.total);
  total += Number(addOnsTotal(step.addOns));
  if (Number(extraFee) > 0) {
    total += Number(extraFee);
  }
  return `
    ${bookingRequest.currency_symbol_left}
    ${Number(total).toFixed(2)}
    ${bookingRequest.currency_symbol_right}
  `;
});

export const getGivenPrice = createSelector([
  getAddOns,
  getBookingRequest,
], (step, bookingRequest) => {
  let total = Number(bookingRequest.total);
  total += Number(addOnsTotal(step.addOns));
  return total;
});

export const getRoom = createSelector([getRoomFromState], room => room);
export const getOrderDetails = createSelector([getOrderDetailsFromState], order => order);
