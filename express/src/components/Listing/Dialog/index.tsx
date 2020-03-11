import * as React from 'react';

// MaterialUI
import { Dialog as DialogUI, withMobileDialog } from '@material-ui/core';

type Props = {
  children: React.ReactNode;
  fullScreen?: boolean;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | false;
  onClose: VoidFunction;
  open: boolean;
  scroll?: 'body' | 'paper';
};

const Dialog = ({ children, fullScreen, maxWidth, onClose, open, scroll }: Props) => (
  <DialogUI
    fullScreen={fullScreen}
    fullWidth={true}
    maxWidth={maxWidth}
    onClose={onClose}
    open={open}
    scroll={scroll || 'body'}
  >
    {children}
  </DialogUI>
);

export default withMobileDialog<Partial<Props>>({ breakpoint: 'sm' })(Dialog);
