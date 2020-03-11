import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';
import { pagestyles } from '@src/styles';

// Components
import ModalBottom from '@src/components/concrete/Modal/ModalBottom';
import ModalTop from '@src/components/concrete/Modal/ModalTop';
import { Lock } from '@src/components/concrete/Icons/svgs';
import PaymentFields from '@src/components/concrete/Checkout/CheckoutLeftSide/PaymentDetails/PaymentFields';
import { ConnectedTranslatable as Translatable } from '@src/components/abstract/Translatable';

type Props = {
  onCancelClick: () => void;
  onSuccessClick: () => void;
};

const Payments = ({ onCancelClick, onSuccessClick }: Props) => (
  <React.Fragment>
    <ModalTop text="common.payment_title" />
    <section>
      <PaymentFields />
    </section>
    <ModalBottom
      onCancelClick={onCancelClick}
      onSuccessClick={onSuccessClick}
      successChildren={
        <span className={css(styles.iconText)}>
          <span className={css(styles.buttonIcon)}>
            <Lock stylesArray={[pagestyles.icon, pagestyles.icon18]} />
          </span>
          <Translatable content={{ transKey: 'dashboard.payment_success' }}>
            <span />
          </Translatable>
        </span>
      }
    />
  </React.Fragment>
);

export default Payments;
