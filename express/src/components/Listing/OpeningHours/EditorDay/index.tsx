import * as React from 'react';

// Core
import { DailyHours } from '@src/core/domain';

// Components
import DeviceQuery from '@src/components/Listing/Layout/DeviceQuery';
import Cell from '@src/components/Listing/OpeningHours/EditorDay/Cell';
import Dow from '@src/components/Listing/OpeningHours/EditorDay/Dow';
import Label from '@src/components/Listing/OpeningHours/EditorDay/Label';

type Props = {
  checks: JSX.Element;
  day: DailyHours;
  is247: boolean;
  isClosed: boolean;
  isLabelled: boolean;
  spans: JSX.Element;
  type: 'space' | 'venue';
};

const EditorDay = ({ checks, day, is247, isClosed, isLabelled, spans, type }: Props) => (
  <React.Fragment>
    {isLabelled ? (
      <React.Fragment>
        <DeviceQuery variant="small">
          <Cell span={2}>
            <Dow day={day} />
            {' - '}
            <Label
              is247={is247}
              isClosed={isClosed}
            />
          </Cell>
          {checks}
        </DeviceQuery>
        <DeviceQuery variant="mediumLarge">
          <Cell span={1}>
            <Dow day={day} />
          </Cell>
          <Cell span={1}>
            <Label
              is247={is247}
              isClosed={isClosed}
            />
          </Cell>
          {checks}
        </DeviceQuery>
      </React.Fragment>
    ) : (
      <React.Fragment>
        <DeviceQuery variant="small">
          <Cell span={type === 'space' ? 3 : 5}>
            <Dow day={day} />
          </Cell>
          <Cell span={2}>
            {spans}
          </Cell>
          {checks}
        </DeviceQuery>
        <DeviceQuery variant="mediumLarge">
          <Cell span={1}>
            <Dow day={day} />
          </Cell>
          <Cell span={1}>
            {spans}
          </Cell>
          {checks}
        </DeviceQuery>
      </React.Fragment>
    )}
  </React.Fragment>
);

export default EditorDay;
