import * as React from 'react';

// MaterialUI
import { Collapse as CollapseUI } from '@material-ui/core';

type Props = {
  children: React.ReactNode;
  collapsed?: React.ReactNode;
  open: boolean;
};

const Expanded = ({ children, collapsed, open }: Props) => (
  <div>
    {!open ? collapsed : null}
    <CollapseUI
      in={open}
      timeout={600}
    >
      {children}
    </CollapseUI>
  </div>
);

export default Expanded;
