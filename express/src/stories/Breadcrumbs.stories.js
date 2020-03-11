import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import langObject from '@src/data/langObject';

import { exampleCrumbs } from './data';

import Container from './container';

import Breadcrumbs from '@src/components/concrete/Breadcrumbs';

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

storiesOf('Breadcrumbs', module)
  .add('browse/landing', () => (
    <Provider store={store}>
      <Container>
        <Breadcrumbs
          items={exampleCrumbs}
          type="landing_page"
        />
      </Container>
    </Provider>
  ))
  .add('other pages', () => (
    <Provider store={store}>
      <Container>
        <Breadcrumbs items={exampleCrumbs} />
      </Container>
    </Provider>
  ));
