import * as React from 'react';

// Core
import { hourDurationCatalog } from '@src/core/meta';

// Components
import SpellRender from '@src/components/Listing/Translate/SpellRender';
import SelectOption from '@src/components/Listing/Form/SelectInput/SelectOption';

const HourOptions = () => (
  <React.Fragment>
    {hourDurationCatalog.items.map((i, k) => (
      <SpellRender
        key={k}
        render={(t) => <SelectOption value={i.minutes}>{t.get(i.description)}</SelectOption>}
      />
    ))}
  </React.Fragment>
);

export default HourOptions;
