import * as React from 'react';

// Connectors
import { useSearch } from '@src/store/connectors';

// Components
import SearchFilter, { FilterProps } from '@src/components/Search/Filters/Filter';
import DDRComponent from '@src/components/Search/Filters/common/DDR/DDRComponent';

type Props = FilterProps & {
  values: State;
};

type State = {
  DDRSelected: boolean;
};

class DDRContainer extends SearchFilter<Props, State> {

  constructor(props: Props) {
    super(props);
    const { values: { DDRSelected } } = props;
    this.state = { DDRSelected };
  }

  applyFilter = (): void => {
    const { DDRSelected } = this.state;
    this.props.setSearchParams({ DDRSelected });
  }

  clearFilter = (): void => {
    this.props.setSearchParams({ DDRSelected: false });
  }

  generateButtonText = (): void => {
    // TODO: add this
  }

  prepareToApply = (): void => {
    const { onFilterChange, toggleCanClear } = this.props;
    onFilterChange(this.applyFilter);
    toggleCanClear(true);
    this.generateButtonText();
  }

  handleSwitch = (): void => {
    this.setState({ DDRSelected: !this.state.DDRSelected }, this.prepareToApply);
  }

  render() {
    const { isLast } = this.props;
    const { DDRSelected } = this.state;
    return (
      <DDRComponent
        handleChange={this.handleSwitch}
        isLast={isLast}
        selected={DDRSelected}
        {...this.props}
      />
    );
  }
}

export default useSearch(DDRContainer);
