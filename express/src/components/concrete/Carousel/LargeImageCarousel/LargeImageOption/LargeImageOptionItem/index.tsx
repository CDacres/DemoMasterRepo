/* tslint:disable:max-line-length */
import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';
import carouselStyles from '../../../styles';
import { margin, padding, pagestyles } from '@src/styles';

// Components
import Image from '@src/components/concrete/Carousel/LargeImageCarousel/LargeImageOption/LargeImageOptionItem/Image';

// Types
import { CarouselOptionProps } from '@src/typings/types';

const LargeImageOptionItem = ({ image, imageAdjustments, images, lazyLoadImages, link, linkComponent, linkComponentProps, maxOptions, text, threeImg, title }: CarouselOptionProps) => {
  const BrowserLink = linkComponent;
  return (
    <BrowserLink
      aria-busy="false"
      className={css(styles.largeOptionLink)}
      href={link}
      {...linkComponentProps}
    >
      <div className={css(styles.carouselContainer, maxOptions.large === 5 ? styles.carouselContainerLarge : styles.carouselContainerSmall)}>
        <div className={css(styles.innerImageWrapper, maxOptions.large === 5 ? styles.innerImageWrapperLarge : styles.innerImageWrapperSmall)}>
          {!threeImg ? (
            <Image
              alt=""
              imageAdjustments={imageAdjustments}
              lazyLoadImages={lazyLoadImages}
              paddingTop={maxOptions.large === 7 ? 66.6667 : 100}
              src={image}
            />
          ) : (
            <div className={css(styles.threeImgWrapper)}>
              <div className={css(styles.threeImgContainer)}>
                <div className={css(styles.threeImgInner)}>
                  <div className={css(styles.mainImgWrapper, padding.right_0_5)}>
                    <div className={css(styles.imgInner)}>
                      <Image
                        alt=""
                        imageAdjustments={imageAdjustments}
                        lazyLoadImages={lazyLoadImages}
                        paddingTop={150}
                        src={images.main}
                      />
                    </div>
                  </div>
                  <div className={css(styles.sideImgWrapper)}>
                    <div className={css(styles.sideImgContainer, padding.bottom_0_25)}>
                      <div className={css(styles.imgInner)}>
                        <Image
                          alt=""
                          imageAdjustments={imageAdjustments}
                          lazyLoadImages={lazyLoadImages}
                          paddingTop={175}
                          src={images.top}
                        />
                      </div>
                    </div>
                    <div className={css(styles.sideImgContainer, padding.top_0_25)}>
                      <div className={css(styles.imgInner)}>
                        <Image
                          alt=""
                          imageAdjustments={imageAdjustments}
                          lazyLoadImages={lazyLoadImages}
                          paddingTop={175}
                          src={images.bottom}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className={css(padding.top_1_5, padding.bottom_2, padding.leftright_2)}>
          <div
            className={css(carouselStyles.optionTextWrapper)}
            role="text"
          >
            {title &&
              <div
                className={css(styles.titleWrapper, pagestyles.text, pagestyles.fontMedium, pagestyles.textMap, margin.all_0)}
                title={title}
              >
                {title}
              </div>
            }
            <div className={css(margin.top_0_25)}>
              <div
                className={css(styles.textWrapper, pagestyles.smallText, pagestyles.textMap, margin.all_0)}
                title={text}
              >
                {text}
              </div>
            </div>
          </div>
        </div>
      </div>
    </BrowserLink>
  );
};

export default LargeImageOptionItem;
