import * as React from 'react';

// Components
import ToggleComponent from '@src/components/concrete/Checkout/CheckoutLeftSide/Toggle/ToggleComponent';

type Props = {
  id: string;
  text: string;
};

type State = {
  value: boolean;
};

class ToggleContainer extends React.Component<Props, State> {
  state: State = { value: false };

  handleOnChange = () => {
    this.setState(prevState => ({ value: !prevState.value }));
  }

  render() {
    const { id, text } = this.props;
    const { value } = this.state;
    return (
      <ToggleComponent
        id={id}
        onChange={this.handleOnChange}
        text={text}
        value={value}
      />
    );
  }
}

export default ToggleContainer;
