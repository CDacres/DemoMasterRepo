// Initial state
import getInitialState from './initial-state';

// Utils
import { createActionCreator, createReducer } from '@src/store/utils';

// Types
import { Store, FooterOptions, HeaderOptions, Route } from '@src/typings/types';

export const NAVIGATE = 'CONFIG/NAVIGATE';
export const NAVIGATE_SUCCESS = 'CONFIG/NAVIGATE_SUCCESS';
export const NAVIGATE_FAILURE = 'CONFIG/NAVIGATE_FAILURE';
export const REDIRECT = 'CONFIG/REDIRECT';
export const SET_FOOTER_STATE = 'CONFIG/SET_FOOTER_STATE';
export const SET_HEADER_STATE = 'CONFIG/SET_HEADER_STATE';

export const reducer = createReducer(getInitialState(), {
  [NAVIGATE]: navigateReducer,
  [NAVIGATE_SUCCESS]: navigateSuccessReducer,
  // [REDIRECT]: redirectReducer,
  [SET_FOOTER_STATE]: setFooterStateReducer,
  [SET_HEADER_STATE]: setHeaderStateReducer,
});

function navigateReducer(state: Store.Config, { route }: { route: Route }) {
  return {
    ...state,
    isNavigating: true,
    route,
  };
}

function navigateSuccessReducer(state: Store.Config) {
  return {
    ...state,
    isNavigating: false,
  };
}

// function redirectReducer(state: Store.Config, { lastUrl }: { lastUrl: string }) {
//   return {
//     ...state,
//     redirect: {
//       lastUrl,
//       wasRedirected: true,
//     },
//   };
// }

function setFooterStateReducer(state: Store.Config, { options }: { options: FooterOptions }) {
  const { squashed } = options;
  return {
    ...state,
    footer: {
      ...state.footer,
      squashed: typeof squashed !== 'undefined' ? squashed : state.footer.squashed,
    },
  };
}

function setHeaderStateReducer(state: Store.Config, { options }: { options: HeaderOptions }) {
  const { floating, smallLogo, stayAsLink, transparent, withCheckoutSteps, withSearchBar } = options;
  return {
    ...state,
    header: {
      ...state.header,
      floating: typeof floating !== 'undefined' ? floating : state.header.floating,
      smallLogo: typeof smallLogo !== 'undefined' ? smallLogo : state.header.smallLogo,
      stayAsLink: typeof stayAsLink !== 'undefined' ? stayAsLink : state.header.stayAsLink,
      transparent: typeof transparent !== 'undefined' ? transparent : state.header.transparent,
      withCheckoutSteps: typeof withCheckoutSteps !== 'undefined' ? withCheckoutSteps : state.header.withCheckoutSteps,
      withSearchBar: typeof withSearchBar !== 'undefined' ? withSearchBar : state.header.withSearchBar,
    },
  };
}

export const navigate = createActionCreator(NAVIGATE, 'route', 'options');
export const navigateSuccess = createActionCreator(NAVIGATE_SUCCESS);
export const navigateFailure = createActionCreator(NAVIGATE_FAILURE, 'error');
export const setFooterState = createActionCreator(SET_FOOTER_STATE, 'options');
export const setHeaderState = createActionCreator(SET_HEADER_STATE, 'options');
