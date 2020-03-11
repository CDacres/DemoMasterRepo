/* tslint:disable:max-line-length */
// Selectors
import { getAmenitiesFilterState, getConfigurationsFilterState, getDateFilterState, getGuestsFilterState, getMeetingMobileFiltersState, getPriceFilterState } from '@src/store/selectors';

// Components
import FilterPanel from '@src/components/concrete/FilterBar/FilterPanels/FilterPanel';
// MoreFiltersPanel
import { Common as CommonFilters } from '@src/components/Search/Filters';

// Classes
import Vertical from '@src/components/Search/verticals/vertical';

class Meeting extends Vertical {
  public filters = [
    {
      filterStateSelector: getDateFilterState,
      component: CommonFilters.Date,
      filterPanel: FilterPanel,
    },
    {
      filterStateSelector: getGuestsFilterState,
      Component: CommonFilters.Guests,
      FilterPanel: FilterPanel,
      mobileStandalone: true,
    },
    {
      filterStateSelector: getPriceFilterState,
      Component: CommonFilters.Price,
      FilterPanel: FilterPanel,
    },
    // {
    //   filterStateSelector: getTimeFilterState,
    //   component: CommonFilters.Time,
    //   filterPanel: FilterPanel,
    // },
    {
      filterStateSelector: getConfigurationsFilterState,
      Component: CommonFilters.Layout,
      FilterPanel: FilterPanel,
    },
    {
      filterStateSelector: getAmenitiesFilterState,
      Component: CommonFilters.Amenity,
      FilterPanel: FilterPanel,
    },
    // {
    //   filterStateSelector: getAmenitiesFilterState,
    //   Component: CommonFilters.MoreFilters,
    //   FilterPanel: MoreFiltersPanel,
    // },
  ];

  public mobileFiltersButtonSelector = getMeetingMobileFiltersState;

  protected dataPoints = [
    'allDay',
    'amenities',
    'attributes',
    'configurations',
    'date',
    'duration',
    'guests',
    'priceRange',
    'time',
  ];

  protected groupedDataPoints = [
    'amenities',
    'attributes',
    'configurations',
    'priceRange',
  ];

  protected tagId: number = 1;

  buildSearchUrl = params => `search/meeting?${this.queryStringMunger(params)}`;
}

export default Meeting;
