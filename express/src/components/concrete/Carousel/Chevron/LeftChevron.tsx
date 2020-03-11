import * as React from 'react';
import isMobile from 'ismobilejs';

// Components
import ChevronButton from '@src/components/concrete/Carousel/Chevron/ChevronButton';

type Props = {
  adjustedTop?: boolean;
  isSlider: boolean;
  large?: boolean;
  onSlide: (direction: string) => void;
  translateMultiplier: number;
};

const LeftChevron = ({ adjustedTop, isSlider, large, onSlide, translateMultiplier }: Props) => {
  if (!isMobile.any && isSlider && translateMultiplier !== 0) {
    return (
      <ChevronButton
        adjustedTop={adjustedTop}
        direction="left"
        large={large}
        onClick={onSlide}
      />
    );
  }
  return null;
};

export default LeftChevron;
