// Initial state
import { map as getInitialState } from './initial-state';

// Utils
import { createActionCreator, createReducer } from '@src/store/utils';

// Types
import { Bounds, Store } from '@src/typings/types';

export const CLEAR_MAP_BOUNDS = 'PAGES/SEARCH/MAP/CLEAR_MAP_BOUNDS';
export const SET_MAP_BOUNDS = 'PAGES/SEARCH/MAP/SET_MAP_BOUNDS';
export const TOGGLE_MAP = 'PAGES/SEARCH/MAP/TOGGLE_MAP';
export const TOGGLE_MAP_BOUNDS_HAVE_CHANGED = 'PAGES/SEARCH/MAP/TOGGLE_MAP_BOUNDS_HAVE_CHANGED';
export const TOGGLE_MAP_STABLE = 'PAGES/SEARCH/MAP/TOGGLE_MAP_STABLE';
export const TOGGLE_REQUIRES_REFIT = 'PAGES/SEARCH/MAP/TOGGLE_REQUIRES_REFIT';
export const TOGGLE_SEARCH_ON_MAP_MOVE = 'PAGES/SEARCH/MAP/TOGGLE_SEARCH_ON_MAP_MOVE';

export default createReducer(getInitialState(), {
  [CLEAR_MAP_BOUNDS]: clearMapBoundsReducer,
  [SET_MAP_BOUNDS]: setMapBoundsReducer,
  [TOGGLE_MAP]: toggleMapReducer,
  [TOGGLE_MAP_BOUNDS_HAVE_CHANGED]: toggleMapBoundsHaveChangedReducer,
  [TOGGLE_MAP_STABLE]: toggleMapStableReducer,
  [TOGGLE_REQUIRES_REFIT]: toggleRequiresRefitReducer,
  [TOGGLE_SEARCH_ON_MAP_MOVE]: toggleSearchOnMapMoveReducer,
});

function clearMapBoundsReducer(state: Store.Pages.Search.Map) {
  return {
    ...state,
    bounds: {
      neLat: '',
      neLon: '',
      swLat: '',
      swLon: '',
    },
  };
}

function setMapBoundsReducer(state: Store.Pages.Search.Map, { bounds }: { bounds: Bounds }) {
  return {
    ...state,
    bounds,
  };
}

function toggleMapReducer(state: Store.Pages.Search.Map, { isVisible }: { isVisible?: boolean }) {
  return {
    ...state,
    isVisible: typeof isVisible !== 'undefined' ? isVisible : !state.isVisible,
  };
}

function toggleMapBoundsHaveChangedReducer(
  state: Store.Pages.Search.Map,
  { boundsHaveChanged }: { boundsHaveChanged: boolean }
) {
  return {
    ...state,
    boundsHaveChanged,
  };
}

function toggleMapStableReducer(state: Store.Pages.Search.Map, { isStable }: { isStable?: boolean }) {
  return {
    ...state,
    isStable: typeof isStable !== 'undefined' ? isStable : !state.isStable,
  };
}

function toggleRequiresRefitReducer(state: Store.Pages.Search.Map, { requiresRefit }: { requiresRefit: boolean }) {
  return {
    ...state,
    requiresRefit,
  };
}

function toggleSearchOnMapMoveReducer(state: Store.Pages.Search.Map) {
  return {
    ...state,
    shouldSearchOnMapMove: !state.shouldSearchOnMapMove,
  };
}

export const clearMapBounds = createActionCreator(CLEAR_MAP_BOUNDS);
export const setMapBounds = createActionCreator(SET_MAP_BOUNDS, 'bounds');
export const toggleMap = createActionCreator(TOGGLE_MAP, 'isVisible');
export const toggleMapBoundsHaveChanged = createActionCreator(TOGGLE_MAP_BOUNDS_HAVE_CHANGED, 'boundsHaveChanged');
export const toggleMapStable = createActionCreator(TOGGLE_MAP_STABLE, 'isStable');
export const toggleRequiresRefit = createActionCreator(TOGGLE_REQUIRES_REFIT, 'requiresRefit');
export const toggleSearchOnMapMove = createActionCreator(TOGGLE_SEARCH_ON_MAP_MOVE);
