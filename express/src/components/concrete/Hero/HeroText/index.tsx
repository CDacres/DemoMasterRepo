import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';

type Props = {
  children?: string;
};

const HeroText = ({ children }: Props) => (
  <div className={css(styles.text)}>
    {children}
  </div>
);

export default HeroText;
