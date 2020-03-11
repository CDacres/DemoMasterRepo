import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';
import { margin, padding } from '@src/styles';

type Props = {
  checked: boolean;
  extras?: JSX.Element | boolean;
  id: string;
  label: string;
  name: string;
  onToggle: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
};

const CheckboxComponent = ({ checked, extras, id, label, onToggle, name, value }: Props) => (
  <React.Fragment>
    <label
      className={css(styles.label, margin.all_0, padding.top_2, padding.bottom_1, padding.leftright_0)}
      htmlFor={id}
    >
      <input
        checked={checked}
        className={css(styles.checkbox)}
        id={id}
        name={name}
        onChange={onToggle}
        type="checkbox"
        value={value}
      />
      {label}
    </label>
    {(checked && extras) ? (
      <div className={css(styles.extrasContainer)}>
        {extras}
      </div>
    ) : (
      null
    )}
  </React.Fragment>
);

export default CheckboxComponent;
