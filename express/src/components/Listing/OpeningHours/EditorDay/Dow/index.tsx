import * as React from 'react';

// Core
import { dayOfWeekCatalog } from '@src/core/meta';
import { DailyHours } from '@src/core/domain';

// Components
import Spell from '@src/components/Listing/Translate/Spell';

type Props = {
  day: DailyHours;
};

const Dow = ({ day }: Props) => (
  <Spell word={dayOfWeekCatalog.byId[day.day].description} />
);

export default Dow;
