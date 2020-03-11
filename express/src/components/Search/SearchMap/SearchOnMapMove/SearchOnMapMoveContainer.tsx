import * as React from 'react';

// Connectors
import { useSearchMap, useSearchResults } from '@src/store/connectors';

// Components
import SearchOnMapMoveComponent from '@src/components/Search/SearchMap/SearchOnMapMove/SearchOnMapMoveComponent';
import RedoSearchHereComponent from '@src/components/Search/SearchMap/SearchOnMapMove/RedoSearchHereComponent';

// Types
import { Store } from '@src/typings/types';

type Props = {
  fetchSearchResults?: () => void;
  map: Store.Pages.Search.Map;
  startFetch: () => void;
  toggleSearchOnMapMove?: () => void;
};

class SearchOnMapMoveContainer extends React.PureComponent<Props> {
  handleClick = () => {
    const { startFetch } = this.props;
    startFetch();
  }

  render() {
    const { map: { boundsHaveChanged, shouldSearchOnMapMove }, toggleSearchOnMapMove } = this.props;
    if (!shouldSearchOnMapMove && boundsHaveChanged) {
      return (
        <RedoSearchHereComponent onClick={this.handleClick} />
      );
    }
    return (
      <SearchOnMapMoveComponent
        shouldSearchOnMapMove={shouldSearchOnMapMove}
        toggleSearchOnMapMove={toggleSearchOnMapMove}
      />
    );
  }
}

export default useSearchMap(useSearchResults(SearchOnMapMoveContainer));
