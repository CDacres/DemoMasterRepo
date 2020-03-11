/* tslint:disable:max-line-length */
import * as React from 'react';

// Components
import SvgIcon from '@src/components/concrete/Icons/SvgIcon';

// Types
import { Icon } from '@src/typings/types';

const Pause = ({ stylesArray }: Icon & React.SVGAttributes<{}>) => (
  <SvgIcon
    path="m0 1.01c0-.56.44-1.01 1.01-1.01h1.98c.56 0 1.01.45 1.01 1.01v11.98c0 .56-.44 1.01-1.01 1.01h-1.98c-.56 0-1.01-.45-1.01-1.01zm7 0c0-.56.44-1.01 1.01-1.01h1.98c.56 0 1.01.45 1.01 1.01v11.98c0 .56-.44 1.01-1.01 1.01h-1.98c-.56 0-1.01-.45-1.01-1.01z"
    stylesArray={stylesArray}
    viewBox="0 0 11 14"
  />
);

export default Pause;
