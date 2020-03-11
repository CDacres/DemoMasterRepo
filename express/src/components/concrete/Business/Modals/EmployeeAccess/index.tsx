import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import { margin, pagestyles } from '@src/styles';

// Components
import ModalBottom from '@src/components/concrete/Modal/ModalBottom';
import ModalTop from '@src/components/concrete/Modal/ModalTop';
import StyledInput from '@src/components/concrete/Inputs/StyledInput';
import { ConnectedTranslatable as Translatable } from '@src/components/abstract/Translatable';

type Props = {
  onCancelClick: () => void;
  onSuccessClick: () => void;
};

const EmployeeAccess = ({ onCancelClick, onSuccessClick }: Props) => (
  <React.Fragment>
    <ModalTop text="business.employee_add_domain" />
    <section>
      <Translatable content={{ transKey: 'business.employee_text' }}>
        <div className={css(pagestyles.text, pagestyles.fontMedium, margin.all_0)} />
      </Translatable>
      <div className={css(margin.top_3, margin.bottom_1)}>
        <StyledInput
          icon="@"
          id="domain"
          label="business.employee_domain"
          name="domain"
          placeholder="company.com"
        />
      </div>
    </section>
    <ModalBottom
      onCancelClick={onCancelClick}
      onSuccessClick={onSuccessClick}
      successText="business.employee_button"
    />
  </React.Fragment>
);

export default EmployeeAccess;
