import * as React from 'react';
import moment from 'moment';
import { css } from 'aphrodite/no-important';

// Styles
import sidebarStyles from '../styles';

// Connectors
import { useConfig } from '@src/store/connectors';

// Components
import Label from '@src/components/concrete/Label';
import Select from '@src/components/concrete/Dropdown/Select';
import DatepickerSingle from '@src/components/concrete/Datepicker/DatepickerSingle';
import { ConnectedTranslatable as Translatable } from '@src/components/abstract/Translatable';

// Types
import { Store } from '@src/typings/types';

type Props = {
  config: Store.Config;
  date?: moment.Moment;
  select?: (prop: string, e: any) => void;
  stepBack?: (step?: number, pos?: number) => void;
};

class DateContainer extends React.Component<Props> {
  selectType = (e) => {
    this.props.select('date', e);
  }
  backToTypes = () => this.props.stepBack(1, 2);
  backToCalendar = () => this.props.stepBack(2, 3);

  render() {
    const { config: { datepickerLang }, date } = this.props;
    return (
      <div>
        <Label>
          <Translatable content={{ transKey: 'room.view_info' }} />
        </Label>
        <Select action={this.backToTypes}>
          <Translatable content={{ transKey: 'room.schedule_viewing' }} />
        </Select>
        <Label>
          <Translatable content={{ transKey: 'common.date' }} />
        </Label>
        {!date ? (
          <div className={css(sidebarStyles.datepicker)}>
            <DatepickerSingle
              date={date}
              datepickerLang={datepickerLang}
              onChange={this.selectType}
            />
          </div>
        ) : (
          <Select action={this.backToCalendar}>
            {date.format('ddd DD MMM YY')}
          </Select>
        )}
      </div>
    );
  }
}

export default useConfig(DateContainer);
