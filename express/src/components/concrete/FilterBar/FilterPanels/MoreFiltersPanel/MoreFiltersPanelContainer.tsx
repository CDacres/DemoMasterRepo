import * as React from 'react';

// Context
import MoreFiltersPanelProvider from '@src/components/concrete/FilterBar/FilterPanels/MoreFiltersPanel/MoreFiltersPanelContext';

// Components
import MoreFiltersPanelComponent from '@src/components/concrete/FilterBar/FilterPanels/MoreFiltersPanel/MoreFiltersPanelComponent';

type Props = {
  canClear: boolean;
  children: () => JSX.Element | JSX.Element[];
  onApply: () => void;
  onClear: () => void;
};

const MoreFiltersPanelContainer = ({ canClear, children, onApply, onClear }: Props) => (
  <MoreFiltersPanelProvider>
    <MoreFiltersPanelComponent
      canClear={canClear}
      onApply={onApply}
      onClear={onClear}
    >
      {children()}
    </MoreFiltersPanelComponent>
  </MoreFiltersPanelProvider>
);

export default MoreFiltersPanelContainer;
