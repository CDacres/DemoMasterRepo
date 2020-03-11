/* tslint:disable:max-line-length */
import * as React from 'react';

// Components
import SvgIcon from '@src/components/concrete/Icons/SvgIcon';

// Types
import { Icon } from '@src/typings/types';

const SliderDashboard = ({ stylesArray }: Icon & React.SVGAttributes<{}>) => (
  <SvgIcon
    fillRule="evenodd"
    path="m3.99 4.05c.002-.019.01-.033.01-.05v-2.5a.5.5 0 10-1 0v2.5c0 .018.008.032.01.05a2.5 2.5 0 00-.01 4.9v13.55a.5.5 0 001 0v-13.55a2.5 2.5 0 00-.01-4.9zm-.49 3.95a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm7.5 7.05v-13.55a.5.5 0 10-1 0v13.55a2.5 2.5 0 000 4.9v2.55a.5.5 0 001 0v-2.55a2.5 2.5 0 000-4.9zm-.5 3.95a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm7.49-14.95c.002-.018.01-.032.01-.05v-2.5a.5.5 0 10-1 0v2.5c0 .018.008.032.01.05a2.5 2.5 0 00-.01 4.9v13.55a.5.5 0 001 0v-13.55a2.5 2.5 0 00-.01-4.9zm-.49 3.95a1.5 1.5 0 110-3 1.5 1.5 0 010 3z"
    stylesArray={stylesArray}
  />
);

export default SliderDashboard;
