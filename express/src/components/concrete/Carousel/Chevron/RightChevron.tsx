/* tslint:disable:max-line-length */
import * as React from 'react';
import isMobile from 'ismobilejs';

// Components
import ChevronButton from '@src/components/concrete/Carousel/Chevron/ChevronButton';

type Props = {
  adjustedTop?: boolean;
  isSlider: boolean;
  large?: boolean;
  onSlide: (direction: string) => void;
  optionCount: number;
  translateDenominator: number;
  translateMultiplier: number;
};

const RightChevron = ({ adjustedTop, isSlider, large, onSlide, optionCount, translateDenominator, translateMultiplier }: Props) => {
  if (!isMobile.any && isSlider && (-translateMultiplier < optionCount - translateDenominator)) {
    return (
      <ChevronButton
        adjustedTop={adjustedTop}
        direction="right"
        large={large}
        onClick={onSlide}
      />
    );
  }
  return null;
};

export default RightChevron;
