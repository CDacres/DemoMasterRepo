import * as React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { storiesOf } from '@storybook/react';

import langObject from '@src/data/langObject';

import Container from './container';

import HelpSection from '@src/components/concrete/HelpSection';

const lang = langObject();

const store = createStore((state, action) => {
  switch (action.type) {
    default:
      return state;
  }
}, { lang });

storiesOf('Help Section', module)
  .add('with button', () => (
    <Provider store={store}>
      <Container>
        <HelpSection />
      </Container>
    </Provider>
  ));
