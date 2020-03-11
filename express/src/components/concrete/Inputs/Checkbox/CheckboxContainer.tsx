import * as React from 'react';

// Components
import CheckboxComponent from '@src/components/concrete/Inputs/Checkbox/CheckboxComponent';

type Props = {
  checked: boolean;
  extras?: JSX.Element | boolean;
  id: string;
  label: string;
  name: string;
  onToggle: (checked: boolean) => void;
  value: string;
};

type State = {
  checked: boolean;
};

class CheckboxContainer extends React.PureComponent<Props, State> {
  static defaultProps = { extras: false };

  state: State = { checked: this.props.checked };

  handleToggle = (_: React.ChangeEvent<HTMLInputElement>) => {
    const { onToggle } = this.props;
    this.setState(prevState => {
      onToggle(!prevState.checked);
      return {
        checked: !prevState.checked,
      };
    });
  }

  render() {
    const { checked, extras, id, label, name, value } = this.props;
    return (
      <CheckboxComponent
        checked={checked}
        extras={extras}
        id={id}
        label={label}
        name={name}
        onToggle={this.handleToggle}
        value={value}
      />
    );
  }
}

export default CheckboxContainer;
