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
import ModalBottom from '@src/components/concrete/Modal/ModalBottom';
import ModalTop from '@src/components/concrete/Modal/ModalTop';
import RadioButton from '@src/components/concrete/Inputs/RadioButton';
import StyledCheckbox from '@src/components/concrete/Inputs/StyledCheckbox';
import StyledInput from '@src/components/concrete/Inputs/StyledInput';

// Data
import { checkboxes, radioOptions } from '@src/data/dashboard/teamModalOptions';

const TeamAndMembers = (props) => {
  const { config: { countryCode }, onCancelClick, onSuccessClick } = props;
  return (
    <React.Fragment>
      <ModalTop text="common.edit" />
      <div className={css(margin.top_3)}>
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
      <div className={css(margin.top_3)}>
        <div className={css(pagestyles.row, pagestyles.clearfix)}>
          <div className={css(pagestyles.column, pagestyles.halfColumn, pagestyles.columnFloat, padding.leftright_1)}>
            <StyledInput
              boldLabel={true}
              id="email"
              label="users.email"
              name="email"
              required={true}
            />
          </div>
          <div className={css(pagestyles.column, pagestyles.halfColumn, pagestyles.columnFloat, padding.leftright_1)}>
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
      <div className={css(margin.top_3)}>
        <div className={css(pagestyles.row, pagestyles.clearfix)}>
          <div className={css(pagestyles.fullColumn, padding.leftright_1)}>
            <RadioButton
              defaultOption="1"
              isLarge={true}
              name="admin_level"
              noBorder={true}
              radioPosition="left"
              options={radioOptions}
            />
          </div>
          {checkboxes.map((item, index) => (
            <div
              className={css(pagestyles.column, pagestyles.halfColumn, pagestyles.columnFloat, padding.leftright_1)}
              key={index}
            >
              <StyledCheckbox
                id={`venues_${index}`}
                label={item.label}
                name="venues[]"
                value={item.id}
              />
            </div>
          ))}
        </div>
      </div>
      <ModalBottom
        onCancelClick={onCancelClick}
        onSuccessClick={onSuccessClick}
        successText="common.save"
      />
    </React.Fragment>
  );
};

export default useConfig(TeamAndMembers);
