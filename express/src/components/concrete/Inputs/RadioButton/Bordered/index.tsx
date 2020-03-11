/* tslint:disable:max-line-length */
import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';
import radioStyles from '../styles';
import { margin, padding, pagestyles } from '@src/styles';

// Types
import { Radio, RadioExtraText } from '@src/typings/types';

type Props = {
  children: JSX.Element;
  selectedOption: boolean;
} & Radio & RadioExtraText;

const Bordered = ({ children, extraText, radioPosition, selectedOption }: Props) => (
  <div className={css(styles.container, margin.bottom_2, padding.all_3, selectedOption ? styles.radioSelected : styles.radioDefault)}>
    <div className={css(pagestyles.fullColumn, pagestyles.tableCell)}>
      {children}
    </div>
    {extraText &&
      <React.Fragment>
        {radioPosition === 'left' ? (
          <div className={css(styles.priceWrapper, margin.left_5, margin.top_2)}>
            <div className={css(radioStyles.textContainer)}>
              <strong>
                {extraText.text}
              </strong>
              {extraText.subtext &&
                <span className={css(styles.text)}>
                  {extraText.subtext}
                </span>
              }
            </div>
          </div>
        ) : (
          // no example found yet of right radio with border and extra text...
          null
        )}
      </React.Fragment>
    }
  </div>
);

export default Bordered;
