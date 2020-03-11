import * as React from 'react';

// Components
import AnimationButtonComponent from '@src/components/concrete/Venue/VenueTop/VenueTopPhotos/AnimationButton/AnimationButtonComponent';

type Props = {
  value: State;
};

type State = {
  play: boolean;
};

class AnimationButtonContainer extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    const { value: { play } } = props;
    this.state = { play };
  }

  handleClick = (): void => {
    this.setState({ play: !this.state.play });
    // TO DO: start animation when clicked
  }

  render() {
    const { play } = this.state;
    return (
      <AnimationButtonComponent
        handleClick={this.handleClick}
        play={play}
      />
    );
  }
}

export default AnimationButtonContainer;
