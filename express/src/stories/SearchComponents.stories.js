/* eslint-disable max-len, no-console, react/jsx-no-bind */
import * as React from 'react';
import { bool, node, number, string } from 'prop-types';
import { Provider } from 'react-redux';
import { storiesOf } from '@storybook/react';
import { createStore } from 'redux';
import shortid from 'shortid';
import faker from 'faker';
import moment from 'moment';

import { exampleFilters, exampleSearchResults, exampleTags, exampleVerticals } from './data';
import langObject from '@src/data/langObject';
import { getCitiesData, verticalsData } from '@src/data/search';

import Container from './container';

import SearchMapComponent from '@src/components/Search/SearchMap/SearchMapComponent';
import RedoSearchHereComponent from '@src/components/Search/SearchMap/SearchOnMapMove/RedoSearchHereComponent';
import SearchOnMapMoveComponent from '@src/components/Search/SearchMap/SearchOnMapMove/SearchOnMapMoveComponent';
import PlaceHolder from '@src/components/Search/SearchContent/SearchResult/ResultCard/Placeholder';
import ResultCardBody from '@src/components/Search/SearchContent/SearchResult/ResultCard/ResultCardBody';
import ResultCardBodyOffice from '@src/components/Search/SearchContent/SearchResult/ResultCard/ResultCardBodyOffice';
import ResultCardHead from '@src/components/Search/SearchContent/SearchResult/ResultCard/ResultCardHead';
import FavouriteButton  from '@src/components/Search/SearchContent/SearchResult/ResultCard/ResultCardHead/FavouriteButton';
import ResultReviews from '@src/components/Search/SearchContent/SearchResult/ResultCard/ResultReviews';
import SearchResult from '@src/components/Search/SearchContent/SearchResult';
import SearchResults from '@src/components/Search/SearchContent/SearchResults';
import SearchText from '@src/components/Search/SearchContent/SearchText';
import Carousel, { LargeOption, SmallOption, SmallOptionWithoutImage } from '@src/components/concrete/Carousel';
import FilterMapToggleButton from '@src/components/Search/SearchContent/FilterMapToggleButton';
import Date from '@src/components/Search/Filters/common/Date';
import Amenity from '@src/components/Search/Filters/common/Amenity';
import Guests from '@src/components/Search/Filters/common/Guests';
import Time from '@src/components/Search/Filters/common/Time';
import Price from '@src/components/Search/Filters/common/Price';
import Cuisine from '@src/components/Search/Filters/Dining/Cuisine';
import Layout from '@src/components/Search/Filters/common/Layout';
import OfficeSize from '@src/components/Search/Filters/Office/OfficeSize';
import OfficeType from '@src/components/Search/Filters/Office/OfficeType';
import Type from '@src/components/Search/Filters/common/Type';
import FilterBarComponent from '@src/components/concrete/FilterBar/FilterBarComponent';
import FilterBarItem from '@src/components/concrete/FilterBar/FilterBarItem';
import FilterBarItems from '@src/components/concrete/FilterBar/FilterBarItems';
import FilterButtonComponent from '@src/components/concrete/FilterBar/FilterButton/FilterButtonComponent';
import FilterPanel from '@src/components/concrete/FilterBar/FilterPanels/FilterPanel';
import MobileFilterPanel from '@src/components/concrete/FilterBar/FilterPanels/MobileFilterPanel';
import MoreFiltersPanel from '@src/components/concrete/FilterBar/FilterPanels/MoreFiltersPanel';
import SearchBanner from '@src/components/concrete/Banners/SearchBanner';
import SearchTrustBanner from '@src/components/concrete/Banners/SearchTrustBanner';
import SearchBar from '@src/components/concrete/Header/SearchBar';
import Ddr from '@src/components/Search/Filters/common/DDR';
import ZipcubePlus from '@src/components/Search/Filters/common/ZipcubePlus';
import InstantBook from '@src/components/Search/Filters/common/InstantBook';

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
    domain: 'uk'
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
      tag: 'meeting-rooms'
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

const StoryFilterBar = ({ activeFilterKey, children, moreFilters, vertical }) => (
  <FilterBarComponent filterIsActive>
    <FilterBarItems
      filterIsActive
      vertical={exampleTags.defaultTags[0].tag}
    >
      {exampleFilters.desktop[vertical].default.map((filter, index) => {
        const isActive = (index === activeFilterKey);
        return (
          <FilterBarItem
            index={index}
            isFirst={index === 0}
            isLast={index === exampleFilters.desktop[vertical].default.length - 1}
            key={shortid.generate()}
            length={exampleFilters.desktop[vertical].default.length}
          >
            <FilterButtonComponent
              buttonText={filter.text}
              onClick={somethingHappened}
              isActive={isActive}
            >
              {isActive &&
                <div>
                  <div>
                    {!moreFilters ? (
                      <FilterPanel
                        canClear
                        onApply={somethingHappened}
                        onClear={somethingHappened}
                      >
                        {() => (
                          children
                        )}
                      </FilterPanel>
                    ) : (
                      <MoreFiltersPanel
                        canClear
                        onApply={somethingHappened}
                        onClear={somethingHappened}
                        isOn={moreFilters}
                      >
                        {() => (
                          children
                        )}
                      </MoreFiltersPanel>
                    )}
                  </div>
                </div>
              }
            </FilterButtonComponent>
          </FilterBarItem>
        );
      })}
    </FilterBarItems>
  </FilterBarComponent>
);

const StoryMobileFilter = ({ children }) => (
  <React.Fragment>
    Remember to use mobile emulator!
    <MobileFilterPanel
      canClear
      onApply={somethingHappened}
      onClear={somethingHappened}
      onClose={somethingHappened}
      setButtonText="Set Button Text"
    >
      {() => (
        children
      )}
    </MobileFilterPanel>
  </React.Fragment>
);

StoryFilterBar.propTypes = {
  activeFilterKey: number.isRequired,
  children: node.isRequired,
  moreFilters: bool.isRequired,
  vertical: string.isRequired
};

storiesOf('Search Components', module)
  .addDecorator(story => <Provider store={store}><Container>{story()}</Container></Provider>)
  .add('banner', () => (
    <SearchBanner
      image="https://a0.muscache.com/4ea/air/v2/pictures/197d52ff-37f6-455d-9619-94067782a32f.jpg?t=c:w1131-h343,r:w1131-h343-sfit,e:fjpg-c75"
      subtitle="Stay with all the comforts of home, verified."
      title="LONDON"
      url={faker.internet.url()}
    />
  ))
  .add('banner (trust)', () => (
    <SearchTrustBanner sectionTitle="Booking with Zipcube" />
  ))
  .add('card - body (not office)', () => (
    <ResultCardBody
      currencySymbol="£"
      data={exampleSearchResults.cards[0]}
      resultUrl="/"
      tag="meeting-rooms"
    />
  ))
  .add('card - body (office)', () => (
    <ResultCardBodyOffice
      currencySymbol="£"
      data={exampleSearchResults.officeCards[0]}
      resultUrl="/"
      tag="office"
    />
  ))
  .add('card - full (not office)', () => (
    <SearchResults sectionTitle="Explore all 300+ meeting spaces">
      {exampleSearchResults.cards.map((result, index) => (
        <SearchResult
          data={result}
          isFetching={false}
          key={shortid.generate()}
          position={index + 1}
        />
      ))}
    </SearchResults>
  ))
  .add('card - full (office)', () => (
    <SearchResults sectionTitle="Explore all 300+ meeting spaces">
      {exampleSearchResults.officeCards.map((result, index) => (
        <SearchResult
          data={result}
          isFetching={false}
          key={shortid.generate()}
          position={index + 1}
        />
      ))}
    </SearchResults>
  ))
  .add('card - head', () => (
    <ResultCardHead
      data={exampleSearchResults.cards[0]}
      resultUrl="/"
    >
      <FavouriteButton resultId={`${exampleSearchResults.cards[0].id}`} />
    </ResultCardHead>
  ))
  .add('card - placeholder', () => (
    <PlaceHolder />
  ))
  .add('card - reviews', () => (
    <ResultReviews
      rating={exampleSearchResults.cards[0].rating}
      reviewsCountString={exampleSearchResults.cards[0].reviewsCountString}
    />
  ))
  .add('carousel - continue', () => (
    <Carousel
      id="continueCarousel"
      isSlider
      maxOptions={{ small: 3 }}
      options={exampleSearchResults.continueSearch}
      optionTemplate={SmallOptionWithoutImage}
      sectionTitle="search.continue_search"
      type="smallwithoutimage"
    />
  ))
  .add('carousel - location', () => (
    <Carousel
      id="citiesCarousel"
      isSlider
      maxOptions={{ small: 4 }}
      options={getCitiesData('meeting-rooms').en.data}
      optionTemplate={SmallOption}
      sectionTitle="search.instructions_select_location"
    />
  ))
  .add('carousel - tags', () => (
    <Carousel
      id="verticalsCarousel"
      isSlider
      maxOptions={{ small: 6 }}
      options={verticalsData.en.data}
      optionTemplate={SmallOption}
      sectionTitle="search.instructions_select_vertical"
    />
  ))
  .add('carousel - results', () => (
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
  ))
  .add('filter map toggle button (with map)', () => (
    <FilterMapToggleButton
      mapIsVisible
      toggleMap={somethingHappened}
    />
  ))
  .add('filter map toggle button (without map)', () => (
    <FilterMapToggleButton
      mapIsVisible={false}
      toggleMap={somethingHappened}
    />
  ))
  .add('filters - dining - 1 (date)', () => {
    const activeFilterKey = 0;
    return (
      <StoryFilterBar
        activeFilterKey={activeFilterKey}
        moreFilters={false}
        vertical="dining"
      >
        <Date
          attachClearAction={somethingHappened}
          generateButtonText={somethingHappened}
          onFilterChange={somethingHappened}
          setButtonText={somethingHappened}
          toggleCanClear={somethingHappened}
          values={{ date: '' }}
        />
      </StoryFilterBar>
    );
  })
  .add('filters - dining - 2 (guests)', () => {
    const activeFilterKey = 1;
    return (
      <StoryFilterBar
        activeFilterKey={activeFilterKey}
        moreFilters={false}
        vertical="dining"
      >
        <Guests
          attachClearAction={somethingHappened}
          generateButtonText={somethingHappened}
          onFilterChange={somethingHappened}
          setButtonText={somethingHappened}
          toggleCanClear={somethingHappened}
          values={{ guests: '' }}
        />
      </StoryFilterBar>
    );
  })
  .add('filters - dining - 3 (type)', () => {
    const activeFilterKey = 2;
    return (
      <StoryFilterBar
        activeFilterKey={activeFilterKey}
        moreFilters={false}
        vertical="dining"
      >
        <Type
          attachClearAction={somethingHappened}
          generateButtonText={somethingHappened}
          onFilterChange={somethingHappened}
          setButtonText={somethingHappened}
          toggleCanClear={somethingHappened}
          values={{ types: [] }}
        />
      </StoryFilterBar>
    );
  })
  .add('filters - dining - 4 (cuisine)', () => {
    const activeFilterKey = 3;
    return (
      <StoryFilterBar
        activeFilterKey={activeFilterKey}
        moreFilters={false}
        vertical="dining"
      >
        <Cuisine
          attachClearAction={somethingHappened}
          generateButtonText={somethingHappened}
          onFilterChange={somethingHappened}
          setButtonText={somethingHappened}
          toggleCanClear={somethingHappened}
          values={{ cuisines: [] }}
        />
      </StoryFilterBar>
    );
  })
  .add('filters - dining - 5 (price)', () => {
    const activeFilterKey = 4;
    return (
      <StoryFilterBar
        activeFilterKey={activeFilterKey}
        moreFilters={false}
        vertical="dining"
      >
        <Price
          attachClearAction={somethingHappened}
          generateButtonText={somethingHappened}
          onFilterChange={somethingHappened}
          setButtonText={somethingHappened}
          toggleCanClear={somethingHappened}
          values={{ priceRange: [] }}
        />
      </StoryFilterBar>
    );
  })
  .add('filters - dining - 6 (time)', () => {
    const activeFilterKey = 5;
    return (
      <StoryFilterBar
        activeFilterKey={activeFilterKey}
        moreFilters={false}
        vertical="dining"
      >
        <Time
          attachClearAction={somethingHappened}
          generateButtonText={somethingHappened}
          onFilterChange={somethingHappened}
          onlyStart
          setButtonText={somethingHappened}
          toggleCanClear={somethingHappened}
          values={{ end: '', start: '' }}
        />
      </StoryFilterBar>
    );
  })
  .add('filters - dining - 7 (more filters)', () => {
    const activeFilterKey = 6;
    return (
      <StoryFilterBar
        activeFilterKey={activeFilterKey}
        moreFilters
        vertical="dining"
      >
        <ZipcubePlus
          attachClearAction={somethingHappened}
          generateButtonText={somethingHappened}
          isLarge
          onFilterChange={somethingHappened}
          setButtonText={somethingHappened}
          toggleCanClear={somethingHappened}
          values={{ plusSelected: '' }}
        />
        <Amenity
          attachClearAction={somethingHappened}
          generateButtonText={somethingHappened}
          isLarge
          onFilterChange={somethingHappened}
          setButtonText={somethingHappened}
          toggleCanClear={somethingHappened}
          values={{ amenities: [] }}
          verticalDataType="dining"
        />
        <Amenity
          attachClearAction={somethingHappened}
          generateButtonText={somethingHappened}
          isLarge
          onFilterChange={somethingHappened}
          setButtonText={somethingHappened}
          toggleCanClear={somethingHappened}
          type="venueStaff"
          values={{ amenities: [] }}
          verticalDataType="dining"
        />
        <Amenity
          attachClearAction={somethingHappened}
          generateButtonText={somethingHappened}
          isLarge
          onFilterChange={somethingHappened}
          setButtonText={somethingHappened}
          toggleCanClear={somethingHappened}
          type="cateringLicence"
          values={{ amenities: [] }}
          verticalDataType="dining"
        />
        <Amenity
          attachClearAction={somethingHappened}
          generateButtonText={somethingHappened}
          isLarge
          onFilterChange={somethingHappened}
          setButtonText={somethingHappened}
          toggleCanClear={somethingHappened}
          type="dietaryNeeds"
          values={{ amenities: [] }}
          verticalDataType="dining"
        />
        <Ddr
          attachClearAction={somethingHappened}
          generateButtonText={somethingHappened}
          isLarge
          isLast
          onFilterChange={somethingHappened}
          setButtonText={somethingHappened}
          toggleCanClear={somethingHappened}
          values={{ DDRSelected: '' }}
        />
      </StoryFilterBar>
    );
  })
  .add('filters - meeting - 1 (date)', () => {
    const activeFilterKey = 0;
    return (
      <StoryFilterBar
        activeFilterKey={activeFilterKey}
        moreFilters={false}
        vertical="meeting"
      >
        <Date
          attachClearAction={somethingHappened}
          generateButtonText={somethingHappened}
          onFilterChange={somethingHappened}
          setButtonText={somethingHappened}
          toggleCanClear={somethingHappened}
          values={{ date: '' }}
        />
      </StoryFilterBar>
    );
  })
  .add('filters - meeting - 2 (guests)', () => {
    const activeFilterKey = 1;
    return (
      <StoryFilterBar
        activeFilterKey={activeFilterKey}
        moreFilters={false}
        vertical="meeting"
      >
        <Guests
          attachClearAction={somethingHappened}
          generateButtonText={somethingHappened}
          onFilterChange={somethingHappened}
          setButtonText={somethingHappened}
          toggleCanClear={somethingHappened}
          values={{ guests: '' }}
        />
      </StoryFilterBar>
    );
  })
  .add('filters - meeting - 3 (price)', () => {
    const activeFilterKey = 2;
    return (
      <StoryFilterBar
        activeFilterKey={activeFilterKey}
        moreFilters={false}
        vertical="meeting"
      >
        <Price
          attachClearAction={somethingHappened}
          generateButtonText={somethingHappened}
          onFilterChange={somethingHappened}
          setButtonText={somethingHappened}
          toggleCanClear={somethingHappened}
          values={{ priceRange: [] }}
        />
      </StoryFilterBar>
    );
  })
  .add('filters - meeting - 4 (time)', () => {
    const activeFilterKey = 3;
    return (
      <StoryFilterBar
        activeFilterKey={activeFilterKey}
        moreFilters={false}
        vertical="meeting"
      >
        <Time
          attachClearAction={somethingHappened}
          generateButtonText={somethingHappened}
          onFilterChange={somethingHappened}
          setButtonText={somethingHappened}
          toggleCanClear={somethingHappened}
          values={{ end: '', start: '' }}
        />
      </StoryFilterBar>
    );
  })
  .add('filters - meeting - 5 (layout)', () => {
    const activeFilterKey = 4;
    return (
      <StoryFilterBar
        activeFilterKey={activeFilterKey}
        moreFilters={false}
        vertical="meeting"
      >
        <Layout
          attachClearAction={somethingHappened}
          generateButtonText={somethingHappened}
          onFilterChange={somethingHappened}
          setButtonText={somethingHappened}
          toggleCanClear={somethingHappened}
          values={{ configurations: [] }}
          verticalDataType="meeting"
        />
      </StoryFilterBar>
    );
  })
  .add('filters - meeting - 6 (amenities)', () => {
    const activeFilterKey = 5;
    return (
      <StoryFilterBar
        activeFilterKey={activeFilterKey}
        moreFilters={false}
        vertical="meeting"
      >
        <Amenity
          attachClearAction={somethingHappened}
          generateButtonText={somethingHappened}
          onFilterChange={somethingHappened}
          setButtonText={somethingHappened}
          toggleCanClear={somethingHappened}
          values={{ amenities: [] }}
          verticalDataType="meeting"
        />
      </StoryFilterBar>
    );
  })
  .add('filters - meeting - 7 (more filters)', () => {
    const activeFilterKey = 6;
    return (
      <StoryFilterBar
        activeFilterKey={activeFilterKey}
        moreFilters
        vertical="meeting"
      >
        <ZipcubePlus
          attachClearAction={somethingHappened}
          generateButtonText={somethingHappened}
          isLarge
          onFilterChange={somethingHappened}
          setButtonText={somethingHappened}
          toggleCanClear={somethingHappened}
          values={{ plusSelected: '' }}
        />
        <InstantBook
          attachClearAction={somethingHappened}
          generateButtonText={somethingHappened}
          isLarge
          onFilterChange={somethingHappened}
          setButtonText={somethingHappened}
          toggleCanClear={somethingHappened}
          values={{ instantBookSelected: '' }}
        />
        <Amenity
          attachClearAction={somethingHappened}
          generateButtonText={somethingHappened}
          isLarge
          onFilterChange={somethingHappened}
          setButtonText={somethingHappened}
          toggleCanClear={somethingHappened}
          values={{ amenities: [] }}
          verticalDataType="meeting"
        />
        <Amenity
          attachClearAction={somethingHappened}
          generateButtonText={somethingHappened}
          isLarge
          onFilterChange={somethingHappened}
          setButtonText={somethingHappened}
          toggleCanClear={somethingHappened}
          type="equipment"
          values={{ amenities: [] }}
          verticalDataType="meeting"
        />
        <Amenity
          attachClearAction={somethingHappened}
          generateButtonText={somethingHappened}
          isLarge
          onFilterChange={somethingHappened}
          setButtonText={somethingHappened}
          toggleCanClear={somethingHappened}
          type="cateringLicence"
          values={{ amenities: [] }}
          verticalDataType="meeting"
        />
        <Ddr
          attachClearAction={somethingHappened}
          generateButtonText={somethingHappened}
          isLarge
          isLast
          onFilterChange={somethingHappened}
          setButtonText={somethingHappened}
          toggleCanClear={somethingHappened}
          values={{ DDRSelected: '' }}
        />
      </StoryFilterBar>
    );
  })
  .add('filters - office - 1 (move in date)', () => {
    const activeFilterKey = 0;
    return (
      <StoryFilterBar
        activeFilterKey={activeFilterKey}
        moreFilters={false}
        vertical="office"
      >
        <Date
          attachClearAction={somethingHappened}
          generateButtonText={somethingHappened}
          onFilterChange={somethingHappened}
          setButtonText={somethingHappened}
          toggleCanClear={somethingHappened}
          values={{ date: '' }}
        />
      </StoryFilterBar>
    );
  })
  .add('filters - office - 2 (people)', () => {
    const activeFilterKey = 1;
    return (
      <StoryFilterBar
        activeFilterKey={activeFilterKey}
        moreFilters={false}
        vertical="office"
      >
        <Guests
          attachClearAction={somethingHappened}
          generateButtonText={somethingHappened}
          onFilterChange={somethingHappened}
          setButtonText={somethingHappened}
          toggleCanClear={somethingHappened}
          values={{ guests: '' }}
        />
      </StoryFilterBar>
    );
  })
  .add('filters - office - 3 (type)', () => {
    const activeFilterKey = 2;
    return (
      <StoryFilterBar
        activeFilterKey={activeFilterKey}
        moreFilters={false}
        vertical="office"
      >
        <OfficeType
          attachClearAction={somethingHappened}
          generateButtonText={somethingHappened}
          onFilterChange={somethingHappened}
          setButtonText={somethingHappened}
          toggleCanClear={somethingHappened}
          values={{ officeTypes: [] }}
        />
      </StoryFilterBar>
    );
  })
  .add('filters - office - 4 (price)', () => {
    const activeFilterKey = 3;
    return (
      <StoryFilterBar
        activeFilterKey={activeFilterKey}
        moreFilters={false}
        vertical="office"
      >
        <Price
          attachClearAction={somethingHappened}
          generateButtonText={somethingHappened}
          onFilterChange={somethingHappened}
          setButtonText={somethingHappened}
          toggleCanClear={somethingHappened}
          values={{ priceRange: [] }}
        />
      </StoryFilterBar>
    );
  })
  .add('filters - office - 5 (size)', () => {
    const activeFilterKey = 4;
    return (
      <StoryFilterBar
        activeFilterKey={activeFilterKey}
        moreFilters={false}
        vertical="office"
      >
        <OfficeSize
          attachClearAction={somethingHappened}
          generateButtonText={somethingHappened}
          onFilterChange={somethingHappened}
          setButtonText={somethingHappened}
          toggleCanClear={somethingHappened}
          values={{ from: '', to: '' }}
        />
      </StoryFilterBar>
    );
  })
  .add('filters - office - 6 (amenities)', () => {
    const activeFilterKey = 5;
    return (
      <StoryFilterBar
        activeFilterKey={activeFilterKey}
        moreFilters={false}
        vertical="office"
      >
        <Amenity
          attachClearAction={somethingHappened}
          generateButtonText={somethingHappened}
          onFilterChange={somethingHappened}
          setButtonText={somethingHappened}
          toggleCanClear={somethingHappened}
          values={{ amenities: [] }}
          verticalDataType="office"
        />
      </StoryFilterBar>
    );
  })
  .add('filters - office - 7 (more filters)', () => {
    const activeFilterKey = 6;
    return (
      <StoryFilterBar
        activeFilterKey={activeFilterKey}
        moreFilters
        vertical="office"
      >
        <ZipcubePlus
          attachClearAction={somethingHappened}
          generateButtonText={somethingHappened}
          isLarge
          onFilterChange={somethingHappened}
          setButtonText={somethingHappened}
          toggleCanClear={somethingHappened}
          values={{ plusSelected: '' }}
        />
         <Amenity
          attachClearAction={somethingHappened}
          generateButtonText={somethingHappened}
          isLarge
          onFilterChange={somethingHappened}
          setButtonText={somethingHappened}
          toggleCanClear={somethingHappened}
          type="office"
          values={{ amenities: [] }}
          verticalDataType="office"
        />
        <Ddr
          attachClearAction={somethingHappened}
          generateButtonText={somethingHappened}
          isLarge
          isLast
          onFilterChange={somethingHappened}
          setButtonText={somethingHappened}
          toggleCanClear={somethingHappened}
          values={{ DDRSelected: '' }}
        />
      </StoryFilterBar>
    );
  })
  .add('filters - party - 1 (date)', () => {
    const activeFilterKey = 0;
    return (
      <StoryFilterBar
        activeFilterKey={activeFilterKey}
        moreFilters={false}
        vertical="party"
      >
        <Date
          attachClearAction={somethingHappened}
          generateButtonText={somethingHappened}
          onFilterChange={somethingHappened}
          setButtonText={somethingHappened}
          toggleCanClear={somethingHappened}
          values={{ date: '' }}
        />
      </StoryFilterBar>
    );
  })
  .add('filters - party - 2 (guests)', () => {
    const activeFilterKey = 1;
    return (
      <StoryFilterBar
        activeFilterKey={activeFilterKey}
        moreFilters={false}
        vertical="party"
      >
        <Guests
          attachClearAction={somethingHappened}
          generateButtonText={somethingHappened}
          onFilterChange={somethingHappened}
          setButtonText={somethingHappened}
          toggleCanClear={somethingHappened}
          values={{ guests: '' }}
        />
      </StoryFilterBar>
    );
  })
  .add('filters - party - 3 (type)', () => {
    const activeFilterKey = 2;
    return (
      <StoryFilterBar
        activeFilterKey={activeFilterKey}
        moreFilters={false}
        vertical="party"
      >
        <Type
          attachClearAction={somethingHappened}
          generateButtonText={somethingHappened}
          onFilterChange={somethingHappened}
          setButtonText={somethingHappened}
          toggleCanClear={somethingHappened}
          values={{ types: [] }}
        />
      </StoryFilterBar>
    );
  })
  .add('filters - party - 4 (price)', () => {
    const activeFilterKey = 3;
    return (
      <StoryFilterBar
        activeFilterKey={activeFilterKey}
        moreFilters={false}
        vertical="party"
      >
        <Price
          attachClearAction={somethingHappened}
          generateButtonText={somethingHappened}
          onFilterChange={somethingHappened}
          setButtonText={somethingHappened}
          toggleCanClear={somethingHappened}
          values={{ priceRange: [] }}
        />
      </StoryFilterBar>
    );
  })
  .add('filters - party - 5 (time)', () => {
    const activeFilterKey = 4;
    return (
      <StoryFilterBar
        activeFilterKey={activeFilterKey}
        moreFilters={false}
        vertical="party"
      >
        <Time
          attachClearAction={somethingHappened}
          generateButtonText={somethingHappened}
          onFilterChange={somethingHappened}
          onlyStart
          setButtonText={somethingHappened}
          toggleCanClear={somethingHappened}
          values={{ end: '', start: '' }}
        />
      </StoryFilterBar>
    );
  })
  .add('filters - party - 6 (layout)', () => {
    const activeFilterKey = 5;
    return (
      <StoryFilterBar
        activeFilterKey={activeFilterKey}
        moreFilters={false}
        vertical="party"
      >
        <Layout
          attachClearAction={somethingHappened}
          generateButtonText={somethingHappened}
          onFilterChange={somethingHappened}
          setButtonText={somethingHappened}
          toggleCanClear={somethingHappened}
          values={{ configurations: [] }}
          verticalDataType="party"
        />
      </StoryFilterBar>
    );
  })
  .add('filters - party - 7 (amenities)', () => {
    const activeFilterKey = 6;
    return (
      <StoryFilterBar
        activeFilterKey={activeFilterKey}
        moreFilters={false}
        vertical="party"
      >
        <Amenity
          attachClearAction={somethingHappened}
          generateButtonText={somethingHappened}
          onFilterChange={somethingHappened}
          setButtonText={somethingHappened}
          toggleCanClear={somethingHappened}
          values={{ amenities: [] }}
          verticalDataType="party"
        />
      </StoryFilterBar>
    );
  })
  .add('filters - party - 8 (more filters)', () => {
    const activeFilterKey = 7;
    return (
      <StoryFilterBar
        activeFilterKey={activeFilterKey}
        moreFilters
        vertical="party"
      >
        <ZipcubePlus
          attachClearAction={somethingHappened}
          generateButtonText={somethingHappened}
          isLarge
          onFilterChange={somethingHappened}
          setButtonText={somethingHappened}
          toggleCanClear={somethingHappened}
          values={{ plusSelected: '' }}
        />
        <Amenity
          attachClearAction={somethingHappened}
          generateButtonText={somethingHappened}
          isLarge
          onFilterChange={somethingHappened}
          setButtonText={somethingHappened}
          toggleCanClear={somethingHappened}
          values={{ amenities: [] }}
          verticalDataType="party"
        />
        <Amenity
          attachClearAction={somethingHappened}
          generateButtonText={somethingHappened}
          isLarge
          onFilterChange={somethingHappened}
          setButtonText={somethingHappened}
          toggleCanClear={somethingHappened}
          type="equipment"
          values={{ amenities: [] }}
          verticalDataType="party"
        />
        <Amenity
          attachClearAction={somethingHappened}
          generateButtonText={somethingHappened}
          isLarge
          onFilterChange={somethingHappened}
          setButtonText={somethingHappened}
          toggleCanClear={somethingHappened}
          type="venueStaff"
          values={{ amenities: [] }}
          verticalDataType="party"
        />
        <Amenity
          attachClearAction={somethingHappened}
          generateButtonText={somethingHappened}
          isLarge
          onFilterChange={somethingHappened}
          setButtonText={somethingHappened}
          toggleCanClear={somethingHappened}
          type="eveningEntertainment"
          values={{ amenities: [] }}
          verticalDataType="party"
        />
        <Amenity
          attachClearAction={somethingHappened}
          generateButtonText={somethingHappened}
          isLarge
          onFilterChange={somethingHappened}
          setButtonText={somethingHappened}
          toggleCanClear={somethingHappened}
          type="other"
          values={{ amenities: [] }}
          verticalDataType="party"
        />
        <Amenity
          attachClearAction={somethingHappened}
          generateButtonText={somethingHappened}
          isLarge
          onFilterChange={somethingHappened}
          setButtonText={somethingHappened}
          toggleCanClear={somethingHappened}
          type="cateringLicence"
          values={{ amenities: [] }}
          verticalDataType="party"
        />
        <Ddr
          attachClearAction={somethingHappened}
          generateButtonText={somethingHappened}
          isLarge
          isLast
          onFilterChange={somethingHappened}
          setButtonText={somethingHappened}
          toggleCanClear={somethingHappened}
          values={{ DDRSelected: '' }}
        />
      </StoryFilterBar>
    );
  })
  .add('filters - wedding - 1 (date)', () => {
    const activeFilterKey = 0;
    return (
      <StoryFilterBar
        activeFilterKey={activeFilterKey}
        moreFilters={false}
        vertical="wedding"
      >
        <Date
          attachClearAction={somethingHappened}
          generateButtonText={somethingHappened}
          onFilterChange={somethingHappened}
          setButtonText={somethingHappened}
          toggleCanClear={somethingHappened}
          values={{ date: '' }}
        />
      </StoryFilterBar>
    );
  })
  .add('filters - wedding - 2 (guests)', () => {
    const activeFilterKey = 1;
    return (
      <StoryFilterBar
        activeFilterKey={activeFilterKey}
        moreFilters={false}
        vertical="wedding"
      >
        <Guests
          attachClearAction={somethingHappened}
          generateButtonText={somethingHappened}
          onFilterChange={somethingHappened}
          setButtonText={somethingHappened}
          toggleCanClear={somethingHappened}
          values={{ guests: '' }}
        />
      </StoryFilterBar>
    );
  })
  .add('filters - wedding - 3 (price)', () => {
    const activeFilterKey = 2;
    return (
      <StoryFilterBar
        activeFilterKey={activeFilterKey}
        moreFilters={false}
        vertical="wedding"
      >
        <Price
          attachClearAction={somethingHappened}
          generateButtonText={somethingHappened}
          onFilterChange={somethingHappened}
          setButtonText={somethingHappened}
          toggleCanClear={somethingHappened}
          values={{ priceRange: [] }}
        />
      </StoryFilterBar>
    );
  })
  .add('filters - wedding - 4 (amenities)', () => {
    const activeFilterKey = 3;
    return (
      <StoryFilterBar
        activeFilterKey={activeFilterKey}
        moreFilters={false}
        vertical="wedding"
      >
        <Amenity
          attachClearAction={somethingHappened}
          generateButtonText={somethingHappened}
          onFilterChange={somethingHappened}
          setButtonText={somethingHappened}
          toggleCanClear={somethingHappened}
          values={{ amenities: [] }}
          verticalDataType="wedding"
        />
      </StoryFilterBar>
    );
  })
  .add('filters - wedding - 5 (more filters)', () => {
    const activeFilterKey = 4;
    return (
      <StoryFilterBar
        activeFilterKey={activeFilterKey}
        moreFilters
        vertical="wedding"
      >
        <ZipcubePlus
          attachClearAction={somethingHappened}
          generateButtonText={somethingHappened}
          isLarge
          onFilterChange={somethingHappened}
          setButtonText={somethingHappened}
          toggleCanClear={somethingHappened}
          values={{ plusSelected: '' }}
        />
        <Amenity
          attachClearAction={somethingHappened}
          generateButtonText={somethingHappened}
          isLarge
          onFilterChange={somethingHappened}
          setButtonText={somethingHappened}
          toggleCanClear={somethingHappened}
          values={{ amenities: [] }}
          verticalDataType="wedding"
        />
        <Amenity
          attachClearAction={somethingHappened}
          generateButtonText={somethingHappened}
          isLarge
          onFilterChange={somethingHappened}
          setButtonText={somethingHappened}
          toggleCanClear={somethingHappened}
          type="equipment"
          values={{ amenities: [] }}
          verticalDataType="wedding"
        />
        <Amenity
          attachClearAction={somethingHappened}
          generateButtonText={somethingHappened}
          isLarge
          onFilterChange={somethingHappened}
          setButtonText={somethingHappened}
          toggleCanClear={somethingHappened}
          type="venueStaff"
          values={{ amenities: [] }}
          verticalDataType="wedding"
        />
        <Amenity
          attachClearAction={somethingHappened}
          generateButtonText={somethingHappened}
          isLarge
          onFilterChange={somethingHappened}
          setButtonText={somethingHappened}
          toggleCanClear={somethingHappened}
          type="eveningEntertainment"
          values={{ amenities: [] }}
          verticalDataType="wedding"
        />
        <Amenity
          attachClearAction={somethingHappened}
          generateButtonText={somethingHappened}
          isLarge
          onFilterChange={somethingHappened}
          setButtonText={somethingHappened}
          toggleCanClear={somethingHappened}
          type="other"
          values={{ amenities: [] }}
          verticalDataType="wedding"
        />
        <Ddr
          attachClearAction={somethingHappened}
          generateButtonText={somethingHappened}
          isLarge
          isLast
          onFilterChange={somethingHappened}
          setButtonText={somethingHappened}
          toggleCanClear={somethingHappened}
          values={{ DDRSelected: '' }}
        />
      </StoryFilterBar>
    );
  })
  .add('header search bar', () => (
    <SearchBar />
  ))
  .add('map', () => (
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
  ))
  .add('map - on map move', () => (
    <SearchOnMapMoveComponent
      shouldSearchOnMapMove
      toggleSearchOnMapMove={somethingHappened}
    />
  ))
  .add('map - redo search', () => (
    <RedoSearchHereComponent onClick={somethingHappened} />
  ))
  .add('mobile filters - cuisine', () => (
    <StoryMobileFilter>
      <Cuisine
        attachClearAction={somethingHappened}
        generateButtonText={somethingHappened}
        onFilterChange={somethingHappened}
        setButtonText={somethingHappened}
        toggleCanClear={somethingHappened}
        values={{ cuisines: [] }}
      />
    </StoryMobileFilter>
  ))
  .add('mobile filters - date', () => (
    <StoryMobileFilter>
      <Date
        attachClearAction={somethingHappened}
        generateButtonText={somethingHappened}
        onFilterChange={somethingHappened}
        setButtonText={somethingHappened}
        toggleCanClear={somethingHappened}
        values={{ date: '' }}
      />
    </StoryMobileFilter>
  ))
  .add('mobile filters - guests', () => (
    <StoryMobileFilter>
      <Guests
        attachClearAction={somethingHappened}
        generateButtonText={somethingHappened}
        onFilterChange={somethingHappened}
        setButtonText={somethingHappened}
        toggleCanClear={somethingHappened}
        values={{ guests: '' }}
      />
    </StoryMobileFilter>
  ))
  .add('mobile filters - more filters', () => (
    <StoryMobileFilter>
      <ZipcubePlus
        attachClearAction={somethingHappened}
        generateButtonText={somethingHappened}
        onFilterChange={somethingHappened}
        setButtonText={somethingHappened}
        toggleCanClear={somethingHappened}
        values={{ plusSelected: '' }}
      />
      <InstantBook
        attachClearAction={somethingHappened}
        generateButtonText={somethingHappened}
        onFilterChange={somethingHappened}
        setButtonText={somethingHappened}
        toggleCanClear={somethingHappened}
        values={{ instantBookSelected: '' }}
      />
      <Type
        attachClearAction={somethingHappened}
        generateButtonText={somethingHappened}
        onFilterChange={somethingHappened}
        setButtonText={somethingHappened}
        toggleCanClear={somethingHappened}
        values={{ types: [] }}
      />
      <Amenity
        attachClearAction={somethingHappened}
        generateButtonText={somethingHappened}
        onFilterChange={somethingHappened}
        setButtonText={somethingHappened}
        toggleCanClear={somethingHappened}
        values={{ amenities: [] }}
        verticalDataType="meeting"
      />
      <Amenity
        attachClearAction={somethingHappened}
        generateButtonText={somethingHappened}
        onFilterChange={somethingHappened}
        setButtonText={somethingHappened}
        toggleCanClear={somethingHappened}
        type="equipment"
        values={{ amenities: [] }}
        verticalDataType="meeting"
      />
      <Amenity
        attachClearAction={somethingHappened}
        generateButtonText={somethingHappened}
        onFilterChange={somethingHappened}
        setButtonText={somethingHappened}
        toggleCanClear={somethingHappened}
        type="cateringLicence"
        values={{ amenities: [] }}
        verticalDataType="meeting"
      />
      <Ddr
        attachClearAction={somethingHappened}
        generateButtonText={somethingHappened}
        isLast
        onFilterChange={somethingHappened}
        setButtonText={somethingHappened}
        toggleCanClear={somethingHappened}
        values={{ DDRSelected: '' }}
      />
    </StoryMobileFilter>
  ))
  .add('mobile filters - time', () => (
    <StoryMobileFilter>
      <Time
        attachClearAction={somethingHappened}
        generateButtonText={somethingHappened}
        onFilterChange={somethingHappened}
        setButtonText={somethingHappened}
        toggleCanClear={somethingHappened}
        values={{ end: '', start: '' }}
      />
    </StoryMobileFilter>
  ))
  .add('mobile filters - type', () => (
    <StoryMobileFilter>
      <Type
        attachClearAction={somethingHappened}
        generateButtonText={somethingHappened}
        onFilterChange={somethingHappened}
        setButtonText={somethingHappened}
        toggleCanClear={somethingHappened}
        values={{ types: [] }}
      />
    </StoryMobileFilter>
  ))
  .add('text', () => (
    <SearchText text="Enter dates and number of guests to see the total price per night." />
  ))
  .add('text with icon', () => (
    <SearchText
      icon="_express/images/commonsite/trophy.gif"
      text="Over 1,000,000 guest reviews for London homes, with an average of 4.7 out of 5 stars."
    />
  ))
  .add('text with icon, subtext', () => (
    <SearchText
      icon="_express/images/commonsite/calendar.gif"
      subtext="You may want to book soon."
      text="77% of London homes for your dates and guests are already booked."
    />
  ));
