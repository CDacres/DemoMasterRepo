import * as React from 'react';

// Components
import CalculateComponent from '@src/components/concrete/Inputs/Calculate/CalculateComponent';

type Props = {
  label: string;
  price?: string;
  transKey: string;
};

type State = {
  addDisabled: boolean;
  count: number;
  subtractDisabled: boolean;
};

class CalculateContainer extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      addDisabled: false,
      count: 0,
      subtractDisabled: true,
    };
  }

  enableButton = () => {
    if (this.state.count > 0) {
      this.setState({ subtractDisabled: false });
    } else if (this.state.count === 0) {
      this.setState({ subtractDisabled: true });
    }
  }

  handleAdd = () => {
    this.setState({ count: this.state.count + 1 }, this.enableButton);
  }

  handleSubtract = () => {
    if (this.state.count > 0) {
      this.setState({ count: this.state.count - 1 }, this.enableButton);
    }
  }

  render() {
    const { label, price, transKey } = this.props;
    const { addDisabled, count, subtractDisabled } = this.state;
    return (
      <CalculateComponent
        addDisabled={addDisabled}
        count={count}
        handleAdd={this.handleAdd}
        handleSubtract={this.handleSubtract}
        label={label}
        price={price}
        subtractDisabled={subtractDisabled}
        transKey={transKey}
      />
    );
  }
}

export default CalculateContainer;
