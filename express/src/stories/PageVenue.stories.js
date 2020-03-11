/* eslint-disable max-len */
import * as React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { storiesOf } from '@storybook/react';

import langObject from '@src/data/langObject';

import Header from '@src/components/concrete/Header';
import VenuePage from '@src/components/concrete/VenuePage';

const lang = langObject();

const store = createStore((state, action) => {
  switch (action.type) {
    default:
      return state;
  }
}, {
  auth: {
    user: {
      isAdmin: false,
      isLoggedIn: false
    }
  },
  config: {
    domain: 'uk',
    footer: {},
    header: {},
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

storiesOf('Pages/venue', module)
  .add('venue', () => (
    <Provider store={store}>
      <React.Fragment>
        <Header />
        <VenuePage />
      </React.Fragment>
    </Provider>
  ));
