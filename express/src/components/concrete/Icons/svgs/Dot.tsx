import * as React from 'react';

// Components
import SvgIcon from '@src/components/concrete/Icons/SvgIcon';

// Types
import { Icon } from '@src/typings/types';

const Dot = ({ stylesArray }: Icon & React.SVGAttributes<{}>) => (
  <SvgIcon
    stylesArray={stylesArray}
    viewBox="1 1 1 1"
  >
    <circle
      cx="3"
      cy="3"
      r="3"
    />
  </SvgIcon>
);

export default Dot;
