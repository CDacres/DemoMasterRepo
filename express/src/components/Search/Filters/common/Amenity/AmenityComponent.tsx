/* tslint:disable:max-line-length */
import * as React from 'react';
import isMobile from 'ismobilejs';
import shortid from 'shortid';

// Components
import AmenityCheckbox from '@src/components/Search/Filters/common/Amenity/AmenityCheckbox';
import PanelItemCollapse from '@src/components/concrete/FilterBar/FilterPanels/PanelItems/PanelItemCollapse';
import PanelItemHeader from '@src/components/concrete/FilterBar/FilterPanels/PanelItems/PanelItemHeader';
import FilterPanelItem from '@src/components/concrete/FilterBar/FilterPanels/FilterPanel/FilterPanelItem';
import MoreFiltersPanelItem from '@src/components/concrete/FilterBar/FilterPanels/MoreFiltersPanel/MoreFiltersPanelItem';
import MobileFilterPanelItem from '@src/components/concrete/FilterBar/FilterPanels/MobileFilterPanel/MobileFilterPanelContent/MobileFilterPanelItem';
import MobileFilterPanelItemInner from '@src/components/concrete/FilterBar/FilterPanels/MobileFilterPanel/MobileFilterPanelContent/MobileFilterPanelItem/MobileFilterPanelItemInner';

// Types
import { FilterProps } from '@src/components/Search/Filters/Filter';

type Props = FilterProps & {
  amenities: string[];
  amenityOptions: Array<{
    id: string;
    title: string;
  }>;
  handleChange: (amenityId: string) => void;
  headerTitle?: string;
};

const AmenityComponent = ({ amenities, amenityOptions, handleChange, headerTitle, isLarge, isLast }: Props) => {
  if (isMobile.any) {
    return (
      <MobileFilterPanelItem
        isCollapseElement={true}
        isLast={isLast}
      >
        <PanelItemCollapse header={headerTitle}>
          {amenityOptions.map(({ id, title }) => (
            <MobileFilterPanelItemInner key={shortid.generate()}>
              <AmenityCheckbox
                amenityId={id}
                checked={amenities.indexOf(id) > -1}
                onChange={handleChange}
                title={title}
              />
            </MobileFilterPanelItemInner>
          ))}
        </PanelItemCollapse>
      </MobileFilterPanelItem>
    );
  } else if (isLarge) {
    return (
      <MoreFiltersPanelItem isLast={isLast}>
        <PanelItemHeader text={headerTitle} />
        <PanelItemCollapse isLarge={true}>
          {amenityOptions.map(({ id, title }) => (
            <FilterPanelItem
              key={shortid.generate()}
              isLarge={true}
              with2={true}
            >
              <AmenityCheckbox
                amenityId={id}
                checked={amenities.indexOf(id) > -1}
                onChange={handleChange}
                title={title}
              />
            </FilterPanelItem>
          ))}
        </PanelItemCollapse>
      </MoreFiltersPanelItem>
    );
  } else {
    return (
      <React.Fragment>
        {amenityOptions.map(({ id, title }) => (
          <FilterPanelItem
            key={shortid.generate()}
            needsMinWidth={true}
            with2={true}
          >
            <AmenityCheckbox
              amenityId={id}
              checked={amenities.indexOf(id) > -1}
              onChange={handleChange}
              title={title}
            />
          </FilterPanelItem>
        ))}
      </React.Fragment>
    );
  }
};

export default AmenityComponent;
