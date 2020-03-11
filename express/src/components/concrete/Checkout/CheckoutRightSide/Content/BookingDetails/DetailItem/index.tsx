import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';
import { margin, pagestyles } from '@src/styles';

type Props = {
  children: JSX.Element | JSX.Element[];
  icon: JSX.Element;
};

const DetailItem = ({ children, icon }: Props) => (
  <div className={css(styles.itemWrapper)}>
    <div className={css(styles.itemContainer)}>
      {icon}
    </div>
    <div className={css(styles.itemContainer)}>
      <div>
        <div className={css(pagestyles.text, margin.all_0)}>
          {children}
        </div>
      </div>
    </div>
  </div>
);

export default DetailItem;
