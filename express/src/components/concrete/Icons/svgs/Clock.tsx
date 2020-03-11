/* tslint:disable:max-line-length */
import * as React from 'react';

// Components
import SvgIcon from '@src/components/concrete/Icons/SvgIcon';

// Types
import { Icon } from '@src/typings/types';

const Clock = ({ stylesArray }: Icon & React.SVGAttributes<{}>) => (
  <SvgIcon
    path="M11.5 0C5.149 0 0 5.149 0 11.5S5.149 23 11.5 23 23 17.851 23 11.5 17.851 0 11.5 0zm4.354 15.854a.5.5 0 0 1-.708 0l-4-4A.5.5 0 0 1 11 11.5v-6a.5.5 0 1 1 1 0v5.793l3.854 3.853a.5.5 0 0 1 0 .708z"
    stylesArray={stylesArray}
  />
);

export default Clock;
