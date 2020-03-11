/* tslint:disable:max-line-length */
import * as React from 'react';
import isMobile from 'ismobilejs';

// Components
import MoreFiltersPanelItem from '@src/components/concrete/FilterBar/FilterPanels/MoreFiltersPanel/MoreFiltersPanelItem';
import MobileFilterPanelItem from '@src/components/concrete/FilterBar/FilterPanels/MobileFilterPanel/MobileFilterPanelContent/MobileFilterPanelItem';
import PanelItemDescription from '@src/components/concrete/FilterBar/FilterPanels/PanelItems/PanelItemDescription';
import PanelItemHeader from '@src/components/concrete/FilterBar/FilterPanels/PanelItems/PanelItemHeader';
import PanelItemLearnMore from '@src/components/concrete/FilterBar/FilterPanels/PanelItems/PanelItemLearnMore';
import PanelItemSubtitle from '@src/components/concrete/FilterBar/FilterPanels/PanelItems/PanelItemSubtitle';
import PanelItemToggle from '@src/components/concrete/FilterBar/FilterPanels/PanelItems/PanelItemToggle';

// Types
import { FilterProps } from '@src/components/Search/Filters/Filter';

type Props = FilterProps & {
  handleChange: () => void;
  selected: boolean;
};

const ZipcubePlusComponent = ({ handleChange, isLarge, isLast, selected }: Props) => {
  if (isMobile.any) {
    return (
      <MobileFilterPanelItem isLast={isLast}>
        <PanelItemHeader text="common.plus_offers" />
        <PanelItemSubtitle text="common.zipcube_plus" />
        <PanelItemDescription text="common.zipcube_plus_description" />
        <PanelItemToggle
          handleChange={handleChange}
          selected={selected}
        />
      </MobileFilterPanelItem>
    );
  } else if (isLarge) {
    return (
      <MoreFiltersPanelItem isLast={isLast}>
        <PanelItemHeader text="common.plus_offers" />
        <PanelItemSubtitle text="common.zipcube_plus" />
        <PanelItemDescription text="common.zipcube_plus_description" />
        <PanelItemLearnMore />
        <PanelItemToggle
          handleChange={handleChange}
          selected={selected}
        />
      </MoreFiltersPanelItem>
    );
  }
  return null;
};

export default ZipcubePlusComponent;
