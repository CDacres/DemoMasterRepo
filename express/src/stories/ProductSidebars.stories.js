/* eslint-disable max-len */
import * as React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { storiesOf } from '@storybook/react';

import { capacityRange as meetingCapacityRange, prices as meetingPrices, rating as meetingRating } from '@src/data/product/meeting';
import { capacityRange as officeCapacityRange, prices as officePrices, rating as officeRating } from '@src/data/product/office';
import { capacityRange as partyCapacityRange, prices as partyPrices, rating as partyRating } from '@src/data/product/party';
import { types as partyTypes } from '@src/data/product/partySidebar';
import { types as meetingTypes } from '@src/data/product/meetingSidebar';
import { types as officeTypes } from '@src/data/product/officeSidebar';

import Container from './container';

import OfficeProductPageSidebar from '@src/components/concrete/Product/RHSidebars/OfficeProductPageSidebar';
import MeetingProductPageSidebar from '@src/components/concrete/Product/RHSidebars/MeetingProductPageSidebar';
import LogInProductPageSidebar from '@src/components/concrete/Product/RHSidebars/LogInProductPageSidebar';
import PartyProductPageSidebar from '@src/components/concrete/Product/RHSidebars/PartyProductPageSidebar';

import langObject from '@src/data/langObject';

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
    header: {},
    phone: {
      phoneNumber: '+442071832212',
      phoneNumberDisplay: '+44 (0)20 7183 2212'
    }
  },
  lang,
  responsive: {}
});

storiesOf('Product Sidebars', module)
  .addDecorator(story => <Provider store={store}><Container>{story()}</Container></Provider>)
  .add('login page sidebar', () => (
    <LogInProductPageSidebar />
  ))
  .add('meeting page sidebar', () => (
    <MeetingProductPageSidebar
      currency={meetingPrices.currency}
      maxCapacity={meetingCapacityRange.max_capacity}
      minCapacity={meetingCapacityRange.min_capacity}
      price={{
        daily: meetingPrices.daily_rate_formatted,
        hourly: meetingPrices.hourly_rate_formatted,
        monthly: meetingPrices.monthly_rate_formatted
      }}
      rating={meetingRating.avg}
      reviews={meetingRating.count}
      types={meetingTypes}
    />
  ))
  .add('office page sidebar', () => (
    <OfficeProductPageSidebar
      currency={officePrices.currency}
      maxCapacity={officeCapacityRange.max_capacity}
      minCapacity={officeCapacityRange.min_capacity}
      price={{
        daily: officePrices.daily_rate_formatted,
        hourly: officePrices.hourly_rate_formatted,
        monthly: officePrices.monthly_rate_formatted
      }}
      rating={officeRating.avg}
      reviews={officeRating.count}
      types={officeTypes}
    />
  ))
  .add('party page sidebar', () => (
    <PartyProductPageSidebar
      currency={partyPrices.currency}
      maxCapacity={partyCapacityRange.max_capacity}
      minCapacity={partyCapacityRange.min_capacity}
      price={{
        daily: partyPrices.daily_rate_formatted,
        hourly: partyPrices.hourly_rate_formatted,
        monthly: partyPrices.monthly_rate_formatted
      }}
      rating={partyRating.avg}
      reviews={partyRating.count}
      types={partyTypes}
    />
  ));
