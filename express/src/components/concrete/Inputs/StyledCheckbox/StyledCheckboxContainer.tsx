import * as React from 'react';

// Components
import StyledCheckboxComponent from '@src/components/concrete/Inputs/StyledCheckbox/StyledCheckboxComponent';

// Types
import { StyledCheckboxProps } from '@src/typings/types';

type State = {
  checked: boolean;
};

class StyledCheckboxContainer extends React.Component<StyledCheckboxProps, State> {
  constructor(props: StyledCheckboxProps) {
    super(props);
    this.state = { checked: this.props.checked ? this.props.checked : false };
  }

  handleToggle = (): void => {
    this.setState({ checked: !this.state.checked });
  }

  render() {
    const { disabled, id, label, name, sublabel, value } = this.props;
    const { checked } = this.state;
    return (
      <StyledCheckboxComponent
        checked={checked}
        disabled={disabled}
        id={id}
        label={label}
        name={name}
        onToggle={this.handleToggle}
        sublabel={sublabel}
        value={value}
      />
    );
  }
}

export default StyledCheckboxContainer;
