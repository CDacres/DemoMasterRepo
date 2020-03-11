import * as React from 'react';
import moment from 'moment';

// Connectors
import { useConfig, useSearch } from '@src/store/connectors';

// Components
import SearchFilter, { FilterProps } from '@src/components/Search/Filters/Filter';
import DateComponent from '@src/components/Search/Filters/common/Date/DateComponent';

// Types
import { Store } from '@src/typings/types';

type Props = FilterProps & {
  config: Store.Config;
  setSearchParams: (params: Store.Search.Params) => void;
  values: State;
};

type State = {
  date: moment.Moment;
};

export type SelectOption = {
  text: string;
  value: number;
};

class DateContainer extends SearchFilter<Props, State> {
  protected durationOptions: SelectOption[];
  protected timeOptions: SelectOption[];

  constructor(props: Props) {
    super(props);
    const { values: { date } } = props;
    this.state = { date };
  }

  componentDidMount() {
    const { attachClearAction, toggleCanClear } = this.props;
    const { date } = this.state;
    attachClearAction(this.clearFilter);
    if (date) {
      this.generateButtonText();
      toggleCanClear(true);
    }
  }

  applyFilter = (): void => {
    const { date } = this.state;
    this.props.setSearchParams({ date });
  }

  clearFilter = (): void => {
    this.props.setSearchParams({ date: '' });
  }

  generateButtonText = (): void => {
    const { setButtonText } = this.props;
    if (setButtonText) {
      const { date } = this.state;
      setButtonText(date);
    }
  }

  handleDateChange = (date: moment.Moment): void => {
    this.setState({ date }, this.prepareToApply);
  }

  prepareToApply = () => {
    const { onFilterChange, toggleCanClear } = this.props;
    onFilterChange(this.applyFilter);
    toggleCanClear(true);
    this.generateButtonText();
  }

  render() {
    const { config: { datepickerLang }, isLast } = this.props;
    const { date } = this.state;
    return (
      <DateComponent
        date={date}
        datepickerLang={datepickerLang}
        isLast={isLast}
        onDateChange={this.handleDateChange}
        {...this.props}
      />
    );
  }
}

export default useConfig(useSearch(DateContainer));
