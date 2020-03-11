import * as React from 'react';

// Components
import SvgIcon from '@src/components/concrete/Icons/SvgIcon';

// Types
import { Icon } from '@src/typings/types';

const PlusLine = ({ stylesArray }: Icon & React.SVGAttributes<{}>) => (
  <SvgIcon
    aria-label="add"
    role="img"
    style={{
      height: '1em',
      width: '1em',
      display: 'block',
      fill: 'currentColor',
    }}
    stylesArray={stylesArray}
  >
    <rect
      height={2}
      rx={1}
      width={12}
      x={6}
      y={11}
    />
    <rect
      height={12}
      rx={1}
      width={2}
      x={11}
      y={6}
    />
  </SvgIcon>
);

export default PlusLine;
