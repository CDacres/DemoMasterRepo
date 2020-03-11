import * as React from 'react';

// Styles
import productIconButtonStyles from '../styles';

// Components
import { Share } from '@src/components/concrete/Icons/svgs';

const ShareIcon = () => (
  <Share
    focusable="true"
    role="img"
    stylesArray={[productIconButtonStyles.icons]}
  />
);

export default ShareIcon;
