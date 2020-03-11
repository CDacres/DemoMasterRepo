import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import langObject from '@src/data/langObject';

import { exampleLinks } from './data';

import Container from './container';

import LinkList from '@src/components/concrete/LinkList';

const lang = langObject();

const store = createStore((state, action) => {
  switch (action.type) {
    default:
      return state;
  }
}, {
  config: { domain: 'uk' },
  lang
});

storiesOf('Linked List', module)
  .addDecorator(story => <Provider store={store}><Container>{story()}</Container></Provider>)
  .add('with subtitles', () => (
    <LinkList items={exampleLinks.subtitles} />
  ))
  .add('without subtitles', () => (
    <LinkList
      columns={3}
      items={exampleLinks.without}
    />
  ));
