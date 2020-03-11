import * as React from 'react';
import onClickOutside, { InjectedOnClickOutProps } from 'react-onclickoutside';

// Connectors
import { useSearchFilter } from '@src/store/connectors';

// Components
// import FilterButtonComponent from '@src/components/concrete/FilterBar/FilterButton/FilterButtonComponent';

// Types
import { FilterButtonChildProps, FilterStateSelector, HandleFilterChange } from '@src/typings/types';

type Props = {
  buttonText: string;
  children: (childProps: FilterButtonChildProps) => JSX.Element;
  defaultButtonText: string;
  filterStateSelector: FilterStateSelector;
  isActive: boolean;
  onClick?: () => void;
  values: { [x: string]: any };
} & InjectedOnClickOutProps;

type State = {
  buttonText: string;
  canClear: boolean;
  isActive: boolean;
};

class FilterButtonContainer extends React.PureComponent<Props, State> {
  protected clearAction: () => void;
  protected originalText: string;
  protected queuedAction: (...args: any[]) => void;

  constructor(props: Props) {
    super(props);
    this.originalText = props.defaultButtonText;
    this.state = {
      buttonText: props.buttonText,
      canClear: props.isActive,
      isActive: false,
    };
  }

  attachClearAction = (clearFilter: () => void): void => {
    this.clearAction = clearFilter;
  }

  fireActions = (): void => {
    if (this.queuedAction) {
      this.queuedAction();
    }
  }

  handleApply = (): void => {
    this.handleClick();
  }

  handleClear = (): void => {
    const { onClick } = this.props;
    this.queuedAction = null;
    this.setState(prevState => ({
      buttonText: this.originalText,
      canClear: false,
      isActive: !prevState.isActive,
    }), () => {
      if (onClick) {
        onClick();
      }
    });
    this.clearAction();
  }

  handleClick = (): void => {
    const { onClick } = this.props;
    this.setState(prevState => {
      if (prevState.isActive) {
        this.fireActions();
      }
      return ({ isActive: !prevState.isActive });
    }, () => {
      if (onClick) {
        onClick();
      }
    });
  }

  handleClickOutside = (): void => {
    const { isActive } = this.state;
    if (isActive) {
      this.handleClick();
    }
  }

  handleFilterChange: HandleFilterChange = (applyFilter, args = []) => {
    this.queuedAction = applyFilter.bind(this, ...args);
  }

  setButtonText = (buttonText: string): void => {
    this.setState({ buttonText });
  }

  toggleCanClear = (bool?: boolean): void => {
    this.setState(({ canClear }) => ({ canClear: bool || !canClear }));
  }

  render() {
    // const { children, values } = this.props;
    // const { buttonText, canClear, isActive } = this.state;
    return (
      null
      // TODO: commented out to allow listing to build in production mode
      // <FilterButtonComponent
      //   buttonText={buttonText}
      //   canClear={canClear}
      //   isActive={isActive}
      //   onClick={this.handleClick}
      // >
      //   {children({
      //     attachClearAction: this.attachClearAction,
      //     canClear,
      //     onApply: this.handleApply,
      //     onClear: this.handleClear,
      //     onClose: this.handleClick,
      //     onFilterChange: this.handleFilterChange,
      //     setButtonText: this.setButtonText,
      //     toggleCanClear: this.toggleCanClear,
      //     values,
      //   })}
      // </FilterButtonComponent>
    );
  }
}

export default useSearchFilter(onClickOutside(FilterButtonContainer));
