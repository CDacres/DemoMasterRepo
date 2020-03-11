/* tslint:disable:max-line-length */
// Selectors
import { getAmenitiesFilterState, getDateFilterState, getGuestsFilterState, getPriceFilterState } from '@src/store/selectors';

// Components
import FilterPanel from '@src/components/concrete/FilterBar/FilterPanels/FilterPanel';
import { Common as CommonFilters } from '@src/components/Search/Filters';

// Classes
import Vertical from '@src/components/Search/verticals/vertical';

class Wedding extends Vertical {
  protected dataPoints = [
    'amenities',
    'date',
    'guests',
    'priceRange',
  ];

  protected tagId: number = 5;

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
      filterStateSelector: getPriceFilterState,
      component: CommonFilters.Price,
      filterPanel: FilterPanel,
    },
    {
      filterStateSelector: getAmenitiesFilterState,
      Component: CommonFilters.Amenity,
      FilterPanel: FilterPanel,
    },
    // {
    //   filterStateSelector: getDiningOptionsFilterState,
    //   component: CommonFilters.DiningOptions,
    //   filterPanel: MoreFiltersPanel,
    // },
  ];

  buildSearchUrl = params => `search/wedding?${this.queryStringMunger(params)}`;
}

export default Wedding;
