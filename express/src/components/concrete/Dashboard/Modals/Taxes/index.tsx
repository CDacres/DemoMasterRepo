import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import { margin, padding, pagestyles } from '@src/styles';

// Components
import ModalBottom from '@src/components/concrete/Modal/ModalBottom';
import ModalTop from '@src/components/concrete/Modal/ModalTop';
import StyledInput from '@src/components/concrete/Inputs/StyledInput';
import { ConnectedTranslatable as Translatable } from '@src/components/abstract/Translatable';

// Data
import { countries } from '@src/data/checkout/info'; // TODO: change to countries submodule data?

type Props = {
  onCancelClick: () => void;
  onSuccessClick: () => void;
};

const Taxes = ({ onCancelClick, onSuccessClick }: Props) => (
  <React.Fragment>
    <ModalTop text="dashboard.add_vat_id" />
    <Translatable content={{ transKey: 'dashboard.taxes_subtitle' }}>
      <div className={css(pagestyles.text, margin.all_0)} />
    </Translatable>
    <div className={css(margin.top_3)}>
      <div className={css(pagestyles.row, pagestyles.clearfix)}>
        <div className={css(pagestyles.column, pagestyles.halfColumn, pagestyles.columnFloat, padding.leftright_1)}>
          <StyledInput
            boldLabel={true}
            id="country_input"
            label="common.address_country"
            name="country_input"
            selectOptions={countries}
          />
        </div>
        <div className={css(pagestyles.column, pagestyles.halfColumn, pagestyles.columnFloat, padding.leftright_1)}>
          <StyledInput
            boldLabel={true}
            id="vat_id"
            label="dashboard.add_vat_id"
            name="vat_id"
          />
        </div>
      </div>
    </div>
    <div className={css(margin.top_3)}>
      <div className={css(pagestyles.row, pagestyles.clearfix)}>
        <div className={css(pagestyles.fullColumn, padding.leftright_1)}>
          <StyledInput
            boldLabel={true}
            id="name"
            label="dashboard.name_or_registration"
            name="name"
          />
        </div>
      </div>
    </div>
    <div className={css(margin.top_3)}>
      <div className={css(pagestyles.row, pagestyles.clearfix)}>
        <div className={css(pagestyles.fullColumn, padding.leftright_1)}>
          <Translatable attributes={{ placeholder: { transKey: 'common.address_line_one_placeholder' } }}>
            <StyledInput
              boldLabel={true}
              id="address_line_one"
              label="common.address_line_one"
              name="address_line_one"
            />
          </Translatable>
        </div>
      </div>
    </div>
    <div className={css(margin.top_3)}>
      <div className={css(pagestyles.row, pagestyles.clearfix)}>
        <div className={css(pagestyles.fullColumn, padding.leftright_1)}>
          <Translatable attributes={{ placeholder: { transKey: 'common.address_line_two_placeholder' } }}>
            <StyledInput
              boldLabel={true}
              id="address_line_two"
              label="common.address_line_two"
              name="address_line_two"
            />
          </Translatable>
        </div>
      </div>
    </div>
    <div className={css(margin.top_3)}>
      <div className={css(pagestyles.row, pagestyles.clearfix)}>
        <div className={css(pagestyles.column, pagestyles.halfColumn, pagestyles.columnFloat, padding.leftright_1)}>
          <Translatable attributes={{ placeholder: { transKey: 'common.address_city_placeholder' } }}>
            <StyledInput
              boldLabel={true}
              id="city"
              label="common.address_city"
              name="city"
            />
          </Translatable>
        </div>
        <div className={css(pagestyles.column, pagestyles.halfColumn, pagestyles.columnFloat, padding.leftright_1)}>
          <Translatable attributes={{ placeholder: { transKey: 'common.address_county_placeholder' } }}>
            <StyledInput
              boldLabel={true}
              id="province"
              label="common.address_county"
              name="province"
            />
          </Translatable>
        </div>
      </div>
    </div>
    <div className={css(margin.top_3)}>
      <div className={css(pagestyles.row, pagestyles.clearfix)}>
        <div className={css(pagestyles.fullColumn, padding.leftright_1)}>
          <Translatable attributes={{ placeholder: { transKey: 'common.address_postal_code_placeholder' } }}>
            <StyledInput
              boldLabel={true}
              id="postal_code"
              label="common.address_postal_code"
              name="postal_code"
            />
          </Translatable>
        </div>
      </div>
    </div>
    <ModalBottom
      onCancelClick={onCancelClick}
      onSuccessClick={onSuccessClick}
      successText="common.add"
    />
  </React.Fragment>
);

export default Taxes;
