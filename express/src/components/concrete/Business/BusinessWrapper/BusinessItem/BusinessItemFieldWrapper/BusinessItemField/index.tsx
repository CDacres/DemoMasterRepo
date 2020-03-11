import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';
import { margin, padding, pagestyles } from '@src/styles';

// Components
import StyledInput from '@src/components/concrete/Inputs/StyledInput';
import { ConnectedTranslatable as Translatable } from '@src/components/abstract/Translatable';

// Types
import { StyledInputProps, StyledLabelProps } from '@src/typings/types';

type Props = {
  collapsed: boolean;
} & StyledInputProps & StyledLabelProps;

const BusinessItemField = ({ boldLabel, collapsed, id, label, name, placeholder, selectOptions, value }: Props) => (
  <React.Fragment>
    {collapsed ? (
      <Translatable attributes={{ placeholder: { transKey: placeholder ? placeholder : 'business.item_placeholder' } }}>
        <StyledInput
          boldLabel={boldLabel}
          id={id}
          label={label}
          name={name}
          selectOptions={selectOptions}
          value={value}
        />
      </Translatable>
    ) : (
      <React.Fragment>
        {selectOptions ? (
          <Translatable content={{ transKey: label }}>
            <div className={css(pagestyles.text, pagestyles.fontMedium, margin.all_0)} />
          </Translatable>
        ) : (
          <div className={css(pagestyles.noBottomBorder, padding.top_0, padding.bottom_0_5)}>
            <Translatable content={{ transKey: label }}>
              <div className={css(pagestyles.text, pagestyles.fontMedium, margin.all_0)} />
            </Translatable>
          </div>
        )}
        <Translatable content={{ transKey: value ? value : placeholder ? placeholder : 'business.item_placeholder' }}>
          <div className={css(styles.text, pagestyles.text)} />
        </Translatable>
      </React.Fragment>
    )}
  </React.Fragment>
);

export default BusinessItemField;
