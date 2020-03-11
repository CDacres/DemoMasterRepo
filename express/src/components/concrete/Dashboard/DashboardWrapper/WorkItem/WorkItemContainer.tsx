import * as React from 'react';

// Components
import WorkItemComponent from '@src/components/concrete/Dashboard/DashboardWrapper/WorkItem/WorkItemComponent';

type State = {
  disabled: boolean;
};

class WorkItemContainer extends React.Component<{}, State> {
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

  handleClick = () => {
    // TODO: make this a proper action
  }

  render() {
    const { disabled } = this.state;
    return (
      <WorkItemComponent
        disabled={disabled}
        onChange={this.toggleButton}
        onClick={this.handleClick}
      />
    );
  }
}

export default WorkItemContainer;
