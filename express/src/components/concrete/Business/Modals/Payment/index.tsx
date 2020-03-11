import * as React from 'react';

// Components
import ModalBottom from '@src/components/concrete/Modal/ModalBottom';
import ModalTop from '@src/components/concrete/Modal/ModalTop';
import PaymentFields from '@src/components/concrete/Checkout/CheckoutLeftSide/PaymentDetails/PaymentFields';

type Props = {
  onCancelClick: () => void;
  onSuccessClick: () => void;
};

const Payment = ({ onCancelClick, onSuccessClick }: Props) => (
  <React.Fragment>
    <ModalTop text="common.payment_title" />
    <section>
      <PaymentFields />
    </section>
    <ModalBottom
      bottomText="business.payment_text"
      onCancelClick={onCancelClick}
      onSuccessClick={onSuccessClick}
      successText="business.payment_add_card_button"
    />
  </React.Fragment>
);

export default Payment;
