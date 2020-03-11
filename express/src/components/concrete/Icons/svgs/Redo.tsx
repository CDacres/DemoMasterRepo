/* tslint:disable:max-line-length */
import * as React from 'react';

// Components
import SvgIcon from '@src/components/concrete/Icons/SvgIcon';

// Types
import { Icon } from '@src/typings/types';

const Redo = ({ stylesArray }: Icon & React.SVGAttributes<{}>) => (
  <SvgIcon
    path="M23 11.5C23 17.851 17.851 23 11.5 23S0 17.851 0 11.5 5.149 0 11.5 0c3.87 0 7.385 1.944 9.5 5.06V2.5a.5.5 0 1 1 1 0v4a.5.5 0 0 1-.5.5h-4a.5.5 0 0 1 0-1h2.926C18.53 2.93 15.19 1 11.5 1 5.701 1 1 5.701 1 11.5S5.701 22 11.5 22 22 17.299 22 11.5a.5.5 0 1 1 1 0z"
    stylesArray={stylesArray}
  />
);

export default Redo;
