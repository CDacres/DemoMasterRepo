import * as React from 'react';
import isMobile from 'ismobilejs';

// Components
import Select from '@src/components/concrete/Inputs/Select';
import FilterPanelItem from '@src/components/concrete/FilterBar/FilterPanels/FilterPanel/FilterPanelItem';
import FilterPanelItemInner from '@src/components/concrete/FilterBar/FilterPanels/FilterPanel/FilterPanelItem/FilterPanelItemInner';
import MobileFilterPanelItem from '@src/components/concrete/FilterBar/FilterPanels/MobileFilterPanel/MobileFilterPanelContent/MobileFilterPanelItem';
import MobileFilterPanelItemInner from '@src/components/concrete/FilterBar/FilterPanels/MobileFilterPanel/MobileFilterPanelContent/MobileFilterPanelItem/MobileFilterPanelItemInner';
import PanelItemBlockWrapper from '@src/components/concrete/FilterBar/FilterPanels/PanelItems/PanelItemBlockWrapper';
import PanelItemHeader from '@src/components/concrete/FilterBar/FilterPanels/PanelItems/PanelItemHeader';
import PanelItemSubtitle from '@src/components/concrete/FilterBar/FilterPanels/PanelItems/PanelItemSubtitle';
import PanelItemSelect from '@src/components/concrete/FilterBar/FilterPanels/PanelItems/PanelItemSelect';

// Types
import { SelectOption } from '@src/typings/types';
import { FilterProps } from '@src/components/Search/Filters/Filter';

type Props = FilterProps & {
  end: string;
  onEndChange: (value: string) => void;
  onlyStart: boolean;
  onStartChange: (value: string) => void;
  options: SelectOption[];
  start: string;
};

const TimeComponent = ({ end, isLast, onEndChange, onlyStart, onStartChange, options, start }: Props) => {
  if (isMobile.any) {
    return (
      <MobileFilterPanelItem isLast={isLast}>
        <PanelItemHeader text="search.filters_time" />
        <MobileFilterPanelItemInner>
          <PanelItemBlockWrapper
            rightElement={
              <PanelItemSelect
                handleChange={onStartChange}
                options={options}
                value={start}
              />
            }
            subtitle={<PanelItemSubtitle text={onlyStart ? 'common.at' : 'common.from'} />}
          />
        </MobileFilterPanelItemInner>
        {!onlyStart &&
          <MobileFilterPanelItemInner>
            <PanelItemBlockWrapper
              rightElement={
                <PanelItemSelect
                  handleChange={onEndChange}
                  options={options}
                  value={end}
                />
              }
              subtitle={<PanelItemSubtitle text="common.to" />}
            />
          </MobileFilterPanelItemInner>
        }
      </MobileFilterPanelItem>
    );
  } else {
    return (
      <React.Fragment>
        <FilterPanelItem needsMinWidth={true}>
          <FilterPanelItemInner title={onlyStart ? 'common.at' : 'common.from'}>
            <Select
              onChange={onStartChange}
              options={options}
              value={start}
            />
          </FilterPanelItemInner>
        </FilterPanelItem>
        {!onlyStart &&
          <FilterPanelItem needsMinWidth={true}>
            <FilterPanelItemInner title="common.to">
              <Select
                onChange={onEndChange}
                options={options}
                value={end}
              />
            </FilterPanelItemInner>
          </FilterPanelItem>
        }
      </React.Fragment>
    );
  }
};

export default TimeComponent;
