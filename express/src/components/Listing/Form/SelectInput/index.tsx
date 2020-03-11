import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';

// Components
import Strip from '@src/components/Listing/Layout/Strip';
import ArrowDropDown from '@src/components/Listing/Icons/ArrowDropDown';

type Props = {
  children: React.ReactNode;
  errors?: string[];
  name: string;
  onChange?: React.ChangeEventHandler<HTMLSelectElement>;
  value: string | number | string[];
};

const SelectInput = ({ children, errors, name, onChange, value }: Props) => (
  <Strip
    className={css(styles.selectContainer, (errors && errors.length > 0) && styles.containerError)}
    itemsVert="stretch"
  >
    <select
      className={css(styles.select)}
      name={name}
      onChange={onChange}
      required={true}
      value={value}
    >
      {children}
    </select>
    <Strip
      col="1"
      height="auto"
      horz="end"
      row="1"
      style={{ pointerEvents: 'none' }}
      vert="center"
      width="auto"
    >
      <ArrowDropDown />
    </Strip>
  </Strip>
);

export default SelectInput;
