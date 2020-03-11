/* tslint:disable:max-line-length */
import * as React from 'react';
import LazyLoad from 'react-lazyload';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';
import carouselStyles from '../../../../styles';

// Components
import LazyLoadImage from '@src/components/abstract/LazyLoadImage';

type Props = {
  alt: string;
  imageAdjustments?: object;
  lazyLoadImages: boolean;
  paddingTop: number;
  src: string;
};

const Image = ({ alt, imageAdjustments, lazyLoadImages, paddingTop, src }: Props) => (
  <div
    className={css(styles.imgWrapper)}
    style={{ paddingTop: `${paddingTop}%` }}
  >
    <div className={css(carouselStyles.cardImageContainer)}>
      {lazyLoadImages ? (
        <LazyLoad
          height="100%"
          offset={200}
          once={true}
        >
          <LazyLoadImage src={src}>
            {urlSrc => (
              <div
                className={css(styles.imgDiv)}
                style={{
                  backgroundImage: `url(${urlSrc})`,
                  ...imageAdjustments,
                }}
              />
            )}
          </LazyLoadImage>
        </LazyLoad>
      ) : (
        <React.Fragment>
          <img
            alt={alt}
            className={css(styles.img)}
            decoding="async"
            src={src}
          />
          <div
            className={css(styles.imgDiv)}
            style={{ backgroundImage: `url(${src})` }}
          />
        </React.Fragment>
      )}
    </div>
  </div>
);

export default Image;
