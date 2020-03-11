import * as React from 'react';

// MaterialUI
import { Checkbox as CheckboxUI } from '@material-ui/core';

type Props = {
  checked: boolean;
  disabled?: boolean;
  name: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => void;
};

const CheckboxInput = ({ checked, disabled, name, onChange }: Props) => (
  <CheckboxUI
    checked={checked}
    color="primary"
    disabled={disabled}
    name={name}
    onChange={onChange}
  />
);

export default CheckboxInput;
