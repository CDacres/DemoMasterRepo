import * as React from 'react';
import shortid from 'shortid';

// Connectors
import { useLang, useSearch } from '@src/store/connectors';

// Utils
import { toggleArrayItem } from '@src/utils';

// Data
import { diningOptionsOptions } from '@src/data/search/dining';

// Components
import SearchFilter, { FilterProps } from '@src/components/Search/Filters/Filter';
import DiningOptionCheckbox from '@src/components/Search/Filters/common/DiningOptions/DiningOptionCheckbox';
import FilterPanelItem from '@src/components/concrete/FilterBar/FilterPanels/FilterPanel/FilterPanelItem';

// Types
import { Store } from '@src/typings/types';

type Props = FilterProps & {
  setSearchParams: (params: Store.Search.Params) => void;
  values: State;
};

type State = {
  diningOptions: string[];
};

class DiningOptionsContainer extends SearchFilter<Props, State> {
  constructor(props: Props) {
    super(props);
    const { values: { diningOptions } } = props;
    this.state = { diningOptions };
  }

  componentDidMount() {
    const { attachClearAction, toggleCanClear } = this.props;
    const { diningOptions } = this.state;
    attachClearAction(this.clearFilter);
    if (diningOptions.length) {
      this.generateButtonText();
      toggleCanClear(true);
    }
  }

  applyFilter = (): void => {
    const { diningOptions } = this.state;
    this.props.setSearchParams({ diningOptions });
  }

  clearFilter = (): void => {
    this.props.setSearchParams({ diningOptions: [] });
  }

  generateButtonText = (): void => {
    const { setButtonText } = this.props;
    if (setButtonText) {
      const { diningOptions } = this.state;
      // TODO: translation key
      setButtonText(`${this.translationHelper.get('Venue Type')} · ${diningOptions.length}`);
    }
  }

  handleChange = (partyeId: string): void => {
    const { diningOptions } = this.state;
    const updatedDiningOptions = toggleArrayItem(diningOptions, partyeId);
    this.setState({ diningOptions: updatedDiningOptions }, this.prepareToApply);
  }

  prepareToApply = (): void => {
    const { onFilterChange, toggleCanClear } = this.props;
    onFilterChange(this.applyFilter);
    toggleCanClear(true);
    this.generateButtonText();
  }

  render() {
    const { diningOptions } = this.state;
    return diningOptionsOptions.map(({ id, title }) => (
      <FilterPanelItem
        key={shortid.generate()}
        needsMinWidth={true}
      >
        <DiningOptionCheckbox
          checked={diningOptions.indexOf(id) > -1}
          diningOptionId={id}
          onChange={this.handleChange}
          title={title}
        />
      </FilterPanelItem>
    ));
  }
}

export default useLang(useSearch(DiningOptionsContainer));
