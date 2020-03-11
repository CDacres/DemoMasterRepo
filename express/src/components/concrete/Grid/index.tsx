import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';
import { padding, pagestyles } from '@src/styles';

type Props = {
  children: JSX.Element;
  gridItems: JSX.Element[];
  withMargin?: boolean;
};

const Grid = ({ children, gridItems, withMargin }: Props) => (
  <div className={css(pagestyles.clearfix)}>
    <div>
      <div {...(withMargin ? { className: css(pagestyles.sectionBlockLarge) } : {})}>
        {children}
        <span className={css(pagestyles.hideFont)} />
        <div>
          <div className={css(styles.cardsContainer, padding.all_0_large)}>
            {gridItems}
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Grid;
