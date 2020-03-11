/* tslint:disable:max-line-length */
import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';
import { margin, pagestyles } from '@src/styles';

// Utils
import { removeTrailingZeros } from '@src/utils';

// Components
import { ConnectedTranslatable as Translatable } from '@src/components/abstract/Translatable';

type Props = {
  currencySymbol: string;
  isFirst?: boolean;
  price: number;
  separator?: boolean;
  strikeThrough?: boolean;
  text?: string;
};

const BodySecondLine = ({ currencySymbol, isFirst, price, separator, strikeThrough, text }: Props) => (
  <React.Fragment>
    {(separator && !isFirst) &&
      <React.Fragment>
        {' · '}
      </React.Fragment>
    }
    <span className={css(margin.right_0_5, isFirst ? pagestyles.fontBook : null, strikeThrough ? styles.strikeThrough : null)}>
      {currencySymbol}{removeTrailingZeros(price)}
    </span>
    {text &&
      <Translatable content={{ transKey: text }}>
        <span {...(isFirst ? { className: css(pagestyles.fontBook) } : {})} />
      </Translatable>
    }
  </React.Fragment>
);

export default BodySecondLine;
