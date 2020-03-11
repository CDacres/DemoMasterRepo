import * as React from 'react';
import clsx from 'clsx';

// MaterialUI
import { Radio as RadioUI } from '@material-ui/core';
import { withStyles, WithStyles } from '@material-ui/core/styles';

interface Props extends WithStyles<typeof styles> {
  checked: boolean;
  disabled?: boolean;
  name: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => void;
}

const styles = {
  root: {
    justifySelf: 'center',
    alignSelf: 'center',
  },
};

const RadioInput = ({ checked, classes, disabled, name, onChange }: Props) => (
  <RadioUI
    checked={checked}
    className={clsx(classes.root)}
    color="primary"
    disabled={disabled}
    name={name}
    onChange={onChange}
  />
);

export default withStyles(styles)(RadioInput);
