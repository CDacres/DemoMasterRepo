import * as React from 'react';

// Components
import LoadingAnimation from '@src/components/concrete/LoadingAnimation';

type State = {
  isCSR: boolean;
};

export class CSR extends React.Component<{}, State> {
  state: State = { isCSR: false };

  componentDidMount() {
    if (process.browser) {
      this.setState({ isCSR: true });
    }
  }

  render() {
    const { children } = this.props;
    const { isCSR } = this.state;
    if (isCSR) {
      return (
        <React.Fragment>
          {children}
        </React.Fragment>
      );
    } else {
      return <LoadingAnimation spacing={'dotsWrapperLarge'} />;
    }
  }
}
