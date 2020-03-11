import * as React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { storiesOf } from '@storybook/react';

import langObject from '@src/data/langObject';

import { exampleTags, exampleVerticals } from './data';

import Container from './container';

import SearchBar from '@src/components/concrete/SearchBar';

const lang = langObject();

const store = createStore((state, action) => {
  switch (action.type) {
    default:
      return state;
  }
}, {
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
  search: {
    params: { tag: 'meeting-rooms' },
    tags: exampleTags,
    url: '/s/meeting-rooms',
    verticals: exampleVerticals
  }
});

storiesOf('Search Bar', module)
  .addDecorator(story => <Provider store={store}><Container>{story()}</Container></Provider>)
  .add('on browse/landing pages', () => (
    <SearchBar hasTagInput={false} />
  ))
  .add('on home page', () => (
    <SearchBar />
  ));
