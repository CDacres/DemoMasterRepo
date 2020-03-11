import * as React from 'react';

// Types
import { SelectOption } from '@src/typings/types';

type Props = {
  option: SelectOption;
  selected?: boolean;
};

const Option = ({ option: { text, value }, selected }: Props) => (
  <option
    selected={selected}
    value={value}
  >
    {text}
  </option>
);

export default Option;
