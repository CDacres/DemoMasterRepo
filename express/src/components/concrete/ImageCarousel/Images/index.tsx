import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';

// Types
import { Image } from '@src/typings/types';

type Props = {
  activeImage: Image;
  linkUrl: string;
  title: string;
};

const Images = ({ activeImage, title }: Props) => (
  <React.Fragment>
    <span className={css(styles.carouselImageHiddenTitle)}>
      {title}
    </span>
    <div className={css(styles.carouselImageWrapper)}>
      <div
        className={css(styles.carouselImageContainerOuter)}
        style={{ transform: `translateX(%)` }}
      >
        <div className={css(styles.carouselImageContainerInner)}>
          <div className={css(styles.carouselImageContainer)}>
            <div
              aria-label={title}
              className={css(styles.carouselImage)}
              role="img"
              style={{ backgroundImage: `url("${activeImage.url}")` }}
            />
          </div>
        </div>
      </div>
    </div>
  </React.Fragment>
);

export default Images;
