import * as React from 'react';

// Components
import OfficeLocationItemComponent from '@src/components/concrete/Business/BusinessWrapper/OfficeLocationItem/OfficeLocationItemComponent';

type State = {
  disabled: boolean;
};

class OfficeLocationItemContainer extends React.Component<{}, State> {
  constructor(props: {}) {
    super(props);
    this.state = { disabled: true };
  }

  toggleButton = (value: string): void => {
    if (value !== '') {
      this.setState({ disabled: false });
    } else {
      this.setState({ disabled: true });
    }
  }

  saveOfficeLocation = () => {
    // console.log("save office location"); // TODO: make this a proper action
  }

  render() {
    const { disabled } = this.state;
    return (
      <OfficeLocationItemComponent
        disabled={disabled}
        // onChange={this.toggleButton} // TODO: add event for both inputs to be filled out to affect disabled state
        onClick={this.saveOfficeLocation}
      />
    );
  }
}

export default OfficeLocationItemContainer;
