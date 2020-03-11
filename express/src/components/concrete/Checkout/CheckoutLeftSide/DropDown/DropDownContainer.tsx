import * as React from 'react';
import onClickOutside, { InjectedOnClickOutProps } from 'react-onclickoutside';

// Components
import DropDownComponent from '@src/components/concrete/Checkout/CheckoutLeftSide/DropDown/DropDownComponent';
import CalculateComponent from '@src/components/concrete/Inputs/Calculate/CalculateComponent';

type Props = {
  clickOutsideActive?: boolean;
  title: string;
  transKey: string;
} & InjectedOnClickOutProps;

type State = {
  addDisabled: boolean;
  count: number;
  subtractDisabled: boolean;
  showPopup: boolean;
};

class DropDownContainer extends React.Component<Props, State> {
  static defaultProps = { clickOutsideActive: false };

  constructor(props: Props) {
    super(props);
    this.state = {
      addDisabled: false,
      count: 0,
      subtractDisabled: true,
      showPopup: false,
    };
  }

  togglePopUp = () => {
    this.setState({ showPopup: !this.state.showPopup });
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

  handleClickOutside = () => {
    if (this.state.showPopup) {
      this.togglePopUp();
    }
  }

  render() {
    const { title, transKey } = this.props;
    const { addDisabled, count, showPopup, subtractDisabled } = this.state;
    return (
      <DropDownComponent
        count={count}
        onClick={this.togglePopUp}
        showPopup={showPopup}
        transKey={transKey}
      >
        <CalculateComponent
          addDisabled={addDisabled}
          count={count}
          handleAdd={this.handleAdd}
          handleSubtract={this.handleSubtract}
          label={title}
          subtractDisabled={subtractDisabled}
          transKey={transKey}
        />
      </DropDownComponent>
    );
  }
}

export default onClickOutside(DropDownContainer);
