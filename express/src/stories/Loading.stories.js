import * as React from 'react';
import { storiesOf } from '@storybook/react';

import Container from './container';

import LoadingAnimation from '@src/components/concrete/LoadingAnimation';

storiesOf('Loading Animation', module)
  .addDecorator(story => <Container>{story()}</Container>)
  .add('size - button', () => (
    <LoadingAnimation spacing="dotsWrapperButton" />
  ))
  .add('size - large', () => (
    <LoadingAnimation />
  ))
  .add('size - small', () => (
    <LoadingAnimation spacing="dotsWrapperSmall" />
  ))
  .add('small dots', () => (
    <LoadingAnimation
      smallDot
      spacing="dotsWrapperSmall"
    />
  ))
  .add('white dots', () => (
    // TODO: add background so you can see white dots...
    <LoadingAnimation
      spacing="dotsWrapperSmall"
      whiteDot
    />
  ));
