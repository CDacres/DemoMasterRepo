import * as React from 'react';

// Components
import CarouselNavDotComponent from '@src/components/concrete/ImageCarousel/CarouselNav/CarouselNavDotComponent';

type Props = {
  isActive: boolean;
  isAtEnd: boolean;
};

type State = {
  width: number;
  scale: string;
};

class CarouselNavContainer extends React.Component<Props, State> {
  protected timer;

  constructor(props: Props) {
    super(props);
    const { isActive, isAtEnd } = this.props;
    this.state = {
      scale: !isActive ? isAtEnd ? 'scale(0.666667)' : 'scale(1)' : 'scale(1)',
      width: !isActive ? isAtEnd ? 10.6667 : 16 : 18,
    };
  }

  componentWillReceiveProps(nextProps: Props) {
    if (nextProps.isActive) {
      this.expand();
    }
    if (nextProps.isAtEnd) {
      this.tiny();
    }
  }

  expand = () => {
    const { width } = this.state;
    this.timer = width;
    this.startTimer('up', 'scale(1)', 1000 / 18);
  }

  shrink = () => {
    const { width } = this.state;
    this.timer = width;
    this.startTimer('down', 'scale(1)', 1000 / 16);
  }

  tiny = () => {
    const { width } = this.state;
    this.timer = width;
    this.startTimer('down', 'scale(0.666667)', 1000 / 10.6667);
  }

  startTimer = (direction, scale, limit) => {
    setTimeout(() => {
      this.setState({
        scale,
        width: this[direction](limit),
      });
    }, 1);
  }

  up = limit => {
    if (this.timer < limit) {
      this.timer++;
    }
  }

  down = limit => {
    if (this.timer > limit) {
      this.timer--;
    }
  }

  render() {
    return (
      <CarouselNavDotComponent
        // animStyles={this.state}
        {...this.props}
      />
    );
  }
}

export default CarouselNavContainer;
