/* tslint:disable:max-line-length */
import * as React from 'react';
import clsx from 'clsx';

// MaterialUI
import { Button as ButtonUI, ButtonBase as ButtonBaseUI, IconButton as IconButtonUI } from '@material-ui/core';
import { withStyles, WithStyles } from '@material-ui/core/styles';

// Core
import { specs } from '@src/core/ux';

interface Props extends WithStyles<typeof styles> {
  buttonType?: 'basic' | 'icon';
  children: React.ReactNode;
  className?: string;
  color?: 'default' | 'inherit' | 'primary' | 'secondary';
  disabled?: boolean;
  hasBoldText?: boolean;
  hasLargePadding?: boolean;
  hasLargeText?: boolean;
  hasLeftBorder?: boolean;
  hasWhiteText?: boolean;
  noBorderRadius?: boolean;
  noUpperCase?: boolean;
  onClick?: VoidFunction;
  size?: 'large' | 'small';
  variant?: 'text' | 'outlined' | 'contained';
}

const styles = {
  root: {
    'white-space': 'nowrap',
    fontFamily: specs.fontFamily,
  },
  large: {
    minWidth: '120px',
  },
  small: {
    minWidth: '0px',
  },
  largePadding: {
    padding: '12px 18px',
  },
  whiteText: {
    color: '#fff',
  },
  bold: {
    fontWeight: 700,
  },
  largeText: {
    fontSize: '16px',
    fontWeight: 400,
  },
  borderLeft: {
    borderLeft: specs.boxBorder,
  },
  noBorderRadius: {
    borderRadius: '0px',
  },
  noUpperCase: {
    'text-transform': 'none',
  },
  primary: {
    color: specs.primary,
  },
  error: {
    color: specs.error,
  },
  largeIcon: {
    gridColumn: '2',
    gridRow: '1 / span 1',
    fontSize: '48px',
  },
  outlined: {
    backgroundColor: '#efefef',
  },
};

const Button = ({ buttonType, children, classes, className, color, disabled, hasBoldText, hasLargePadding, hasLargeText, hasLeftBorder, hasWhiteText, noBorderRadius, noUpperCase, onClick, size, variant }: Props) => {
  const buttonClass = [classes.root, className];
  if (buttonType === 'icon') {
    buttonClass.push(classes.largeIcon);
  } else {
    if (size === 'large') {
      buttonClass.push(classes.large);
    } else if (size === 'small') {
      buttonClass.push(classes.small);
    }
  }
  if (hasLargePadding) {
    buttonClass.push(classes.largePadding);
  }
  if (hasBoldText) {
    buttonClass.push(classes.bold);
  }
  if (hasWhiteText) {
    buttonClass.push(classes.whiteText);
  }
  if (hasLargeText) {
    buttonClass.push(classes.largeText);
  }
  if (hasLeftBorder) {
    buttonClass.push(classes.borderLeft);
  }
  if (noBorderRadius) {
    buttonClass.push(classes.noBorderRadius);
  }
  if (noUpperCase) {
    buttonClass.push(classes.noUpperCase);
  }
  if (variant === 'outlined') {
    buttonClass.push(classes.outlined);
  }
  if (buttonType === 'icon') {
    return (
      <IconButtonUI
        className={clsx(buttonClass)}
        onClick={onClick}
      >
        {children}
      </IconButtonUI>
    );
  } else if (buttonType === 'basic') {
    if (color === 'primary') {
      buttonClass.push(classes.primary);
    }
    return (
      <ButtonBaseUI
        className={clsx(buttonClass)}
        disabled={disabled}
        onClick={onClick}
      >
        {children}
      </ButtonBaseUI>
    );
  } else {
    return (
      <ButtonUI
        className={clsx(buttonClass)}
        color={color}
        disabled={disabled}
        onClick={onClick}
        variant={variant}
      >
        {children}
      </ButtonUI>
    );
  }
};

export default withStyles(styles)(Button);
