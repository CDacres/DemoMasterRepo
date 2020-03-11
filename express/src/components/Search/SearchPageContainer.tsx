/* tslint:disable:max-line-length */
import * as React from 'react';

// Connectors
import { useSearch, useSearchMap } from '@src/store/connectors';

// Components
import { BottomSidebar, RightSidebar } from '@src/components/abstract/MediaQuery';
import FilterBar from '@src/components/concrete/FilterBar';
import SearchMap from '@src/components/Search/SearchMap';
import SearchContent from '@src/components/Search/SearchContent';
import SearchPageComponent from '@src/components/Search/SearchPageComponent';
import FilterMapToggleButton from '@src/components/Search/SearchContent/FilterMapToggleButton';

// Types
import { Store, Tag } from '@src/typings/types';

type Props = {
  isServer: boolean;
  map: Store.Pages.Search.Map;
  search?: { params: Store.Search.Params };
  startFetch: () => void;
  subscribeToMapBoundsChanges: () => () => void;
  vertical?: Tag;
};

type State = {
  mapIsVisible: boolean;
};

class SearchPageContainer extends React.PureComponent<Props, State> {
  render() {
    const { isServer, map: { isVisible }, search: { params: { location, tag } }, startFetch, subscribeToMapBoundsChanges } = this.props;
    const hasTag = !!tag;
    const hasLocation = !!location;
    const hasMap = (hasTag && hasLocation && isVisible);
    return (
      <SearchPageComponent hasMap={hasMap}>
        <React.Fragment>
          <BottomSidebar>
            {matches => {
              if (matches) {
                return (
                  <FilterMapToggleButton mapIsVisible={isVisible} />
                );
              }
              return null;
            }}
          </BottomSidebar>
          {(hasTag && hasLocation) &&
            <FilterBar />
          }
          <div>
            {/* TODO: where is this data coming from?
            <SearchBanner
              image={src}
              subtitle={subtitle}
              title={title}
              url={url}
            />
            */}
            <SearchContent
              hasLocation={hasLocation}
              hasTag={hasTag}
              mapIsVisible={isVisible}
            />
          </div>
          {hasMap &&
            <RightSidebar>
              {matches => {
                if (matches) {
                  return (
                    <SearchMap
                      isServer={isServer}
                      startFetch={startFetch}
                      subscribeToMapBoundsChanges={subscribeToMapBoundsChanges}
                    />
                  );
                }
                return null;
              }}
            </RightSidebar>
          }
        </React.Fragment>
      </SearchPageComponent>
    );
  }
}

export default useSearch(useSearchMap(SearchPageContainer));
