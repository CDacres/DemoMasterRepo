import * as React from 'react';

// MaterialUI
import { Close as CloseUI } from '@material-ui/icons';

type Props = {
  isLarge?: boolean;
};

const Close = ({ isLarge }: Props) => (
  <CloseUI {...(isLarge ? { fontSize: 'inherit' } : {})} />
);

export default Close;
