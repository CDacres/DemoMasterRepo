/* tslint:disable:max-line-length */
import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';
import { margin, pagestyles } from '@src/styles';

// Components
import EnclosingLabel from '@src/components/concrete/EnclosingLabel';
import { ConnectedTranslatable as Translatable } from '@src/components/abstract/Translatable';

// Types
import { StyledLabelProps } from '@src/typings/types';

const StyledLabel = ({ boldLabel, hiddenLabel, id, label, required }: StyledLabelProps) => (
  <React.Fragment>
    {hiddenLabel ? (
      <Translatable content={{ transKey: label }}>
        <label
          className={css(pagestyles.hiddenText)}
          htmlFor={id}
        />
      </Translatable>
    ) : (
      <div className={css(margin.bottom_1)}>
        <EnclosingLabel id={id}>
          <Translatable content={{ transKey: label }}>
            <div className={css(pagestyles.text, margin.all_0, boldLabel && pagestyles.fontMedium, required && styles.required)} />
          </Translatable>
        </EnclosingLabel>
      </div>
    )}
  </React.Fragment>
);

export default StyledLabel;
