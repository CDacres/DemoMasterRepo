import * as React from 'react';

// Components
import ServiceRatingComponent from '@src/components/concrete/Checkout/CheckoutLeftSide/ServiceRating/ServiceRatingComponent';

type Props = {
  canButtonBeEnabled: (num: string | number) => void;
};

type State = {
  selectedRating: string | number;
  showInput: boolean;
};

class ServiceRatingContainer extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      selectedRating: -1,
      showInput: false,
    };
  }

  checkRating = (): void => {
    this.props.canButtonBeEnabled(this.state.selectedRating);
  }

  openCommentBox = (id: string | number): void => {
    this.setState({
      selectedRating: id,
      showInput: true,
    }, this.checkRating);
  }

  render() {
    const { selectedRating, showInput } = this.state;
    return (
      <ServiceRatingComponent
        handleRating={this.openCommentBox}
        selectedRating={selectedRating}
        showInput={showInput}
      />
    );
  }
}

export default ServiceRatingContainer;
