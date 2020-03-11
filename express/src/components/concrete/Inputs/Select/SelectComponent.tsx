import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';

// Types
import { SelectOption } from '@src/typings/types';

type Props = {
  defaultText: string;
  id: string;
  name: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  options: SelectOption[];
  value: string | number;
};

const SelectComponent = ({ defaultText, id, name, onChange, options, value }: Props) => (
  <div className={css(styles.selectBlock)}>
    <select
      className={css(styles.select)}
      id={id}
      name={name}
      onChange={onChange}
      value={value}
    >
      <option
        disabled={true}
        value=""
      >
        {defaultText}
      </option>
      {options}
    </select>
  </div>
);

export default SelectComponent;
