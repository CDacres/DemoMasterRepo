import * as React from 'react';

// Components
import SpellRender from '@src/components/Listing/Translate/SpellRender';
import SelectOption from '@src/components/Listing/Form/SelectInput/SelectOption';

const MinimumDurationOption = () => (
  <SpellRender render={(t) => <SelectOption value={0}>{t.get('common.no_minimum')}</SelectOption>} />
);

export default MinimumDurationOption;
