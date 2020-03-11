/* tslint:disable:max-line-length */
import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';
import { pagestyles } from '@src/styles';

// Components
import CarouselButton from '@src/components/concrete/ImageCarousel/CarouselButton';

type Props = {
  children: JSX.Element | JSX.Element[];
  isHovered: boolean;
  onChange: (direction: string) => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
};

const ImageCarouselComponent = ({ children, isHovered, onChange, onMouseEnter, onMouseLeave }: Props) => (
  <div
    className={css(pagestyles.relativePosition)}
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
  >
    <div className={css(styles.imageWrapper)}>
      <div className={css(styles.imageContainer)}>
        {children}
        <div
          aria-hidden="false"
          className={css(styles.carouselButtonContainerOuter, !isHovered && styles.carouselButtonContainerOuter_hidden)}
        >
          <div className={css(styles.carouselButtonContainerInner)}>
            <CarouselButton
              direction="left"
              isHovered={isHovered}
              onClick={onChange}
            />
            <CarouselButton
              direction="right"
              isHovered={isHovered}
              onClick={onChange}
            />
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default ImageCarouselComponent;
