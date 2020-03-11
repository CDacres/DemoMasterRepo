/* tslint:disable:max-line-length */
import * as React from 'react';

// Components
import SvgIcon from '@src/components/concrete/Icons/SvgIcon';

// Types
import { Icon } from '@src/typings/types';

const ThreeLine = ({ stylesArray }: Icon & React.SVGAttributes<{}>) => (
  <SvgIcon
    path="m15.25 12.5a.75.75 0 01-.75.75h-13a .75.75 0 010-1.5h13a .75.75 0 01 .75.75zm-.75-5.75h-13a .75.75 0 100 1.5h13a .75.75 0 000-1.5zm-13-3.5h13a .75.75 0 000-1.5h-13a .75.75 0 100 1.5z"
    style={{
      display: 'block',
      fill: 'currentColor',
      height: '1em',
      width: '1em',
    }}
    stylesArray={stylesArray}
    viewBox="0 0 16 16"
  />
);

export default ThreeLine;
