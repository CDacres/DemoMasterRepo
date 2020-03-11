import * as React from 'react';

// Components
import FilterPanelItem from '@src/components/concrete/FilterBar/FilterPanels/FilterPanel/FilterPanelItem';
import FilterPanelItemInner from '@src/components/concrete/FilterBar/FilterPanels/FilterPanel/FilterPanelItem/FilterPanelItemInner';
import SimpleInput from '@src/components/concrete/Inputs/SimpleInput';

type Props = {
  from: string;
  onFromChange: (value: string) => void;
  onToChange: (value: string) => void;
  to: string;
};

const OfficeSizeComponent = ({ from, onFromChange, onToChange, to }: Props) => (
  <React.Fragment>
    <FilterPanelItem needsMinWidth={true}>
      <FilterPanelItemInner title="common.from">
        <SimpleInput
          onChange={onFromChange}
          value={from}
        />
      </FilterPanelItemInner>
    </FilterPanelItem>
    <FilterPanelItem needsMinWidth={true}>
      <FilterPanelItemInner title="common.to">
        <SimpleInput
          onChange={onToChange}
          value={to}
        />
      </FilterPanelItemInner>
    </FilterPanelItem>
  </React.Fragment>
);

export default OfficeSizeComponent;
