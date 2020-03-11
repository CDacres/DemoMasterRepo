import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';
import { margin, padding, pagestyles } from '@src/styles';

// Components
import BodyText from '@src/components/concrete/BodyText';

type Props = {
  children: JSX.Element | JSX.Element[];
};

const QuoteBlock = ({ children }: Props) => (
  <div className={css(pagestyles.relativePosition)}>
    <div className={css(margin.topbottom_10, margin.leftright_0)}>
      <BodyText>
        <span className={css(styles.quoteMark)}>
          “
        </span>
        {children}
      </BodyText>
      <div className={css(styles.base, pagestyles.column, pagestyles.sixthColumnLargeScreen, padding.leftright_1)} />
    </div>
  </div>
);

export default QuoteBlock;
