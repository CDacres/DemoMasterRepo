import * as React from 'react';

// Connectors
import { useLang, useSearch } from '@src/store/connectors';

// Utils
import { toggleArrayItem } from '@src/utils';

// Data
import { cuisineOptions } from '@src/data/search/cuisine';

// Components
import SearchFilter, { FilterProps } from '@src/components/Search/Filters/Filter';
import CuisineComponent from '@src/components/Search/Filters/Dining/Cuisine/CuisineComponent';

// Types
import { Store } from '@src/typings/types';

type Props = FilterProps & {
  setSearchParams: (params: Store.Search.Params) => void;
  values: State;
};

type State = {
  cuisines: string[];
};

class CuisineContainer extends SearchFilter<Props, State> {
  constructor(props: Props) {
    super(props);
    const { values: { cuisines } } = props;
    this.state = { cuisines };
  }

  componentDidMount() {
    const { attachClearAction, toggleCanClear } = this.props;
    const { cuisines } = this.state;
    attachClearAction(this.clearFilter);
    if (cuisines.length) {
      this.generateButtonText();
      toggleCanClear(true);
    }
  }

  applyFilter = () => {
    const { cuisines } = this.state;
    this.props.setSearchParams({ cuisines });
  }

  clearFilter = (): void => {
    this.props.setSearchParams({ cuisines: [] });
  }

  generateButtonText = (): void => {
    const { setButtonText } = this.props;
    if (setButtonText) {
      const { cuisines } = this.state;
      setButtonText(`${this.translationHelper.get('search.filters_cuisine')} · ${cuisines.length}`);
    }
  }

  handleChange = (cuisineId: string): void => {
    const { cuisines } = this.state;
    const updatedCuisines = toggleArrayItem(cuisines, cuisineId);
    this.setState({ cuisines: updatedCuisines }, this.prepareToApply);
  }

  prepareToApply = (): void => {
    const { onFilterChange, toggleCanClear } = this.props;
    onFilterChange(this.applyFilter);
    toggleCanClear(true);
    this.generateButtonText();
  }

  render() {
    const { isLast } = this.props;
    const { cuisines } = this.state;
    return (
      <CuisineComponent
        cuisineOptions={cuisineOptions}
        cuisines={cuisines}
        handleChange={this.handleChange}
        isLast={isLast}
        {...this.props}
      />
    );
  }
}

export default useLang(useSearch(CuisineContainer));
