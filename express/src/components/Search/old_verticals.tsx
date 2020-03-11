// Selectors
import {
  // getAmenitiesFilterState,
  // getConfigurationsFilterState,
  getDateFilterState,
  // getDateAndTimeFilterState,
  getGuestsFilterState,
  getMoveInDateFilterState,
  getNoOfPeopleFilterState,
  // getOfficeTypeAndSizeState,
  getPeopleFilterState,
  getPriceFilterState,
  // getMeetingSearchUrl,
} from '@src/store/selectors';

// Components
import FilterPanel from '@src/components/concrete/FilterBar/FilterPanels/FilterPanel';
import {
  Common,
  // Meeting,
} from '@src/components/Search/Filters';

export default {
  // meeting: meetingShit
  // ],
  office: [
    {
      filterStateSelector: getMoveInDateFilterState,
      component: Common.Date,
      filterPanel: FilterPanel,
    },
    // {
    //   filterStateSelector: getOfficeTypeAndSizeState,
    //   component: () => (<div>Empty</div>),
    //   filterPanel: FilterPanel,
    // },
    {
      filterStateSelector: getPriceFilterState,
      component: Common.Price,
      filterPanel: FilterPanel,
    },
    // {
    //   filterStateSelector: getAmenitiesFilterState,
    //   component: Common.MoreFilters,
    //   filterPanel: MoreFiltersPanel,
    // },
  ],
  dining: [
    {
      filterStateSelector: getDateFilterState,
      component: Common.Date,
      filterPanel: FilterPanel,
    },
    {
      filterStateSelector: getGuestsFilterState,
      component: Common.Guests,
      filterPanel: FilterPanel,
    },
    {
      filterStateSelector: () => ({}),
      component: () => (<div>Empty</div>),
      filterPanel: FilterPanel,
      // defaultButtonText: 'Cuisine',
    },
    {
      filterStateSelector: getPriceFilterState,
      component: Common.Price,
      filterPanel: FilterPanel,
    },
  ],
  party: [
    {
      filterStateSelector: () => ({}),
      component: () => (<div>Empty</div>),
      filterPanel: FilterPanel,
      // defaultButtonText: 'Type',
    },
    {
      filterStateSelector: getPeopleFilterState,
      component: Common.Guests,
      filterPanel: FilterPanel,
    },
    {
      filterStateSelector: getDateFilterState,
      component: Common.Date,
      filterPanel: FilterPanel,
    },
    {
      filterStateSelector: getPriceFilterState,
      component: Common.Price,
      filterPanel: FilterPanel,
    },
    // {
    //   filterStateSelector: getAmenitiesFilterState,
    //   component: Common.MoreFilters,
    //   filterPanel: MoreFiltersPanel,
    // },
  ],
  wedding: [
    {
      filterStateSelector: getNoOfPeopleFilterState,
      component: Common.Guests,
      filterPanel: FilterPanel,
    },
    {
      filterStateSelector: () => ({}),
      component: () => (<div>Empty</div>),
      filterPanel: FilterPanel,
      // defaultButtonText: 'Venue type',
    },
    {
      filterStateSelector: getPriceFilterState,
      component: Common.Price,
      filterPanel: FilterPanel,
      // defaultButtonText: 'Budget',
    },
    {
      filterStateSelector: () => ({}),
      component: () => (<div>Empty</div>),
      filterPanel: FilterPanel,
      // defaultButtonText: 'Dining options',
    },
    {
      filterStateSelector: () => ({}),
      component: () => (<div>Empty</div>),
      filterPanel: FilterPanel,
      // defaultButtonText: 'Evening entertainment',
    },
    // {
    //   filterStateSelector: getAmenitiesFilterState,
    //   component: Common.MoreFilters,
    //   filterPanel: MoreFiltersPanel,
    // },
  ],
};
