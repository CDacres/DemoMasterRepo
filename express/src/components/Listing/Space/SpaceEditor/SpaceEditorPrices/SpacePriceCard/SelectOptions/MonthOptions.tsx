import * as React from 'react';

// Core
import { Term } from '@src/core/domain';

// Components
import SpellRender from '@src/components/Listing/Translate/SpellRender';
import SelectOption from '@src/components/Listing/Form/SelectInput/SelectOption';

type Props = {
  item: Term;
};

const MonthOptions = ({ item }: Props) => (
  <SpellRender render={(t) => <SelectOption value={item.months}>{t.get(item.description)}</SelectOption>} />
);

export default MonthOptions;
