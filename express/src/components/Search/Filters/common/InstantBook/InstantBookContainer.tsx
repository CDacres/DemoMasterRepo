import * as React from 'react';

// Connectors
import { useSearch } from '@src/store/connectors';

// Components
import SearchFilter, { FilterProps } from '@src/components/Search/Filters/Filter';
import InstantBookComponent from '@src/components/Search/Filters/common/InstantBook/InstantBookComponent';

type Props = FilterProps & {
  values: State;
};

type State = {
  instantBookSelected: boolean;
};

class InstantBookContainer extends SearchFilter<Props, State> {

  constructor(props: Props) {
    super(props);
    const { values: { instantBookSelected } } = props;
    this.state = { instantBookSelected };
  }

  applyFilter = (): void => {
    const { instantBookSelected } = this.state;
    this.props.setSearchParams({ instantBookSelected });
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
    this.setState({ instantBookSelected: !this.state.instantBookSelected }, this.prepareToApply);
  }

  render() {
    const { isLast } = this.props;
    const { instantBookSelected } = this.state;
    return (
      <InstantBookComponent
        handleChange={this.handleSwitch}
        isLast={isLast}
        selected={instantBookSelected}
        {...this.props}
      />
    );
  }
}

export default useSearch(InstantBookContainer);
