import * as React from 'react';

// Connectors
import { useSearch, useSearchMap, useSearchResults } from '@src/store/connectors';

// Components
import { RightSidebar } from '@src/components/abstract/MediaQuery';
import SearchMapComponent from '@src/components/Search/SearchMap/SearchMapComponent';

// Types
import { Store } from '@src/typings/types';

type Props = {
  hasBanner?: boolean;
  isServer: boolean;
  map: Store.Pages.Search.Map;
  results: Store.Pages.Search.Results;
  startFetch: () => void;
  subscribeToMapBoundsChanges: () => () => void;
};

class SearchMapContainer extends React.PureComponent<Props> {
  protected unsubscribe: () => void;

  componentDidMount() {
    const { subscribeToMapBoundsChanges } = this.props;
    this.unsubscribe = subscribeToMapBoundsChanges();
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    const { hasBanner, isServer, map, results, startFetch } = this.props;
    return (
      <RightSidebar>
        {matches => {
          if (matches) {
            return (
              <SearchMapComponent
                hasBanner={hasBanner}
                isServer={isServer}
                map={map}
                results={results}
                startFetch={startFetch}
              />
            );
          }
          return null;
        }}
      </RightSidebar>
    );
  }
}

export default useSearch(useSearchMap(useSearchResults(SearchMapContainer)));
