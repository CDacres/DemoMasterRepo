import * as React from 'react';

// Components
import LargeOptionComponent from '@src/components/concrete/Carousel/LargeCarousel/LargeOption/LargeOptionComponent';

// Helpers
import { ColorHelper } from '@src/helpers';

// Types
import { CarouselOptionProps } from '@src/typings/types';

class LargeOptionContainer extends React.PureComponent<CarouselOptionProps> {
  colorHelper = new ColorHelper();

  render() {
    const { verticalId, ...props } = this.props;
    const color = this.colorHelper.getVerticalColors()[verticalId];
    return (
      <LargeOptionComponent
        color={color}
        verticalId={verticalId}
        {...props}
      />
    );
  }
}

export default LargeOptionContainer;
