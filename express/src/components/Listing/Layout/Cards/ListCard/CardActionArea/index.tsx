import * as React from 'react';
import clsx from 'clsx';

// MaterialUI
import { CardActionArea as CardActionAreaUI } from '@material-ui/core';
import { withStyles, WithStyles } from '@material-ui/core/styles';

// Core
import { specs } from '@src/core/ux';

interface Props extends WithStyles<typeof styles> {
  children: React.ReactNode;
  disabled?: boolean;
  hasAllPadding?: boolean;
  hasRightPadding?: boolean;
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const styles = {
  root: {
    fontFamily: specs.fontFamily,
    height: '100%',
  },
  rightPadding: {
    paddingRight: '24px',
  },
  allPadding: {
    padding: '16px',
  },
};

const CardActionArea = ({ children, classes, disabled, hasAllPadding, hasRightPadding, onClick }: Props) => (
  <CardActionAreaUI
    className={clsx(classes.root, hasRightPadding ? classes.rightPadding : hasAllPadding ? classes.allPadding : null)}
    {...(!disabled ? { onClick: onClick } : { disabled: true, disableRipple: true, disableTouchRipple: true })}
  >
    {children}
  </CardActionAreaUI>
);

export default withStyles(styles)(CardActionArea);
