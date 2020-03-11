import * as React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { storiesOf } from '@storybook/react';

import langObject from '@src/data/langObject';

import ErrorPage from '@src/components/concrete/ErrorPage';

const lang = langObject();

const store = createStore((state, action) => {
  switch (action.type) {
    default:
      return state;
  }
}, {
  config: { domain: 'uk' },
  lang,
  responsive: {}
});

storiesOf('Pages/errors', module)
  .addDecorator(story => <Provider store={store}>{story()}</Provider>)
  .add('access denied', () => (
    <ErrorPage
      error="error.error_denied"
      src="/_express/images/commonsite/info_deny_1.gif"
      subtitle="error.error_subtitle_denied"
    />
  ))
  .add('not found', () => (
    <ErrorPage
      error="error.error_notfound"
      src="/_express/images/commonsite/info_deny_3.gif"
      subtitle="error.error_subtitle_notfound"
    />
  ));
