import * as React from 'react';
import onClickOutside from 'react-onclickoutside';

// Components
import FiltersComponent from '@src/components/concrete/Table/InteractionTable/Headers/NormalHeader/Filters/FiltersComponent';

type Props = {
  children?: JSX.Element;
  typingOn: boolean;
};

type State = {
  filtersOpened: boolean;
};

class FiltersContainer extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);
    this.state = { filtersOpened: false };
  }

  toggleFilters = (e) => {
    e.preventDefault();
    this.setState({ filtersOpened: !this.state.filtersOpened });
  }

  handleClickOutside = () => {
    this.setState({ filtersOpened: false });
  }

  handleOnApply = () => {
    // TODO: make this a proper action
  }

  handleOnChange = () => {
    // TODO: make this a proper action
  }

  handleOnClear = () => {
    this.setState({ filtersOpened: false });
  }

  render() {
    const { children, typingOn } = this.props;
    const { filtersOpened } = this.state;
    return (
      <FiltersComponent
        onApply={this.handleOnApply}
        onChange={this.handleOnChange}
        onClear={this.handleOnClear}
        opened={filtersOpened}
        toggleDropDown={this.toggleFilters}
        typingOn={typingOn}
      >
        {children}
      </FiltersComponent>
    );
  }
}

export default onClickOutside(FiltersContainer);
