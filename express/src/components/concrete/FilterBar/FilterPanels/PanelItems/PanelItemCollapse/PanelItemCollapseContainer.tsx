import * as React from 'react';

// Components
import PanelItemCollapseComponent from '@src/components/concrete/FilterBar/FilterPanels/PanelItems/PanelItemCollapse/PanelItemCollapseComponent';

type Props = {
  children: JSX.Element[];
  header?: string;
  isLarge?: boolean;
};

type State = {
  isCollapsed: boolean;
};

class PanelItemCollapseContainer extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { isCollapsed: false };
  }

  handleClick = e => {
    e.preventDefault();
    this.setState(prevState => ({ isCollapsed: !prevState.isCollapsed }));
  }

  render() {
    const { children, header, isLarge } = this.props;
    const { isCollapsed } = this.state;
    return (
      <PanelItemCollapseComponent
        header={header}
        isCollapsed={isCollapsed}
        isLarge={isLarge}
        toggleExtraFilters={this.handleClick}
      >
        {children}
      </PanelItemCollapseComponent>
    );
  }
}

export default PanelItemCollapseContainer;
