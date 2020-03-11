import * as React from 'react';

// Components
import SquashedToggleButtonComponent from '@src/components/concrete/Footer/SquashedToggleButton/SquashedToggleButtonComponent';

type Props = {
  toggleVisibility: () => void;
  isShowing: boolean;
};

class SquashedToggleButtonContainer extends React.PureComponent<Props> {
  handleClick = () => {
    const { toggleVisibility } = this.props;
    toggleVisibility();
  }

  render() {
    const { isShowing } = this.props;
    return (
      <SquashedToggleButtonComponent
        isShowing={isShowing}
        onClick={this.handleClick}
      />
    );
  }
}

export default SquashedToggleButtonContainer;
