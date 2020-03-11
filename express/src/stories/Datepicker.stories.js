/* eslint-disable no-console */
import * as React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { storiesOf } from '@storybook/react';
import moment from 'moment';

import '@src/lib/init-with-styles-stylesheet';

import langObject from '@src/data/langObject';

import Container from './container';

import Datepicker from '@src/components/concrete/Datepicker';
import DatepickerRange from '@src/components/concrete/Datepicker/DatepickerRange';
import DatepickerSingle from '@src/components/concrete/Datepicker/DatepickerSingle';

const lang = langObject();

const store = createStore((state, action) => {
  switch (action.type) {
    default:
      return state;
  }
}, {
  config: { domain: 'uk' },
  lang
});

const handleBlur = () => {
  console.log('blur');
};

const handleChange = date => {
  console.log(date);
};

const handleFocus = () => {
  console.log('focus');
};

storiesOf('Datepicker', module)
  .add('date picker', () => (
    <Provider store={store}>
      <Container>
        <Datepicker
          datepickerLang="en-GB"
          domain="uk"
          initialDate={moment()}
          onBlur={handleBlur}
          onChange={handleChange}
          onFocus={handleFocus}
          placeholder="When"
        />
      </Container>
    </Provider>
  ))
  .add('date picker (range no input)', () => (
    <Provider store={store}>
      <Container>
        <DatepickerRange
          date={moment()}
          datepickerLang="en-GB"
          numberOfMonths={2}
          onChange={handleChange}
        />
      </Container>
    </Provider>
  ))
  .add('date picker (range with input)', () => (
    <Provider store={store}>
      <Container>
        <DatepickerRange
          date={moment()}
          datepickerLang="en-GB"
          numberOfMonths={2}
          onChange={handleChange}
          showInputs
        />
      </Container>
    </Provider>
  ))
  .add('date picker (single date no input)', () => (
    <Provider store={store}>
      <Container>
        <DatepickerSingle
          date={moment()}
          datepickerLang="en-GB"
          numberOfMonths={2}
          onChange={handleChange}
        />
      </Container>
    </Provider>
  ))
  .add('date picker (single date with input)', () => (
    <Provider store={store}>
      <Container>
        <DatepickerSingle
          date={moment()}
          datepickerLang="en-GB"
          numberOfMonths={2}
          onChange={handleChange}
          showInput
        />
      </Container>
    </Provider>
  ));
