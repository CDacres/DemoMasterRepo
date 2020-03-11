/* tslint:disable:max-line-length */
import { Action, AnyAction, bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';

// Selectors
import { getSearchMap, getSearchMapMarkers } from '@src/store/selectors';
// getSearchMapCardByKey

import { clearMapBounds, setMapBounds, toggleMap, toggleMapBoundsHaveChanged, toggleMapStable, toggleRequiresRefit, toggleSearchOnMapMove } from '@src/store/modules/pages/search/map';

// Types
import { Bounds, SearchMapMarker, Store } from '@src/typings/types';

type StateProps = {
  // card: Object,
  map: Store.Pages.Search.Map;
  mapMarkers: SearchMapMarker[];
};

type DispatchProps = {
  clearMapBounds: () => Action;
  setMapBounds: (bounds: Bounds) => Action;
  toggleMap: (isVisible?: boolean) => Action;
  toggleMapBoundsHaveChanged: () => Action;
  toggleMapStable: () => Action;
  toggleSearchOnMapMove: () => Action;
};

const mapStateToProps = (state: Store.State) => ({
  // card: getSearchMapCardByKey(state, resultId),
  map: getSearchMap(state),
  mapMarkers: getSearchMapMarkers(state),
});

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>): DispatchProps => bindActionCreators({
  clearMapBounds,
  setMapBounds,
  toggleMap,
  toggleMapBoundsHaveChanged,
  toggleMapStable,
  toggleRequiresRefit,
  toggleSearchOnMapMove,
}, dispatch);

export default connect<StateProps, DispatchProps>(
  mapStateToProps,
  mapDispatchToProps
);
