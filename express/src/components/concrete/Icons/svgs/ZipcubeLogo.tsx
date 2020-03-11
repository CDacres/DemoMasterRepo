/* tslint:disable:max-line-length */
import * as React from 'react';

// Components
import SvgIcon from '@src/components/concrete/Icons/SvgIcon';

// Types
import { Icon } from '@src/typings/types';

const ZipcubeLogo = ({ fill, stylesArray, viewBox }: Icon & React.SVGAttributes<{}>) => (
  <SvgIcon
    stylesArray={stylesArray}
    viewBox={viewBox}
  >
    <g>
      <g>
        <path
          d="M13.1,10.8l3.7,2.2l-3.7,2l-3.7,-2l3.7,-2.2Z"
          style={{
            fill: fill ? fill : '#00b9ff',
            fillRule: 'nonzero',
          }}
        />
        <path
          d="M22.8,16.4l-3.7,-2.1l-3.7,2.1l3.6,2.1l0,6.9l-5.9,3.5l-6,-3.5l0,-6.9l-3.7,-2.1l0,11.1l9.7,5.6l9.7,-5.6l0,-11.1Z"
          style={{
            fill: fill ? fill : '#00b9ff',
            fillRule: 'nonzero',
          }}
        />
      </g>
    </g>
  </SvgIcon>
);

export default ZipcubeLogo;
