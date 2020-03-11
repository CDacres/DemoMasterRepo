import * as React from 'react';

// Components
import StarsListComponent from '@src/components/concrete/Dashboard/DashboardWrapper/ListItem/StarsList/StarsListComponent';

type State = {
  rating: number;
};

class StarsListContainer extends React.Component<{}, State> {
  constructor(props: {}) {
    super(props);
    this.state = { rating: 0 };
  }

  setRating = (rating: number): void => {
    this.setState({ rating: rating });
  }

  render() {
    const { rating } = this.state;
    return (
      <StarsListComponent
        handleClick={this.setRating}
        rating={rating}
      />
    );
  }
}

export default StarsListContainer;
