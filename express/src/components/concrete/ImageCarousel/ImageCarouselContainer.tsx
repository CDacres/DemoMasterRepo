import * as React from 'react';

// Components
import ImageCarouselComponent from '@src/components/concrete/ImageCarousel/ImageCarouselComponent';
import Images from '@src/components/concrete/ImageCarousel/Images';
import CarouselNav from '@src/components/concrete/ImageCarousel/CarouselNav';

// Types
import { Image } from '@src/typings/types';

type Props = {
  images: Image[];
  linkUrl: string;
  title: string;
};

type State = {
  activeImageIndex: number;
  isHovered: boolean;
};

class ImageCarouselContainer extends React.PureComponent<Props, State> {
  state: State = {
    activeImageIndex: 0,
    isHovered: false,
  };

  change = direction => {
    const { images } = this.props;

    this.setState(({ activeImageIndex }) => {
      const newIndex = direction(activeImageIndex);
      return {
        activeImageIndex: newIndex > 0 ? newIndex < images.length ? newIndex : images.length - 1 : 0,
      };
    });
  }

  handleChange = (direction: string) => {
    this.change(this[direction]);
  }

  handleMouseEnter = () => {
    this.setState({ isHovered: true });
  }

  handleMouseLeave = () => {
    this.setState({ isHovered: false });
  }

  left = () => this.state.activeImageIndex - 1;

  right = () => this.state.activeImageIndex + 1;

  render() {
    const { images, linkUrl, title } = this.props;
    const { activeImageIndex, isHovered } = this.state;
    const activeImage = images[activeImageIndex];
    return (
      <ImageCarouselComponent
        isHovered={isHovered}
        onChange={this.handleChange}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        <React.Fragment>
          <Images
            activeImage={activeImage}
            linkUrl={linkUrl}
            title={title}
          />
          <CarouselNav
            activeImageIndex={activeImageIndex}
            images={images}
          />
        </React.Fragment>
      </ImageCarouselComponent>
    );
  }
}

export default ImageCarouselContainer;
