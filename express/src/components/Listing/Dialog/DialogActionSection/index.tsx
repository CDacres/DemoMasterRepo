import * as React from 'react';

// MaterialUI
import { DialogActions as DialogActionsUI } from '@material-ui/core';

// Components
import Row from '@src/components/Listing/Layout/Row';

type Props = {
  children: React.ReactNode;
};

const DialogActionSection = ({ children }: Props) => (
  <DialogActionsUI>
    <Row
      gap="16px"
      mainAlignment="flex-end"
      padding="16px"
    >
      {children}
    </Row>
  </DialogActionsUI>
);

export default DialogActionSection;
