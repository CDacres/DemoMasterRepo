/* eslint-disable max-len, no-console, react/jsx-no-bind */
import * as React from 'react';
import { Provider } from 'react-redux';
import { storiesOf } from '@storybook/react';
import { createStore } from 'redux';
import shortid from 'shortid';

import { exampleFilters, exampleSearchResults, exampleTags, exampleVerticals } from './data';
import langObject from '@src/data/langObject';
import { getCitiesData, verticalsData } from '@src/data/search';

import { BottomSidebar, RightSidebar } from '@src/components/abstract/MediaQuery';
import SearchPageComponent from '@src/components/Search/SearchPageComponent';
import Footer from '@src/components/concrete/Footer';
import Header from '@src/components/concrete/Header';
import SearchBanner from '@src/components/concrete/Banners/SearchBanner';
import SearchTrustBanner from '@src/components/concrete/Banners/SearchTrustBanner';
import SearchContentComponent from '@src/components/Search/SearchContent/SearchContentComponent';
import SearchText from '@src/components/Search/SearchContent/SearchText';
import Carousel, { LargeOption, SmallOption, SmallOptionWithoutImage } from '@src/components/concrete/Carousel';
import SearchResult from '@src/components/Search/SearchContent/SearchResult';
import SearchResults from '@src/components/Search/SearchContent/SearchResults';
import Pagination from '@src/components/concrete/Pagination';
import FilterBarComponent from '@src/components/concrete/FilterBar/FilterBarComponent';
import FilterBarItem from '@src/components/concrete/FilterBar/FilterBarItem';
import FilterBarItems from '@src/components/concrete/FilterBar/FilterBarItems';
import FilterButtonComponent from '@src/components/concrete/FilterBar/FilterButton/FilterButtonComponent';
import FilterMapToggleButton from '@src/components/Search/SearchContent/FilterMapToggleButton';
import SearchMapComponent from '@src/components/Search/SearchMap/SearchMapComponent';
import { ConnectedTranslatable as Translatable } from '@src/components/abstract/Translatable';
import ContentSeparator from '@src/components/concrete/ContentSeparator';

const lang = langObject();

const store = createStore((state, action) => {
  switch (action.type) {
    default:
      return state;
  }
}, {
  auth: {
    user: {
      isAdmin: false,
      isLoggedIn: false
    }
  },
  config: {
    bounds: {
      neLat: 59.5000000,
      neLon: 2.0000000,
      swLat: 49.8200000,
      swLon: -10.8500000
    },
    defaultLocation: {
      lat: '51.5072996',
      locationDesc: 'London, UK',
      locationSlug: 'London--UK',
      lon: '-0.1280232'
    },
    domain: 'uk',
    footer: { squashed: true },
    header: {
      floating: true,
      smallLogo: true,
      withSearchBar: true
    },
    language: 'en',
    phone: {
      phoneNumber: '+442071832212',
      phoneNumberDisplay: '+44 (0)20 7183 2212'
    },
    route: {
      domainSpecific: true,
      pathname: '/'
    }
  },
  lang,
  pages: {
    search: {
      map: {
        boundsHaveChanged: false,
        isStable: true,
        isVisible: true,
        requiresRefit: false,
        shouldSearchOnMapMove: true
      },
      results: {
        data: [
          {
            currentPage: 1,
            data: exampleSearchResults.cards,
            from: 0,
            isFetching: false,
            lastPage: 1,
            nextPageUrl: '/1',
            path: '/s',
            perPage: 5,
            prevPageUrl: '/0',
            searchObject: {
              lat: '51.5072996',
              lon: '-0.1280232'
            },
            title: 'Explore all 300+ meeting spaces',
            to: 5,
            total: 5
          }
        ],
        searchObject: {
          currencySymbolLeft: '£',
          lat: '51.5072996',
          lon: '-0.1280232'
        }
      }
    }
  },
  responsive: {},
  search: {
    params: {
      guests: 20,
      location: 'London',
      tag: 'Meeting Rooms'
    },
    recentSearches: exampleSearchResults.recentSearches,
    results: {
      data: exampleSearchResults.cards,
      searchObject: {
        lat: '51.5072996',
        lon: '-0.1280232'
      }
    },
    tags: exampleTags,
    url: '/s/meeting-rooms',
    verticals: exampleVerticals
  }
});

const storeMapHidden = createStore((state, action) => {
  switch (action.type) {
    default:
      return state;
  }
}, {
  auth: {
    user: {
      isAdmin: false,
      isLoggedIn: false
    }
  },
  config: {
    bounds: {
      neLat: 59.5000000,
      neLon: 2.0000000,
      swLat: 49.8200000,
      swLon: -10.8500000
    },
    defaultLocation: {
      lat: '51.5072996',
      locationDesc: 'London, UK',
      locationSlug: 'London--UK',
      lon: '-0.1280232'
    },
    domain: 'uk',
    footer: { squashed: true },
    header: {
      floating: true,
      smallLogo: true,
      withSearchBar: true
    },
    language: 'en',
    phone: {
      phoneNumber: '+442071832212',
      phoneNumberDisplay: '+44 (0)20 7183 2212'
    },
    route: {
      domainSpecific: true,
      pathname: '/'
    }
  },
  lang,
  pages: {
    search: {
      map: {
        boundsHaveChanged: false,
        isStable: true,
        isVisible: false,
        requiresRefit: false,
        shouldSearchOnMapMove: true
      },
      results: {
        data: [
          {
            currentPage: 1,
            data: exampleSearchResults.cards,
            from: 0,
            isFetching: false,
            lastPage: 1,
            nextPageUrl: '/1',
            path: '/s',
            perPage: 5,
            prevPageUrl: '/0',
            searchObject: {
              lat: '51.5072996',
              lon: '-0.1280232'
            },
            title: 'Explore all 300+ meeting spaces',
            to: 5,
            total: 5
          }
        ],
        searchObject: {
          currencySymbolLeft: '£',
          lat: '51.5072996',
          lon: '-0.1280232'
        }
      }
    }
  },
  responsive: {},
  search: {
    params: {
      guests: 20,
      location: 'London',
      tag: 'Meeting Rooms'
    },
    recentSearches: exampleSearchResults.recentSearches,
    results: {
      data: exampleSearchResults.cards,
      searchObject: {
        lat: '51.5072996',
        lon: '-0.1280232'
      }
    },
    tags: exampleTags,
    url: '/s/meeting-rooms',
    verticals: exampleVerticals
  }
});

const storeWithoutLocationMapHidden = createStore((state, action) => {
  switch (action.type) {
    default:
      return state;
  }
}, {
  auth: {
    user: {
      isAdmin: false,
      isLoggedIn: false
    }
  },
  config: {
    bounds: {
      neLat: 59.5000000,
      neLon: 2.0000000,
      swLat: 49.8200000,
      swLon: -10.8500000
    },
    defaultLocation: {
      lat: '51.5072996',
      locationDesc: 'London, UK',
      locationSlug: 'London--UK',
      lon: '-0.1280232'
    },
    domain: 'uk',
    footer: { squashed: true },
    header: {
      floating: true,
      smallLogo: true,
      withSearchBar: true
    },
    language: 'en',
    phone: {
      phoneNumber: '+442071832212',
      phoneNumberDisplay: '+44 (0)20 7183 2212'
    },
    route: {
      domainSpecific: true,
      pathname: '/'
    }
  },
  lang,
  pages: {
    search: {
      map: {
        boundsHaveChanged: false,
        isStable: true,
        isVisible: false,
        requiresRefit: false,
        shouldSearchOnMapMove: true
      },
      results: {
        data: [
          {
            currentPage: 1,
            data: exampleSearchResults.cards,
            from: 0,
            isFetching: false,
            lastPage: 1,
            nextPageUrl: '/1',
            path: '/s',
            perPage: 5,
            prevPageUrl: '/0',
            searchObject: {
              lat: '51.5072996',
              lon: '-0.1280232'
            },
            title: 'Explore all 300+ meeting spaces',
            to: 5,
            total: 5
          }
        ],
        searchObject: {
          currencySymbolLeft: '£',
          lat: '51.5072996',
          lon: '-0.1280232'
        }
      }
    }
  },
  responsive: {},
  search: {
    params: {
      guests: 20,
      tag: 'Meeting Rooms'
    },
    recentSearches: exampleSearchResults.recentSearches,
    results: {
      data: exampleSearchResults.cards,
      searchObject: {
        lat: '51.5072996',
        lon: '-0.1280232'
      }
    },
    tags: exampleTags,
    url: '/s/meeting-rooms',
    verticals: exampleVerticals
  }
});

const somethingHappened = () => {
  console.log('Something Happened');
};

storiesOf('Pages/search', module)
  .add('continue carousel (with banner, without map)', () => (
    <Provider store={storeMapHidden}>
      <React.Fragment>
        <Header />
        <SearchPageComponent hasMap>
          <div />
          <BottomSidebar>
            {matches => {
              if (matches) {
                return (
                  <FilterMapToggleButton mapIsVisible={false} />
                );
              }
              return null;
            }}
          </BottomSidebar>
          <FilterBarComponent hasLocation>
            <FilterBarItems vertical={exampleTags.defaultTags[0].tag}>
              {exampleFilters.desktop.meeting.default.map((filter, index) => (
                <FilterBarItem
                  index={index}
                  isFirst={index === 0}
                  isLast={index === exampleFilters.desktop.meeting.default.length - 1}
                  key={shortid.generate()}
                  length={exampleFilters.desktop.meeting.default.length}
                >
                  <FilterButtonComponent
                    buttonText={filter.text}
                    onClick={somethingHappened}
                  />
                </FilterBarItem>
              ))}
            </FilterBarItems>
          </FilterBarComponent>
          <div>
            <SearchBanner
              image="https://a0.muscache.com/4ea/air/v2/pictures/197d52ff-37f6-455d-9619-94067782a32f.jpg?t=c:w1131-h343,r:w1131-h343-sfit,e:fjpg-c75"
              subtitle="Stay with all the comforts of home, verified."
              title="LONDON"
              url="/"
            />
            <SearchContentComponent mapIsVisible={false}>
              <SearchText text="Enter dates and number of guests to see the total price per night." />
              <ContentSeparator marginNum={0} />
              <SearchText
                icon="_express/images/commonsite/trophy.gif"
                text="Over 1,000,000 guest reviews for London homes, with an average of 4.7 out of 5 stars."
              />
              <Carousel
                id="continueCarousel"
                isSlider
                maxOptions={{ small: 3 }}
                options={exampleSearchResults.continueSearch}
                optionTemplate={SmallOptionWithoutImage}
                sectionTitle="search.continue_search"
                type="smallwithoutimage"
              />
              <SearchResults sectionTitle="Explore all 300+ meeting spaces">
                {exampleSearchResults.cards.map((result, index) => (
                  <SearchResult
                    data={result}
                    isFetching={false}
                    key={shortid.generate()}
                    mapIsVisible={false}
                    position={index + 1}
                  />
                ))}
              </SearchResults>
            </SearchContentComponent>
          </div>
        </SearchPageComponent>
        <Footer />
      </React.Fragment>
    </Provider>
  ))
  .add('continue carousel (with banner, with map)', () => (
    <Provider store={store}>
      <React.Fragment>
        <Header />
        <SearchPageComponent hasMap>
          <div />
          <BottomSidebar>
            {matches => {
              if (matches) {
                return (
                  <FilterMapToggleButton mapIsVisible={false} />
                );
              }
              return null;
            }}
          </BottomSidebar>
          <FilterBarComponent hasLocation>
            <FilterBarItems vertical={exampleTags.defaultTags[0].tag}>
              {exampleFilters.desktop.meeting.default.map((filter, index) => (
                <FilterBarItem
                  index={index}
                  isFirst={index === 0}
                  isLast={index === exampleFilters.desktop.meeting.default.length - 1}
                  key={shortid.generate()}
                  length={exampleFilters.desktop.meeting.default.length}
                >
                  <FilterButtonComponent
                    buttonText={filter.text}
                    onClick={somethingHappened}
                  />
                </FilterBarItem>
              ))}
            </FilterBarItems>
          </FilterBarComponent>
          <div>
            <SearchBanner
              image="https://a0.muscache.com/4ea/air/v2/pictures/197d52ff-37f6-455d-9619-94067782a32f.jpg?t=c:w1131-h343,r:w1131-h343-sfit,e:fjpg-c75"
              subtitle="Stay with all the comforts of home, verified."
              title="LONDON"
              url="/"
            />
            <SearchContentComponent mapIsVisible>
              <SearchText text="Enter dates and number of guests to see the total price per night." />
              <ContentSeparator marginNum={0} />
              <SearchText
                icon="_express/images/commonsite/calendar.gif"
                subtext="You may want to book soon."
                text="77% of London homes for your dates and guests are already booked."
              />
              <Carousel
                id="continueCarousel"
                isSlider
                maxOptions={{ small: 3 }}
                options={exampleSearchResults.continueSearch}
                optionTemplate={SmallOptionWithoutImage}
                sectionTitle="search.continue_search"
                type="smallwithoutimage"
              />
              <SearchResults sectionTitle="Explore all 300+ meeting spaces">
                {exampleSearchResults.cards.map((result, index) => (
                  <SearchResult
                    data={result}
                    isFetching={false}
                    key={shortid.generate()}
                    mapIsVisible
                    position={index + 1}
                  />
                ))}
              </SearchResults>
            </SearchContentComponent>
            <RightSidebar>
              {matches => {
                if (matches) {
                  return (
                    <SearchMapComponent
                      hasBanner
                      isServer={false}
                      map={{
                        boundsHaveChanged: false,
                        isStable: true,
                        isVisible: true,
                        requiresRefit: false,
                        shouldSearchOnMapMove: true
                      }}
                      results={{
                        data: [
                          {
                            currentPage: 1,
                            data: exampleSearchResults.cards,
                            from: 0,
                            isFetching: false,
                            lastPage: 1,
                            nextPageUrl: '/1',
                            path: '/s',
                            perPage: 5,
                            prevPageUrl: '/0',
                            searchObject: {
                              lat: '51.5072996',
                              lon: '-0.1280232'
                            },
                            title: 'Explore all 300+ meeting spaces',
                            to: 5,
                            total: 5
                          }
                        ],
                        searchObject: {
                          lat: '51.5072996',
                          lon: '-0.1280232'
                        }
                      }}
                      startFetch={somethingHappened}
                    />
                  );
                }
                return null;
              }}
            </RightSidebar>
          </div>
          <Pagination
            currentPage={1}
            lastPage={15}
          />
        </SearchPageComponent>
        <Footer />
      </React.Fragment>
    </Provider>
  ))
  .add('continue carousel (without banner, without map)', () => (
    <Provider store={storeMapHidden}>
      <React.Fragment>
        <Header />
        <SearchPageComponent hasMap>
          <div />
          <BottomSidebar>
            {matches => {
              if (matches) {
                return (
                  <FilterMapToggleButton mapIsVisible={false} />
                );
              }
              return null;
            }}
          </BottomSidebar>
          <FilterBarComponent hasLocation>
            <FilterBarItems vertical={exampleTags.defaultTags[0].tag}>
              {exampleFilters.desktop.meeting.default.map((filter, index) => (
                <FilterBarItem
                  index={index}
                  isFirst={index === 0}
                  isLast={index === exampleFilters.desktop.meeting.default.length - 1}
                  key={shortid.generate()}
                  length={exampleFilters.desktop.meeting.default.length}
                >
                  <FilterButtonComponent
                    buttonText={filter.text}
                    onClick={somethingHappened}
                  />
                </FilterBarItem>
              ))}
            </FilterBarItems>
          </FilterBarComponent>
          <div>
            <SearchContentComponent mapIsVisible={false}>
              <SearchText text="Enter dates and number of guests to see the total price per night." />
              <ContentSeparator marginNum={0} />
              <SearchText
                icon="_express/images/commonsite/trophy.gif"
                text="Over 1,000,000 guest reviews for London homes, with an average of 4.7 out of 5 stars."
              />
              <Carousel
                id="continueCarousel"
                isSlider
                maxOptions={{ small: 3 }}
                options={exampleSearchResults.continueSearch}
                optionTemplate={SmallOptionWithoutImage}
                sectionTitle="search.continue_search"
                type="smallwithoutimage"
              />
              <SearchResults sectionTitle="Explore all 300+ meeting spaces">
                {exampleSearchResults.cards.map((result, index) => (
                  <SearchResult
                    data={result}
                    isFetching={false}
                    key={shortid.generate()}
                    mapIsVisible={false}
                    position={index + 1}
                  />
                ))}
              </SearchResults>
            </SearchContentComponent>
          </div>
        </SearchPageComponent>
        <Footer />
      </React.Fragment>
    </Provider>
  ))
  .add('continue carousel (without banner, with map)', () => (
    <Provider store={store}>
      <React.Fragment>
        <Header />
        <SearchPageComponent hasMap>
          <div />
          <BottomSidebar>
            {matches => {
              if (matches) {
                return (
                  <FilterMapToggleButton mapIsVisible={false} />
                );
              }
              return null;
            }}
          </BottomSidebar>
          <FilterBarComponent hasLocation>
            <FilterBarItems vertical={exampleTags.defaultTags[0].tag}>
              {exampleFilters.desktop.meeting.default.map((filter, index) => (
                <FilterBarItem
                  index={index}
                  isFirst={index === 0}
                  isLast={index === exampleFilters.desktop.meeting.default.length - 1}
                  key={shortid.generate()}
                  length={exampleFilters.desktop.meeting.default.length}
                >
                  <FilterButtonComponent
                    buttonText={filter.text}
                    onClick={somethingHappened}
                  />
                </FilterBarItem>
              ))}
            </FilterBarItems>
          </FilterBarComponent>
          <div>
            <SearchContentComponent mapIsVisible>
              <SearchText text="Enter dates and number of guests to see the total price per night." />
              <ContentSeparator marginNum={0} />
              <SearchText
                icon="_express/images/commonsite/calendar.gif"
                subtext="You may want to book soon."
                text="77% of London homes for your dates and guests are already booked."
              />
              <Carousel
                id="continueCarousel"
                isSlider
                maxOptions={{ small: 3 }}
                options={exampleSearchResults.continueSearch}
                optionTemplate={SmallOptionWithoutImage}
                sectionTitle="search.continue_search"
                type="smallwithoutimage"
              />
              <SearchResults sectionTitle="Explore all 300+ meeting spaces">
                {exampleSearchResults.cards.map((result, index) => (
                  <SearchResult
                    data={result}
                    isFetching={false}
                    key={shortid.generate()}
                    mapIsVisible
                    position={index + 1}
                  />
                ))}
              </SearchResults>
            </SearchContentComponent>
            <RightSidebar>
              {matches => {
                if (matches) {
                  return (
                    <SearchMapComponent
                      hasBanner={false}
                      isServer={false}
                      map={{
                        boundsHaveChanged: false,
                        isStable: true,
                        isVisible: true,
                        requiresRefit: false,
                        shouldSearchOnMapMove: true
                      }}
                      results={{
                        data: [
                          {
                            currentPage: 1,
                            data: exampleSearchResults.cards,
                            from: 0,
                            isFetching: false,
                            lastPage: 1,
                            nextPageUrl: '/1',
                            path: '/s',
                            perPage: 5,
                            prevPageUrl: '/0',
                            searchObject: {
                              lat: '51.5072996',
                              lon: '-0.1280232'
                            },
                            title: 'Explore all 300+ meeting spaces',
                            to: 5,
                            total: 5
                          }
                        ],
                        searchObject: {
                          lat: '51.5072996',
                          lon: '-0.1280232'
                        }
                      }}
                      startFetch={somethingHappened}
                    />
                  );
                }
                return null;
              }}
            </RightSidebar>
          </div>
          <Pagination
            currentPage={1}
            lastPage={15}
          />
        </SearchPageComponent>
        <Footer />
      </React.Fragment>
    </Provider>
  ))
  .add('default (with banner, without map)', () => (
    <Provider store={storeMapHidden}>
      <React.Fragment>
        <Header />
        <SearchPageComponent hasMap>
          <div />
          <BottomSidebar>
            {matches => {
              if (matches) {
                return (
                  <FilterMapToggleButton mapIsVisible={false} />
                );
              }
              return null;
            }}
          </BottomSidebar>
          <FilterBarComponent hasLocation>
            <FilterBarItems vertical={exampleTags.defaultTags[0].tag}>
              {exampleFilters.desktop.meeting.default.map((filter, index) => (
                <FilterBarItem
                  index={index}
                  isFirst={index === 0}
                  isLast={index === exampleFilters.desktop.meeting.default.length - 1}
                  key={shortid.generate()}
                  length={exampleFilters.desktop.meeting.default.length}
                >
                  <FilterButtonComponent
                    buttonText={filter.text}
                    onClick={somethingHappened}
                  />
                </FilterBarItem>
              ))}
            </FilterBarItems>
          </FilterBarComponent>
          <div>
            <SearchBanner
              image="https://a0.muscache.com/4ea/air/v2/pictures/197d52ff-37f6-455d-9619-94067782a32f.jpg?t=c:w1131-h343,r:w1131-h343-sfit,e:fjpg-c75"
              subtitle="Stay with all the comforts of home, verified."
              title="LONDON"
              url="/"
            />
            <SearchContentComponent mapIsVisible={false}>
              <SearchText text="Enter dates and number of guests to see the total price per night." />
              <ContentSeparator marginNum={0} />
              <SearchText
                icon="_express/images/commonsite/trophy.gif"
                text="Over 1,000,000 guest reviews for London homes, with an average of 4.7 out of 5 stars."
              />
              <SearchResults sectionTitle="Explore all 300+ meeting spaces">
                {exampleSearchResults.cards.map((result, index) => (
                  <SearchResult
                    data={result}
                    isFetching={false}
                    key={shortid.generate()}
                    mapIsVisible={false}
                    position={index + 1}
                  />
                ))}
              </SearchResults>
            </SearchContentComponent>
          </div>
        </SearchPageComponent>
        <Footer />
      </React.Fragment>
    </Provider>
  ))
  .add('default (with banner, with map)', () => (
    <Provider store={store}>
      <React.Fragment>
        <Header />
        <SearchPageComponent hasMap>
          <div />
          <BottomSidebar>
            {matches => {
              if (matches) {
                return (
                  <FilterMapToggleButton mapIsVisible={false} />
                );
              }
              return null;
            }}
          </BottomSidebar>
          <FilterBarComponent hasLocation>
            <FilterBarItems vertical={exampleTags.defaultTags[0].tag}>
              {exampleFilters.desktop.meeting.default.map((filter, index) => (
                <FilterBarItem
                  index={index}
                  isFirst={index === 0}
                  isLast={index === exampleFilters.desktop.meeting.default.length - 1}
                  key={shortid.generate()}
                  length={exampleFilters.desktop.meeting.default.length}
                >
                  <FilterButtonComponent
                    buttonText={filter.text}
                    onClick={somethingHappened}
                  />
                </FilterBarItem>
              ))}
            </FilterBarItems>
          </FilterBarComponent>
          <div>
            <SearchBanner
              image="https://a0.muscache.com/4ea/air/v2/pictures/197d52ff-37f6-455d-9619-94067782a32f.jpg?t=c:w1131-h343,r:w1131-h343-sfit,e:fjpg-c75"
              subtitle="Stay with all the comforts of home, verified."
              title="LONDON"
              url="/"
            />
            <SearchContentComponent mapIsVisible>
              <SearchText text="Enter dates and number of guests to see the total price per night." />
              <ContentSeparator marginNum={0} />
              <SearchText
                icon="_express/images/commonsite/calendar.gif"
                subtext="You may want to book soon."
                text="77% of London homes for your dates and guests are already booked."
              />
              <SearchResults sectionTitle="Explore all 300+ meeting spaces">
                {exampleSearchResults.cards.map((result, index) => (
                  <SearchResult
                    data={result}
                    isFetching={false}
                    key={shortid.generate()}
                    mapIsVisible
                    position={index + 1}
                  />
                ))}
              </SearchResults>
            </SearchContentComponent>
            <RightSidebar>
              {matches => {
                if (matches) {
                  return (
                    <SearchMapComponent
                      hasBanner
                      isServer={false}
                      map={{
                        boundsHaveChanged: false,
                        isStable: true,
                        isVisible: true,
                        requiresRefit: false,
                        shouldSearchOnMapMove: true
                      }}
                      results={{
                        data: [
                          {
                            currentPage: 1,
                            data: exampleSearchResults.cards,
                            from: 0,
                            isFetching: false,
                            lastPage: 1,
                            nextPageUrl: '/1',
                            path: '/s',
                            perPage: 5,
                            prevPageUrl: '/0',
                            searchObject: {
                              lat: '51.5072996',
                              lon: '-0.1280232'
                            },
                            title: 'Explore all 300+ meeting spaces',
                            to: 5,
                            total: 5
                          }
                        ],
                        searchObject: {
                          lat: '51.5072996',
                          lon: '-0.1280232'
                        }
                      }}
                      startFetch={somethingHappened}
                    />
                  );
                }
                return null;
              }}
            </RightSidebar>
          </div>
          <Pagination
            currentPage={1}
            lastPage={15}
          />
        </SearchPageComponent>
        <Footer />
      </React.Fragment>
    </Provider>
  ))
  .add('default (without banner, without map)', () => (
    <Provider store={storeMapHidden}>
      <React.Fragment>
        <Header />
        <SearchPageComponent hasMap>
          <div />
          <BottomSidebar>
            {matches => {
              if (matches) {
                return (
                  <FilterMapToggleButton mapIsVisible={false} />
                );
              }
              return null;
            }}
          </BottomSidebar>
          <FilterBarComponent hasLocation>
            <FilterBarItems vertical={exampleTags.defaultTags[0].tag}>
              {exampleFilters.desktop.meeting.default.map((filter, index) => (
                <FilterBarItem
                  index={index}
                  isFirst={index === 0}
                  isLast={index === exampleFilters.desktop.meeting.default.length - 1}
                  key={shortid.generate()}
                  length={exampleFilters.desktop.meeting.default.length}
                >
                  <FilterButtonComponent
                    buttonText={filter.text}
                    onClick={somethingHappened}
                  />
                </FilterBarItem>
              ))}
            </FilterBarItems>
          </FilterBarComponent>
          <div>
            <SearchContentComponent mapIsVisible={false}>
              <SearchText text="Enter dates and number of guests to see the total price per night." />
              <ContentSeparator marginNum={0} />
              <SearchText
                icon="_express/images/commonsite/trophy.gif"
                text="Over 1,000,000 guest reviews for London homes, with an average of 4.7 out of 5 stars."
              />
              <SearchResults sectionTitle="Explore all 300+ meeting spaces">
                {exampleSearchResults.cards.map((result, index) => (
                  <SearchResult
                    data={result}
                    isFetching={false}
                    key={shortid.generate()}
                    mapIsVisible={false}
                    position={index + 1}
                  />
                ))}
              </SearchResults>
            </SearchContentComponent>
          </div>
        </SearchPageComponent>
        <Footer />
      </React.Fragment>
    </Provider>
  ))
  .add('default (without banner, with map)', () => (
    <Provider store={store}>
      <React.Fragment>
        <Header />
        <SearchPageComponent hasMap>
          <div />
          <BottomSidebar>
            {matches => {
              if (matches) {
                return (
                  <FilterMapToggleButton mapIsVisible={false} />
                );
              }
              return null;
            }}
          </BottomSidebar>
          <FilterBarComponent hasLocation>
            <FilterBarItems vertical={exampleTags.defaultTags[0].tag}>
              {exampleFilters.desktop.meeting.default.map((filter, index) => (
                <FilterBarItem
                  index={index}
                  isFirst={index === 0}
                  isLast={index === exampleFilters.desktop.meeting.default.length - 1}
                  key={shortid.generate()}
                  length={exampleFilters.desktop.meeting.default.length}
                >
                  <FilterButtonComponent
                    buttonText={filter.text}
                    onClick={somethingHappened}
                  />
                </FilterBarItem>
              ))}
            </FilterBarItems>
          </FilterBarComponent>
          <div>
            <SearchContentComponent mapIsVisible>
              <SearchText text="Enter dates and number of guests to see the total price per night." />
              <ContentSeparator marginNum={0} />
              <SearchText
                icon="_express/images/commonsite/calendar.gif"
                subtext="You may want to book soon."
                text="77% of London homes for your dates and guests are already booked."
              />
              <SearchResults sectionTitle="Explore all 300+ meeting spaces">
                {exampleSearchResults.cards.map((result, index) => (
                  <SearchResult
                    data={result}
                    isFetching={false}
                    key={shortid.generate()}
                    mapIsVisible
                    position={index + 1}
                  />
                ))}
              </SearchResults>
            </SearchContentComponent>
            <RightSidebar>
              {matches => {
                if (matches) {
                  return (
                    <SearchMapComponent
                      hasBanner={false}
                      isServer={false}
                      map={{
                        boundsHaveChanged: false,
                        isStable: true,
                        isVisible: true,
                        requiresRefit: false,
                        shouldSearchOnMapMove: true
                      }}
                      results={{
                        data: [
                          {
                            currentPage: 1,
                            data: exampleSearchResults.cards,
                            from: 0,
                            isFetching: false,
                            lastPage: 1,
                            nextPageUrl: '/1',
                            path: '/s',
                            perPage: 5,
                            prevPageUrl: '/0',
                            searchObject: {
                              lat: '51.5072996',
                              lon: '-0.1280232'
                            },
                            title: 'Explore all 300+ meeting spaces',
                            to: 5,
                            total: 5
                          }
                        ],
                        searchObject: {
                          lat: '51.5072996',
                          lon: '-0.1280232'
                        }
                      }}
                      startFetch={somethingHappened}
                    />
                  );
                }
                return null;
              }}
            </RightSidebar>
          </div>
          <Pagination
            currentPage={1}
            lastPage={15}
          />
        </SearchPageComponent>
        <Footer />
      </React.Fragment>
    </Provider>
  ))
  .add('finish booking (with banner, without map)', () => (
    <Provider store={storeMapHidden}>
      <React.Fragment>
        <Header />
        <SearchPageComponent hasMap>
          <div />
          <BottomSidebar>
            {matches => {
              if (matches) {
                return (
                  <FilterMapToggleButton mapIsVisible={false} />
                );
              }
              return null;
            }}
          </BottomSidebar>
          <FilterBarComponent hasLocation>
            <FilterBarItems vertical={exampleTags.defaultTags[0].tag}>
              {exampleFilters.desktop.meeting.default.map((filter, index) => (
                <FilterBarItem
                  index={index}
                  isFirst={index === 0}
                  isLast={index === exampleFilters.desktop.meeting.default.length - 1}
                  key={shortid.generate()}
                  length={exampleFilters.desktop.meeting.default.length}
                >
                  <FilterButtonComponent
                    buttonText={filter.text}
                    onClick={somethingHappened}
                  />
                </FilterBarItem>
              ))}
            </FilterBarItems>
          </FilterBarComponent>
          <div>
            <SearchBanner
              image="https://a0.muscache.com/4ea/air/v2/pictures/197d52ff-37f6-455d-9619-94067782a32f.jpg?t=c:w1131-h343,r:w1131-h343-sfit,e:fjpg-c75"
              subtitle="Stay with all the comforts of home, verified."
              title="LONDON"
              url="/"
            />
            <SearchContentComponent mapIsVisible={false}>
              <SearchText text="Enter dates and number of guests to see the total price per night." />
              <ContentSeparator marginNum={0} />
              <SearchText
                icon="_express/images/commonsite/trophy.gif"
                text="Over 1,000,000 guest reviews for London homes, with an average of 4.7 out of 5 stars."
              />
              <SearchResults sectionTitle="Finish your booking">
                {exampleSearchResults.finishCards.map((result, index) => (
                  <SearchResult
                    data={result}
                    isFetching={false}
                    key={shortid.generate()}
                    mapIsVisible={false}
                    position={index + 1}
                  />
                ))}
              </SearchResults>
              <SearchResults sectionTitle="Explore all 300+ meeting spaces">
                {exampleSearchResults.cards.map((result, index) => (
                  <SearchResult
                    data={result}
                    isFetching={false}
                    key={shortid.generate()}
                    mapIsVisible={false}
                    position={index + 1}
                  />
                ))}
              </SearchResults>
            </SearchContentComponent>
          </div>
        </SearchPageComponent>
        <Footer />
      </React.Fragment>
    </Provider>
  ))
  .add('finish booking (with banner, with map)', () => (
    <Provider store={store}>
      <React.Fragment>
        <Header />
        <SearchPageComponent hasMap>
          <div />
          <BottomSidebar>
            {matches => {
              if (matches) {
                return (
                  <FilterMapToggleButton mapIsVisible={false} />
                );
              }
              return null;
            }}
          </BottomSidebar>
          <FilterBarComponent hasLocation>
            <FilterBarItems vertical={exampleTags.defaultTags[0].tag}>
              {exampleFilters.desktop.meeting.default.map((filter, index) => (
                <FilterBarItem
                  index={index}
                  isFirst={index === 0}
                  isLast={index === exampleFilters.desktop.meeting.default.length - 1}
                  key={shortid.generate()}
                  length={exampleFilters.desktop.meeting.default.length}
                >
                  <FilterButtonComponent
                    buttonText={filter.text}
                    onClick={somethingHappened}
                  />
                </FilterBarItem>
              ))}
            </FilterBarItems>
          </FilterBarComponent>
          <div>
            <SearchBanner
              image="https://a0.muscache.com/4ea/air/v2/pictures/197d52ff-37f6-455d-9619-94067782a32f.jpg?t=c:w1131-h343,r:w1131-h343-sfit,e:fjpg-c75"
              subtitle="Stay with all the comforts of home, verified."
              title="LONDON"
              url="/"
            />
            <SearchContentComponent mapIsVisible>
              <SearchText text="Enter dates and number of guests to see the total price per night." />
              <ContentSeparator marginNum={0} />
              <SearchText
                icon="_express/images/commonsite/calendar.gif"
                subtext="You may want to book soon."
                text="77% of London homes for your dates and guests are already booked."
              />
              <SearchResults sectionTitle="Finish your booking">
                {exampleSearchResults.finishCards.map((result, index) => (
                  <SearchResult
                    data={result}
                    isFetching={false}
                    key={shortid.generate()}
                    mapIsVisible
                    position={index + 1}
                  />
                ))}
              </SearchResults>
              <SearchResults sectionTitle="Explore all 300+ meeting spaces">
                {exampleSearchResults.cards.map((result, index) => (
                  <SearchResult
                    data={result}
                    isFetching={false}
                    key={shortid.generate()}
                    mapIsVisible
                    position={index + 1}
                  />
                ))}
              </SearchResults>
            </SearchContentComponent>
            <RightSidebar>
              {matches => {
                if (matches) {
                  return (
                    <SearchMapComponent
                      hasBanner
                      isServer={false}
                      map={{
                        boundsHaveChanged: false,
                        isStable: true,
                        isVisible: true,
                        requiresRefit: false,
                        shouldSearchOnMapMove: true
                      }}
                      results={{
                        data: [
                          {
                            currentPage: 1,
                            data: exampleSearchResults.cards,
                            from: 0,
                            isFetching: false,
                            lastPage: 1,
                            nextPageUrl: '/1',
                            path: '/s',
                            perPage: 5,
                            prevPageUrl: '/0',
                            searchObject: {
                              lat: '51.5072996',
                              lon: '-0.1280232'
                            },
                            title: 'Explore all 300+ meeting spaces',
                            to: 5,
                            total: 5
                          }
                        ],
                        searchObject: {
                          lat: '51.5072996',
                          lon: '-0.1280232'
                        }
                      }}
                      startFetch={somethingHappened}
                    />
                  );
                }
                return null;
              }}
            </RightSidebar>
          </div>
          <Pagination
            currentPage={1}
            lastPage={15}
          />
        </SearchPageComponent>
        <Footer />
      </React.Fragment>
    </Provider>
  ))
  .add('finish booking (without banner, without map)', () => (
    <Provider store={storeMapHidden}>
      <React.Fragment>
        <Header />
        <SearchPageComponent hasMap>
          <div />
          <BottomSidebar>
            {matches => {
              if (matches) {
                return (
                  <FilterMapToggleButton mapIsVisible={false} />
                );
              }
              return null;
            }}
          </BottomSidebar>
          <FilterBarComponent hasLocation>
            <FilterBarItems vertical={exampleTags.defaultTags[0].tag}>
              {exampleFilters.desktop.meeting.default.map((filter, index) => (
                <FilterBarItem
                  index={index}
                  isFirst={index === 0}
                  isLast={index === exampleFilters.desktop.meeting.default.length - 1}
                  key={shortid.generate()}
                  length={exampleFilters.desktop.meeting.default.length}
                >
                  <FilterButtonComponent
                    buttonText={filter.text}
                    onClick={somethingHappened}
                  />
                </FilterBarItem>
              ))}
            </FilterBarItems>
          </FilterBarComponent>
          <div>
            <SearchContentComponent mapIsVisible={false}>
              <SearchText text="Enter dates and number of guests to see the total price per night." />
              <ContentSeparator marginNum={0} />
              <SearchText
                icon="_express/images/commonsite/trophy.gif"
                text="Over 1,000,000 guest reviews for London homes, with an average of 4.7 out of 5 stars."
              />
              <SearchResults sectionTitle="Finish your booking">
                {exampleSearchResults.finishCards.map((result, index) => (
                  <SearchResult
                    data={result}
                    isFetching={false}
                    key={shortid.generate()}
                    mapIsVisible={false}
                    position={index + 1}
                  />
                ))}
              </SearchResults>
              <SearchResults sectionTitle="Explore all 300+ meeting spaces">
                {exampleSearchResults.cards.map((result, index) => (
                  <SearchResult
                    data={result}
                    isFetching={false}
                    key={shortid.generate()}
                    mapIsVisible={false}
                    position={index + 1}
                  />
                ))}
              </SearchResults>
            </SearchContentComponent>
          </div>
        </SearchPageComponent>
        <Footer />
      </React.Fragment>
    </Provider>
  ))
  .add('finish booking (without banner, with map)', () => (
    <Provider store={store}>
      <React.Fragment>
        <Header />
        <SearchPageComponent hasMap>
          <div />
          <BottomSidebar>
            {matches => {
              if (matches) {
                return (
                  <FilterMapToggleButton mapIsVisible={false} />
                );
              }
              return null;
            }}
          </BottomSidebar>
          <FilterBarComponent hasLocation>
            <FilterBarItems vertical={exampleTags.defaultTags[0].tag}>
              {exampleFilters.desktop.meeting.default.map((filter, index) => (
                <FilterBarItem
                  index={index}
                  isFirst={index === 0}
                  isLast={index === exampleFilters.desktop.meeting.default.length - 1}
                  key={shortid.generate()}
                  length={exampleFilters.desktop.meeting.default.length}
                >
                  <FilterButtonComponent
                    buttonText={filter.text}
                    onClick={somethingHappened}
                  />
                </FilterBarItem>
              ))}
            </FilterBarItems>
          </FilterBarComponent>
          <div>
            <SearchContentComponent mapIsVisible>
              <SearchText text="Enter dates and number of guests to see the total price per night." />
              <ContentSeparator marginNum={0} />
              <SearchText
                icon="_express/images/commonsite/calendar.gif"
                subtext="You may want to book soon."
                text="77% of London homes for your dates and guests are already booked."
              />
              <SearchResults sectionTitle="Finish your booking">
                {exampleSearchResults.finishCards.map((result, index) => (
                  <SearchResult
                    data={result}
                    isFetching={false}
                    key={shortid.generate()}
                    mapIsVisible
                    position={index + 1}
                  />
                ))}
              </SearchResults>
              <SearchResults sectionTitle="Explore all 300+ meeting spaces">
                {exampleSearchResults.cards.map((result, index) => (
                  <SearchResult
                    data={result}
                    isFetching={false}
                    key={shortid.generate()}
                    mapIsVisible
                    position={index + 1}
                  />
                ))}
              </SearchResults>
            </SearchContentComponent>
            <RightSidebar>
              {matches => {
                if (matches) {
                  return (
                    <SearchMapComponent
                      hasBanner={false}
                      isServer={false}
                      map={{
                        boundsHaveChanged: false,
                        isStable: true,
                        isVisible: true,
                        requiresRefit: false,
                        shouldSearchOnMapMove: true
                      }}
                      results={{
                        data: [
                          {
                            currentPage: 1,
                            data: exampleSearchResults.cards,
                            from: 0,
                            isFetching: false,
                            lastPage: 1,
                            nextPageUrl: '/1',
                            path: '/s',
                            perPage: 5,
                            prevPageUrl: '/0',
                            searchObject: {
                              lat: '51.5072996',
                              lon: '-0.1280232'
                            },
                            title: 'Explore all 300+ meeting spaces',
                            to: 5,
                            total: 5
                          }
                        ],
                        searchObject: {
                          lat: '51.5072996',
                          lon: '-0.1280232'
                        }
                      }}
                      startFetch={somethingHappened}
                    />
                  );
                }
                return null;
              }}
            </RightSidebar>
          </div>
          <Pagination
            currentPage={1}
            lastPage={15}
          />
        </SearchPageComponent>
        <Footer />
      </React.Fragment>
    </Provider>
  ))
  .add('location carousel (with banner, without map)', () => (
    <Provider store={storeWithoutLocationMapHidden}>
      <React.Fragment>
        <Header />
        <SearchPageComponent hasMap={false}>
          <div />
          <BottomSidebar>
            {matches => {
              if (matches) {
                return (
                  <FilterMapToggleButton mapIsVisible={false} />
                );
              }
              return null;
            }}
          </BottomSidebar>
          <FilterBarComponent hasLocation={false}>
            <FilterBarItems vertical={exampleTags.defaultTags[0].tag}>
              {exampleFilters.desktop.meeting.default.map((filter, index) => (
                <FilterBarItem
                  index={index}
                  isFirst={index === 0}
                  isLast={index === exampleFilters.desktop.meeting.default.length - 1}
                  key={shortid.generate()}
                  length={exampleFilters.desktop.meeting.default.length}
                >
                  <FilterButtonComponent
                    buttonText={filter.text}
                    onClick={somethingHappened}
                  />
                </FilterBarItem>
              ))}
            </FilterBarItems>
          </FilterBarComponent>
          <div>
            <SearchBanner
              image="https://a0.muscache.com/4ea/air/v2/pictures/197d52ff-37f6-455d-9619-94067782a32f.jpg?t=c:w1131-h343,r:w1131-h343-sfit,e:fjpg-c75"
              subtitle="Stay with all the comforts of home, verified."
              title="LONDON"
              url="/"
            />
            <SearchContentComponent mapIsVisible={false}>
              <SearchText text="Enter dates and number of guests to see the total price per night." />
              <ContentSeparator marginNum={0} />
              <SearchText
                icon="_express/images/commonsite/trophy.gif"
                text="Over 1,000,000 guest reviews for London homes, with an average of 4.7 out of 5 stars."
              />
              <Carousel
                id="citiesCarousel"
                isSlider
                maxOptions={{ small: 6 }}
                options={getCitiesData('meeting-rooms').en.data}
                optionTemplate={SmallOption}
                sectionTitle="search.instructions_select_location"
              />
              <SearchResults sectionTitle="Explore all 300+ meeting spaces">
                {exampleSearchResults.cards.map((result, index) => (
                  <SearchResult
                    data={result}
                    isFetching={false}
                    key={shortid.generate()}
                    mapIsVisible={false}
                    position={index + 1}
                  />
                ))}
              </SearchResults>
            </SearchContentComponent>
          </div>
        </SearchPageComponent>
        <Footer />
      </React.Fragment>
    </Provider>
  ))
  .add('location carousel (without banner, without map)', () => (
    <Provider store={storeWithoutLocationMapHidden}>
      <React.Fragment>
        <Header />
        <SearchPageComponent hasMap={false}>
          <div />
          <BottomSidebar>
            {matches => {
              if (matches) {
                return (
                  <FilterMapToggleButton mapIsVisible={false} />
                );
              }
              return null;
            }}
          </BottomSidebar>
          <FilterBarComponent hasLocation={false}>
            <FilterBarItems vertical={exampleTags.defaultTags[0].tag}>
              {exampleFilters.desktop.meeting.default.map((filter, index) => (
                <FilterBarItem
                  index={index}
                  isFirst={index === 0}
                  isLast={index === exampleFilters.desktop.meeting.default.length - 1}
                  key={shortid.generate()}
                  length={exampleFilters.desktop.meeting.default.length}
                >
                  <FilterButtonComponent
                    buttonText={filter.text}
                    onClick={somethingHappened}
                  />
                </FilterBarItem>
              ))}
            </FilterBarItems>
          </FilterBarComponent>
          <div>
            <SearchContentComponent mapIsVisible={false}>
              <SearchText text="Enter dates and number of guests to see the total price per night." />
              <ContentSeparator marginNum={0} />
              <SearchText
                icon="_express/images/commonsite/calendar.gif"
                subtext="You may want to book soon."
                text="77% of London homes for your dates and guests are already booked."
              />
              <Carousel
                id="citiesCarousel"
                isSlider
                maxOptions={{ small: 6 }}
                options={getCitiesData('meeting-rooms').en.data}
                optionTemplate={SmallOption}
                sectionTitle="search.instructions_select_location"
              />
              <SearchResults sectionTitle="Explore all 300+ meeting spaces">
                {exampleSearchResults.cards.map((result, index) => (
                  <SearchResult
                    data={result}
                    isFetching={false}
                    key={shortid.generate()}
                    mapIsVisible={false}
                    position={index + 1}
                  />
                ))}
              </SearchResults>
            </SearchContentComponent>
          </div>
        </SearchPageComponent>
        <Footer />
      </React.Fragment>
    </Provider>
  ))
  .add('results carousel (with banner, without map)', () => (
    <Provider store={storeMapHidden}>
      <React.Fragment>
        <Header />
        <SearchPageComponent hasMap>
          <div />
          <BottomSidebar>
            {matches => {
              if (matches) {
                return (
                  <FilterMapToggleButton mapIsVisible={false} />
                );
              }
              return null;
            }}
          </BottomSidebar>
          <FilterBarComponent hasLocation>
            <FilterBarItems vertical={exampleTags.defaultTags[0].tag}>
              {exampleFilters.desktop.meeting.default.map((filter, index) => (
                <FilterBarItem
                  index={index}
                  isFirst={index === 0}
                  isLast={index === exampleFilters.desktop.meeting.default.length - 1}
                  key={shortid.generate()}
                  length={exampleFilters.desktop.meeting.default.length}
                >
                  <FilterButtonComponent
                    buttonText={filter.text}
                    onClick={somethingHappened}
                  />
                </FilterBarItem>
              ))}
            </FilterBarItems>
          </FilterBarComponent>
          <div>
            <SearchBanner
              image="https://a0.muscache.com/4ea/air/v2/pictures/197d52ff-37f6-455d-9619-94067782a32f.jpg?t=c:w1131-h343,r:w1131-h343-sfit,e:fjpg-c75"
              subtitle="Stay with all the comforts of home, verified."
              title="LONDON"
              url="/"
            />
            <SearchContentComponent mapIsVisible={false}>
              <SearchText text="Enter dates and number of guests to see the total price per night." />
              <ContentSeparator marginNum={0} />
              <SearchText
                icon="_express/images/commonsite/trophy.gif"
                text="Over 1,000,000 guest reviews for London homes, with an average of 4.7 out of 5 stars."
              />
              <Translatable attributes={{ footerText: { transKey: 'common.show_all', count: 2000, replacements: { number: 2000 } } }}>
                <Carousel
                  footerLink="/"
                  id="resultsCarousel"
                  isSlider
                  linkComponentProps={{ target: '_blank', rel: 'noopener' }}
                  maxOptions={{ large: 5 }}
                  options={exampleSearchResults.cards}
                  optionTemplate={LargeOption}
                  sectionTitle="Introducing Zipcube Plus in London"
                  sectionSubtitle="A selection of meeting spaces verified for quality and design"
                  type="large"
                />
              </Translatable>
              <SearchResults sectionTitle="Explore all 300+ meeting spaces">
                {exampleSearchResults.cards.map((result, index) => (
                  <SearchResult
                    data={result}
                    isFetching={false}
                    key={shortid.generate()}
                    mapIsVisible={false}
                    position={index + 1}
                  />
                ))}
              </SearchResults>
            </SearchContentComponent>
          </div>
        </SearchPageComponent>
        <Footer />
      </React.Fragment>
    </Provider>
  ))
  .add('results carousel (with banner, with map)', () => (
    <Provider store={store}>
      <React.Fragment>
        <Header />
        <SearchPageComponent hasMap>
          <div />
          <BottomSidebar>
            {matches => {
              if (matches) {
                return (
                  <FilterMapToggleButton mapIsVisible={false} />
                );
              }
              return null;
            }}
          </BottomSidebar>
          <FilterBarComponent hasLocation>
            <FilterBarItems vertical={exampleTags.defaultTags[0].tag}>
              {exampleFilters.desktop.meeting.default.map((filter, index) => (
                <FilterBarItem
                  index={index}
                  isFirst={index === 0}
                  isLast={index === exampleFilters.desktop.meeting.default.length - 1}
                  key={shortid.generate()}
                  length={exampleFilters.desktop.meeting.default.length}
                >
                  <FilterButtonComponent
                    buttonText={filter.text}
                    onClick={somethingHappened}
                  />
                </FilterBarItem>
              ))}
            </FilterBarItems>
          </FilterBarComponent>
          <div>
            <SearchBanner
              image="https://a0.muscache.com/4ea/air/v2/pictures/197d52ff-37f6-455d-9619-94067782a32f.jpg?t=c:w1131-h343,r:w1131-h343-sfit,e:fjpg-c75"
              subtitle="Stay with all the comforts of home, verified."
              title="LONDON"
              url="/"
            />
            <SearchContentComponent mapIsVisible>
              <SearchText text="Enter dates and number of guests to see the total price per night." />
              <ContentSeparator marginNum={0} />
              <SearchText
                icon="_express/images/commonsite/calendar.gif"
                subtext="You may want to book soon."
                text="77% of London homes for your dates and guests are already booked."
              />
              <Translatable attributes={{ footerText: { transKey: 'common.show_all', count: 2000, replacements: { number: 2000 } } }}>
                <Carousel
                  footerLink="/"
                  id="resultsCarousel"
                  isSlider
                  linkComponentProps={{ target: '_blank', rel: 'noopener' }}
                  maxOptions={{ large: 5 }}
                  options={exampleSearchResults.cards}
                  optionTemplate={LargeOption}
                  sectionTitle="Introducing Zipcube Plus in London"
                  sectionSubtitle="A selection of meeting spaces verified for quality and design"
                  type="large"
                />
              </Translatable>
              <SearchResults sectionTitle="Explore all 300+ meeting spaces">
                {exampleSearchResults.cards.map((result, index) => (
                  <SearchResult
                    data={result}
                    isFetching={false}
                    key={shortid.generate()}
                    mapIsVisible
                    position={index + 1}
                  />
                ))}
              </SearchResults>
            </SearchContentComponent>
            <RightSidebar>
              {matches => {
                if (matches) {
                  return (
                    <SearchMapComponent
                      hasBanner
                      isServer={false}
                      map={{
                        boundsHaveChanged: false,
                        isStable: true,
                        isVisible: true,
                        requiresRefit: false,
                        shouldSearchOnMapMove: true
                      }}
                      results={{
                        data: [
                          {
                            currentPage: 1,
                            data: exampleSearchResults.cards,
                            from: 0,
                            isFetching: false,
                            lastPage: 1,
                            nextPageUrl: '/1',
                            path: '/s',
                            perPage: 5,
                            prevPageUrl: '/0',
                            searchObject: {
                              lat: '51.5072996',
                              lon: '-0.1280232'
                            },
                            title: 'Explore all 300+ meeting spaces',
                            to: 5,
                            total: 5
                          }
                        ],
                        searchObject: {
                          lat: '51.5072996',
                          lon: '-0.1280232'
                        }
                      }}
                      startFetch={somethingHappened}
                    />
                  );
                }
                return null;
              }}
            </RightSidebar>
          </div>
          <Pagination
            currentPage={1}
            lastPage={15}
          />
        </SearchPageComponent>
        <Footer />
      </React.Fragment>
    </Provider>
  ))
  .add('results carousel (without banner, without map)', () => (
    <Provider store={storeMapHidden}>
      <React.Fragment>
        <Header />
        <SearchPageComponent hasMap>
          <div />
          <BottomSidebar>
            {matches => {
              if (matches) {
                return (
                  <FilterMapToggleButton mapIsVisible={false} />
                );
              }
              return null;
            }}
          </BottomSidebar>
          <FilterBarComponent hasLocation>
            <FilterBarItems vertical={exampleTags.defaultTags[0].tag}>
              {exampleFilters.desktop.meeting.default.map((filter, index) => (
                <FilterBarItem
                  index={index}
                  isFirst={index === 0}
                  isLast={index === exampleFilters.desktop.meeting.default.length - 1}
                  key={shortid.generate()}
                  length={exampleFilters.desktop.meeting.default.length}
                >
                  <FilterButtonComponent
                    buttonText={filter.text}
                    onClick={somethingHappened}
                  />
                </FilterBarItem>
              ))}
            </FilterBarItems>
          </FilterBarComponent>
          <div>
            <SearchContentComponent mapIsVisible={false}>
              <SearchText text="Enter dates and number of guests to see the total price per night." />
              <ContentSeparator marginNum={0} />
              <SearchText
                icon="_express/images/commonsite/trophy.gif"
                text="Over 1,000,000 guest reviews for London homes, with an average of 4.7 out of 5 stars."
              />
              <Translatable attributes={{ footerText: { transKey: 'common.show_all', count: 2000, replacements: { number: 2000 } } }}>
                <Carousel
                  footerLink="/"
                  id="resultsCarousel"
                  isSlider
                  linkComponentProps={{ target: '_blank', rel: 'noopener' }}
                  maxOptions={{ large: 5 }}
                  options={exampleSearchResults.cards}
                  optionTemplate={LargeOption}
                  sectionTitle="Introducing Zipcube Plus in London"
                  sectionSubtitle="A selection of meeting spaces verified for quality and design"
                  type="large"
                />
              </Translatable>
              <SearchResults sectionTitle="Explore all 300+ meeting spaces">
                {exampleSearchResults.cards.map((result, index) => (
                  <SearchResult
                    data={result}
                    isFetching={false}
                    key={shortid.generate()}
                    mapIsVisible={false}
                    position={index + 1}
                  />
                ))}
              </SearchResults>
            </SearchContentComponent>
          </div>
        </SearchPageComponent>
        <Footer />
      </React.Fragment>
    </Provider>
  ))
  .add('results carousel (without banner, with map)', () => (
    <Provider store={store}>
      <React.Fragment>
        <Header />
        <SearchPageComponent hasMap>
          <div />
          <BottomSidebar>
            {matches => {
              if (matches) {
                return (
                  <FilterMapToggleButton mapIsVisible={false} />
                );
              }
              return null;
            }}
          </BottomSidebar>
          <FilterBarComponent hasLocation>
            <FilterBarItems vertical={exampleTags.defaultTags[0].tag}>
              {exampleFilters.desktop.meeting.default.map((filter, index) => (
                <FilterBarItem
                  index={index}
                  isFirst={index === 0}
                  isLast={index === exampleFilters.desktop.meeting.default.length - 1}
                  key={shortid.generate()}
                  length={exampleFilters.desktop.meeting.default.length}
                >
                  <FilterButtonComponent
                    buttonText={filter.text}
                    onClick={somethingHappened}
                  />
                </FilterBarItem>
              ))}
            </FilterBarItems>
          </FilterBarComponent>
          <div>
            <SearchContentComponent mapIsVisible>
              <SearchText text="Enter dates and number of guests to see the total price per night." />
              <ContentSeparator marginNum={0} />
              <SearchText
                icon="_express/images/commonsite/calendar.gif"
                subtext="You may want to book soon."
                text="77% of London homes for your dates and guests are already booked."
              />
              <Translatable attributes={{ footerText: { transKey: 'common.show_all', count: 2000, replacements: { number: 2000 } } }}>
                <Carousel
                  footerLink="/"
                  id="resultsCarousel"
                  isSlider
                  linkComponentProps={{ target: '_blank', rel: 'noopener' }}
                  maxOptions={{ large: 5 }}
                  options={exampleSearchResults.cards}
                  optionTemplate={LargeOption}
                  sectionTitle="Introducing Zipcube Plus in London"
                  sectionSubtitle="A selection of meeting spaces verified for quality and design"
                  type="large"
                />
              </Translatable>
              <SearchResults sectionTitle="Explore all 300+ meeting spaces">
                {exampleSearchResults.cards.map((result, index) => (
                  <SearchResult
                    data={result}
                    isFetching={false}
                    key={shortid.generate()}
                    mapIsVisible
                    position={index + 1}
                  />
                ))}
              </SearchResults>
            </SearchContentComponent>
            <RightSidebar>
              {matches => {
                if (matches) {
                  return (
                    <SearchMapComponent
                      hasBanner={false}
                      isServer={false}
                      map={{
                        boundsHaveChanged: false,
                        isStable: true,
                        isVisible: true,
                        requiresRefit: false,
                        shouldSearchOnMapMove: true
                      }}
                      results={{
                        data: [
                          {
                            currentPage: 1,
                            data: exampleSearchResults.cards,
                            from: 0,
                            isFetching: false,
                            lastPage: 1,
                            nextPageUrl: '/1',
                            path: '/s',
                            perPage: 5,
                            prevPageUrl: '/0',
                            searchObject: {
                              lat: '51.5072996',
                              lon: '-0.1280232'
                            },
                            title: 'Explore all 300+ meeting spaces',
                            to: 5,
                            total: 5
                          }
                        ],
                        searchObject: {
                          lat: '51.5072996',
                          lon: '-0.1280232'
                        }
                      }}
                      startFetch={somethingHappened}
                    />
                  );
                }
                return null;
              }}
            </RightSidebar>
          </div>
          <Pagination
            currentPage={1}
            lastPage={15}
          />
        </SearchPageComponent>
        <Footer />
      </React.Fragment>
    </Provider>
  ))
  .add('tag carousel (with banner, without map)', () => (
    <Provider store={storeMapHidden}>
      <React.Fragment>
        <Header />
        <SearchPageComponent hasMap>
          <div />
          <BottomSidebar>
            {matches => {
              if (matches) {
                return (
                  <FilterMapToggleButton mapIsVisible={false} />
                );
              }
              return null;
            }}
          </BottomSidebar>
          <FilterBarComponent hasLocation>
            <FilterBarItems vertical={exampleTags.defaultTags[0].tag}>
              {exampleFilters.desktop.meeting.default.map((filter, index) => (
                <FilterBarItem
                  index={index}
                  isFirst={index === 0}
                  isLast={index === exampleFilters.desktop.meeting.default.length - 1}
                  key={shortid.generate()}
                  length={exampleFilters.desktop.meeting.default.length}
                >
                  <FilterButtonComponent
                    buttonText={filter.text}
                    onClick={somethingHappened}
                  />
                </FilterBarItem>
              ))}
            </FilterBarItems>
          </FilterBarComponent>
          <div>
            <SearchBanner
              image="https://a0.muscache.com/4ea/air/v2/pictures/197d52ff-37f6-455d-9619-94067782a32f.jpg?t=c:w1131-h343,r:w1131-h343-sfit,e:fjpg-c75"
              subtitle="Stay with all the comforts of home, verified."
              title="LONDON"
              url="/"
            />
            <SearchContentComponent mapIsVisible={false}>
              <SearchText text="Enter dates and number of guests to see the total price per night." />
              <ContentSeparator marginNum={0} />
              <SearchText
                icon="_express/images/commonsite/trophy.gif"
                text="Over 1,000,000 guest reviews for London homes, with an average of 4.7 out of 5 stars."
              />
              <Carousel
                id="verticalsCarousel"
                isSlider
                options={verticalsData.en.data}
                optionTemplate={SmallOption}
                sectionTitle="search.instructions_select_vertical"
              />
              <SearchResults sectionTitle="Explore all 300+ meeting spaces">
                {exampleSearchResults.cards.map((result, index) => (
                  <SearchResult
                    data={result}
                    isFetching={false}
                    key={shortid.generate()}
                    mapIsVisible={false}
                    position={index + 1}
                  />
                ))}
              </SearchResults>
            </SearchContentComponent>
          </div>
        </SearchPageComponent>
        <Footer />
      </React.Fragment>
    </Provider>
  ))
  .add('tag carousel (with banner, with map)', () => (
    <Provider store={store}>
      <React.Fragment>
        <Header />
        <SearchPageComponent hasMap>
          <div />
          <BottomSidebar>
            {matches => {
              if (matches) {
                return (
                  <FilterMapToggleButton mapIsVisible={false} />
                );
              }
              return null;
            }}
          </BottomSidebar>
          <FilterBarComponent hasLocation>
            <FilterBarItems vertical={exampleTags.defaultTags[0].tag}>
              {exampleFilters.desktop.meeting.default.map((filter, index) => (
                <FilterBarItem
                  index={index}
                  isFirst={index === 0}
                  isLast={index === exampleFilters.desktop.meeting.default.length - 1}
                  key={shortid.generate()}
                  length={exampleFilters.desktop.meeting.default.length}
                >
                  <FilterButtonComponent
                    buttonText={filter.text}
                    onClick={somethingHappened}
                  />
                </FilterBarItem>
              ))}
            </FilterBarItems>
          </FilterBarComponent>
          <div>
            <SearchBanner
              image="https://a0.muscache.com/4ea/air/v2/pictures/197d52ff-37f6-455d-9619-94067782a32f.jpg?t=c:w1131-h343,r:w1131-h343-sfit,e:fjpg-c75"
              subtitle="Stay with all the comforts of home, verified."
              title="LONDON"
              url="/"
            />
            <SearchContentComponent mapIsVisible>
              <SearchText text="Enter dates and number of guests to see the total price per night." />
              <ContentSeparator marginNum={0} />
              <SearchText
                icon="_express/images/commonsite/calendar.gif"
                subtext="You may want to book soon."
                text="77% of London homes for your dates and guests are already booked."
              />
              <Carousel
                id="verticalsCarousel"
                isSlider
                options={verticalsData.en.data}
                optionTemplate={SmallOption}
                sectionTitle="search.instructions_select_vertical"
              />
              <SearchResults sectionTitle="Explore all 300+ meeting spaces">
                {exampleSearchResults.cards.map((result, index) => (
                  <SearchResult
                    data={result}
                    isFetching={false}
                    key={shortid.generate()}
                    mapIsVisible
                    position={index + 1}
                  />
                ))}
              </SearchResults>
            </SearchContentComponent>
            <RightSidebar>
              {matches => {
                if (matches) {
                  return (
                    <SearchMapComponent
                      hasBanner
                      isServer={false}
                      map={{
                        boundsHaveChanged: false,
                        isStable: true,
                        isVisible: true,
                        requiresRefit: false,
                        shouldSearchOnMapMove: true
                      }}
                      results={{
                        data: [
                          {
                            currentPage: 1,
                            data: exampleSearchResults.cards,
                            from: 0,
                            isFetching: false,
                            lastPage: 1,
                            nextPageUrl: '/1',
                            path: '/s',
                            perPage: 5,
                            prevPageUrl: '/0',
                            searchObject: {
                              lat: '51.5072996',
                              lon: '-0.1280232'
                            },
                            title: 'Explore all 300+ meeting spaces',
                            to: 5,
                            total: 5
                          }
                        ],
                        searchObject: {
                          lat: '51.5072996',
                          lon: '-0.1280232'
                        }
                      }}
                      startFetch={somethingHappened}
                    />
                  );
                }
                return null;
              }}
            </RightSidebar>
          </div>
          <Pagination
            currentPage={1}
            lastPage={15}
          />
        </SearchPageComponent>
        <Footer />
      </React.Fragment>
    </Provider>
  ))
  .add('tag carousel (without banner, without map)', () => (
    <Provider store={storeMapHidden}>
      <React.Fragment>
        <Header />
        <SearchPageComponent hasMap>
          <div />
          <BottomSidebar>
            {matches => {
              if (matches) {
                return (
                  <FilterMapToggleButton mapIsVisible={false} />
                );
              }
              return null;
            }}
          </BottomSidebar>
          <FilterBarComponent hasLocation>
            <FilterBarItems vertical={exampleTags.defaultTags[0].tag}>
              {exampleFilters.desktop.meeting.default.map((filter, index) => (
                <FilterBarItem
                  index={index}
                  isFirst={index === 0}
                  isLast={index === exampleFilters.desktop.meeting.default.length - 1}
                  key={shortid.generate()}
                  length={exampleFilters.desktop.meeting.default.length}
                >
                  <FilterButtonComponent
                    buttonText={filter.text}
                    onClick={somethingHappened}
                  />
                </FilterBarItem>
              ))}
            </FilterBarItems>
          </FilterBarComponent>
          <div>
            <SearchContentComponent mapIsVisible={false}>
              <SearchText text="Enter dates and number of guests to see the total price per night." />
              <ContentSeparator marginNum={0} />
              <SearchText
                icon="_express/images/commonsite/trophy.gif"
                text="Over 1,000,000 guest reviews for London homes, with an average of 4.7 out of 5 stars."
              />
              <Carousel
                id="verticalsCarousel"
                isSlider
                options={verticalsData.en.data}
                optionTemplate={SmallOption}
                sectionTitle="search.instructions_select_vertical"
              />
              <SearchResults sectionTitle="Explore all 300+ meeting spaces">
                {exampleSearchResults.cards.map((result, index) => (
                  <SearchResult
                    data={result}
                    isFetching={false}
                    key={shortid.generate()}
                    mapIsVisible={false}
                    position={index + 1}
                  />
                ))}
              </SearchResults>
            </SearchContentComponent>
          </div>
        </SearchPageComponent>
        <Footer />
      </React.Fragment>
    </Provider>
  ))
  .add('tag carousel (without banner, with map)', () => (
    <Provider store={store}>
      <React.Fragment>
        <Header />
        <SearchPageComponent hasMap>
          <div />
          <BottomSidebar>
            {matches => {
              if (matches) {
                return (
                  <FilterMapToggleButton mapIsVisible={false} />
                );
              }
              return null;
            }}
          </BottomSidebar>
          <FilterBarComponent hasLocation>
            <FilterBarItems vertical={exampleTags.defaultTags[0].tag}>
              {exampleFilters.desktop.meeting.default.map((filter, index) => (
                <FilterBarItem
                  index={index}
                  isFirst={index === 0}
                  isLast={index === exampleFilters.desktop.meeting.default.length - 1}
                  key={shortid.generate()}
                  length={exampleFilters.desktop.meeting.default.length}
                >
                  <FilterButtonComponent
                    buttonText={filter.text}
                    onClick={somethingHappened}
                  />
                </FilterBarItem>
              ))}
            </FilterBarItems>
          </FilterBarComponent>
          <div>
            <SearchContentComponent mapIsVisible>
              <SearchText text="Enter dates and number of guests to see the total price per night." />
              <ContentSeparator marginNum={0} />
              <SearchText
                icon="_express/images/commonsite/calendar.gif"
                subtext="You may want to book soon."
                text="77% of London homes for your dates and guests are already booked."
              />
              <Carousel
                id="verticalsCarousel"
                isSlider
                options={verticalsData.en.data}
                optionTemplate={SmallOption}
                sectionTitle="search.instructions_select_vertical"
              />
              <SearchResults sectionTitle="Explore all 300+ meeting spaces">
                {exampleSearchResults.cards.map((result, index) => (
                  <SearchResult
                    data={result}
                    isFetching={false}
                    key={shortid.generate()}
                    mapIsVisible
                    position={index + 1}
                  />
                ))}
              </SearchResults>
            </SearchContentComponent>
            <RightSidebar>
              {matches => {
                if (matches) {
                  return (
                    <SearchMapComponent
                      hasBanner={false}
                      isServer={false}
                      map={{
                        boundsHaveChanged: false,
                        isStable: true,
                        isVisible: true,
                        requiresRefit: false,
                        shouldSearchOnMapMove: true
                      }}
                      results={{
                        data: [
                          {
                            currentPage: 1,
                            data: exampleSearchResults.cards,
                            from: 0,
                            isFetching: false,
                            lastPage: 1,
                            nextPageUrl: '/1',
                            path: '/s',
                            perPage: 5,
                            prevPageUrl: '/0',
                            searchObject: {
                              lat: '51.5072996',
                              lon: '-0.1280232'
                            },
                            title: 'Explore all 300+ meeting spaces',
                            to: 5,
                            total: 5
                          }
                        ],
                        searchObject: {
                          lat: '51.5072996',
                          lon: '-0.1280232'
                        }
                      }}
                      startFetch={somethingHappened}
                    />
                  );
                }
                return null;
              }}
            </RightSidebar>
          </div>
          <Pagination
            currentPage={1}
            lastPage={15}
          />
        </SearchPageComponent>
        <Footer />
      </React.Fragment>
    </Provider>
  ))
  .add('trust banner (with banner, without map)', () => (
    <Provider store={storeMapHidden}>
      <React.Fragment>
        <Header />
        <SearchPageComponent hasMap>
          <div />
          <BottomSidebar>
            {matches => {
              if (matches) {
                return (
                  <FilterMapToggleButton mapIsVisible={false} />
                );
              }
              return null;
            }}
          </BottomSidebar>
          <FilterBarComponent hasLocation>
            <FilterBarItems vertical={exampleTags.defaultTags[0].tag}>
              {exampleFilters.desktop.meeting.default.map((filter, index) => (
                <FilterBarItem
                  index={index}
                  isFirst={index === 0}
                  isLast={index === exampleFilters.desktop.meeting.default.length - 1}
                  key={shortid.generate()}
                  length={exampleFilters.desktop.meeting.default.length}
                >
                  <FilterButtonComponent
                    buttonText={filter.text}
                    onClick={somethingHappened}
                  />
                </FilterBarItem>
              ))}
            </FilterBarItems>
          </FilterBarComponent>
          <div>
            <SearchBanner
              image="https://a0.muscache.com/4ea/air/v2/pictures/197d52ff-37f6-455d-9619-94067782a32f.jpg?t=c:w1131-h343,r:w1131-h343-sfit,e:fjpg-c75"
              subtitle="Stay with all the comforts of home, verified."
              title="LONDON"
              url="/"
            />
            <SearchContentComponent mapIsVisible={false}>
              <SearchText text="Enter dates and number of guests to see the total price per night." />
              <ContentSeparator marginNum={0} />
              <SearchText
                icon="_express/images/commonsite/trophy.gif"
                text="Over 1,000,000 guest reviews for London homes, with an average of 4.7 out of 5 stars."
              />
              <SearchTrustBanner sectionTitle="Booking with Zipcube" />
              <SearchResults sectionTitle="Explore all 300+ meeting spaces">
                {exampleSearchResults.cards.map((result, index) => (
                  <SearchResult
                    data={result}
                    isFetching={false}
                    key={shortid.generate()}
                    mapIsVisible={false}
                    position={index + 1}
                  />
                ))}
              </SearchResults>
            </SearchContentComponent>
          </div>
        </SearchPageComponent>
        <Footer />
      </React.Fragment>
    </Provider>
  ))
  .add('trust banner (with banner, with map)', () => (
    <Provider store={store}>
      <React.Fragment>
        <Header />
        <SearchPageComponent hasMap>
          <div />
          <BottomSidebar>
            {matches => {
              if (matches) {
                return (
                  <FilterMapToggleButton mapIsVisible={false} />
                );
              }
              return null;
            }}
          </BottomSidebar>
          <FilterBarComponent hasLocation>
            <FilterBarItems vertical={exampleTags.defaultTags[0].tag}>
              {exampleFilters.desktop.meeting.default.map((filter, index) => (
                <FilterBarItem
                  index={index}
                  isFirst={index === 0}
                  isLast={index === exampleFilters.desktop.meeting.default.length - 1}
                  key={shortid.generate()}
                  length={exampleFilters.desktop.meeting.default.length}
                >
                  <FilterButtonComponent
                    buttonText={filter.text}
                    onClick={somethingHappened}
                  />
                </FilterBarItem>
              ))}
            </FilterBarItems>
          </FilterBarComponent>
          <div>
            <SearchBanner
              image="https://a0.muscache.com/4ea/air/v2/pictures/197d52ff-37f6-455d-9619-94067782a32f.jpg?t=c:w1131-h343,r:w1131-h343-sfit,e:fjpg-c75"
              subtitle="Stay with all the comforts of home, verified."
              title="LONDON"
              url="/"
            />
            <SearchContentComponent mapIsVisible>
              <SearchText text="Enter dates and number of guests to see the total price per night." />
              <ContentSeparator marginNum={0} />
              <SearchText
                icon="_express/images/commonsite/calendar.gif"
                subtext="You may want to book soon."
                text="77% of London homes for your dates and guests are already booked."
              />
              <SearchTrustBanner sectionTitle="Booking with Zipcube" />
              <SearchResults sectionTitle="Explore all 300+ meeting spaces">
                {exampleSearchResults.cards.map((result, index) => (
                  <SearchResult
                    data={result}
                    isFetching={false}
                    key={shortid.generate()}
                    mapIsVisible
                    position={index + 1}
                  />
                ))}
              </SearchResults>
            </SearchContentComponent>
            <RightSidebar>
              {matches => {
                if (matches) {
                  return (
                    <SearchMapComponent
                      hasBanner
                      isServer={false}
                      map={{
                        boundsHaveChanged: false,
                        isStable: true,
                        isVisible: true,
                        requiresRefit: false,
                        shouldSearchOnMapMove: true
                      }}
                      results={{
                        data: [
                          {
                            currentPage: 1,
                            data: exampleSearchResults.cards,
                            from: 0,
                            isFetching: false,
                            lastPage: 1,
                            nextPageUrl: '/1',
                            path: '/s',
                            perPage: 5,
                            prevPageUrl: '/0',
                            searchObject: {
                              lat: '51.5072996',
                              lon: '-0.1280232'
                            },
                            title: 'Explore all 300+ meeting spaces',
                            to: 5,
                            total: 5
                          }
                        ],
                        searchObject: {
                          lat: '51.5072996',
                          lon: '-0.1280232'
                        }
                      }}
                      startFetch={somethingHappened}
                    />
                  );
                }
                return null;
              }}
            </RightSidebar>
          </div>
          <Pagination
            currentPage={1}
            lastPage={15}
          />
        </SearchPageComponent>
        <Footer />
      </React.Fragment>
    </Provider>
  ))
  .add('trust banner (without banner, without map)', () => (
    <Provider store={storeMapHidden}>
      <React.Fragment>
        <Header />
        <SearchPageComponent hasMap>
          <div />
          <BottomSidebar>
            {matches => {
              if (matches) {
                return (
                  <FilterMapToggleButton mapIsVisible={false} />
                );
              }
              return null;
            }}
          </BottomSidebar>
          <FilterBarComponent hasLocation>
            <FilterBarItems vertical={exampleTags.defaultTags[0].tag}>
              {exampleFilters.desktop.meeting.default.map((filter, index) => (
                <FilterBarItem
                  index={index}
                  isFirst={index === 0}
                  isLast={index === exampleFilters.desktop.meeting.default.length - 1}
                  key={shortid.generate()}
                  length={exampleFilters.desktop.meeting.default.length}
                >
                  <FilterButtonComponent
                    buttonText={filter.text}
                    onClick={somethingHappened}
                  />
                </FilterBarItem>
              ))}
            </FilterBarItems>
          </FilterBarComponent>
          <div>
            <SearchContentComponent mapIsVisible={false}>
              <SearchText text="Enter dates and number of guests to see the total price per night." />
              <ContentSeparator marginNum={0} />
              <SearchText
                icon="_express/images/commonsite/trophy.gif"
                text="Over 1,000,000 guest reviews for London homes, with an average of 4.7 out of 5 stars."
              />
              <SearchTrustBanner sectionTitle="Booking with Zipcube" />
              <SearchResults sectionTitle="Explore all 300+ meeting spaces">
                {exampleSearchResults.cards.map((result, index) => (
                  <SearchResult
                    data={result}
                    isFetching={false}
                    key={shortid.generate()}
                    mapIsVisible={false}
                    position={index + 1}
                  />
                ))}
              </SearchResults>
            </SearchContentComponent>
          </div>
        </SearchPageComponent>
        <Footer />
      </React.Fragment>
    </Provider>
  ))
  .add('trust banner (without banner, with map)', () => (
    <Provider store={store}>
      <React.Fragment>
        <Header />
        <SearchPageComponent hasMap>
          <div />
          <BottomSidebar>
            {matches => {
              if (matches) {
                return (
                  <FilterMapToggleButton mapIsVisible={false} />
                );
              }
              return null;
            }}
          </BottomSidebar>
          <FilterBarComponent hasLocation>
            <FilterBarItems vertical={exampleTags.defaultTags[0].tag}>
              {exampleFilters.desktop.meeting.default.map((filter, index) => (
                <FilterBarItem
                  index={index}
                  isFirst={index === 0}
                  isLast={index === exampleFilters.desktop.meeting.default.length - 1}
                  key={shortid.generate()}
                  length={exampleFilters.desktop.meeting.default.length}
                >
                  <FilterButtonComponent
                    buttonText={filter.text}
                    onClick={somethingHappened}
                  />
                </FilterBarItem>
              ))}
            </FilterBarItems>
          </FilterBarComponent>
          <div>
            <SearchContentComponent mapIsVisible>
              <SearchText text="Enter dates and number of guests to see the total price per night." />
              <ContentSeparator marginNum={0} />
              <SearchText
                icon="_express/images/commonsite/calendar.gif"
                subtext="You may want to book soon."
                text="77% of London homes for your dates and guests are already booked."
              />
              <SearchTrustBanner sectionTitle="Booking with Zipcube" />
              <SearchResults sectionTitle="Explore all 300+ meeting spaces">
                {exampleSearchResults.cards.map((result, index) => (
                  <SearchResult
                    data={result}
                    isFetching={false}
                    key={shortid.generate()}
                    mapIsVisible
                    position={index + 1}
                  />
                ))}
              </SearchResults>
            </SearchContentComponent>
            <RightSidebar>
              {matches => {
                if (matches) {
                  return (
                    <SearchMapComponent
                      hasBanner={false}
                      isServer={false}
                      map={{
                        boundsHaveChanged: false,
                        isStable: true,
                        isVisible: true,
                        requiresRefit: false,
                        shouldSearchOnMapMove: true
                      }}
                      results={{
                        data: [
                          {
                            currentPage: 1,
                            data: exampleSearchResults.cards,
                            from: 0,
                            isFetching: false,
                            lastPage: 1,
                            nextPageUrl: '/1',
                            path: '/s',
                            perPage: 5,
                            prevPageUrl: '/0',
                            searchObject: {
                              lat: '51.5072996',
                              lon: '-0.1280232'
                            },
                            title: 'Explore all 300+ meeting spaces',
                            to: 5,
                            total: 5
                          }
                        ],
                        searchObject: {
                          lat: '51.5072996',
                          lon: '-0.1280232'
                        }
                      }}
                      startFetch={somethingHappened}
                    />
                  );
                }
                return null;
              }}
            </RightSidebar>
          </div>
          <Pagination
            currentPage={1}
            lastPage={15}
          />
        </SearchPageComponent>
        <Footer />
      </React.Fragment>
    </Provider>
  ));
