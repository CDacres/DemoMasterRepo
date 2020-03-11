import * as React from 'react';

// Components
import ToggleSwitch from '@src/components/concrete/Inputs/ToggleSwitch';

type Props = {
  id: string;
  onChange?: () => void;
  value: boolean;
};

type State = {
  selected: boolean;
};

class Toggle extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);
    this.state = { selected: false };
  }

  componentDidMount() {
    if (this.props.value) {
      this.setState({ selected: this.props.value });
    }
  }

  handleSwitch = (): void => {
    this.setState({ selected: !this.state.selected });
  }

  render() {
    const { id, onChange } = this.props;
    const { selected } = this.state;
    return (
      <ToggleSwitch
        id={id}
        onChange={onChange ? onChange : this.handleSwitch}
        value={selected}
      />
    );
  }
}

export default Toggle;
