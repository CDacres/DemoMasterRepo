import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';
import { margin } from '@src/styles';

// Components
import { ConnectedTranslatable as Translatable } from '@src/components/abstract/Translatable';

// Types
import { OpenHoursSchedule } from '@src/typings/types';

const OpeningHours = ({ opening }: OpenHoursSchedule) => (
  <div>
    {opening.map(day => (
      <div
        className={css(styles.hours, margin.bottom_1)}
        key={day.name}
      >
        {day.working_hours ? (
          <React.Fragment>
            <span>
              <Translatable content={{ transKey: `common.${day.name}` }} />:
            </span>
            <span>
              {`${day.working_hours.from} - ${day.working_hours.to}`}
            </span>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <span className={css(styles.closed)}>
              <Translatable content={{ transKey: `common.${day.name}` }} />:
            </span>
            <Translatable content={{ transKey: 'common.closed' }}>
              <span className={css(styles.closed)} />
            </Translatable>
          </React.Fragment>
        )}
      </div>
    ))}
  </div>
);

export default OpeningHours;
