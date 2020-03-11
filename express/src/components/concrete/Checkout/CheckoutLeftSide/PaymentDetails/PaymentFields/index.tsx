/* tslint:disable:max-line-length */
import * as React from 'react';
import { css } from 'aphrodite/no-important';
import ReactTelInput from 'react-telephone-input';

// Connectors
import { useConfig } from '@src/store/connectors';

// Styles
// tslint:disable-next-line
import '@src/components/concrete/Inputs/PhoneInput/styles.css';
import { margin, padding, pagestyles } from '@src/styles';

// Components
import StyledInput from '@src/components/concrete/Inputs/StyledInput';
import { ConnectedTranslatable as Translatable } from '@src/components/abstract/Translatable';

// Data
import { countries } from '@src/data/checkout/info'; // TODO: change to countries submodule data?

const PaymentFields = (props) => {
  const { config: { countryCode } } = props;
  return (
    <div className={css(margin.top_1)}>
      <div>
        <div className={css(margin.top_2)}>
          <div className={css(pagestyles.row, pagestyles.clearfix)}>
            <div className={css(pagestyles.column, pagestyles.halfColumn, pagestyles.columnFloat, padding.leftright_1)}>
              <StyledInput
                boldLabel={true}
                id="first_name"
                label="users.first_name"
                name="first_name"
              />
            </div>
            <div className={css(pagestyles.column, pagestyles.halfColumn, pagestyles.columnFloat, padding.leftright_1)}>
              <StyledInput
                boldLabel={true}
                id="last_name"
                label="users.last_name"
                name="last_name"
              />
            </div>
          </div>
        </div>
        <div className={css(margin.top_2)}>
          <div className={css(pagestyles.row, pagestyles.clearfix)}>
            <div className={css(pagestyles.fullColumn, padding.leftright_1)}>
              <StyledInput
                id="phone_number"
                label="users.phone_number"
                name="phone_number"
              >
                <ReactTelInput
                  defaultCountry={countryCode}
                  flagsImagePath="/_express/images/utils/flags.png"
                  id="phone_number"
                  name="phone_number"
                  onChange={() => {}} // TODO: make this a proper action
                  value=""
                />
              </StyledInput>
            </div>
          </div>
        </div>
        <div className={css(margin.top_2)}>
          <div className={css(pagestyles.row, pagestyles.clearfix)}>
            <div className={css(pagestyles.fullColumn, padding.leftright_1)}>
              <Translatable attributes={{ placeholder: { transKey: 'checkout.payments_index_form_payment_card_number' } }}>
                <StyledInput
                  boldLabel={true}
                  id="credit_card_number"
                  label="checkout.card_info"
                  name="credit_card_number"
                />
              </Translatable>
            </div>
            <div className={css(pagestyles.column, pagestyles.halfColumn, pagestyles.columnFloat, padding.leftright_1)}>
              <Translatable attributes={{ placeholder: { transKey: 'checkout.payments_index_form_payment_card_expiry' } }}>
                <StyledInput
                  hiddenLabel={true}
                  id="credit_card_expiration"
                  label="checkout.payments_index_form_payment_card_expiry"
                  name="credit_card_expiration"
                />
              </Translatable>
            </div>
            <div className={css(pagestyles.column, pagestyles.halfColumn, pagestyles.columnFloat, padding.leftright_1)}>
              <Translatable attributes={{ placeholder: { transKey: 'checkout.payments_index_form_payment_card_cvv' } }}>
                <StyledInput
                  hiddenLabel={true}
                  id="credit_card_cvv"
                  label="checkout.payments_index_form_payment_card_cvv"
                  name="credit_card_cvv"
                />
              </Translatable>
            </div>
          </div>
        </div>
        <div>
          <div className={css(margin.top_1)}>
            <div className={css(pagestyles.row, pagestyles.clearfix)}>
              <div className={css(pagestyles.column, pagestyles.halfColumn, pagestyles.columnFloat, padding.leftright_1)}>
                <StyledInput
                  boldLabel={true}
                  id="billing_info"
                  label="checkout.billing_info"
                  name="billing_info"
                />
              </div>
              <div className={css(pagestyles.column, pagestyles.halfColumn, pagestyles.columnFloat, padding.leftright_1)}>
                <StyledInput
                  boldLabel={true}
                  id="billing_country"
                  label="checkout.billing_country"
                  name="billing_country"
                  selectOptions={countries}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default useConfig(PaymentFields);
