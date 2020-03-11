import * as React from 'react';
import { Provider } from 'react-redux';
import { storiesOf } from '@storybook/react';
import { initializeStore } from '@src/store';

import Container from './container';

import Pagination from '@src/components/concrete/Pagination';

import langObject from '@src/data/langObject';

const lang = langObject();
const store = initializeStore({ lang });

storiesOf('Pagination', module)
  .add('pagination', () => (
    <Provider store={store}>
      <Container>
        <Pagination
          currentPage={1}
          lastPage={15}
        />
      </Container>
    </Provider>
  ));
