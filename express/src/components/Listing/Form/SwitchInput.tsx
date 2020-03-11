import * as React from 'react';

// MaterialUI
import { Switch as SwitchUI } from '@material-ui/core';

type Props = {
  checked: boolean;
  name: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => void;
};

const SwitchInput = ({ checked, onChange }: Props) => (
  <SwitchUI
    checked={checked}
    color="primary"
    onChange={onChange}
  />
);

export default SwitchInput;
