import * as React from 'react';
import isMobile from 'ismobilejs';
import shortid from 'shortid';

// Components
import CuisineCheckbox from '@src/components/Search/Filters/Dining/Cuisine/CuisineCheckbox';
import FilterPanelItem from '@src/components/concrete/FilterBar/FilterPanels/FilterPanel/FilterPanelItem';
import MobileFilterPanelItem from '@src/components/concrete/FilterBar/FilterPanels/MobileFilterPanel/MobileFilterPanelContent/MobileFilterPanelItem';
import MobileFilterPanelItemInner from '@src/components/concrete/FilterBar/FilterPanels/MobileFilterPanel/MobileFilterPanelContent/MobileFilterPanelItem/MobileFilterPanelItemInner';

// Types
import { FilterProps } from '@src/components/Search/Filters/Filter';

type Props = FilterProps & {
  cuisineOptions: Array<{
    id: string;
    title: string;
  }>;
  cuisines: string[];
  handleChange: (cuisineId: string) => void;
};

const CuisineComponent = ({ cuisineOptions, cuisines, handleChange, isLast }: Props) => {
  if (isMobile.any) {
    return (
      <MobileFilterPanelItem isLast={isLast}>
        {cuisineOptions.map(({ id, title }) => (
          <MobileFilterPanelItemInner key={shortid.generate()}>
            <CuisineCheckbox
              checked={cuisines.indexOf(id) > -1}
              cuisineId={id}
              onChange={handleChange}
              title={title}
            />
          </MobileFilterPanelItemInner>
        ))}
      </MobileFilterPanelItem>
    );
  } else {
    return (
      <React.Fragment>
        {cuisineOptions.map(({ id, title }) => (
          <FilterPanelItem
            key={shortid.generate()}
            needsMinWidth={true}
            with2={true}
          >
            <CuisineCheckbox
              checked={cuisines.indexOf(id) > -1}
              cuisineId={id}
              onChange={handleChange}
              title={title}
            />
          </FilterPanelItem>
        ))}
      </React.Fragment>
    );
  }
};

export default CuisineComponent;
