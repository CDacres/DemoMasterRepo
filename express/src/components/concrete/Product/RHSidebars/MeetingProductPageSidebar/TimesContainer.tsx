import * as React from 'react';

// Components
import { ConnectedTranslatable as Translatable } from '@src/components/abstract/Translatable';
import OptionGroup from '@src/components/concrete/Dropdown/OptionGroup';
import Label from '@src/components/concrete/Label';

// Utils
import { manageTimes } from '@src/utils';

type Props = {
  currency: string;
  price?: {
    amount: number;
    discounted?: number;
  };
  select?: (e?: any) => void;
  timeConfig?: string;
};

type State = {
  alreadySelectedIndexes: number[];
  times: any[];
};

class TimesContainer extends React.PureComponent<Props, State> {

  state: State = {
    alreadySelectedIndexes: [],
    times: [],
  };

  componentDidMount() {
    const times = this.defaultTimes();
    this.setState({ times });
  }

  defaultTimes = (): Array<{
    time: string;
    selected: boolean;
  }> => {
    const times: string[] = manageTimes('18:00', this.props.timeConfig); // TODO: stop the time being hardcoded
    const timesWithId = times.map(time => {
      return {
        'time': time,
        selected: false,
      };
    });
    return timesWithId;
  }

  select = (e) => {
    const stateCopy = [...this.state.times];
    const chosenTime = stateCopy.find(el => el.time === e.title);
    let buffer = [];
    const newTimes = stateCopy.map((el, i) => {
      if (el.time === chosenTime.time) {
        if (el.selected && this.state.alreadySelectedIndexes[0] === i) {
          el.selected = false;
        } else if (el.selected) {
          buffer = [i];
        } else {
          el.selected = true;
          buffer = [...this.state.alreadySelectedIndexes, i];
        }
      }
      return el;
    });
    if (buffer.length === 1) {
      newTimes.forEach((el, i) => {
        if (i !== buffer[0]) {
          el.selected = false;
        }
      });
    }
    if (buffer.length > 1) {
      buffer = buffer.sort();
      newTimes.forEach((el, i) => {
        if (i > buffer[0] && i < buffer[buffer.length - 1]) {
          el.selected = true;
        }
      });
    }
    this.setState({
      times: [...newTimes],
      alreadySelectedIndexes: [...buffer],
    }, () => {
      const time = [];
      newTimes.forEach(el => {
        if (el.selected) {
          time.push(el.time);
        }
      });
      this.props.select({
        time: time,
        timeDuration: time.length ? time.length / 2 + ' hours' : '1 hour', // TODO: translation key
      });
    });
  }

  render() {
    const { currency, price } = this.props;
    const { times } = this.state;
    let optionTimes;
    if (times.length === 0) {
      optionTimes = this.defaultTimes();
    } else {
      optionTimes = times;
    }
    return (
      <div>
        <Label>
          <Translatable content={{ transKey: 'room.time' }} />
        </Label>
        <OptionGroup
          chosen={this.select}
          options={optionTimes.map(el => {
            return {
              currency: currency,
              price: price,
              selected: el.selected,
              title: el.time,
            };
          })}
        />
      </div>
    );
  }
}

export default TimesContainer;
