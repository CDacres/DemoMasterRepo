import * as React from 'react';
import clsx from 'clsx';

// MaterialUI
import { DialogContent as DialogContentUI } from '@material-ui/core';
import { withStyles, WithStyles } from '@material-ui/core/styles';

interface Props extends WithStyles<typeof styles> {
  children: React.ReactNode;
  isLarge?: boolean;
}

const styles = {
  large: {
    padding: '32px 24px 16px 24px',
  },
};

const DialogContentSection = ({ classes, children, isLarge }: Props) => (
  <DialogContentUI {...(isLarge ? { className: clsx(classes.large) } : {})}>
    {children}
  </DialogContentUI>
);

export default withStyles(styles)(DialogContentSection);
