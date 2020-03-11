import * as React from 'react';
import shortid from 'shortid';

// Components
import OfficeTypeCheckbox from '@src/components/Search/Filters/Office/OfficeType/OfficeTypeCheckbox';
import FilterPanelItem from '@src/components/concrete/FilterBar/FilterPanels/FilterPanel/FilterPanelItem';

// Types
import { FilterProps } from '@src/components/Search/Filters/Filter';

type Props = FilterProps & {
  handleChange: (officeTypeId: string) => void;
  officeOptions: Array<{
    id: string;
    subtitle: string;
    title: string;
  }>;
  officeTypes: string[];
};

const OfficeTypeComponent = ({ handleChange, officeOptions, officeTypes }: Props) => {
  return (
    <React.Fragment>
      {officeOptions.map(({ id, subtitle, title }) => (
        <FilterPanelItem
          key={shortid.generate()}
          needsMinWidth={true}
        >
          <OfficeTypeCheckbox
            checked={officeTypes.indexOf(id) > -1}
            officeTypeId={id}
            onChange={handleChange}
            subtitle={subtitle}
            title={title}
          />
        </FilterPanelItem>
      ))}
    </React.Fragment>
  );
};

export default OfficeTypeComponent;
