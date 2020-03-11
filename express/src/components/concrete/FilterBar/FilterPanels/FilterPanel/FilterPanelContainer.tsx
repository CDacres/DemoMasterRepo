import * as React from 'react';

// Components
import FilterPanelComponent from '@src/components/concrete/FilterBar/FilterPanels/FilterPanel/FilterPanelComponent';
import FilterPanelFooter from '@src/components/concrete/FilterBar/FilterPanels/FilterPanel/FilterPanelFooter';

type Props = {
  canClear: boolean;
  children: () => JSX.Element;
  onApply: () => void;
  onClear: () => void;
};

const FilterPanelContainer = ({ canClear, children, onApply, onClear }: Props) => (
  <FilterPanelComponent render={children}>
    <FilterPanelFooter
      canClear={canClear}
      onApply={onApply}
      onClear={onClear}
    />
  </FilterPanelComponent>
);

export default FilterPanelContainer;
