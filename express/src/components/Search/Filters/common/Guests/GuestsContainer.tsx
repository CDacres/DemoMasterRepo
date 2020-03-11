import * as React from 'react';

// Connectors
import { useLang, useSearch } from '@src/store/connectors';

// Components
import SearchFilter, { FilterProps } from '@src/components/Search/Filters/Filter';
import GuestsComponent from '@src/components/Search/Filters/common/Guests/GuestsComponent';

// Types
import { Store } from '@src/typings/types';

type Props = FilterProps & {
  setSearchParams: (params: Store.Search.Params) => void;
  values: State;
};

type State = {
  guests: number | string;
};

type GuestOption = {
  text: string;
  value: number;
};

class GuestsContainer extends SearchFilter<Props, State> {
  constructor(props: Props) {
    super(props);
    const { values: { guests } } = props;
    this.state = { guests };
  }

  componentDidMount() {
    const { attachClearAction } = this.props;
    const { guests } = this.state;
    attachClearAction(this.clearFilter);
    if (guests) {
      this.generateButtonText();
      this.toggleCanClear(true);
    }
  }

  applyFilter = async (): Promise<any> => {
    const { guests } = this.state;
    await this.props.setSearchParams({ guests });
  }

  clearFilter = (): void => {
    this.props.setSearchParams({ guests: '' });
  }

  generateButtonText = (): void => {
    const { setButtonText } = this.props;
    if (setButtonText) {
      const { guests } = this.state;
      setButtonText(`${this.translationHelper.get('search.filters_guests')} · ${guests}`);
    }
  }

  handleChange = (guests: string): void => {
    this.setState({ guests }, this.prepareToApply);
  }

  prepareToApply = (): void => {
    const { onFilterChange } = this.props;
    onFilterChange(this.applyFilter);
    this.generateButtonText();
    this.toggleCanClear(true);
  }

  renderOptions = (): GuestOption[] => {
    const options = [];
    for (let i = 1; i <= 1000; i++) {
      if (i === 1 || i < 100) {
        options.push({
          text: this.translationHelper.choice('common.people_count', i, { number: i }),
          value: i,
        });
      } else if (i % 10 === 0 && i <= 250) {
        options.push({
          text: this.translationHelper.choice('common.people_count', i, { number: i }),
          value: i,
        });
      } else if (i % 100 === 0) {
        options.push({
          text: this.translationHelper.choice('common.people_count', i, { number: i }),
          value: i,
        });
      }
    }
    return options;
  }

  toggleCanClear = (bool: boolean): void => {
    const { toggleCanClear } = this.props;
    if (toggleCanClear) {
      toggleCanClear(bool);
    }
  }

  render() {
    const { guests } = this.state;
    return (
      <GuestsComponent
        guests={guests}
        onChange={this.handleChange}
        options={this.renderOptions()}
      />
    );
  }
}

export default useLang(useSearch(GuestsContainer));
