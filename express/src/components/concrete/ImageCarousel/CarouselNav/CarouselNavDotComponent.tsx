import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';

type Props = {
  isActive: boolean;
  isAtEnd: boolean;
};

const CarouselNavDotComponent = ({ isActive, isAtEnd }: Props) => (
  <div
    className={css(styles.carouselNavDot, isActive && styles.carouselNavDotActive)}
    style={{
      transform: !isActive ? isAtEnd ? 'scale(0.666667)' : 'scale(1)' : 'scale(1)',
      width: !isActive ? isAtEnd ? '10.6667px' : 16 : 18,
      opacity: isAtEnd ? 0.875 : 1,
    }}
  />
);

export default CarouselNavDotComponent;
