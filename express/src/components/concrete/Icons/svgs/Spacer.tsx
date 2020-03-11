import * as React from 'react';

// Components
import SvgIcon from '@src/components/concrete/Icons/SvgIcon';

// Types
import { Icon } from '@src/typings/types';

const Spacer = ({ stylesArray }: Icon & React.SVGAttributes<{}>) => (
  <SvgIcon
    path="M19.1 19.1 l14 14 m 0 -14 l -14 14"
    stylesArray={stylesArray}
    viewBox="0 0 52 52"
  />
);

export default Spacer;
