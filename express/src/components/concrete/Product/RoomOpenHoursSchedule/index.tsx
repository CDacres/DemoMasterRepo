import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import { margin } from '@src/styles';

// Components
import ContentSeparator from '@src/components/concrete/ContentSeparator';
import GenericHeader from '@src/components/concrete/GenericHeader';
import OpeningHours from '@src/components/concrete/OpeningHours';

// Types
import { OpenHoursSchedule } from '@src/typings/types';

const RoomOpenHoursSchedule = ({ opening }: OpenHoursSchedule) => (
  <React.Fragment>
    {(opening && opening.length > 0) &&
      <section id="opening_hours">
        <div className={css(margin.bottom_2)}>
          <GenericHeader text="listing.opening_hours" />
        </div>
        <OpeningHours opening={opening} />
        <ContentSeparator marginNum={4} />
      </section>
    }
  </React.Fragment>
);

export default RoomOpenHoursSchedule;
