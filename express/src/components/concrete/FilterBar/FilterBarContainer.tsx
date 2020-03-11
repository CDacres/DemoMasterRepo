/* tslint:disable:max-line-length */
import * as React from 'react';
import shortid from 'shortid';

// Data
import verticals from '@src/components/Search/verticals';

// Connectors
import { useResponsive, useSearch } from '@src/store/connectors';

// Components
/*
import FilterBarItem from '@src/components/concrete/FilterBar/FilterBarItem';
import FilterBarItems from '@src/components/concrete/FilterBar/FilterBarItems';
import FilterButton from '@src/components/concrete/FilterBar/FilterButton';
import FilterBarComponent from '@src/components/concrete/FilterBar/FilterBarComponent';
import MapToggle from '@src/components/concrete/FilterBar/MapToggle';
*/
import MobileFilterPanel from '@src/components/concrete/FilterBar/FilterPanels/MobileFilterPanel';
import MobileFilterWrapper from '@src/components/concrete/FilterBar/MobileFilterWrapper';

// Types
import { Store, Tag, Filter, FilterButtonChildProps, FilterPanelProps, FilterPanelChildProps, FilterStateSelector, SendTriggersToParent } from '@src/typings/types';

type Props = {
  isMobile: boolean;
  search: { params: Store.Search.Params };
  vertical: Tag;
};

type State = {
  filterIsActive: boolean;
};

type FilterHandlerResponse = {
  filters: Filter[];
  groupedDataPoints: string[];
  mobileFiltersButtonSelector: FilterStateSelector;
};

type FiltersObject = {
  mobileStandalone: Filter[];
  otherFilters: Filter[];
};

type PanelRenderer = (filterProps: Filter) => (childProps: FilterButtonChildProps) => JSX.Element;

type MobileFilterPanelRenderer = (filters: Filter[], groupedDataPoints: string[], renderChild: RenderChild) => (panelProps?: FilterPanelProps) => (childProps: FilterButtonChildProps) => JSX.Element;

type Child = (JSX.Element | JSX.Element[]);

type RenderChild = (props: any) => Child;

// type RenderChildFunc = (props: any) => (props: any) => Child;

type RenderMobileFilterPanelChild = (filters: Filter[], renderChild: RenderChild) => (props: { sendTriggersToParent: SendTriggersToParent }) => JSX.Element;

type RenderMobileFilterPanelFilters = (props: {
  filters: Filter[];
  sendTriggersToParent: SendTriggersToParent;
}) => JSX.Element[];

class FilterBarContainer extends React.Component<Props, State> {
  state: State = { filterIsActive: false };

  shouldComponentUpdate(nextProps: Props, nextState: State) {
    const { vertical: { tagId } } = this.props;
    const { filterIsActive } = this.state;
    if (nextProps.vertical.tagId !== tagId) {
      return true;
    }
    if (nextState.filterIsActive !== filterIsActive) {
      return true;
    }
    return false;
  }

  // Retrieve filters from vertical
  filtersHandler = (tagId: number): FilterHandlerResponse => {
    return new verticals[`${tagId}`]();
  }

  // Toggle filter active state
  handleActiveFilter = (): void => {
    this.setState(prevState => ({ filterIsActive: !prevState.filterIsActive }));
  }

  // Munge filters for extracting mobile standalone filters
  mungeFilters = (filters: Filter[]): FiltersObject => {
    return filters.reduce((obj, curr) => {
      if (curr.mobileStandalone) {
        obj.mobileStandalone.push(curr);
      } else {
        obj.otherFilters.push(curr);
      }
      return obj;
    }, {
      mobileStandalone: [],
      otherFilters: [],
    });
  }

/*
  // Render a filter bar item and it's child via the renderChild function
  renderFilterBarItem = (renderChildFunc: RenderChildFunc) => {
    return ({ filterStateSelector, ...panelProps }): JSX.Element => (
      <FilterBarItem key={shortid.generate()}>
        <FilterButton
          filterStateSelector={filterStateSelector}
          onClick={this.handleActiveFilter}
        >
          {renderChildFunc({ filterStateSelector, ...panelProps })}
        </FilterButton>
      </FilterBarItem>
    );
  }
*/

  // Render the filter component itself
  renderFilterComponent = ({ Component, ...componentProps }) =>
    (childProps: FilterPanelChildProps) =>
      <Component {...componentProps} {...childProps} />

  // Render a filter panel with received props
  // renderFilterPanel: PanelRenderer = ({ Component, FilterPanel }) =>
  //   ({ canClear, onApply, onClear, ...componentProps }) => (
  //     <FilterPanel
  //       canClear={canClear}
  //       onApply={onApply}
  //       onClear={onClear}
  //     >
  //       {this.renderFilterComponent({ Component, ...componentProps })}
  //     </FilterPanel>
  //   )

  // Render a mobile filter panel
  renderMobileFilterPanel: PanelRenderer = ({ Component }) =>
    ({ canClear, onApply, onClear, onClose, setButtonText, ...componentProps }) => (
      <MobileFilterPanel
        canClear={canClear}
        onApply={onApply}
        onClear={onClear}
        onClose={onClose}
        setButtonText={setButtonText}
      >
        {this.renderFilterComponent({ Component, ...componentProps })}
      </MobileFilterPanel>
    )

  // Render the mobile filter group panel
  renderMobileFilterGroupPanel: MobileFilterPanelRenderer = (filters, groupedDataPoints, renderChild) =>
    () =>
    // ({ filterStateSelector }) =>
      childProps => (
        <MobileFilterPanel
          // filterStateSelector={filterStateSelector}
          groupedDataPoints={groupedDataPoints}
          {...childProps}
        >
          {this.renderMobileFilterPanelChild(filters, renderChild)}
        </MobileFilterPanel>
      )

  // Render a mobile filter panel child
  renderMobileFilterPanelChild: RenderMobileFilterPanelChild = (filters: Filter[], renderChild) =>
    ({ sendTriggersToParent }) => (
      <React.Fragment>
        {renderChild({ filters, sendTriggersToParent })}
      </React.Fragment>
    )

  // Render the mobile filter panel filters
  renderMobileFilterPanelFilters: RenderMobileFilterPanelFilters = ({ filters, sendTriggersToParent }) =>
    filters.map(({ Component, filterStateSelector }) => (
      <MobileFilterWrapper
        filterStateSelector={filterStateSelector}
        key={shortid.generate()}
        sendTriggersToParent={sendTriggersToParent}
      >
        {this.renderFilterComponent({ Component })}
      </MobileFilterWrapper>
    ))

  render() {
/*
    const { isMobile, search: { params: { location } }, vertical } = this.props;
    const { filterIsActive } = this.state;
    const hasLocation = !!location;

    // Get the vertical object
    const verticalObject = this.filtersHandler(vertical.tagId || 1);

    // Render the desktop-version filters initially
    let filters = verticalObject.filters.map(this.renderFilterBarItem(this.renderFilterPanel));

    if (isMobile) {
      // If isMobile then munge the filters to extract mobile standalones + others for group panel
      const { mobileStandalone, otherFilters }: FiltersObject = this.mungeFilters(verticalObject.filters);

      // Get the mobile filter bar items
      filters = mobileStandalone.map(this.renderFilterBarItem(this.renderMobileFilterPanel));

      // Create mobileFilterPanel containing remaining filters
      const renderMobileFilterPanel = this.renderMobileFilterGroupPanel(
        otherFilters,
        verticalObject.groupedDataPoints,
        this.renderMobileFilterPanelFilters
      );

      // Render a filter bar item for the mobile filter panel and
      // provide the returned function with the required filterProps
      filters.push(this.renderFilterBarItem(renderMobileFilterPanel)({
        filterStateSelector: verticalObject.mobileFiltersButtonSelector,
      }));
    }
    // TODO: Map toggle now in filter bar component, possibly need hasLocation variable passed as prop??
    // else if (hasLocation) {
    //   // Push in the map toggle switch as the last filter item
    //   filters.push(
    //     <FilterBarItem key={shortid.generate()}>
    //       <MapToggle />
    //     </FilterBarItem>
    //   );
    // }
    // Push in the map toggle switch as the last filter item
    // filters.push(
    //   <PhoneScreenHidden key={shortid.generate()}>
    //     {hasLocation &&
    //       <FilterBarItem>
    //         <MapToggle />
    //       </FilterBarItem>
    //     }
    //   </PhoneScreenHidden>
    // );
    return (
      <FilterBarComponent
        filterIsActive={filterIsActive}
        hasLocation={hasLocation}
      >
        <FilterBarItems
          filterIsActive={filterIsActive}
          vertical={vertical}
        >
          {filters}
        </FilterBarItems>
      </FilterBarComponent>
    );

*/
    return <React.Fragment />;
  }
}

export default useResponsive(useSearch(FilterBarContainer));
