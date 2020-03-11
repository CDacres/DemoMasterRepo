/* tslint:disable:max-line-length */
import * as React from 'react';

// Components
import SvgIcon from '@src/components/concrete/Icons/SvgIcon';

// Types
import { Icon } from '@src/typings/types';

const FoldOutMap = ({ stylesArray }: Icon & React.SVGAttributes<{}>) => (
  <SvgIcon
    path="m1.68 15.23 3.84-.96 4.84.97a.75.75 0 0 0 .33-.01l4-1a .75.75 0 0 0 .57-.73v-12a .75.75 0 0 0 -.93-.73l-3.84.96-4.84-.97a.75.75 0 0 0 -.33.01l-4 1a .75.75 0 0 0 -.57.73v12a .75.75 0 0 0 .93.73zm9.57-12.14 2.5-.63v10.45l-2.5.63zm-1.5 10.5-3.5-.7v-10.47l3.5.7zm-5-.67-2.5.63v-10.45l2.5-.63z"
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

export default FoldOutMap;
