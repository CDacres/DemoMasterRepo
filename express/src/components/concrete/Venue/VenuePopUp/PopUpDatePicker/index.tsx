import * as React from 'react';
import moment from 'moment';

// Connectors
import { useConfig } from '@src/store/connectors';

// Components
import DatepickerSingle from '@src/components/concrete/Datepicker/DatepickerSingle';

// Types
import { Store } from '@src/typings/types';

type Props = {
  config: Store.Config;
};

type State = {
  date: null | moment.Moment;
};

class PopUpDatePicker extends React.PureComponent<Props, State> {

  state: State = { date: null };

  dateSelect = (e): void => this.setState({ date: e });

  render() {
    const { config: { datepickerLang } } = this.props;
    const { date } = this.state;
    return (
      <DatepickerSingle
        date={date}
        datepickerLang={datepickerLang}
        daySize={69}
        firstDayOfWeek={1}
        onChange={this.dateSelect}
      />
    );
  }
}

export default useConfig(PopUpDatePicker);
