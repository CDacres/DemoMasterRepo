/* tslint:disable:max-line-length */
import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';
import { margin, pagestyles } from '@src/styles';

// Types
type Props = {
  smallDot?: boolean;
  spacing?: 'dotsWrapperButton' | 'dotsWrapperLarge' | 'dotsWrapperSmall';
  whiteDot?: boolean;
};

const LoadingAnimation: React.FunctionComponent<Props> = ({ smallDot, spacing, whiteDot }) => (
  <div className={css(styles[spacing], pagestyles.relativePosition)}>
    <div className={css(styles.dotsContainer)}>
      <div className={css(styles.dots, styles.firstDot, smallDot ? [styles.dotsSmall, margin.right_0_5] : margin.right_1, whiteDot ? styles.dotsWhite : null)} />
      <div className={css(styles.dots, styles.secondDot, smallDot ? [styles.dotsSmall, margin.right_0_5] : margin.right_1, whiteDot ? styles.dotsWhite : null)} />
      <div className={css(styles.dots, smallDot ? styles.dotsSmall : null, whiteDot ? styles.dotsWhite : null)} />
    </div>
  </div>
);

LoadingAnimation.defaultProps = {
  smallDot: false,
  spacing: 'dotsWrapperLarge',
  whiteDot: false,
};

export default LoadingAnimation;
