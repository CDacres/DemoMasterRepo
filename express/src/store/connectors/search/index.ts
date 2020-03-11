import { AnyAction, bindActionCreators, Dispatch } from 'redux';
import moment from 'moment';
import { connect } from 'react-redux';

// Selectors
import { getSearch, getSearchUrl, getVertical, getFullyMungedSearchUrl } from '@src/store/selectors';

// Modules
import { selectDate, selectGuestOption, selectTag, selectLocation, setSearchParams } from '@src/store/modules/search/params';

import { search as startSearch } from '@src/store/modules/search/url';

// Types
import { Store, Tag } from '@src/typings/types';

export type StateProps = {
  fullSearchUrl: string;
  searchUrl: string;
};

export type DispatchProps = {
  selectDate: (date: moment.Moment) => void;
  selectGuestOption: (guests: number) => void;
  setSearchParams: (params: Store.Search.Params) => void;
  startSearch: (href?: string, query?: object) => void;
  selectTag: (tag: Tag) => void;
  selectLocation: (placeId: string, location: string, latLon: object) => void;
};

const mapStateToProps = (state: Store.State) => ({
  fullSearchUrl: getFullyMungedSearchUrl(state),
  search: getSearch(state),
  searchUrl: getSearchUrl(state),
  vertical: getVertical(state),
});

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>): DispatchProps => bindActionCreators({
  selectDate,
  selectGuestOption,
  selectTag,
  selectLocation,
  setSearchParams,
  startSearch,
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
);
