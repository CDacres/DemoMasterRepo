import * as React from 'react';
import shortid from 'shortid';

// Components
import LayoutCheckbox from '@src/components/Search/Filters/common/Layout/LayoutCheckbox';
import FilterPanelItem from '@src/components/concrete/FilterBar/FilterPanels/FilterPanel/FilterPanelItem';

// Types
import { FilterProps } from '@src/components/Search/Filters/Filter';

type Props = FilterProps & {
  configurationOptions: Array<{
    id: string;
    subtitle: string;
    title: string;
  }>;
  configurations: string[];
  handleChange: (configurationId: string) => void;
};

const LayoutComponent = ({ configurationOptions, configurations, handleChange }: Props) => {
  return (
    <React.Fragment>
      {configurationOptions.map(({ id, subtitle, title }) => (
        <FilterPanelItem
          key={shortid.generate()}
          needsMinWidth={true}
        >
          <LayoutCheckbox
            checked={configurations.indexOf(id) > -1}
            configurationId={id}
            onChange={handleChange}
            subtitle={subtitle}
            title={title}
          />
        </FilterPanelItem>
      ))}
    </React.Fragment>
  );
};

export default LayoutComponent;
