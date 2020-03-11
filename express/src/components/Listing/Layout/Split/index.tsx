import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';

type Props = {
  children: React.ReactNode;
  right?: React.ReactNode;
  style?: React.CSSProperties;
  variant: 's25' | 's33' | 's50' | 's50x' | 's50l' | 's66' | 's66l' | 's75' | 's75l' | 's100';
};

const Split = ({ children, right, style, variant }: Props) => (
  <div
    className={css(styles[variant])}
    style={style}
  >
    {children}
    {right &&
      <div>
        {right}
      </div>
    }
  </div>
);

export default Split;
