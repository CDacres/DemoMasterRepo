/* tslint:disable:max-line-length */
import * as React from 'react';

// Components
import Label from '@src/components/concrete/Label';
import OptionGroup from '@src/components/concrete/Dropdown/OptionGroup';
import Select from '@src/components/concrete/Dropdown/Select';
import { ConnectedTranslatable as Translatable } from '@src/components/abstract/Translatable';

// Utils
import { manageTimes } from '@src/utils';

type Props = {
  label?: string;
  select?: (prop: string, e: any) => void;
  stepBack?: () => void;
  time?: any;
  timeConfig?: string;
};

const SingleTimeSelectionContainer: React.FunctionComponent<Props> = ({ label, select, stepBack, time, timeConfig }) => {
  const orderTimes: string[] = manageTimes('18:00', timeConfig); // TODO: stop the time being hardcoded
  const selectTime = (e) => {
    select('time', e.title);
  };
  return (
    <div>
      <Label>
        <Translatable content={{ transKey: label }} />
      </Label>
      {!time ? (
        <OptionGroup
          chosen={selectTime}
          options={orderTimes.map(el => {
            return { title: el };
          })}
        />
      ) : (
        <Select action={stepBack}>
          {time}
        </Select>
      )}
    </div>
  );
};

SingleTimeSelectionContainer.defaultProps = { label: 'room.time' };

export default SingleTimeSelectionContainer;
