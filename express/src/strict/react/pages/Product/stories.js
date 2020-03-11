import * as React from 'react';
import { storiesOf } from '@storybook/react';
import ProductPage from './';

storiesOf('Strict/Pages/Product', module)
  // .addDecorator(story => <Provider store={store}>{story()}</Provider>)
  .add('Meeting', () => (
    <ProductPage />
    ))
  .add('Party', () => (
    <ProductPage />
  ));
