/* tslint:disable:max-line-length */
import * as React from 'react';
import shortid from 'shortid';

// Components
import CarouselNavComponent from '@src/components/concrete/ImageCarousel/CarouselNav/CarouselNavComponent';
import CarouselNavDotComponent from '@src/components/concrete/ImageCarousel/CarouselNav/CarouselNavDotComponent';

// Types
import { Image } from '@src/typings/types';

type Props = {
  activeImageIndex: number;
  images: Image[];
};

class CarouselNavContainer extends React.PureComponent<Props> {
  protected indexOffset = 0;

  getIndexOffset = () => {
    const { images } = this.props;
    const offsetMax = Math.floor(images.length / 2);
    return this.indexOffset < offsetMax ? this.indexOffset : offsetMax;
  }

  getDotsArr = () => {
    const { activeImageIndex, images } = this.props;

    const dotsCount = images.length;
    let dotsArr;

    if ((activeImageIndex >= 3) && (activeImageIndex <= (dotsCount - 4))) {
      this.indexOffset = activeImageIndex - 3;
      dotsArr = images.slice(activeImageIndex - 3, activeImageIndex + 4);
    } else if (activeImageIndex === 0) {
      this.indexOffset = 0;
      dotsArr = images.slice(activeImageIndex, 6);
    } else if (activeImageIndex === (dotsCount - 1)) {
      this.indexOffset = activeImageIndex - 5;
      dotsArr = images.slice(activeImageIndex - 5);
    } else if (activeImageIndex < 3) {
      this.indexOffset = 0;
      dotsArr = images.slice(0, 6);
    } else if (activeImageIndex < ((dotsCount - 1) - 3)) {
      this.indexOffset = activeImageIndex - 5;
      dotsArr = images.slice((dotsCount - 1) - 5);
    } else {
      this.indexOffset = activeImageIndex - 3;
      dotsArr = images.slice((dotsCount - 1) - 5);
    }
    return dotsArr;
  }

  renderDots = () => {
    const { activeImageIndex } = this.props;

    const dotsArr = this.getDotsArr();
    const indexOffset = this.getIndexOffset();

    return dotsArr.map((_, index) => {
      const farFromActive = activeImageIndex - (indexOffset + index) >= 3 || (indexOffset + index) - activeImageIndex >= 3;
      return (
        <CarouselNavDotComponent
          isActive={indexOffset + index === activeImageIndex}
          isAtEnd={((index === 0) && farFromActive) || ((index === (dotsArr.length - 1)) && farFromActive)}
          key={shortid.generate()}
        />
      );
    });
  }

  render() {
    return (
      <CarouselNavComponent>
        {this.renderDots()}
      </CarouselNavComponent>
    );
  }
}

export default CarouselNavContainer;
