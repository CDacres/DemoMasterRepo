/* tslint:disable:max-line-length */
import * as React from 'react';
import isMobile from 'ismobilejs';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';
import { margin, padding } from '@src/styles';

type Props = {
  baseMargin: object;
  getTranslateX: () => void;
  needsFlex?: boolean;
  options: object[];
};

const CarouselWrapper = ({ getTranslateX, baseMargin, needsFlex, options }: Props) => (
  <div className={css(styles.carouselWrapper, margin.top_0, !isMobile.any ? styles.carouselWrapperDesktop : null)}>
    <div className={css(baseMargin)}>
      <div
        className={css(styles.carouselContainer, needsFlex ? styles.carouselFlex : null, isMobile.any ? styles.carouselContainerMobile : [styles.carouselContainerDesktop, margin.bottom_0_small, margin.bottom_0_large, padding.all_0_small, padding.all_0_large])}
        {...(!isMobile.any ? { style: { transform: `translateX(${getTranslateX()}%)` } } : {})}
      >
        {options}
      </div>
    </div>
  </div>
);

export default CarouselWrapper;
