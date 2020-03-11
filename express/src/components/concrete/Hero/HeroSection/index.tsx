import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';

type Props = {
  children?: JSX.Element;
};

const HeroSection = ({ children }: Props) => (
  <div className={css(styles.container)}>
    <section>
      {children}
    </section>
  </div>
);

export default HeroSection;
