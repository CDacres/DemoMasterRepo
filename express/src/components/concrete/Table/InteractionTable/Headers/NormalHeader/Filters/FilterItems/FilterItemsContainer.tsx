import * as React from 'react';

// Components
import FilterItemsComponent from '@src/components/concrete/Table/InteractionTable/Headers/NormalHeader/Filters/FilterItems/FilterItemsComponent';

type Props = {
  children: JSX.Element;
  onApply: () => void;
  onClear: () => void;
};

type State = {
  isBottom: boolean;
};

class FilterItemsContainer extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { isBottom: false };
  }

  isBottom = (e): boolean => {
    return e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
  }

  trackScroll = (e) => {
    if (this.isBottom(e)) {
      this.setState({ isBottom: true });
    } else {
      this.setState({ isBottom: false });
    }
  }

  render() {
    const { children, onApply, onClear } = this.props;
    const { isBottom } = this.state;
    return (
      <FilterItemsComponent
        handleScroll={this.trackScroll}
        isBottom={isBottom}
        onApply={onApply}
        onClear={onClear}
      >
        {children}
      </FilterItemsComponent>
    );
  }
}

export default FilterItemsContainer;
