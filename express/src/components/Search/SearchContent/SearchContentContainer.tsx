/* tslint:disable:max-line-length */
import * as React from 'react';
import { debounce } from 'lodash';
import shortid from 'shortid';

// Connectors
import { useConfig, useSearch, useSearchMap, useSearchResults } from '@src/store/connectors';

// Components
import LoadingAnimation from '@src/components/concrete/LoadingAnimation';
import SearchContentComponent from '@src/components/Search/SearchContent/SearchContentComponent';
import SearchResult from '@src/components/Search/SearchContent/SearchResult';
import SearchResults from '@src/components/Search/SearchContent/SearchResults';
import Carousel, { SmallOption } from '@src/components/concrete/Carousel';
import Pagination from '@src/components/concrete/Pagination';
import { ConnectedTranslatable as Translatable } from '@src/components/abstract/Translatable';

// Data
import { verticalsData } from '@src/data/home';
import { getCitiesData } from '@src/data/search';

// Types
import { Store } from '@src/typings/types';

type Props = {
  config: Store.Config;
  hasLocation: boolean;
  hasTag: boolean;
  mapIsVisible: boolean;
  results: Store.Pages.Search.Results;
  search?: { params: Store.Search.Params };
  setSearchParams: (params: object) => void;
};

class SearchContentContainer extends React.Component<Props> {
  componentDidMount() {
    const { mapIsVisible } = this.props;
    if (!mapIsVisible) {
      window.addEventListener('scroll', this.checkScroll);
    }
  }

  componentWillUnmount() {
    const { mapIsVisible } = this.props;
    if (!mapIsVisible) {
      window.removeEventListener('scroll', this.checkScroll);
    }
  }

  shouldComponentUpdate(nextProps: Props) {
    const { mapIsVisible, results: { isFetching }, search: { params: { location, tag } } } = this.props;
    const hadLocation = !!location;
    const hasLocation = !!nextProps.search.params.location;
    const hadTag = !!tag;
    const hasTag = !!nextProps.search.params.tag;
    if (hadLocation !== hasLocation) {
      return true;
    }
    if (hadTag !== hasTag) {
      return true;
    }
    if (nextProps.mapIsVisible !== mapIsVisible) {
      return true;
    }
    if (nextProps.results.isFetching !== isFetching) {
      return true;
    }
    return false;
  }

  checkScroll = () => {
    const { mapIsVisible, results: { currentPage, lastPage, isFetching }, search: { params: { page } } } = this.props;
    if (!mapIsVisible && !isFetching && (currentPage !== lastPage) && (window.pageYOffset > ((document.documentElement.scrollHeight - window.innerHeight) - 200))) {
      this.props.setSearchParams({ page: currentPage ? currentPage + 1 : page + 1 });
    }
  }

  onScroll = () => {
    const debouncedCheck = debounce(this.checkScroll, 500);
    debouncedCheck();
  }

  renderResults = () => {
    const { mapIsVisible, results: { data, isFetching } } = this.props;
    return data.map((result, index) => (
      <SearchResult
        data={result}
        isFetching={isFetching}
        key={shortid.generate()}
        mapIsVisible={mapIsVisible}
        position={index + 1}
      />
    ));
  }

  render() {
    const { config: { language }, hasLocation, hasTag, mapIsVisible, results: { currentPage, lastPage, subtitle, title }, search: { params: { tag } } } = this.props;
    const results = this.renderResults();
    const isLastPage = (currentPage === lastPage);
    return (
      <React.Fragment>
        <div>
          <SearchContentComponent mapIsVisible={mapIsVisible}>
            {!hasTag &&
              <Carousel
                id="verticalsCarousel"
                isSlider={true}
                linkComponentProps={{ shallow: true }}
                options={verticalsData[language].data} // TODO: remove hard coded data
                optionTemplate={SmallOption}
                sectionTitle="search.instructions_select_vertical"
              />
            }
            {(hasTag && !hasLocation) &&
              <Carousel
                id="citiesCarousel"
                isSlider={true}
                linkComponentProps={{ shallow: true }}
                options={getCitiesData(tag)[language].data} // TODO: remove hard coded data
                optionTemplate={SmallOption}
                sectionTitle="search.instructions_select_location"
              />
            }
            {(hasTag && hasLocation) &&
              <SearchResults
                sectionSubtitle={subtitle}
                sectionTitle={title}
              >
                <React.Fragment>
                  {results.length > 0 ? (
                    {results}
                  ) : (
                    <Translatable content={{ transKey: 'search.no_results' }}>
                      <div />
                    </Translatable>
                  )}
                  {(!isLastPage && !mapIsVisible) &&
                    <LoadingAnimation />
                  }
                </React.Fragment>
              </SearchResults>
            }
          </SearchContentComponent>
        </div>
        {mapIsVisible &&
          <Pagination
            currentPage={currentPage}
            lastPage={lastPage}
          />
        }
      </React.Fragment>
    );
  }
}

export default useConfig(useSearch(useSearchMap(useSearchResults(SearchContentContainer))));
