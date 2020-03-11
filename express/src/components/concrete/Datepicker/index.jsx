import * as React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { omit } from 'lodash';

import { SingleDatePicker, SingleDatePickerShape, isInclusivelyAfterDay } from 'react-dates';
import { HORIZONTAL_ORIENTATION, ANCHOR_LEFT } from 'react-dates/constants';

import { SingleDatePickerPhrases } from './defaultPhrases';

const propTypes = {
  // example props for the demo
  autoFocus: PropTypes.bool,
  initialDate: PropTypes.object,

  ...omit(SingleDatePickerShape, [
    'date',
    'onDateChange',
    'focused',
    'onFocusChange'
  ])
};

const defaultProps = {
  autoFocus: false,
  initialDate: null,

  // input related props
  id: 'date_input',
  placeholder: 'Date',
  disabled: false,
  required: false,
  screenReaderInputMessage: '',
  showClearDate: false,
  showDefaultInputIcon: false,
  customInputIcon: null,
  block: false,
  small: false,
  regular: false,
  verticalSpacing: undefined,
  keepFocusOnInput: false,

  // calendar presentation and interaction related props
  renderMonth: null,
  orientation: HORIZONTAL_ORIENTATION,
  anchorDirection: ANCHOR_LEFT,
  horizontalMargin: 0,
  withPortal: false,
  withFullScreenPortal: false,
  initialVisibleMonth: null,
  numberOfMonths: 1,
  keepOpenOnDateSelect: false,
  reopenPickerOnClearDate: false,
  isRTL: false,

  // navigation related props
  navPrev: null,
  navNext: null,
  onPrevMonthClick() {},
  onNextMonthClick() {},
  onClose() {},

  // day presentation and interaction related props
  renderCalendarDay: undefined,
  renderDayContents: null,
  enableOutsideDays: false,
  isDayBlocked: () => false,
  isOutsideRange: day => !isInclusivelyAfterDay(day, moment()),
  isDayHighlighted: () => {},

  // internationalization props
  displayFormat: () => moment.localeData().longDateFormat('L'),
  monthFormat: 'MMMM YYYY',
  phrases: SingleDatePickerPhrases
};

class SingleDatePickerWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      focused: props.autoFocus,
      date: props.initialDate
    };

    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleFocusChange = this.handleFocusChange.bind(this);

    moment.locale(props.datepickerLang);
  }

  handleDateChange(date) {
    this.setState({ date }, () => {
      this.props.onChange(date ? moment(date).format('YYYY-MM-DD') : '');
    });
  }

  handleFocusChange({ focused }) {
    this.setState({ focused }, () => {
      if (focused) {
        this.props.onFocus();
      } else {
        this.props.onBlur();
      }
    });
  }

  render() {
    const { focused, date } = this.state;

    // autoFocus, domain, initialDate, onChange and onFocus are helper props
    // for the wrapper but are not props on the SingleDatePicker itself and
    // thus, have to be omitted.
    const props = omit(this.props, [
      'autoFocus',
      'datepickerLang',
      'domain',
      'initialDate',
      'onBlur',
      'onChange',
      'onFocus',
      'renderMonth'
    ]);

    return (
      <SingleDatePicker
        date={date}
        focused={focused}
        onDateChange={this.handleDateChange}
        onFocusChange={this.handleFocusChange}
        {...props}
      />
    );
  }
}

SingleDatePickerWrapper.propTypes = propTypes;
SingleDatePickerWrapper.defaultProps = defaultProps;

export default SingleDatePickerWrapper;
