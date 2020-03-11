import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';
import { margin, pagestyles } from '@src/styles';

// Components
import StyledInput from '@src/components/concrete/Inputs/StyledInput';
import StyledLabel from '@src/components/concrete/Inputs/StyledLabel';
import StyledButton from '@src/components/concrete/Button/StyledButton';
import { ConnectedTranslatable as Translatable } from '@src/components/abstract/Translatable';

type Props = {
  disabled?: boolean;
  onClick: () => void;
};

const OfficeLocationItem = ({ disabled, onClick }: Props) => (
  <div className={css(styles.wrapper)}>
    <div className={css(pagestyles.tableCellBottom)}>
      <div className={css(styles.space)}>
        <StyledLabel
          boldLabel={true}
          id="office_name"
          label="business.office_location_name"
        />
        <Translatable attributes={{ placeholder: { transKey: 'business.office_location_enter_name' } }}>
          <StyledInput
            id="office_name"
            name="office_name"
          />
        </Translatable>
      </div>
    </div>
    <div className={css(pagestyles.tableCellBottom)}>
      <div className={css(styles.space)}>
        <StyledLabel
          boldLabel={true}
          id="address"
          label="business.office_location_address"
        />
        <Translatable attributes={{ placeholder: { transKey: 'business.office_location_search_address' } }}>
          <StyledInput
            id="address"
            name="address"
          />
        </Translatable>
        {/* TODO: add autocomplete */}
      </div>
    </div>
    <div className={css(pagestyles.tableCellBottom)}>
      <div className={css(margin.bottom_1)}>
        <Translatable content={{ transKey: 'common.add' }}>
          <StyledButton
            action={onClick}
            buttonColor="primary"
            buttonStyle="updated"
            disabled={disabled}
          />
        </Translatable>
      </div>
    </div>
  </div>
);

export default OfficeLocationItem;
