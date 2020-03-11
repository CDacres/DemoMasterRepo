/* tslint:disable:max-line-length */
// Selectors
import { getAmenitiesFilterState, getConfigurationsFilterState, getDateFilterState, getGuestsFilterState, getTypeFilterState, getPriceFilterState } from '@src/store/selectors';

// Components
import FilterPanel from '@src/components/concrete/FilterBar/FilterPanels/FilterPanel';
// MoreFiltersPanel
import { Common as CommonFilters } from '@src/components/Search/Filters';

// Classes
import Vertical from '@src/components/Search/verticals/vertical';

class Party extends Vertical {
  protected dataPoints = [
    'amenities',
    'date',
    'guests',
    'priceRange',
  ];

  protected tagId: number = 3;

  protected filters = [
    {
      filterStateSelector: getDateFilterState,
      component: CommonFilters.Date,
      filterPanel: FilterPanel,
    },
    {
      filterStateSelector: getGuestsFilterState,
      component: CommonFilters.Guests,
      filterPanel: FilterPanel,
    },
    {
      filterStateSelector: getTypeFilterState,
      component: CommonFilters.Type,
      filterPanel: FilterPanel,
    },
    {
      filterStateSelector: getPriceFilterState,
      component: CommonFilters.Price,
      filterPanel: FilterPanel,
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

  buildSearchUrl = params => `search/party?${this.queryStringMunger(params)}`;
}

export default Party;
