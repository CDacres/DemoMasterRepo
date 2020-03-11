import * as React from 'react';
import moment from 'moment';
import omit from 'lodash/omit';
import { DayPickerSingleDateController, isInclusivelyAfterDay, toMomentObject } from 'react-dates';
import isMobile from 'ismobilejs';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';
import { margin, padding } from '@src/styles';

// Constants
import { DATE_FORMAT, HORIZONTAL_ORIENTATION } from 'react-dates/constants';

enum Orientation {
  HORIZONTAL_ORIENTATION = 'horizontal',
  VERTICAL_ORIENTATION = 'vertical',
  VERTICAL_SCROLLABLE = 'verticalScrollable',
}

type Props = {
  date: moment.Moment;
  datepickerLang: string;
  onChange: (date: moment.Moment) => void;

  /* ==== react-dates props ==== */
  autoFocus?: boolean;
  showInput?: boolean;
  daySize?: number;
  firstDayOfWeek?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  initialDate?: string;

  keepOpenOnDateSelect?: boolean;
  isOutsideRange?: (day: any) => boolean;
  isDayBlocked?: (day: any) => boolean;
  isDayHighlighted?: (day: any) => boolean;

  // DayPicker props
  enableOutsideDays?: boolean;
  numberOfMonths?: number;
  orientation?: Orientation;
  withPortal?: boolean;
  initialVisibleMonth?: () => moment.Moment;
  renderCalendarInfo?: () => string | JSX.Element;

  navPrev?: JSX.Element;
  navNext?: JSX.Element;

  onPrevMonthClick?: () => void;
  onNextMonthClick?: () => void;
  onOutsideClick?: () => void;
  renderCalendarDay?: (day: moment.Moment) => string | JSX.Element;
  renderDayContents?: (day: moment.Moment) => string | JSX.Element;

  // i18n
  monthFormat?: string;

  isRTL?: boolean;
};

type State = {
  focused: boolean;
};

class DatepickerSingle extends React.Component<Props, State> {
  static defaultProps = {
    // example props for the demo
    autoFocus: false,
    showInput: false,

    // day presentation and interaction related props
    renderCalendarDay: undefined,
    renderDayContents: null,
    isDayBlocked: () => false,
    isOutsideRange: day => !isInclusivelyAfterDay(day, moment()),
    isDayHighlighted: () => false,
    enableOutsideDays: false,

    // calendar presentation and interaction related props
    orientation: HORIZONTAL_ORIENTATION,
    withPortal: false,
    initialVisibleMonth: null,
    numberOfMonths: 1,
    onOutsideClick: () => ({}),
    keepOpenOnDateSelect: false,
    renderCalendarInfo: null,
    isRTL: false,

    // navigation related props
    navPrev: null,
    navNext: null,
    onPrevMonthClick: () => ({}),
    onNextMonthClick: () => ({}),

    // internationalization
    monthFormat: 'MMMM YYYY',
  };

  constructor(props: Props) {
    super(props);
    this.state = { focused: true };
    moment.locale(props.datepickerLang);
  }

  handleDateChange = (date: moment.Moment) => {
    this.props.onChange(moment(date, DATE_FORMAT));
  }

  handleFocusChange = () => {
    // Force the focused states to always be truthy so that date is always selectable
    this.setState({ focused: true });
  }

  render() {
    const { date, showInput } = this.props;
    const { focused } = this.state;
    const props = omit(this.props, [
      'autoFocus',
      'date',
      'datepickerLang',
      'onChange',
      'showInput',
    ]);
    const dateString = date && date.format('YYYY-MM-DD');
    if (isMobile.any) {
      return (
        <React.Fragment>
          <div className={css(styles.mobileInputWrapper)}>
            {showInput &&
              <div className={css(styles.inputWrapper, margin.all_0, padding.all_0)}>
                <input
                  className={css(styles.inputContainer)}
                  name="start date"
                  placeholder="mm/dd/yyyy"
                  readOnly={true}
                  type="text"
                  value={dateString || ''}
                />
              </div>
            }
          </div>
          <div className={css(styles.mobileCalendarWrapper)}>
            <DayPickerSingleDateController
              date={toMomentObject(date, DATE_FORMAT)}
              focused={focused}
              hideKeyboardShortcutsPanel={true}
              noBorder={true}
              onDateChange={this.handleDateChange}
              onFocusChange={this.handleFocusChange}
              {...props}
            />
          </div>
        </React.Fragment>
      );
    } else {
      return (
        <div className={css(styles.wrapper)}>
          {showInput &&
            <div className={css(styles.inputWrapper, margin.all_0, padding.all_0)}>
              <input
                className={css(styles.inputContainer)}
                name="start date"
                placeholder="mm/dd/yyyy"
                readOnly={true}
                type="text"
                value={dateString || ''}
              />
            </div>
          }
          <DayPickerSingleDateController
            date={toMomentObject(date, DATE_FORMAT)}
            focused={focused}
            hideKeyboardShortcutsPanel={true}
            noBorder={true}
            onDateChange={this.handleDateChange}
            onFocusChange={this.handleFocusChange}
            {...props}
          />
        </div>
      );
    }
  }
}

export default DatepickerSingle;
