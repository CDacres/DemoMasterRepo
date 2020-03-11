/* tslint:disable:max-line-length */
import * as React from 'react';

// Components
import SvgIcon from '@src/components/concrete/Icons/SvgIcon';

// Types
import { Icon } from '@src/typings/types';

const NineDot = ({ stylesArray }: Icon & React.SVGAttributes<{}>) => (
  <SvgIcon
    style={{
      height: '15px',
      width: '15px',
      display: 'block',
      fill: 'currentColor',
    }}
    stylesArray={stylesArray}
    viewBox="0 0 17 17"
  >
    <circle
      cx="1.5"
      cy="1.5"
      r="1.5"
    />
    <circle
      cx="1.5"
      cy="8.5"
      r="1.5"
    />
    <circle
      cx="8.5"
      cy="1.5"
      r="1.5"
    />
    <circle
      cx="8.5"
      cy="8.5"
      r="1.5"
    />
    <circle
      cx="15.5"
      cy="1.5"
      r="1.5"
    />
    <circle
      cx="15.5"
      cy="8.5"
      r="1.5"
    />
    <circle
      cx="1.5"
      cy="15.5"
      r="1.5"
    />
    <circle
      cx="8.5"
      cy="15.5"
      r="1.5"
    />
    <circle
      cx="15.5"
      cy="15.5"
      r="1.5"
    />
  </SvgIcon>
);

export default NineDot;
