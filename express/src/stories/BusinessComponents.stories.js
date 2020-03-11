import * as React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { storiesOf } from '@storybook/react';

import langObject from '@src/data/langObject';

import Container from './container';

import Modal from '@src/components/concrete/Modal';
import EmployeeAccess from '@src/components/concrete/Business/Modals/EmployeeAccess';
import Payment from '@src/components/concrete/Business/Modals/Payment';
import AddInfoItem from '@src/components/concrete/Business/BusinessWrapper/AddInfoItem';
import DomainItem from '@src/components/concrete/Business/BusinessWrapper/DomainItem';
import OfficeLocationItem from '@src/components/concrete/Business/BusinessWrapper/OfficeLocationItem';
import PaymentItem from '@src/components/concrete/Business/BusinessWrapper/PaymentItem';
import PriceAlertItem from '@src/components/concrete/Business/BusinessWrapper/PriceAlertItem';

const lang = langObject();

import { settingsFieldData } from '@src/data/business/page';

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

storiesOf('Business Components', module)
  .addDecorator(story => <Provider store={store}>{story()}</Provider>)
  .add('add info button for modal', () => (
    <Container>
      <AddInfoItem
        onClick={somethingHappened}
        text="business.settings_payment_add"
      />
    </Container>
  ))
  .add('domain item', () => (
    <Container>
      <DomainItem
        peopleCount={settingsFieldData.people_count}
        text={settingsFieldData.display_name}
      />
    </Container>
  ))
  .add('modal - employee access', () => (
    <Modal>
      <EmployeeAccess
        onCancelClick={somethingHappened}
        onSuccessClick={somethingHappened}
      />
    </Modal>
  ))
  .add('modal - payments', () => (
    <Modal>
      <Payment
        onCancelClick={somethingHappened}
        onSuccessClick={somethingHappened}
      />
    </Modal>
  ))
  .add('office location item', () => (
    <Container>
      <OfficeLocationItem />
    </Container>
  ))
  .add('payment item', () => (
    <Container>
      <PaymentItem
        subtitle="business.settings_payment_item_subtitle"
        title="business.settings_payment_item_title"
      />
    </Container>
  ))
  .add('price alert', () => (
    <Container>
      <PriceAlertItem options={[]} />
    </Container>
  ))
  .add('price alert - with city input', () => (
    <Container>
      <PriceAlertItem
        options={[]}
        withLocation
      />
    </Container>
  ));
