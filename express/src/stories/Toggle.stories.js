import * as React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { storiesOf } from '@storybook/react';
import shortid from 'shortid';

import Container from './container';

import langObject from '@src/data/langObject';
import { toggles } from '@src/data/pages/faq';

import Toggle from '@src/components/concrete/Toggle';

const lang = langObject();

const store = createStore((state, action) => {
  switch (action.type) {
    default:
      return state;
  }
}, { lang });

storiesOf('Toggle', module)
  .add('list of toggles', () => (
    <Provider store={store}>
      <Container>
        {toggles.sections.map((section, index) => (
          <Toggle
            index={index}
            key={shortid.generate()}
            length={toggles.sections.length}
            sectionBody={section.section_body}
            sectionTitle={section.section_title}
          />
        ))}
      </Container>
    </Provider>
  ));
