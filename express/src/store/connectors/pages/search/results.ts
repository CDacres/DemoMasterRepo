import { AnyAction, bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';

// Selectors
import { getCurrencySymbol, getSearchResults, isInfiniteScroll } from '@src/store/selectors';

// Modules
import { fetchSearchResults } from '@src/store/modules/pages/search/results';

// Types
import { Store } from '@src/typings/types';

type StateProps = {
  currencySymbol: string;
  isInfiniteScroll: boolean;
  results: Store.Pages.Search.Results;
};

type DispatchProps = {
  fetchSearchResults: () => void;
};

const mapStateToProps = (state: Store.State) => ({
  currencySymbol: getCurrencySymbol(state),
  isInfiniteScroll: isInfiniteScroll(state),
  results: getSearchResults(state),
});

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>): DispatchProps => bindActionCreators({
  fetchSearchResults,
}, dispatch);

export default connect<StateProps, DispatchProps>(
  mapStateToProps,
  mapDispatchToProps
);
