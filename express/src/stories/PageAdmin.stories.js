import * as React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { storiesOf } from '@storybook/react';

import langObject from '@src/data/langObject';

import Header from '@src/components/concrete/Header';
import Menu from '@src/components/concrete/AdminPage/Menu';
import DataStudio from '@src/components/concrete/AdminPage/DataStudio';
import FinancialEntities from '@src/components/concrete/AdminPage/FinancialEntities';
import Payout from '@src/components/concrete/AdminPage/Payout';
import Location from '@src/components/concrete/AdminPage/Location';
import Spaces from '@src/components/concrete/AdminPage/Spaces';
import Users from '@src/components/concrete/AdminPage/Users';
import Venues from '@src/components/concrete/AdminPage/Venues';
import SiteImagesUpload from '@src/components/concrete/Admin/SiteImagesUpload';

const lang = langObject();

const store = createStore((state, action) => {
  switch (action.type) {
    default:
      return state;
  }
}, {
  admin: {
    siteImages: {
      isLoading: false,
      uploads: []
    }
  },
  auth: {
    user: {
      isAdmin: true,
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

storiesOf('Pages/admin', module)
  .addDecorator(story => <Provider store={store}>{story()}</Provider>)
  .add('admin', () => (
    <React.Fragment>
      <Header />
      <Menu />
    </React.Fragment>
  ))
  .add('data studio', () => (
    <React.Fragment>
      <Header />
      <DataStudio />
    </React.Fragment>
  ))
  .add('financial entities', () => (
    <React.Fragment>
      <Header />
      <FinancialEntities />
    </React.Fragment>
  ))
  .add('location', () => (
    <React.Fragment>
      <Header />
      <Location />
    </React.Fragment>
  ))
  .add('payout', () => (
    <React.Fragment>
      <Header />
      <Payout />
    </React.Fragment>
  ))
  .add('site images upload', () => (
    <React.Fragment>
      <Header />
      <SiteImagesUpload />
    </React.Fragment>
  ))
  .add('spaces', () => (
    <React.Fragment>
      <Header />
      <Spaces />
    </React.Fragment>
  ))
  .add('users', () => (
    <React.Fragment>
      <Header />
      <Users />
    </React.Fragment>
  ))
  .add('venues', () => (
    <React.Fragment>
      <Header />
      <Venues />
    </React.Fragment>
  ));
