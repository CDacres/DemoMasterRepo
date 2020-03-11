import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';

type Props = {
  children: JSX.Element | JSX.Element[];
};

const CarouselNavComponent = ({ children }: Props) => (
  <div className={css(styles.carouselNavOuter)}>
    <div className={css(styles.carouselNavInner)}>
      {children}
    </div>
  </div>
);

export default CarouselNavComponent;
