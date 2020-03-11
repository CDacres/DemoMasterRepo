import * as React from 'react';

// Components
import SvgIcon from '@src/components/concrete/Icons/SvgIcon';

// Types
import { Icon } from '@src/typings/types';

const Check = ({ stroke, stylesArray }: Icon & React.SVGAttributes<{}>) => (
  <SvgIcon
    fill="currentColor"
    fillOpacity={0}
    path="M19.1 25.2l4.7 6.2 12.1-11.2"
    stroke={stroke}
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={3}
    stylesArray={stylesArray}
    viewBox="0 0 52 52"
  />
);

export default Check;
