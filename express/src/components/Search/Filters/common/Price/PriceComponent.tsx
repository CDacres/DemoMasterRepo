import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';
import { margin, pagestyles } from '@src/styles';

// Components
import FilterPanelItem from '@src/components/concrete/FilterBar/FilterPanels/FilterPanel/FilterPanelItem';
import Slider from '@src/components/concrete/Inputs/Slider';
import Input from '@src/components/Search/Filters/common/Price/Input';

type PriceObj = {
  values: number[];
};
type Props = {
  currencySymbol: string;
  max: number;
  min: number;
  onChange: (priceObject: PriceObj) => void;
  onDrag: (priceObject: PriceObj) => void;
  priceRange: number[];
};

const PriceComponent = ({ currencySymbol, max, min, onChange, onDrag, priceRange }: Props) => {
  const [low, high] = priceRange;
  return (
    <FilterPanelItem needsMinWidth={true}>
      <div className={css(margin.bottom_2)}>
        <div className={css(margin.bottom_2)}>
          <div className={css(margin.bottom_1)}>
            <div className={css(pagestyles.smallText, margin.all_0)}>
              The average price is £55.
              {/* TODO: translation key */}
            </div>
          </div>
          <div className={css(styles.sliderContainer)}>
            <Slider
              max={max}
              min={min}
              onChange={onChange}
              onValuesUpdated={onDrag}
              values={priceRange}
            />
            <div className={css(styles.inputWrapper)}>
              <Input
                currencySymbol={currencySymbol}
                id="priceFilterMinLabel"
                inputId="price_filter_min"
                transKey="search.min_price"
                value={low}
              />
              <div className={css(margin.all_1)}>
                –
              </div>
              <Input
                currencySymbol={currencySymbol}
                id="priceFilterMaxLabel"
                inputId="price_filter_max"
                transKey="search.max_price"
                value={high === max ? `${max}+` : high}
              />
            </div>
          </div>
        </div>
      </div>
    </FilterPanelItem>
  );
};

export default PriceComponent;
