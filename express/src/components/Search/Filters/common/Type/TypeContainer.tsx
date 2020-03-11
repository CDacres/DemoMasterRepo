import * as React from 'react';

// Connectors
import { useLang, useSearch } from '@src/store/connectors';

// Utils
import { toggleArrayItem } from '@src/utils';

// Data
import { typeOptions } from '@src/data/search/type';

// Components
import SearchFilter, { FilterProps } from '@src/components/Search/Filters/Filter';
import TypeComponent from '@src/components/Search/Filters/common/Type/TypeComponent';

// Types
import { Store } from '@src/typings/types';

type Props = FilterProps & {
  setSearchParams: (params: Store.Search.Params) => void;
  values: State;
};

type State = {
  types: string[];
};

class TypeContainer extends SearchFilter<Props, State> {
  constructor(props: Props) {
    super(props);
    const { values: { types } } = props;
    this.state = { types };
  }

  componentDidMount() {
    const { attachClearAction, toggleCanClear } = this.props;
    const { types } = this.state;
    attachClearAction(this.clearFilter);
    if (types.length) {
      this.generateButtonText();
      toggleCanClear(true);
    }
  }

  applyFilter = (): void => {
    const { types } = this.state;
    this.props.setSearchParams({ types });
  }

  clearFilter = (): void => {
    this.props.setSearchParams({ types: [] });
  }

  generateButtonText = (): void => {
    const { setButtonText } = this.props;
    if (setButtonText) {
      const { types } = this.state;
      setButtonText(`${this.translationHelper.get('search.filters_type')} · ${types.length}`);
    }
  }

  handleChange = (typeId: string): void => {
    const { types } = this.state;
    const updatedTypes = toggleArrayItem(types, typeId);
    this.setState({ types: updatedTypes }, this.prepareToApply);
  }

  prepareToApply = (): void => {
    const { onFilterChange, toggleCanClear } = this.props;
    onFilterChange(this.applyFilter);
    toggleCanClear(true);
    this.generateButtonText();
  }

  render() {
    const { isLast } = this.props;
    const { types } = this.state;
    return (
      <TypeComponent
        handleChange={this.handleChange}
        isLast={isLast}
        typeOptions={typeOptions}
        types={types}
        {...this.props}
      />
    );
  }
}

export default useLang(useSearch(TypeContainer));
