/* tslint:disable:max-line-length */
import * as React from 'react';

// Components
import SvgIcon from '@src/components/concrete/Icons/SvgIcon';

// Types
import { Icon } from '@src/typings/types';

const Calendar = ({ stylesArray }: Icon & React.SVGAttributes<{}>) => (
  <SvgIcon
    path="M22 9.5V3h-4.75V1a.75.75 0 1 0-1.5 0v2H8.249l.001-2a.75.75 0 1 0-1.5 0l-.001 2H2v19.008a1 1 0 0 0 .992.992h18.016a1 1 0 0 0 .992-.992V9.5zm-18.5-5h3.248V5a.75.75 0 0 0 1.5 0v-.5h7.502V5a.75.75 0 0 0 1.5 0v-.5h3.25V8h-17V4.5zm0 17v-12h17v12h-17z"
    style={{
      display: 'block',
      fill: 'currentColor',
      height: '1em',
      width: '1em',
    }}
    stylesArray={stylesArray}
  />
);

export default Calendar;
