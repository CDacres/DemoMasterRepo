/* tslint:disable:max-line-length */
import * as React from 'react';
import LazyLoad from 'react-lazyload';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';
import carouselStyles from '../../../../styles';

// Components
import LazyLoadImage from '@src/components/abstract/LazyLoadImage';
import SvgLine from '@src/components/concrete/Icons/SvgLine';

type Props = {
  image?: string;
  imageAdjustments?: object;
  imageText?: string;
  imageTextColor: string;
  lazyLoadImages: boolean;
  verticalId: number;
};

const OptionImageWithTextComponent = ({ image, imageAdjustments, imageText, imageTextColor, lazyLoadImages, verticalId }: Props) => (
  <div>
    <div className={css(carouselStyles.optionImageWithTextContainer)}>
      <div className={css(carouselStyles.cardImageAbsolute)}>
        <div className={css(styles.optionImageWithTextInnerWrapper)}>
          <div className={css(styles.optionImageWithTextInner)}>
            <div className={css(styles.cardImageInnerAbsolute)}>
              <div className={css(styles.cardImageInnerWrapper)}>
                {lazyLoadImages ? (
                  <LazyLoad
                    height="100%"
                    offset={200}
                    once={true}
                  >
                    <LazyLoadImage src={image}>
                      {src => (
                        <div className={css(carouselStyles.cardImageContainer)}>
                          <div
                            aria-label={imageText}
                            className={css(carouselStyles.cardImage, carouselStyles.cardImageFull)}
                            style={{
                              backgroundImage: `url(${src})`,
                              ...imageAdjustments,
                            }}
                          />
                        </div>
                      )}
                    </LazyLoadImage>
                  </LazyLoad>
                ) : (
                  <div className={css(carouselStyles.cardImageContainer)}>
                    <img
                      alt={imageText}
                      className={css(styles.cardImage)}
                      src={image}
                    />
                    <div
                      aria-label={imageText}
                      className={css(styles.cardImageDiv)}
                      style={{
                        backgroundImage: `url(${image})`,
                        ...imageAdjustments,
                      }}
                    />
                  </div>
                )}
              </div>
            </div>
            {imageText &&
              <div className={css(styles.cardImageTextWrapper)}>
                <div className={css(styles.cardImageTextContainer)}>
                  <span
                    className={css(styles.cardImageText)}
                    style={{ color: imageTextColor }}
                  >
                    {imageText}
                    <SvgLine verticalId={verticalId} />
                  </span>
                </div>
              </div>
            }
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default OptionImageWithTextComponent;
