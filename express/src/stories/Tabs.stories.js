import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import faker from 'faker';

import langObject from '@src/data/langObject';

import Container from './container';

import Tabs from '@src/components/concrete/Tabs';
import GenericHeader from '@src/components/concrete/GenericHeader';

import { tabs } from '@src/data/dashboard/tabs';

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

const somethingHappened = () => {
  console.log('Something Happened');
};

storiesOf('Tabs', module)
  .addDecorator(story => <Provider store={store}><Container>{story()}</Container></Provider>)
  .add('tabs', () => (
    <Tabs
      handleClick={somethingHappened}
      items={tabs.payments}
      tabIndex={1}
    />
  ));
