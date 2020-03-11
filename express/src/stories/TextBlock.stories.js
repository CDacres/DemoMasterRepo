import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import faker from 'faker';

import langObject from '@src/data/langObject';

import Container from './container';

import GenericHeader from '@src/components/concrete/GenericHeader';
import BodyText from '@src/components/concrete/BodyText';
import Block from '@src/components/concrete/Block';
import QuoteBlock from '@src/components/concrete/QuoteBlock';

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

storiesOf('Text', module)
  .addDecorator(story => <Provider store={store}><Container>{story()}</Container></Provider>)
  .add('block', () => (
    <Block
      bottomMargin
      topMargin
    >
      <React.Fragment>
        <GenericHeader
          tag="h1"
          text={faker.random.words()}
        />
        <BodyText>
          <p>
            {faker.random.words()}
          </p>
        </BodyText>
      </React.Fragment>
    </Block>
  ))
  .add('quote', () => (
    <QuoteBlock>
      <span>
        {faker.lorem.sentence()}
      </span>
    </QuoteBlock>
  ));
