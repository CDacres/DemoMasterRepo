/* tslint:disable:max-line-length */
import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import carouselStyles from '../styles';
import { margin } from '@src/styles';

// Components
import { MediumScreen, ProductLargeScreen } from '@src/components/abstract/MediaQuery';
import LeftChevron from '@src/components/concrete/Carousel/Chevron/LeftChevron';
import RightChevron from '@src/components/concrete/Carousel/Chevron/RightChevron';
import CarouselWrapper from '@src/components/concrete/Carousel/CarouselWrapper';

type Props = {
  getTranslateX: () => void;
  isSlider: boolean;
  onSlide: (direction: string) => void;
  options: object[];
  translateDenominator: number;
  translateMultiplier: number;
};

const SmallCarouselWithoutImage = ({ getTranslateX, isSlider, onSlide, options, translateDenominator, translateMultiplier }: Props) => (
  <div className={css(margin.top_1)}>
    <div className={css(carouselStyles.positionRelative_zIndex0)}>
      <MediumScreen>
        {matches => {
          if (matches) {
            return (
              <LeftChevron
                isSlider={isSlider}
                onSlide={onSlide}
                translateMultiplier={translateMultiplier}
              />
            );
          }
          return null;
        }}
      </MediumScreen>
      <CarouselWrapper
        baseMargin={margin.topbottom_0}
        getTranslateX={getTranslateX}
        options={options}
      />
      <ProductLargeScreen>
        {matches => {
          if (matches) {
            return (
              <MediumScreen>
                {matches => {
                  if (matches) {
                    return (
                      <RightChevron
                        isSlider={isSlider}
                        onSlide={onSlide}
                        optionCount={options.length}
                        translateDenominator={translateDenominator}
                        translateMultiplier={translateMultiplier}
                      />
                    );
                  }
                  return null;
                }}
              </MediumScreen>
            );
          }
          return null;
        }}
      </ProductLargeScreen>
    </div>
  </div>
);

export default SmallCarouselWithoutImage;
