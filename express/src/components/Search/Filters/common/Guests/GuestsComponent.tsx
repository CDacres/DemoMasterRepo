import * as React from 'react';
import isMobile from 'ismobilejs';

// Components
import OptionGroup from '@src/components/concrete/Dropdown/OptionGroup';
import FilterPanelItem from '@src/components/concrete/FilterBar/FilterPanels/FilterPanel/FilterPanelItem';

// Types
import { SelectOption } from '@src/typings/types';

type Props = {
  guests: string | number;
  onChange: (value: string) => void;
  options: SelectOption[];
};

const GuestsComponent = ({ guests, onChange, options }: Props) => {
  if (isMobile.any) {
    return (
      <OptionGroup
        chosen={onChange}
        options={options.map(el => {
          return {
            selected: (el.value === guests),
            title: el.text,
          };
        })}
      />
    );
  } else {
    return (
      <FilterPanelItem needsMinWidth={true}>
        <OptionGroup
          chosen={onChange}
          options={options.map(el => {
            return {
              selected: (el.value === guests),
              title: el.text,
            };
          })}
        />
      </FilterPanelItem>
    );
  }
};

export default GuestsComponent;
