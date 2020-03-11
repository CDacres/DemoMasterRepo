import * as React from 'react';

// Connectors
import { useLang, useSearch } from '@src/store/connectors';

// Utils
import { toggleArrayItem } from '@src/utils';

// Data
import { spaceConfigurations } from '@src/data/search/layout';

// Components
import SearchFilter, { FilterProps } from '@src/components/Search/Filters/Filter';
import LayoutComponent from '@src/components/Search/Filters/common/Layout/LayoutComponent';

// Types
import { Store } from '@src/typings/types';

type Props = FilterProps & {
  setSearchParams: (params: Store.Search.Params) => void;
  values: State;
  verticalDataType: string;
};

type State = {
  configurations: string[];
};

class LayoutContainer extends SearchFilter<Props, State> {
  constructor(props: Props) {
    super(props);
    const { values: { configurations } } = props;
    this.state = { configurations };
  }

  componentDidMount() {
    const { attachClearAction } = this.props;
    const { configurations } = this.state;
    attachClearAction(this.clearFilter);
    if (configurations.length) {
      this.generateButtonText();
      this.toggleCanClear(true);
    }
  }

  applyFilter = async (): Promise<any> => {
    const { configurations } = this.state;
    await this.props.setSearchParams({ configurations });
  }

  clearFilter = (): void => {
    this.props.setSearchParams({ configurations: [] });
  }

  generateButtonText = (): void => {
    const { setButtonText } = this.props;
    if (setButtonText) {
      const { configurations } = this.state;
      setButtonText(`${this.translationHelper.get('search.filters_layout')} · ${configurations.length}`);
    }
  }

  handleChange = (configurationId: string): void => {
    const { configurations } = this.state;
    const updatedConfigurations = toggleArrayItem(configurations, configurationId);
    this.setState({ configurations: updatedConfigurations }, this.prepareToApply);
  }

  prepareToApply = () => {
    const { onFilterChange } = this.props;
    onFilterChange(this.applyFilter);
    this.generateButtonText();
    this.toggleCanClear(true);
  }

  toggleCanClear = (bool: boolean): void => {
    const { toggleCanClear } = this.props;
    if (toggleCanClear) {
      toggleCanClear(bool);
    }
  }

  render() {
    const { verticalDataType } = this.props;
    const { configurations } = this.state;
    return (
      <LayoutComponent
        configurationOptions={spaceConfigurations[verticalDataType]}
        configurations={configurations}
        handleChange={this.handleChange}
        {...this.props}
      />
    );
  }
}

export default useLang(useSearch(LayoutContainer));
