import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';
import { margin, pagestyles } from '@src/styles';

// Components
import EnclosingLabel from '@src/components/concrete/EnclosingLabel';
import { BottomSidebar } from '@src/components/abstract/MediaQuery';
import { Amex, GooglePay, MasterCard, Paypal, Visa } from '@src/components/concrete/Icons/svgs';
import IconWrapper from '@src/components/concrete/Checkout/CheckoutLeftSide/PaymentDetails/IconWrapper';
import PaymentFields from '@src/components/concrete/Checkout/CheckoutLeftSide/PaymentDetails/PaymentFields';
import { ConnectedTranslatable as Translatable } from '@src/components/abstract/Translatable';

type Props = {
  label: string;
};

const PaymentDetails = ({ label }: Props) => (
  <div>
    <div>
      <div className={css(margin.bottom_1)}>
        <div>
          <EnclosingLabel>
            <div className={css(margin.bottom_1, margin.right_3)}>
              <Translatable content={{ transKey: label }}>
                <div className={css(pagestyles.text, pagestyles.fontMedium, margin.all_0)} />
              </Translatable>
            </div>
          </EnclosingLabel>
          <BottomSidebar>
            {matches => {
              if (matches) {
                return (
                  <div>
                    <IconWrapper>
                      <Visa stylesArray={[styles.icon]} />
                    </IconWrapper>
                    <IconWrapper>
                      <Amex stylesArray={[styles.icon]} />
                    </IconWrapper>
                    <IconWrapper>
                      <MasterCard stylesArray={[styles.icon]} />
                    </IconWrapper>
                    <IconWrapper>
                      <Paypal stylesArray={[styles.icon]} />
                    </IconWrapper>
                    <IconWrapper>
                      <GooglePay stylesArray={[styles.icon]} />
                    </IconWrapper>
                  </div>
                );
              }
              return (
                <span className={css(styles.iconWrapper)}>
                  <IconWrapper>
                    <Visa stylesArray={[styles.icon]} />
                  </IconWrapper>
                  <IconWrapper>
                    <Amex stylesArray={[styles.icon]} />
                  </IconWrapper>
                  <IconWrapper>
                    <MasterCard stylesArray={[styles.icon]} />
                  </IconWrapper>
                  <IconWrapper>
                    <Paypal stylesArray={[styles.icon]} />
                  </IconWrapper>
                  <IconWrapper>
                    <GooglePay stylesArray={[styles.icon]} />
                  </IconWrapper>
                </span>
              );
            }}
          </BottomSidebar>
        </div>
      </div>
      {/* TODO: add payment type drop down here */}
    </div>
    <PaymentFields />
  </div>
);

export default PaymentDetails;
