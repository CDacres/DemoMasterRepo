import { connect } from 'react-redux';

// Selectors
import { getSearchResult, getSearchResultUrl, getCurrencySymbol } from '@src/store/selectors';

// Types
import { SearchResult, Store } from '@src/typings/types';

type StateProps = {
  currencySymbol: string;
  result: SearchResult;
  resultUrl: string;
};

const mapStateToProps = (state: Store.State, { data: { id } }) => ({
  currencySymbol: getCurrencySymbol(state),
  result: getSearchResult(state, id),
  resultUrl: getSearchResultUrl(state, id),
});

export default connect<StateProps>(
  mapStateToProps
);
