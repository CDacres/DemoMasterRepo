import * as React from 'react';

// Components
import PriceAlertItemComponent from '@src/components/concrete/Business/BusinessWrapper/PriceAlertItem/PriceAlertItemComponent';

type Props = {
  options: Array<{
    text: string;
    value: string;
  }>;
  withLocation?: boolean;
};

type State = {
  disabled: boolean;
  showSaveMessage: boolean;
};

class PriceAlertItemContainer extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      disabled: true,
      showSaveMessage: false,
    };
  }

  toggleButton = (value: string): void => {
    if (value !== '') {
      this.setState({ disabled: false });
    } else {
      this.setState({ disabled: true });
    }
  }

  savePriceAlert = () => {
    this.setState({ showSaveMessage: true });
    // console.log("save price alert"); // TODO: make this a proper action
  }

  render() {
    const { options, withLocation } = this.props;
    const { disabled, showSaveMessage } = this.state;
    return (
      <PriceAlertItemComponent
        disabled={disabled}
        // onChange={this.toggleButton} // TODO: add event for all inputs to be filled out to affect disabled state
        onClick={this.savePriceAlert}
        options={options}
        showSaveMessage={showSaveMessage}
        withLocation={withLocation}
      />
    );
  }
}

export default PriceAlertItemContainer;
