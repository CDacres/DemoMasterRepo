/* tslint:disable:max-line-length */
// Selectors
import { getAmenitiesFilterState, getDateFilterState, getGuestsFilterState, getOfficeTypeFilterState, getPriceFilterState } from '@src/store/selectors';

// Components
import FilterPanel from '@src/components/concrete/FilterBar/FilterPanels/FilterPanel';
// MoreFiltersPanel
import { Common as CommonFilters, Office as OfficeFilters } from '@src/components/Search/Filters';

// Classes
import Vertical from '@src/components/Search/verticals/vertical';

class Office extends Vertical {
  protected dataPoints = [
    'amenities',
    'attributes',
    'date',
    'guests',
    'priceRange',
  ];

  protected tagId: number = 2;

  protected filters = [
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
      filterStateSelector: getOfficeTypeFilterState,
      component: OfficeFilters.OfficeType,
      filterPanel: FilterPanel,
    },
    {
      filterStateSelector: getPriceFilterState,
      component: CommonFilters.Price,
      filterPanel: FilterPanel,
    },
    // {
    //   filterStateSelector: getOfficeSizeFilterState,
    //   component: OfficeFilters.Size,
    //   filterPanel: FilterPanel,
    // },
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

  buildSearchUrl = params => `search/office?${this.queryStringMunger(params)}`;
}

export default Office;
