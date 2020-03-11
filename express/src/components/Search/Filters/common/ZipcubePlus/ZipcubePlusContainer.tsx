import * as React from 'react';

// Connectors
import { useSearch } from '@src/store/connectors';

// Components
import SearchFilter, { FilterProps } from '@src/components/Search/Filters/Filter';
import ZipcubePlusComponent from '@src/components/Search/Filters/common/ZipcubePlus/ZipcubePlusComponent';

type Props = FilterProps & {
  values: State;
};

type State = {
  plusSelected: boolean;
};

class ZipcubePlusContainer extends SearchFilter<Props, State> {

  constructor(props: Props) {
    super(props);
    const { values: { plusSelected } } = props;
    this.state = { plusSelected };
  }

  applyFilter = (): void => {
    const { plusSelected } = this.state;
    this.props.setSearchParams({ plusSelected });
  }

  clearFilter = (): void => {
    this.props.setSearchParams({ plusSelected: false });
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
    this.setState({ plusSelected: !this.state.plusSelected }, this.prepareToApply);
  }

  render() {
    const { isLast } = this.props;
    const { plusSelected } = this.state;
    return (
      <ZipcubePlusComponent
        handleChange={this.handleSwitch}
        isLast={isLast}
        selected={plusSelected}
        {...this.props}
      />
    );
  }
}

export default useSearch(ZipcubePlusContainer);
