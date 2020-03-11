import * as React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { storiesOf } from '@storybook/react';

import langObject from '@src/data/langObject';

// Components
import Header from '@src/components/concrete/Header';
import Benefits from '@src/components/concrete/InfoPages/Benefits';
import Features from '@src/components/concrete/InfoPages/Features';
import Financials from '@src/components/concrete/InfoPages/Financials';
import Overview from '@src/components/concrete/InfoPages/Overview';
import Safety from '@src/components/concrete/InfoPages/Safety';
import Setup from '@src/components/concrete/InfoPages/Setup';

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
  responsive: {},
});


storiesOf('Pages/info', module)
  .addDecorator(story => <Provider store={store}>{story()}</Provider>)
  .add('benefits', () => (
    <React.Fragment>
      <Header />
      <Benefits />
    </React.Fragment>
  ))
  .add('features', () => (
    <React.Fragment>
      <Header />
      <Features />
    </React.Fragment>
  ))
  .add('financials', () => (
    <React.Fragment>
      <Header />
      <Financials />
    </React.Fragment>
  ))
  .add('overview', () => (
    <React.Fragment>
      <Header />
      <Overview />
    </React.Fragment>
  ))
  .add('safety', () => (
    <React.Fragment>
      <Header />
      <Safety />
    </React.Fragment>
  ))
  .add('setup', () => (
    <React.Fragment>
      <Header />
      <Setup />
    </React.Fragment>
  ));
