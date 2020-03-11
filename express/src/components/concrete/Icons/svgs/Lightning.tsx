import * as React from 'react';

// Components
import SvgIcon from '@src/components/concrete/Icons/SvgIcon';

// Types
import { Icon } from '@src/typings/types';

const Lightning = ({ stylesArray }: Icon & React.SVGAttributes<{}>) => (
  <SvgIcon stylesArray={stylesArray}>
    <path
      d="M11 24V13H8l6-13v11h3z"
      fillRule="evenodd"
    />
  </SvgIcon>
);

export default Lightning;
