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
import CardsGridFooter from '@src/components/concrete/Grid/CardsGrid/CardsGridFooter';

type Props = {
  footerLink?: string;
  footerText?: string;
  getTranslateX: () => void;
  isSlider: boolean;
  onSlide: (direction: string) => void;
  options: object[];
  translateDenominator: number;
  translateMultiplier: number;
};

const LargeCarousel = ({ footerLink, footerText, getTranslateX, isSlider, onSlide, options, translateDenominator, translateMultiplier }: Props) => (
  <React.Fragment>
    <div className={css(margin.top_1, margin.bottom_1_5)}>
      <div className={css(carouselStyles.positionRelative_zIndex0)}>
        <ProductLargeScreen>
          {matches => {
            if (matches) {
              return (
                <LeftChevron
                  isSlider={isSlider}
                  large={true}
                  onSlide={onSlide}
                  translateMultiplier={translateMultiplier}
                />
              );
            }
            return null;
          }}
        </ProductLargeScreen>
        <CarouselWrapper
          baseMargin={margin.topbottom_0}
          getTranslateX={getTranslateX}
          options={options}
        />
        <ProductLargeScreen>
          {matches => {
            if (matches) {
              return (
                <RightChevron
                  isSlider={isSlider}
                  large={true}
                  onSlide={onSlide}
                  optionCount={options.length}
                  translateDenominator={translateDenominator}
                  translateMultiplier={translateMultiplier}
                />
              );
            }
            return null;
          }}
        </ProductLargeScreen>
      </div>
    </div>
    {!!footerText &&
      <CardsGridFooter
        link={footerLink}
        text={footerText}
      />
    }
  </React.Fragment>
);

export default LargeCarousel;
