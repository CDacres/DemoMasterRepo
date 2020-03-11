import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';
import { margin, pagestyles } from '@src/styles';

// Components
import EnclosingLabel from '@src/components/concrete/EnclosingLabel';
import { ConnectedTranslatable as Translatable } from '@src/components/abstract/Translatable';

type Props = {
  currencySymbol: string;
  id: string;
  inputId: string;
  transKey: string;
  value: number | string;
};

const Input = ({ currencySymbol, id, inputId, transKey, value }: Props) => (
  <EnclosingLabel>
    <Translatable content={{ transKey: transKey }}>
      <span
        className={css(pagestyles.hiddenText)}
        id={id}
      />
    </Translatable>
    <div className={css(styles.priceLabel, margin.bottom_1)}>
      <div className={css(pagestyles.columnFloat)}>
        <div className={css(styles.currencyWrapper)}>
          <div className={css(styles.currencyContainer)}>
            <div className={css(pagestyles.tableCellMiddle)}>
              <span>
                {currencySymbol}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className={css(styles.numberWrapper)}>
        <input
          aria-describedby={id}
          className={css(styles.numberContainer, margin.all_0)}
          id={inputId}
          name={inputId}
          type="text"
          value={value}
        />
      </div>
    </div>
  </EnclosingLabel>
);

export default Input;
