import * as React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { storiesOf } from '@storybook/react';
import { css, StyleSheet } from 'aphrodite/no-important';

import langObject from '@src/data/langObject';

import Container from './container';

import ReportingCard from '@src/components/concrete/ReportingCard';

const lang = langObject();

import { margin, padding, pagestyles } from '@src/styles';

const store = createStore((state, action) => {
  switch (action.type) {
    default:
      return state;
  }
}, {
  config: { domain: 'uk' },
  lang,
  responsive: {},
});

storiesOf('Reporting Card', module)
  .addDecorator(story => <Provider store={store}><Container>{story()}</Container></Provider>)
  .add('1 column', () => (
    <div className={css(margin.topbottom_2)}>
      <div className={css(pagestyles.row, pagestyles.clearfix)}>
        <div className={css(pagestyles.column, pagestyles.fullColumnSmallScreen, padding.leftright_1)}>
          <ReportingCard
            amount="1"
            label="one column"
          />
        </div>
      </div>
    </div>
  ))
  .add('2 columns', () => (
    <div className={css(margin.topbottom_2)}>
      <div className={css(pagestyles.row, pagestyles.clearfix)}>
        <div className={css(pagestyles.column, pagestyles.halfColumnSmallScreen, padding.leftright_1)}>
          <ReportingCard
            amount="2"
            label="two columns"
          />
        </div>
        <div className={css(pagestyles.column, pagestyles.halfColumnSmallScreen, padding.leftright_1)}>
          <ReportingCard
            amount="2"
            isRed
            label="two columns"
          />
        </div>
      </div>
    </div>
  ))
  .add('3 columns', () => (
    <div className={css(margin.topbottom_2)}>
      <div className={css(pagestyles.row, pagestyles.clearfix)}>
        <div className={css(pagestyles.column, pagestyles.thirdColumnSmallScreen, padding.leftright_1)}>
          <ReportingCard
            amount="3"
            label="three columns"
          />
        </div>
        <div className={css(pagestyles.column, pagestyles.thirdColumnSmallScreen, padding.leftright_1)}>
          <ReportingCard
            amount="3"
            label="three columns"
          />
        </div>
        <div className={css(pagestyles.column, pagestyles.thirdColumnSmallScreen, padding.leftright_1)}>
          <ReportingCard
            amount="3"
            isRed
            label="three columns"
          />
        </div>
      </div>
    </div>
  ))
  .add('4 columns', () => (
    <div className={css(margin.topbottom_2)}>
      <div className={css(pagestyles.row, pagestyles.clearfix)}>
        <div className={css(pagestyles.column, pagestyles.quarterColumnSmallScreen, padding.leftright_1)}>
          <ReportingCard
            amount="4"
            label="four columns"
          />
        </div>
        <div className={css(pagestyles.column, pagestyles.quarterColumnSmallScreen, padding.leftright_1)}>
          <ReportingCard
            amount="4"
            label="four columns"
          />
        </div>
        <div className={css(pagestyles.column, pagestyles.quarterColumnSmallScreen, padding.leftright_1)}>
          <ReportingCard
            amount="4"
            label="four columns"
          />
        </div>
        <div className={css(pagestyles.column, pagestyles.quarterColumnSmallScreen, padding.leftright_1)}>
          <ReportingCard
            amount="4"
            isRed
            label="four columns"
          />
        </div>
      </div>
    </div>
  ));
