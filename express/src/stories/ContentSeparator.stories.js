import * as React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { storiesOf } from '@storybook/react';

import langObject from '@src/data/langObject';

import Container from './container';

import { ConnectedTranslatable as Translatable } from '@src/components/abstract/Translatable';
import ContentSeparator from '@src/components/concrete/ContentSeparator';

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

storiesOf('Content Separator', module)
  .addDecorator(story => <Provider store={store}><Container>{story()}</Container></Provider>)
  .add('with text', () => (
    <ContentSeparator>
      <Translatable content={{ transKey: 'common.or' }} />
    </ContentSeparator>
  ))
  .add('without text', () => (
    <ContentSeparator />
  ));
