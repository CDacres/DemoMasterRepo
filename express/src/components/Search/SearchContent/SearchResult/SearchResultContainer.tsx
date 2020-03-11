import * as React from 'react';

// Connectors
import { useSearch, useSearchResult } from '@src/store/connectors';

// Components
import SearchResultComponent from '@src/components/Search/SearchContent/SearchResult/SearchResultComponent';
import ResultCard from '@src/components/Search/SearchContent/SearchResult/ResultCard';
import Placeholder from '@src/components/Search/SearchContent/SearchResult/ResultCard/Placeholder';

// Types
import { SearchResult, Store } from '@src/typings/types';

type Props = {
  currencySymbol: string;
  data: SearchResult;
  isFetching: boolean;
  position: number;
  mapIsVisible: boolean;
  resultUrl?: string;
  search?: { params: Store.Search.Params };
};

class SearchResultContainer extends React.PureComponent<Props> {
  render() {
    const { currencySymbol, isFetching, mapIsVisible, resultUrl, search: { params: { tag } }, ...props } = this.props;
    const { data } = props;
    return (
      <SearchResultComponent
        mapIsVisible={mapIsVisible}
        resultUrl={resultUrl}
        {...props}
      >
        {isFetching ? (
          data.title ? (
            <ResultCard
              currencySymbol={currencySymbol}
              data={data}
              resultUrl={resultUrl}
              tag={tag}
            />
          ) : (
            <Placeholder />
          )
        ) : (
          <ResultCard
            currencySymbol={currencySymbol}
            data={data}
            resultUrl={resultUrl}
            tag={tag}
          />
        )}
      </SearchResultComponent>
    );
  }
}

export default useSearch(useSearchResult(SearchResultContainer));
