/* tslint:disable:max-line-length */
import * as React from 'react';

// Components
import SvgIcon from '@src/components/concrete/Icons/SvgIcon';

// Types
import { Icon } from '@src/typings/types';

const LocationPin = ({ stylesArray }: Icon & React.SVGAttributes<{}>) => (
  <SvgIcon
    style={{
      display: 'block',
      fill: 'currentColor',
      height: '1em',
      width: '1em',
    }}
    stylesArray={stylesArray}
  >
    <g fillRule="evenodd">
      <path d="M12 23.75c2.973 0 9.75-8.262 9.75-13.75A9.723 9.723 0 0 0 11.999.25 9.732 9.732 0 0 0 2.25 10c0 3.107 1.571 6.411 4.1 9.41 2.051 2.435 4.499 4.34 5.65 4.34zM3.75 10a8.232 8.232 0 0 1 8.251-8.25A8.223 8.223 0 0 1 20.25 10c0 2.546-1.414 5.536-3.696 8.318C14.76 20.505 12.586 22.25 12 22.25c-.542 0-2.734-1.707-4.504-3.806C5.175 15.69 3.75 12.693 3.75 10z" />
      <path d="M12 5a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9zm0 7.5a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" />
    </g>
  </SvgIcon>
);

export default LocationPin;
