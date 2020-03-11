import * as React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { storiesOf } from '@storybook/react';

import langObject from '@src/data/langObject';

import Modal from '@src/components/concrete/Modal';
import Location from '@src/components/concrete/Admin/Modals/Location';

const lang = langObject();

const store = createStore((state, action) => {
  switch (action.type) {
    default:
      return state;
  }
}, {
  config: { domain: 'uk' },
  lang,
  responsive: {},
});

const somethingHappened = () => {
  console.log('Something Happened');
};

storiesOf('Admin Components', module)
  .addDecorator(story => <Provider store={store}>{story()}</Provider>)
  .add('modal - location', () => (
    <Modal>
      <Location
        onCancelClick={somethingHappened}
        onSuccessClick={somethingHappened}
      />
    </Modal>
  ));
