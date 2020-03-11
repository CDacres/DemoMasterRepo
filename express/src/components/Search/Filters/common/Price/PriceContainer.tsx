import * as React from 'react';
import { AllHtmlEntities } from 'html-entities';

// Connectors
import { useSearch, useSearchResults } from '@src/store/connectors';

// Components
import SearchFilter, { FilterProps } from '@src/components/Search/Filters/Filter';
import PriceComponent from '@src/components/Search/Filters/common/Price/PriceComponent';

// Types
import { Store } from '@src/typings/types';

type Props = FilterProps & {
  currencySymbol: string;
  setSearchParams: (params: Store.Search.Params) => void;
  values: State;
};

type State = {
  priceRange: number[];
};

const entities = new AllHtmlEntities();

class PriceContainer extends SearchFilter<Props, State> {
  protected currencySymbol: string;
  protected max: number = 5000;
  protected min: number = 0;

  constructor(props: Props) {
    super(props);
    const { values: { priceRange } } = props;
    this.state = { priceRange: priceRange.length ? priceRange : [this.min, this.max] };
    this.currencySymbol = entities.decode(props.currencySymbol) || '£';
  }

  componentDidMount() {
    const { attachClearAction, values: { priceRange } } = this.props;
    attachClearAction(this.clearFilter);
    if (priceRange.length) {
      this.generateButtonText();
      this.toggleCanClear(true);
    }
  }

  applyFilter = async (): Promise<any> => {
    const { priceRange } = this.state;
    await this.props.setSearchParams({ priceRange });
  }

  clearFilter = (): void => {
    this.props.setSearchParams({ priceRange: [] });
  }

  generateButtonText = (): void => {
    const { setButtonText } = this.props;
    if (setButtonText) {
      const { priceRange } = this.state;
      setButtonText(`${this.currencySymbol}${priceRange[0]} - ${this.currencySymbol}${priceRange[1]}`);
    }
  }

  handleChange = ({ values: priceRange }: { values: number[] }): void => {
    const { onFilterChange } = this.props;
    onFilterChange(this.applyFilter, [priceRange]);
    this.generateButtonText();
    this.toggleCanClear(true);
  }

  handleDrag = ({ values: priceRange }: { values: number[] }): void => {
    this.setState({ priceRange });
  }

  prepareToApply = (): void => {
    const { onFilterChange, toggleCanClear } = this.props;
    onFilterChange(this.applyFilter);
    toggleCanClear(true);
    this.generateButtonText();
  }

  toggleCanClear = (bool: boolean): void => {
    const { toggleCanClear } = this.props;
    if (toggleCanClear) {
      toggleCanClear(bool);
    }
  }

  render() {
    const { priceRange } = this.state;
    return (
      <PriceComponent
        currencySymbol={this.currencySymbol}
        max={this.max}
        min={this.min}
        onChange={this.handleChange}
        onDrag={this.handleDrag}
        priceRange={priceRange}
      />
    );
  }
}

export default useSearch(useSearchResults(PriceContainer));
