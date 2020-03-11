import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';
import { margin, pagestyles } from '@src/styles';

// Components
import CheckoutLeftSide from '@src/components/concrete/Checkout/CheckoutLeftSide';
import CancellationPolicy from '@src/components/concrete/Checkout/CheckoutLeftSide/CancellationPolicy';
import LegalSection from '@src/components/concrete/Checkout/CheckoutLeftSide/LegalSection';
import MotivationSection from '@src/components/concrete/Checkout/CheckoutLeftSide/MotivationSection';
import PaymentDetails from '@src/components/concrete/Checkout/CheckoutLeftSide/PaymentDetails';
import Title from '@src/components/concrete/Checkout/CheckoutLeftSide/Title';
import InteractionButton from '@src/components/concrete/Button/InteractionButton';
import StyledButton from '@src/components/concrete/Button/StyledButton';
import { ConnectedTranslatable as Translatable } from '@src/components/abstract/Translatable';
import { Lock } from '@src/components/concrete/Icons/svgs';

// Data
import { info, steps } from '@src/data/checkout/info';

type Props = {
  cancellationClick: () => void;
  couponClick: () => void;
  onClick: () => void;
};

const PaymentStep = ({ cancellationClick, couponClick, onClick }: Props) => (
  <CheckoutLeftSide>
    <Title text={steps.payment.title} />
    <MotivationSection
      description={info.motivationDescription}
      text={info.motivationText}
    />
    <PaymentDetails label="checkout.payments_index_form_payment_card_heading" />
    <div className={css(margin.top_3)}>
      <div>
        <Translatable content={{ transKey: 'checkout.apply_coupon' }}>
          <InteractionButton action={couponClick} />
        </Translatable>
      </div>
    </div>
    <CancellationPolicy
      description={info.cancelDescription}
      onClick={cancellationClick}
      title={info.cancelTitle}
    />
    <LegalSection text={info.legalText} />
    <div>
      <div>
        <div className={css(margin.top_4, margin.bottom_6)}>
          <div>
            <div>
              <StyledButton
                action={onClick}
                buttonColor="primary"
                buttonStyle="updated"
              >
                <div className={css(styles.buttonContentWrapper)}>
                  <div className={css(styles.innerWrapper)}>
                    <div className={css(margin.right_1_5)}>
                      <Lock stylesArray={[pagestyles.icon, pagestyles.icon18]} />
                    </div>
                  </div>
                  <div className={css(styles.innerWrapper)}>
                    <Translatable content={{ transKey: steps.payment.buttonText }}>
                      <div />
                    </Translatable>
                  </div>
                </div>
              </StyledButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  </CheckoutLeftSide>
);

export default PaymentStep;
