import * as React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { storiesOf } from '@storybook/react';

import langObject from '@src/data/langObject';

import Container from './container';

import Footer from '@src/components/concrete/Footer';

const lang = langObject();

const store = createStore((state, action) => {
  switch (action.type) {
    default:
      return state;
  }
}, {
  config: {
    domain: 'uk',
    footer: {},
    language: 'en',
    phone: {
      phoneNumber: '+442071832212',
      phoneNumberDisplay: '+44 (0)20 7183 2212'
    },
    route: {
      domainSpecific: true,
      pathname: '/'
    }
  },
  lang,
  responsive: {}
});

storiesOf('Footer', module)
  .add('with text', () => (
    <Provider store={store}>
      <Container>
        <Footer />
      </Container>
    </Provider>
  ));
