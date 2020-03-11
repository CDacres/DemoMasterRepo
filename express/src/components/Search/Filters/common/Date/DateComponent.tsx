import * as React from 'react';
import moment from 'moment';
import isMobile from 'ismobilejs';
import { css } from 'aphrodite/no-important';

// Styles
import { padding } from '@src/styles';

// Constants
import { VERTICAL_SCROLLABLE } from 'react-dates/constants';

// Components
import DatepickerSingle from '@src/components/concrete/Datepicker/DatepickerSingle';
import FilterPanelItem from '@src/components/concrete/FilterBar/FilterPanels/FilterPanel/FilterPanelItem';
import MobileFilterPanelItem from '@src/components/concrete/FilterBar/FilterPanels/MobileFilterPanel/MobileFilterPanelContent/MobileFilterPanelItem';

// Types
import { FilterProps } from '@src/components/Search/Filters/Filter';

type Props = FilterProps & {
  date: moment.Moment;
  datepickerLang: string;
  onDateChange: (date: moment.Moment) => void;
};

const DateComponent = ({ date, datepickerLang, isLast, onDateChange }: Props) => {
  if (isMobile.any) {
    return (
      <MobileFilterPanelItem isLast={isLast}>
        <DatepickerSingle
          date={date}
          datepickerLang={datepickerLang}
          daySize={49}
          numberOfMonths={4}
          onChange={onDateChange}
          orientation={VERTICAL_SCROLLABLE}
          showInput={true}
        />
      </MobileFilterPanelItem>
    );
  } else {
    return (
      <FilterPanelItem>
        <div className={css(padding.all_0)}>
          <DatepickerSingle
            date={date}
            datepickerLang={datepickerLang}
            numberOfMonths={2}
            onChange={onDateChange}
          />
        </div>
      </FilterPanelItem>
    );
  }
};

export default DateComponent;
