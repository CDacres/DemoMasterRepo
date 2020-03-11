import * as React from 'react';

// Components
import Spell from '@src/components/Listing/Translate/Spell';

type Props = {
  limit: number;
  openingHours: Array<{
    days: string[];
    time: string;
  }>;
};

const PlanTitle = ({ limit, openingHours }: Props) => (
  <React.Fragment>
    {openingHours.first().days.map((day, index) => (
      <React.Fragment key={index}>
        {index !== 0 &&
          <React.Fragment>
            {' '}
          </React.Fragment>
        }
        <Spell word={day} />
      </React.Fragment>
    ))}
    {openingHours.first().time &&
      <React.Fragment>
        {' '}
        {openingHours.first().time}
      </React.Fragment>
    }
    {openingHours.length > limit &&
      <React.Fragment>
        {'...'}
      </React.Fragment>
    }
  </React.Fragment>
);

export default PlanTitle;
