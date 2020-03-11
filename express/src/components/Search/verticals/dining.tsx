// Selectors
import { getCuisineFilterState, getDateFilterState, getGuestsFilterState, getPriceFilterState, getTypeFilterState } from '@src/store/selectors';

// Components
import FilterPanel from '@src/components/concrete/FilterBar/FilterPanels/FilterPanel';
// MoreFiltersPanel
import { Common as CommonFilters, Dining as DiningFilters } from '@src/components/Search/Filters';

// Classes
import Vertical from '@src/components/Search/verticals/vertical';

class Dining extends Vertical {
  protected dataPoints = [
    'date',
    'guests',
    'priceRange',
    'time',
  ];

  protected tagId: number = 4;

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
      filterStateSelector: getCuisineFilterState,
      component: DiningFilters.Cuisine,
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
    // {
    //   filterStateSelector: getAmenitiesFilterState,
    //   Component: CommonFilters.MoreFilters,
    //   FilterPanel: MoreFiltersPanel,
    // },
  ];

  buildSearchUrl = params => `search/dining?${this.queryStringMunger(params)}`;
}

export default Dining;
