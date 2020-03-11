import * as React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { storiesOf } from '@storybook/react';

import langObject from '@src/data/langObject';
import { sideMenu, termsOfUse, venuePolicy, privacyPolicy } from '@src/data/pages/legal';

import Container from './container';

import LegalSideMenu from '@src/components/concrete/Legal/LegalSideMenu';
import LegalTextBlock from '@src/components/concrete/Legal/LegalTextBlock';

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

storiesOf('Legal Section', module)
  .addDecorator(story => <Provider store={store}><Container>{story()}</Container></Provider>)
  .add('all together', () => (
    <React.Fragment>
      <LegalSideMenu sideMenu={sideMenu} />
      <LegalTextBlock sections={[termsOfUse, venuePolicy, privacyPolicy]} />
    </React.Fragment>
  ))
  .add('block sections', () => (
    <LegalTextBlock sections={[termsOfUse, venuePolicy, privacyPolicy]} />
  ))
  .add('side menu', () => (
    <LegalSideMenu sideMenu={sideMenu} />
  ));
