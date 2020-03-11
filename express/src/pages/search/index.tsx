import * as React from 'react';
// import { withRouter } from 'next/router';
import { Store as ReduxStore } from 'redux';
import watch from 'redux-watch';
import deepEqual from 'deep-equal';

// Connectors
import { useConfig, useLang, useResponsive, useSearch, useSearchMap } from '@src/store/connectors';

// Helpers
import { TranslationHelper } from '@src/helpers';

// Root epic
import searchResultsEpic from '@src/store/epics/search/results';

// Redux stuff
import { attachReducers } from '@src/store';
import { addEpicsToStream } from '@src/store/extensions/dynamic-epics';
import searchPageReducer from '@src/store/modules/pages/search';
// import { setSearchParams } from '@src/store/modules/search/params';
// import { setMapBounds } from '@src/store/modules/pages/search/map';
import { fetchSearchResults } from '@src/store/modules/pages/search/results';
// import { fetchTagMeta, fetchTags } from '@src/store/modules/search/tags';

// Actions
import { setVertical } from '@src/store/modules/search/verticals';

// Utils
import {
  // getRequestParams,
  getVerticalFromTag,
  // handleRequestParams,
} from '@src/utils';

// Components
import initStateGenerator, { PageProps, Ctx } from '@src/components/pagebuilders/initStateGenerator';
import PageTemplate from '@src/components/base/PageTemplate';
import SearchPage from '@src/components/Search';
import { withFooter, withHeader } from '@src/components/abstract/HOCs';

// Types
import {
  // ReqInfo,
  Store
} from '@src/typings/types';

type Props = PageProps & {
  asPath: string;
  config: Store.Config;
  isMobile: boolean;
  lang: Store.Lang;
  map: Store.Pages.Search.Map;
  req: {
    params: object;
    query: object;
  };
  reduxStore: ReduxStore<any>;
  search: {
    params: Store.Search.Params;
    tags: Store.Search.Tags;
    verticals: Store.Search.Verticals;
  };
  searchUrl: string;
  store: ReduxStore<any>;
  toggleMap: (isVisible?: boolean) => void;
};
type FetchOptions = {
  infinite?: boolean;
  initialSearch?: boolean;
  paginating?: boolean;
  requiresRefit?: boolean;
};

class Search extends React.Component<Props, {}> {
  protected translationHelper = new TranslationHelper({ messages: this.props.lang });
  protected meta = {
    json_desc: this.translationHelper.get('meta.home.json_desc'),
    // latitude: this.props.search.lat,
    // longitude: this.props.search.lon
  };
  protected unsubscribeFromParamsChanges: () => void;
  protected unsubscribeFromResults: () => void;

  static async getInitialProps({ state: { redux }, req }: Ctx) {
    const isServer = !!req;
    // let reqInfo: ReqInfo = {};

    // const stateGenerator = await super.initStateGenerator(isServer, redux, req);

    // Attach page reducer
    attachReducers(redux, { pages: { search: searchPageReducer } });

    // if (isServer) {
    //   // If on server, build reqInfo from express req params and query
    //   reqInfo = { params: query.params, query: { ...req.query } };
    // } else {
    //   // If not on server, build reqInfo from asPath using our own function
    //   reqInfo = getRequestParams(asPath);
    // }

    // const { bounds, params } = handleRequestParams(reqInfo);

    // Run initial actions through root epic and bind to state generator
    // await stateGenerator.addAsyncStateGenerators(fetchTagMeta(params.tag), fetchTags());

    // Then generate the state with later actions
    // const laterActions = [];
    // if (Object.keys(params).length > 0) {
    //   laterActions.push(setSearchParams(params));
    // }
    // if (bounds) {
    //   laterActions.push(setMapBounds(bounds));
    // }
    // await stateGenerator.generate(...laterActions);
    await initStateGenerator(isServer, redux, req);

    return {};
  }

  componentDidMount() {
    const { store } = this.props;

    // Attach reducers for a second time on the client-side
    attachReducers(store, { pages: { search: searchPageReducer } });

    // Dynamically add fetchSearchResultsEpic to epic stream
    addEpicsToStream(searchResultsEpic);

    // Fetch initial search results
    this.fetchSearchResults({ initialSearch: true });

    // Attach unsubscribeFromParamsChanges method to class
    this.unsubscribeFromParamsChanges = this.subscribeToParamsChanges();
  }

  componentWillUnmount() {
    this.unsubscribeFromParamsChanges();
  }

  fetchSearchResults = async (options: FetchOptions = {
    infinite: false,
    initialSearch: false,
    paginating: false,
    requiresRefit: false,
  }) => {
    const { store: { dispatch, getState } } = this.props;
    const { search: { params: { location, tag }, verticals: { selected } } }: { search: Store.Search } = getState();
    if (tag && location) {
      await dispatch(fetchSearchResults(options));
      const { infinite, paginating } = options;
      // If paginating without map, scroll to top
      if (!infinite && paginating) {
        window.scrollTo(0, 0);
      }
      // Check if the map should be open by default on initial search
      if (options.initialSearch && selected.mapIsVisible) {
        this.unsubscribeFromResults = this.subscribeToResults();
      }
    }
  }

  // Subscribe map bounds watcher to store
  subscribeToMapBoundsChanges = () => {
    const { store: { getState, subscribe } } = this.props;
    const boundsWatcher = watch(getState, 'pages.search.map.bounds', deepEqual);
    return subscribe(boundsWatcher(() => {
      const { map: { shouldSearchOnMapMove } } = this.props;
      if (shouldSearchOnMapMove) {
        this.fetchSearchResults();
      }
    }));
  }

  // Subscribe search params watcher to store
  subscribeToParamsChanges = () => {
    const { store: { getState, subscribe } } = this.props;
    const paramsWatcher = watch(getState, 'search.params', deepEqual);
    return subscribe(paramsWatcher(async ({ page, tag }, oldVal) => {
      const { map: { isVisible }, search: { tags: { tags }, verticals: { defaults } } } = this.props;
      // If tag exists and has changed, set the vertical and await before continuing
      if (tag) {
        const { tagObj, vertical } = getVerticalFromTag(defaults, tags, tag);
        if ((tagObj && vertical)) {
          await setVertical(vertical);
        }
      }
      // If paginating then send necessary params
      if (page !== oldVal.page) {
        this.fetchSearchResults({ infinite: !isVisible, paginating: true });
      } else {
        this.fetchSearchResults({ requiresRefit: true });
      }
    }));
  }

  // Subscribe to search results isFetching to determine if map should be open by default
  subscribeToResults = () => {
    const { isMobile, store: { getState, subscribe } } = this.props;
    if (!isMobile) {
      const resultsWatcher = watch(getState, 'pages.search.results.isFetching');
      return subscribe(resultsWatcher((newVal, oldVal) => {
        const { toggleMap } = this.props;
        // If fetching has stopped
        if (oldVal && !newVal) {
          // Toggle the map on
          toggleMap(true);
          // Unsubscribe watcher now initial search is complete
          this.unsubscribeFromResults();
        }
      }));
    }
  }

  render() {
    return (
      <PageTemplate>
        <SearchPage
          isServer={typeof window === 'undefined'}
          startFetch={this.fetchSearchResults}
          subscribeToMapBoundsChanges={this.subscribeToMapBoundsChanges}
        />
      </PageTemplate>
    );
  }
}

export default withHeader(
  withFooter(
    useConfig(useLang(useResponsive(useSearch(useSearchMap(
      // withRouter(
      Search
      // )
    ))))),
    { squashed: true }
  ),
  {
    floating: true,
    smallLogo: true,
    stayAsLink: false,
    transparent: false,
    withCheckoutSteps: false,
    withSearchBar: true,
  }
);
