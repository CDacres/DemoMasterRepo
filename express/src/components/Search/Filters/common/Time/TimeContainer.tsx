import * as React from 'react';

// Connectors
import { useSearch } from '@src/store/connectors';

// Utils
import { convertMinutesToTime } from '@src/utils';

// Components
import SearchFilter, { FilterProps } from '@src/components/Search/Filters/Filter';
import TimeComponent from '@src/components/Search/Filters/common/Time/TimeComponent';

// Types
import { SelectOption, Store } from '@src/typings/types';

type Props = FilterProps & {
  onlyStart?: boolean;
  setSearchParams: (params: Store.Search.Params) => void;
  values: State;
};

type State = {
  end: string;
  start: string;
};

class TimeContainer extends SearchFilter<Props, State> {
  protected options: SelectOption[];

  constructor(props: Props) {
    super(props);
    const { values: { end, start } } = props;
    this.state = { end, start };
    this.options = this.renderOptions();
  }

  componentDidMount() {
    const { attachClearAction, toggleCanClear } = this.props;
    const { end, start } = this.state;
    attachClearAction(this.clearFilter);
    if (end || start) {
      this.generateButtonText();
      toggleCanClear(true);
    }
  }

  applyFilter = (): void => {
    const { end, start } = this.state;
    this.props.setSearchParams({ end, start });
  }

  clearFilter = (): void => {
    this.props.setSearchParams({ end: '', start: '' });
  }

  generateButtonText = (): void => {
    const { setButtonText } = this.props;
    if (setButtonText) {
      const { end, start } = this.state;
      let buttonText = '';
      if (start) {
        buttonText += convertMinutesToTime(Number(start));
        if (end) {
          buttonText += ' · ';
        }
      }
      if (end) {
        buttonText += convertMinutesToTime(Number(end));
      }
      setButtonText(buttonText);
    }
  }

  handleEndChange = (end: string): void => {
    this.setState({ end }, this.prepareToApply);
  }

  handleStartChange = (start: string): void => {
    this.setState({ start }, this.prepareToApply);
  }

  prepareToApply = (): void => {
    const { onFilterChange, toggleCanClear } = this.props;
    onFilterChange(this.applyFilter);
    toggleCanClear(true);
    this.generateButtonText();
  }

  renderOptions = () => {
    return Array.apply(null, Array(48)).map((_, idx) => {
      let i = idx * 30;
      const time: SelectOption = {
        text: '',
        value: i,
      };
      const hours = Math.floor(i / 60);
      const mins = i % 60;
      let minsStr = `${mins}`;
      let hoursStr = `${hours}`;
      if (mins < 10) {
        minsStr = `0${mins}`;
      }
      if (hours < 10) {
        hoursStr = `0${hours}`;
      }
      if (hours === 0) {
        hoursStr = '00';
      }
      time.text = `${hoursStr}:${minsStr}`;
      i += 30;
      return time;
    });
  }

  render() {
    const { isLast, onlyStart } = this.props;
    const { end, start } = this.state;
    return (
      <TimeComponent
        end={end}
        isLast={isLast}
        onEndChange={this.handleEndChange}
        onlyStart={onlyStart}
        onStartChange={this.handleStartChange}
        options={this.options}
        start={start}
        {...this.props}
      />
    );
  }
}

export default useSearch(TimeContainer);
