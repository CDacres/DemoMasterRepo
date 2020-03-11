import * as React from 'react';

// Components
import CarouselButtonComponent from '@src/components/concrete/ImageCarousel/CarouselButton/CarouselButtonComponent';

type Props = {
  direction: string;
  isHovered: boolean;
  onClick: (direction: string) => void;
};

class CarouselButtonContainer extends React.PureComponent<Props> {
  handleClick = () => {
    const { direction, onClick } = this.props;
    onClick(direction);
  }

  render() {
    const { direction, isHovered } = this.props;
    return (
      <CarouselButtonComponent
        direction={direction}
        isHovered={isHovered}
        onClick={this.handleClick}
      />
    );
  }
}

export default CarouselButtonContainer;
