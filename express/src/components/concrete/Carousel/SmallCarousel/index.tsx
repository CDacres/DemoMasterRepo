/* tslint:disable:max-line-length */
import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import carouselStyles from '../styles';
import { margin } from '@src/styles';

// Components
import { ProductLargeScreen } from '@src/components/abstract/MediaQuery';
import LeftChevron from '@src/components/concrete/Carousel/Chevron/LeftChevron';
import RightChevron from '@src/components/concrete/Carousel/Chevron/RightChevron';
import CarouselWrapper from '@src/components/concrete/Carousel/CarouselWrapper';
import OptionBlock from '@src/components/concrete/Carousel/OptionBlock';

type Props = {
  getTranslateX: () => void;
  isSlider: boolean;
  onSlide: (direction: string) => void;
  options: object[];
  translateDenominator: number;
  translateMultiplier: number;
};

const SmallCarousel = ({ getTranslateX, isSlider, onSlide, options, translateDenominator, translateMultiplier }: Props) => (
  <ProductLargeScreen>
    {matches => {
      if (matches) {
        return (
          <div className={css(margin.top_1)}>
            <div className={css(carouselStyles.positionRelative_zIndex0)}>
              <LeftChevron
                isSlider={isSlider}
                onSlide={onSlide}
                translateMultiplier={translateMultiplier}
              />
              <CarouselWrapper
                baseMargin={margin.topbottom_0}
                getTranslateX={getTranslateX}
                options={options}
              />
              <RightChevron
                isSlider={isSlider}
                onSlide={onSlide}
                optionCount={options.length}
                translateDenominator={translateDenominator}
                translateMultiplier={translateMultiplier}
              />
            </div>
          </div>
        );
      }
      return (
        <OptionBlock>
          {options}
        </OptionBlock>
      );
    }}
  </ProductLargeScreen>
);

export default SmallCarousel;
