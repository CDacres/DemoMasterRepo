import * as React from 'react';
import isMobile from 'ismobilejs';
import shortid from 'shortid';

// Components
import TypeCheckbox from '@src/components/Search/Filters/common/Type/TypeCheckbox';
import FilterPanelItem from '@src/components/concrete/FilterBar/FilterPanels/FilterPanel/FilterPanelItem';
import MobileFilterPanelItem from '@src/components/concrete/FilterBar/FilterPanels/MobileFilterPanel/MobileFilterPanelContent/MobileFilterPanelItem';
import MobileFilterPanelItemInner from '@src/components/concrete/FilterBar/FilterPanels/MobileFilterPanel/MobileFilterPanelContent/MobileFilterPanelItem/MobileFilterPanelItemInner';

// Types
import { FilterProps } from '@src/components/Search/Filters/Filter';

type Props = FilterProps & {
  handleChange: (amenityId: string) => void;
  typeOptions: Array<{
    id: string;
    subtitle: string;
    title: string;
  }>;
  types: string[];
};

const TypeComponent = ({ handleChange, isLast, typeOptions, types }: Props) => {
  if (isMobile.any) {
    return (
      <MobileFilterPanelItem isLast={isLast}>
        {typeOptions.map(({ id, subtitle, title }) => (
          <MobileFilterPanelItemInner key={shortid.generate()}>
            <TypeCheckbox
              checked={types.indexOf(id) > -1}
              onChange={handleChange}
              subtitle={subtitle}
              title={title}
              typeId={id}
            />
          </MobileFilterPanelItemInner>
        ))}
      </MobileFilterPanelItem>
    );
  } else {
    return (
      <React.Fragment>
        {typeOptions.map(({ id, subtitle, title }) => (
          <FilterPanelItem
            key={shortid.generate()}
            needsMinWidth={true}
          >
            <TypeCheckbox
              checked={types.indexOf(id) > -1}
              onChange={handleChange}
              subtitle={subtitle}
              title={title}
              typeId={id}
            />
          </FilterPanelItem>
        ))}
      </React.Fragment>
    );
  }
};

export default TypeComponent;
