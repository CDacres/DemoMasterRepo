/* tslint:disable:max-line-length */
import * as React from 'react';
import clsx from 'clsx';

// MaterialUI
import { FormControlLabel as FormControlLabelUI } from '@material-ui/core';
import { withStyles, WithStyles } from '@material-ui/core/styles';

// Core
import { specs } from '@src/core/ux';

const styles = {
  root: {
    fontFamily: specs.fontFamily,
  },
  noMarginLeft: {
    marginLeft: '0px',
  },
  noMarginRight: {
    marginRight: '0px',
  },
};

interface Props extends WithStyles<typeof styles> {
  className?: string;
  control: React.ReactElement;
  label: React.ReactNode;
  labelPlacement?: 'end' | 'start' | 'top' | 'bottom';
  noMarginLeft?: boolean;
  noMarginRight?: boolean;
}

const FormControlLabel = ({ classes, className, control, label, labelPlacement, noMarginLeft, noMarginRight }: Props) => {
  const labelClass = [classes.root, className];
  if (noMarginRight) {
    labelClass.push(classes.noMarginRight);
  }
  if (noMarginLeft) {
    labelClass.push(classes.noMarginLeft);
  }
  return (
    <FormControlLabelUI
      className={clsx(labelClass)}
      control={control}
      label={label}
      labelPlacement={labelPlacement}
    />
  );
};

export default withStyles(styles)(FormControlLabel);
