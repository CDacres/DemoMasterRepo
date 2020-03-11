import * as React from 'react';
import moment from 'moment';
import omit from 'lodash/omit';
import { DayPickerRangeController, isInclusivelyAfterDay } from 'react-dates';
import isMobile from 'ismobilejs';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';
import { margin, padding } from '@src/styles';

// Constants
import { START_DATE, END_DATE, HORIZONTAL_ORIENTATION } from 'react-dates/constants';

enum Orientation {
  HORIZONTAL_ORIENTATION = 'horizontal',
  VERTICAL_ORIENTATION = 'vertical',
  VERTICAL_SCROLLABLE = 'verticalScrollable',
}

type Props = {
  autoFocusEndDate: boolean;
  date: moment.Moment;
  datepickerLang: string;
  onChange: (date: moment.Moment) => void;

  /* ==== react-dates props ==== */
  autoFocus?: boolean;
  daySize?: number;
  firstDayOfWeek?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  initialStartDate?: moment.Moment;
  initialEndDate?: moment.Moment;
  showInputs?: boolean;
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
  focusedInput: 'startDate' | 'endDate';
  startDate: moment.Moment;
  endDate: moment.Moment;
};

class DatePickerRange extends React.Component<Props, State> {

  static defaultProps = {
    // example props for the demo
    autoFocusEndDate: false,
    initialStartDate: null,
    initialEndDate: null,
    startDateOffset: undefined,
    endDateOffset: undefined,
    showInputs: false,
    minDate: null,
    maxDate: null,

    // day presentation and interaction related props
    renderCalendarDay: undefined,
    renderDayContents: null,
    minimumNights: 1,
    isDayBlocked: () => false,
    isOutsideRange: day => !isInclusivelyAfterDay(day, moment()),
    isDayHighlighted: () => false,
    enableOutsideDays: false,

    // calendar presentation and interaction related props
    orientation: HORIZONTAL_ORIENTATION,
    verticalHeight: undefined,
    withPortal: false,
    initialVisibleMonth: null,
    numberOfMonths: 2,
    onOutsideClick() {},
    keepOpenOnDateSelect: false,
    renderCalendarInfo: null,
    isRTL: false,
    renderMonthText: null,
    renderMonthElement: null,
    renderKeyboardShortcutsButton: undefined,

    // navigation related props
    navPrev: null,
    navNext: null,
    onPrevMonthClick() {},
    onNextMonthClick() {},

    // internationalization
    monthFormat: 'MMMM YYYY',
  };

  constructor(props: Props) {
    super(props);

    this.state = {
      focusedInput: props.autoFocusEndDate ? END_DATE : START_DATE,
      startDate: props.initialStartDate,
      endDate: props.initialEndDate,
    };

    this.onDatesChange = this.onDatesChange.bind(this);
    this.onFocusChange = this.onFocusChange.bind(this);
  }

  onDatesChange({ startDate, endDate }: any) {
    this.setState({ startDate, endDate });
  }

  onFocusChange(focusedInput: 'startDate' | 'endDate') {
    this.setState({
      // Force the focusedInput to always be truthy so that dates are always selectable
      focusedInput: !focusedInput ? START_DATE : focusedInput,
    });
  }

  render() {
    const { showInputs } = this.props;
    const { focusedInput, startDate, endDate } = this.state;
    const props = omit(this.props, [
      'autoFocus',
      'autoFocusEndDate',
      'date',
      'datepickerLang',
      'initialStartDate',
      'initialEndDate',
      'onChange',
      'showInputs',
    ]);
    const startDateString = startDate && startDate.format('YYYY-MM-DD');
    const endDateString = endDate && endDate.format('YYYY-MM-DD');
    if (isMobile.any) {
      return (
        <React.Fragment>
          <div className={css(styles.mobileInputWrapper)}>
            {showInputs &&
              <React.Fragment>
                <div className={css(styles.inputWrapper, margin.all_0, padding.all_0)}>
                  <input
                    className={css(styles.inputContainer)}
                    name="start date"
                    placeholder="mm/dd/yyyy"
                    readOnly={true}
                    type="text"
                    value={startDateString || ''}
                  />
                </div>
                <div className={css(styles.inputWrapper, margin.all_0, padding.all_0)}>
                  <input
                    className={css(styles.inputContainer)}
                    name="end date"
                    placeholder="mm/dd/yyyy"
                    readOnly={true}
                    type="text"
                    value={endDateString || ''}
                  />
                </div>
              </React.Fragment>
            }
          </div>
          <div className={css(styles.mobileCalendarWrapper)}>
            <DayPickerRangeController
              endDate={endDate}
              focusedInput={focusedInput}
              hideKeyboardShortcutsPanel={true}
              noBorder={true}
              onDatesChange={this.onDatesChange}
              onFocusChange={this.onFocusChange}
              startDate={startDate}
              {...props}
            />
          </div>
        </React.Fragment>
      );
    } else {
      return (
        <div className={css(styles.wrapper)}>
          {showInputs &&
            <React.Fragment>
              <div className={css(styles.inputWrapper, margin.all_0, padding.all_0)}>
                <input
                  className={css(styles.inputContainer)}
                  name="start date"
                  placeholder="mm/dd/yyyy"
                  readOnly={true}
                  type="text"
                  value={startDateString || ''}
                />
              </div>
              <div className={css(styles.inputWrapper, margin.all_0, padding.all_0)}>
                <input
                  className={css(styles.inputContainer)}
                  name="end date"
                  placeholder="mm/dd/yyyy"
                  readOnly={true}
                  type="text"
                  value={endDateString || ''}
                />
              </div>
            </React.Fragment>
          }
          <DayPickerRangeController
            endDate={endDate}
            focusedInput={focusedInput}
            hideKeyboardShortcutsPanel={true}
            noBorder={true}
            onDatesChange={this.onDatesChange}
            onFocusChange={this.onFocusChange}
            startDate={startDate}
            {...props}
          />
        </div>
      );
    }
  }
}

export default DatePickerRange;
