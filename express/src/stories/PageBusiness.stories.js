import * as React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { storiesOf } from '@storybook/react';

import langObject from '@src/data/langObject';

import Header from '@src/components/concrete/Header';
import Menu from '@src/components/concrete/BusinessPage/Menu';
import Invoices from '@src/components/concrete/BusinessPage/Invoices';
import ManageBookings from '@src/components/concrete/BusinessPage/ManageBookings';
import Notifications from '@src/components/concrete/BusinessPage/Notifications';
import People from '@src/components/concrete/BusinessPage/People';
import Report from '@src/components/concrete/BusinessPage/Report';
import Settings from '@src/components/concrete/BusinessPage/Settings';

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
      isLoggedIn: true
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

storiesOf('Pages/business', module)
  .addDecorator(story => <Provider store={store}>{story()}</Provider>)
  .add('business', () => (
    <React.Fragment>
      <Header />
      <Menu />
    </React.Fragment>
  ))
  .add('invoices', () => (
    <React.Fragment>
      <Header />
      <Invoices />
    </React.Fragment>
  ))
  .add('notifications', () => (
    <React.Fragment>
      <Header />
      <Notifications />
    </React.Fragment>
  ))
  .add('people', () => (
    <React.Fragment>
      <Header />
      <People />
    </React.Fragment>
  ))
  .add('reporting', () => (
    <React.Fragment>
      <Header />
      <Report />
    </React.Fragment>
  ))
  .add('settings', () => (
    <React.Fragment>
      <Header />
      <Settings />
    </React.Fragment>
  ))
  .add('team bookings', () => (
    <React.Fragment>
      <Header />
      <ManageBookings />
    </React.Fragment>
  ));
