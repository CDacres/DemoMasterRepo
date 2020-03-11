/* tslint:disable:max-line-length */
import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';
import carouselStyles from '../../styles';
import { padding } from '@src/styles';

// Components
import { FullScreenModal } from '@src/components/abstract/MediaQuery';
import LargeImageOptionItem from '@src/components/concrete/Carousel/LargeImageCarousel/LargeImageOption/LargeImageOptionItem';
import OptionBlockItem from '@src/components/concrete/Carousel/OptionBlock/OptionBlockItem';

// Types
import { CarouselOptionProps } from '@src/typings/types';

const LargeImageOption = ({ image, imageAdjustments, images, isFirst, isLast, lazyLoadImages, link, linkComponent, linkComponentProps, maxOptions, text, threeImg, title }: CarouselOptionProps) => {
  const optionWidth = maxOptions.large === 8 ? styles.optionWidth8 : maxOptions.large === 7 ? styles.optionWidth7 : styles.optionWidth5;
  return (
    <FullScreenModal>
      {matches => {
        if (matches) {
          return (
            <OptionBlockItem
              isFirst={isFirst}
              isLarge={true}
              isLast={isLast}
            >
              <LargeImageOptionItem
                image={image}
                imageAdjustments={imageAdjustments}
                images={images}
                lazyLoadImages={lazyLoadImages}
                link={link}
                linkComponent={linkComponent}
                linkComponentProps={linkComponentProps}
                maxOptions={maxOptions}
                text={text}
                threeImg={threeImg}
                title={title}
              />
            </OptionBlockItem>
          );
        }
        return (
          <div className={css(carouselStyles.carouselWrapper, styles.largeImageWrapper, optionWidth)}>
            <div className={css(carouselStyles.carouselOptionContainerInner, padding.leftright_0_75, padding.leftright_1_small, padding.bottom_0_large)}>
              <LargeImageOptionItem
                image={image}
                imageAdjustments={imageAdjustments}
                images={images}
                lazyLoadImages={lazyLoadImages}
                link={link}
                linkComponent={linkComponent}
                linkComponentProps={linkComponentProps}
                maxOptions={maxOptions}
                text={text}
                threeImg={threeImg}
                title={title}
              />
            </div>
          </div>
        );
      }}
    </FullScreenModal>
  );
};

export default LargeImageOption;
