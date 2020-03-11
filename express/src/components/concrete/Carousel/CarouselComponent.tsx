/* tslint:disable:max-line-length */
import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import { margin } from '@src/styles';

// Components
import SectionHeader from '@src/components/concrete/SectionHeader';
import LargeCarousel from '@src/components/concrete/Carousel/LargeCarousel';
import LargeImageCarousel from '@src/components/concrete/Carousel/LargeImageCarousel';
import SmallCarousel from '@src/components/concrete/Carousel/SmallCarousel';
import SmallCarouselWithoutImage from '@src/components/concrete/Carousel/SmallCarouselWithoutImage';

type Props = {
  footerLink?: string;
  footerText?: string;
  getTranslateX: () => void;
  isSlider: boolean;
  onSlide: (direction: string) => void;
  options: object[];
  sectionSubtitle?: string;
  sectionTitle?: string;
  translateDenominator: number;
  translateMultiplier: number;
  type: string;
};

const CarouselComponent = ({ footerLink, footerText, getTranslateX, isSlider, onSlide, options, sectionSubtitle, sectionTitle, translateDenominator, translateMultiplier, type }: Props) => (
  <div className={css((type === 'large' || type === 'largeimage') ? [margin.topbottom_4, margin.topbottom_5_small] : [margin.topbottom_3, margin.topbottom_4_small])}>
    <div>
      {sectionTitle &&
        <SectionHeader
          sectionSubtitle={sectionSubtitle}
          sectionTitle={sectionTitle}
        />
      }
    </div>
    <div className={css(margin.bottom_0)}>
      <div>
        {type === 'smallwithoutimage' ? (
          <SmallCarouselWithoutImage
            getTranslateX={getTranslateX}
            isSlider={isSlider}
            onSlide={onSlide}
            options={options}
            translateDenominator={translateDenominator}
            translateMultiplier={translateMultiplier}
          />
        ) : (
          <div>
            {type === 'large' ? (
              <LargeCarousel
                footerLink={footerLink}
                footerText={footerText}
                getTranslateX={getTranslateX}
                isSlider={isSlider}
                onSlide={onSlide}
                options={options}
                translateDenominator={translateDenominator}
                translateMultiplier={translateMultiplier}
              />
            ) : (type === 'largeimage' ? (
              <LargeImageCarousel
                getTranslateX={getTranslateX}
                isSlider={isSlider}
                onSlide={onSlide}
                options={options}
                translateDenominator={translateDenominator}
                translateMultiplier={translateMultiplier}
              />
            ) : (
              <SmallCarousel
                getTranslateX={getTranslateX}
                isSlider={isSlider}
                onSlide={onSlide}
                options={options}
                translateDenominator={translateDenominator}
                translateMultiplier={translateMultiplier}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  </div>
);

export default CarouselComponent;
