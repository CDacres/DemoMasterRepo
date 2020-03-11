import * as React from 'react';

// Connectors
import { useConfig } from '@src/store/connectors';

// Components
import ContactPopUpComponent from '@src/components/concrete/Venue/ContactPopUp/ContactPopUpComponent';

// Types
import { Store } from '@src/typings/types';

type Props = {
  config: Store.Config;
  subtitle: string;
  title: string;
};

type State = {
  buttonDisabled: boolean;
  value: string;
};

class ContactPopUp extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      buttonDisabled: true,
      value: '',
    };
  }

  updateState = () => {
    if (this.state.value !== null && this.state.value !== '') {
      this.setState({ buttonDisabled: false });
    } else {
      this.setState({ buttonDisabled: true });
    }
  }

  handleChange = (e) => {
    this.setState({ value: e.target.value }, this.updateState);
  }

  render() {
    const { config: { domain }, subtitle, title } = this.props;
    const { buttonDisabled, value } = this.state;
    return (
      <ContactPopUpComponent
        buttonDisabled={buttonDisabled}
        domain={domain}
        handleChange={this.handleChange}
        subtitle={subtitle}
        title={title}
        value={value}
      />
    );
  }
}

export default useConfig(ContactPopUp);
