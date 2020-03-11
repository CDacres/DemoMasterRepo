import * as React from 'react';

// Connectors
import { useLang, useSearch } from '@src/store/connectors';

// Components
import SearchFilter, { FilterProps } from '@src/components/Search/Filters/Filter';
import OfficeSizeComponent from '@src/components/Search/Filters/Office/OfficeSize/OfficeSizeComponent';

// Types
import { Store } from '@src/typings/types';

type Props = FilterProps & {
  setSearchParams: (params: Store.Search.Params) => void;
  values: State;
};

type State = {
  from: string;
  to: string;
};

class OfficeSizeContainer extends SearchFilter<Props, State> {
  constructor(props: Props) {
    super(props);
    const { values: { from, to } } = props;
    this.state = {
      from,
      to,
    };
  }

  componentDidMount() {
    const { attachClearAction, toggleCanClear } = this.props;
    const { from, to } = this.state;
    attachClearAction(this.clearFilter);
    if (from || to) {
      this.generateButtonText();
      toggleCanClear(true);
    }
  }

  applyFilter = (): void => {
    const { from, to } = this.state;
    this.props.setSearchParams({ from, to });
  }

  clearFilter = (): void => {
    this.props.setSearchParams({ from: '', to: '' });
  }

  generateButtonText = (): void => {
    const { setButtonText } = this.props;
    if (setButtonText) {
      const { from, to } = this.state;
      let buttonText = '';
      if (from) {
        buttonText += this.translationHelper.choice('common.m2', from, { number: from });
        if (to) {
          buttonText += ' · ';
        }
      }
      if (to) {
        buttonText += this.translationHelper.choice('common.m2', to, { number: to });
      }
      setButtonText(buttonText);
    }
  }

  handleFromChange = (from: string): void => {
    this.setState({ from }, this.prepareToApply);
  }

  handleToChange = (to: string): void => {
    this.setState({ to }, this.prepareToApply);
  }

  prepareToApply = (): void => {
    const { onFilterChange, toggleCanClear } = this.props;
    onFilterChange(this.applyFilter);
    toggleCanClear(true);
    this.generateButtonText();
  }

  render() {
    const { from, to } = this.state;
    return (
      <OfficeSizeComponent
        from={from}
        onFromChange={this.handleFromChange}
        onToChange={this.handleToChange}
        to={to}
      />
    );
  }
}

export default useLang(useSearch(OfficeSizeContainer));
