/* tslint:disable:max-line-length */
import * as React from 'react';

// Components
import SvgIcon from '@src/components/concrete/Icons/SvgIcon';

// Types
import { Icon } from '@src/typings/types';

const RadioEllipsis = ({ stylesArray }: Icon & React.SVGAttributes<{}>) => (
  <SvgIcon
    style={{
      height: '1em',
      width: '1em',
      display: 'block',
      fill: 'currentColor',
    }}
    stylesArray={stylesArray}
    viewBox="0 0 16 16"
  >
    <ellipse
      cx="8"
      cy="8"
      fillRule="evenodd"
      rx="8"
      ry="8"
    />
  </SvgIcon>
);

export default RadioEllipsis;
