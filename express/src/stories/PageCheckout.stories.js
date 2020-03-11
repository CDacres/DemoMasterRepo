/* eslint-disable max-len */
import * as React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { storiesOf } from '@storybook/react';

import langObject from '@src/data/langObject';

import Header from '@src/components/concrete/Header';
import CheckoutPage from '@src/components/concrete/CheckoutPage';

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
    header: {
      smallLogo: true,
      stayAsLink: true,
      withCheckoutSteps: true
    },
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

storiesOf('Pages/checkout', module)
  .add('checkout', () => (
    <Provider store={store}>
      <React.Fragment>
        <Header />
        <CheckoutPage />
      </React.Fragment>
    </Provider>
  ));
