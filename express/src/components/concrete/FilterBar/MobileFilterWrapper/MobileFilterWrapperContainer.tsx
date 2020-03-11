import * as React from 'react';

// Connectors
import { useSearchFilter } from '@src/store/connectors';

// Components
import MobileFilterWrapperComponent from '@src/components/concrete/FilterBar/MobileFilterWrapper/MobileFilterWrapperComponent';

// Types
import { ActionsTrigger, AttachClearAction, FilterStateSelector, HandleFilterChange } from '@src/typings/types';

type Props = {
  children: (childProps: MobileFilterWrapperChildProps) => JSX.Element;
  filterStateSelector: FilterStateSelector;
  isActive: boolean;
  sendTriggersToParent: (fireActions: ActionsTrigger, clearAction: ActionsTrigger) => void;
  toggleCanClear: (bool?: boolean) => void;
  values: { [x: string]: any };
};

type State = {
  canClear: boolean;
  isActive: boolean;
};

type MobileFilterWrapperChildProps = {
  attachClearAction: AttachClearAction;
  canClear: boolean;
  onFilterChange: HandleFilterChange;
  // toggleCanClear: (bool?: boolean) => void;
  values: { [x: string]: any };
};

class MobileFilterWrapperContainer extends React.PureComponent<Props, State> {
  protected clearAction: () => void;
  protected queuedAction: ((...args: any[]) => void);

  constructor(props: Props) {
    super(props);
    this.state = {
      canClear: props.isActive,
      isActive: false,
    };
  }

  componentDidMount() {
    const { sendTriggersToParent } = this.props;
    sendTriggersToParent(this.fireActions, this.clearAction);
  }

  attachClearAction = (clearFilter: () => void): void => {
    this.clearAction = clearFilter;
  }

  fireActions = async (): Promise<any> => {
    if (this.queuedAction) {
      await this.queuedAction();
    }
  }

  handleFilterChange: HandleFilterChange = (applyFilter, args = []): void => {
    this.queuedAction = applyFilter.bind(this, ...args);
  }

  toggleCanClear = (bool?: boolean): void => {
    const { toggleCanClear } = this.props;
    toggleCanClear(bool);
  }

  render() {
    const { children, values } = this.props;
    const { canClear } = this.state;
    return (
      <MobileFilterWrapperComponent>
        {children({
          attachClearAction: this.attachClearAction,
          canClear,
          onFilterChange: this.handleFilterChange,
          // toggleCanClear: this.toggleCanClear,
          values,
        })}
      </MobileFilterWrapperComponent>
    );
  }
}

export default useSearchFilter(MobileFilterWrapperContainer);
