import * as React from 'react';

// Connectors
import { useLang, useSearch } from '@src/store/connectors';

// Utils
import { toggleArrayItem } from '@src/utils';

// Data
import { typeOptions } from '@src/data/search/officetype';

// Components
import SearchFilter, { FilterProps } from '@src/components/Search/Filters/Filter';
import OfficeTypeComponent from '@src/components/Search/Filters/Office/OfficeType/OfficeTypeComponent';

// Types
import { Store } from '@src/typings/types';

type Props = FilterProps & {
  setSearchParams: (params: Store.Search.Params) => void;
  values: State;
};

type State = {
  officeTypes: string[];
};

class OfficeTypeContainer extends SearchFilter<Props, State> {
  constructor(props: Props) {
    super(props);
    const { values: { officeTypes } } = props;
    this.state = { officeTypes };
  }

  componentDidMount() {
    const { attachClearAction, toggleCanClear } = this.props;
    const { officeTypes } = this.state;
    attachClearAction(this.clearFilter);
    if (officeTypes.length) {
      this.generateButtonText();
      toggleCanClear(true);
    }
  }

  applyFilter = (): void => {
    const { officeTypes } = this.state;
    this.props.setSearchParams({ officeTypes });
  }

  clearFilter = (): void => {
    this.props.setSearchParams({ officeTypes: [] });
  }

  generateButtonText = (): void => {
    const { setButtonText } = this.props;
    if (setButtonText) {
      const { officeTypes } = this.state;
      setButtonText(`${this.translationHelper.get('common.type')} · ${officeTypes.length}`);
    }
  }

  handleChange = (officeTypeId: string): void => {
    const { officeTypes } = this.state;
    const updatedOfficeTypes = toggleArrayItem(officeTypes, officeTypeId);
    this.setState({ officeTypes: updatedOfficeTypes }, this.prepareToApply);
  }

  prepareToApply = (): void => {
    const { onFilterChange, toggleCanClear } = this.props;
    onFilterChange(this.applyFilter);
    toggleCanClear(true);
    this.generateButtonText();
  }

  render() {
    const { officeTypes } = this.state;
    return (
      <OfficeTypeComponent
        handleChange={this.handleChange}
        officeOptions={typeOptions}
        officeTypes={officeTypes}
        {...this.props}
      />
    );
  }
}

export default useLang(useSearch(OfficeTypeContainer));
