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

const LargeImageCarousel = ({ getTranslateX, isSlider, onSlide, options, translateDenominator, translateMultiplier }: Props) => (
  <ProductLargeScreen>
    {matches => {
      if (matches) {
        return (
          <div className={css(carouselStyles.positionRelative_zIndex0)}>
            <LeftChevron
              adjustedTop={true}
              isSlider={isSlider}
              onSlide={onSlide}
              translateMultiplier={translateMultiplier}
            />
            <CarouselWrapper
              baseMargin={margin.topbottom_1}
              getTranslateX={getTranslateX}
              needsFlex={true}
              options={options}
            />
            <RightChevron
              adjustedTop={true}
              isSlider={isSlider}
              onSlide={onSlide}
              optionCount={options.length}
              translateDenominator={translateDenominator}
              translateMultiplier={translateMultiplier}
            />
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

export default LargeImageCarousel;
