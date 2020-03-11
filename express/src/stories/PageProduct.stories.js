import * as React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { storiesOf } from '@storybook/react';

import { exampleTags, exampleVerticals } from './data';

import DiningProductPage from '@src/components/concrete/Product/Pages/DiningProductPage';
import MeetingProductPage from '@src/components/concrete/Product/Pages/MeetingProductPage';
import OfficeProductPage from '@src/components/concrete/Product/Pages/OfficeProductPage';
import PartyProductPage from '@src/components/concrete/Product/Pages/PartyProductPage';
import WeddingProductPage from '@src/components/concrete/Product/Pages/WeddingProductPage';
import ProductPage from '@src/pages/product';

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
    defaultLocation: {
      lat: '51.5072996',
      locationDesc: 'London, UK',
      locationSlug: 'London--UK',
      lon: '-0.1280232'
    },
    domain: 'uk'
  },
  lang,
  responsive: {},
  search: {
    params: { tag: 'meeting-rooms' },
    tags: exampleTags,
    url: '/s/meeting-rooms',
    verticals: exampleVerticals
  }
});

const storeAdmin = createStore((state, action) => {
  switch (action.type) {
    default:
      return state;
  }
}, {
  auth: {
    user: {
      isAdmin: true,
      isLoggedIn: true
    }
  },
  config: {
    defaultLocation: {
      lat: '51.5072996',
      locationDesc: 'London, UK',
      locationSlug: 'London--UK',
      lon: '-0.1280232'
    },
    domain: 'uk'
  },
  lang,
  responsive: {},
  search: {
    params: { tag: 'meeting-rooms' },
    tags: exampleTags,
    url: '/s/meeting-rooms',
    verticals: exampleVerticals
  }
});

storiesOf('Pages/product', module)
  .add('dining', () => (
    <Provider store={store}>
      <DiningProductPage />
    </Provider>
  ))
  .add('product - local', () => (
    <Provider store={store}>
      <ProductPage url={'aa/testing-bubu/office/22'} />
    </Provider>
  ))
  .add('product - meeting', () => (
    <Provider store={storeAdmin}>
      <MeetingProductPage />
    </Provider>
  ))
  .add('office', () => (
    <Provider store={store}>
      <OfficeProductPage />
    </Provider>
  ))
  .add('party', () => (
    <Provider store={store}>
      <PartyProductPage />
    </Provider>
  ))
  .add('wedding', () => (
    <Provider store={store}>
      <WeddingProductPage />
    </Provider>
  ));
