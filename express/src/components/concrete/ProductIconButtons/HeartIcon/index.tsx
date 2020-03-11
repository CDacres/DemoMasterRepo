import * as React from 'react';

// Styles
import productIconButtonStyles from '../styles';

// Components
import { Heart } from '@src/components/concrete/Icons/svgs';

type Props = {
  like: boolean;
};

const HeartIcon = ({ like }: Props) => (
  <Heart
    fill={like ? '#00c6ff' : '#484848'}
    fillOpacity={like ? 1 : 0}
    focusable="true"
    stroke={like ? '#00c6ff' : '#484848'}
    stylesArray={[productIconButtonStyles.icons]}
  />
);

export default HeartIcon;
