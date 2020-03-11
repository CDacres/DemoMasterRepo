import * as React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { storiesOf } from '@storybook/react';

import langObject from '@src/data/langObject';

import Header from '@src/components/concrete/Header';
import AddReviews from '@src/components/concrete/DashboardPage/AddReviews';
import Bookings from '@src/components/concrete/DashboardPage/Bookings';
import AccountMenu from '@src/components/concrete/DashboardPage/AccountMenu';
import VenueMenu from '@src/components/concrete/DashboardPage/VenueMenu';
import LoginSecurity from '@src/components/concrete/DashboardPage/LoginSecurity';
import PersonalInfo from '@src/components/concrete/DashboardPage/PersonalInfo';
import Notifications from '@src/components/concrete/DashboardPage/Notifications';
import Payments from '@src/components/concrete/DashboardPage/Payments';
import PrivacySettings from '@src/components/concrete/DashboardPage/PrivacySettings';
import Review from '@src/components/concrete/DashboardPage/Review';
import Widget from '@src/components/concrete/DashboardPage/Widget';
import WorkTravel from '@src/components/concrete/DashboardPage/WorkTravel';
import TeamAndMembers from '@src/components/concrete/DashboardPage/TeamAndMembers';

import { rating } from '@src/data/venue/meeting';

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
    languageName: 'English (UK)',
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

storiesOf('Pages/dashboard', module)
  .addDecorator(story => <Provider store={store}>{story()}</Provider>)
  .add('account settings', () => (
    <React.Fragment>
      <Header />
      <AccountMenu />
    </React.Fragment>
  ))
  .add('accounts settings - live booking widget', () => (
    <React.Fragment>
      <Header />
      <Widget />
    </React.Fragment>
  ))
  .add('account settings - login & security', () => (
    <React.Fragment>
      <Header />
      <LoginSecurity />
    </React.Fragment>
  ))
  .add('account settings - notifications', () => (
    <React.Fragment>
      <Header />
      <Notifications />
    </React.Fragment>
  ))
  .add('account settings - payments & payouts', () => (
    <React.Fragment>
      <Header />
      <Payments />
    </React.Fragment>
  ))
  .add('account settings - personal info', () => (
    <React.Fragment>
      <Header />
      <PersonalInfo />
    </React.Fragment>
  ))
  .add('account settings - privacy & sharing', () => (
    <React.Fragment>
      <Header />
      <PrivacySettings />
    </React.Fragment>
  ))
  .add('account settings - zipcube for work', () => (
    <React.Fragment>
      <Header />
      <WorkTravel />
    </React.Fragment>
  ))
  .add('bookings', () => (
    <React.Fragment>
      <Header />
      <Bookings />
    </React.Fragment>
  ))
  .add('review - add', () => (
    <React.Fragment>
      <Header />
      <AddReviews />
    </React.Fragment>
  ))
  .add('review - view', () => (
    <React.Fragment>
      <Header />
      <Review rating={rating} />
    </React.Fragment>
  ))
  .add('venue', () => (
    <React.Fragment>
      <Header />
      <VenueMenu />
    </React.Fragment>
  ))
  .add('venue - team & members', () => (
    <React.Fragment>
      <Header />
      <TeamAndMembers />
    </React.Fragment>
  ));
