import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';
import { pagestyles } from '@src/styles';

type Props = {
  children: JSX.Element;
};

const IconCell = ({ children }: Props) => (
  <div className={css(styles.wrapper)}>
    <div className={css(pagestyles.relativePosition)}>
      <div>
        <span>
          {children}
        </span>
      </div>
    </div>
  </div>
);

export default IconCell;
