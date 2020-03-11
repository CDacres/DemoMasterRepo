import * as React from 'react';

// Components
import ProgressBarComponent from '@src/components/concrete/Admin/ProgressBar/ProgressBarComponent';

type Props = {
  customStyle?: object;
  data: Array<{
    label: string;
    number: string;
  }>;
};

type State = {
  current: number;
};

class ProgressBarContainer extends React.Component<Props, State> {
  // TODO: work in progress
  constructor(props: Props) {
    super(props);
    this.state = { current: -1 };
  }

  handleClick = (num: number): void => {
    this.setState({ current: num });
  }

  render() {
    const { customStyle, data } = this.props;
    const { current } = this.state;
    return (
      <ProgressBarComponent
        current={current}
        customStyle={customStyle}
        data={data}
        handleClick={this.handleClick}
      />
    );
  }
}

export default ProgressBarContainer;
