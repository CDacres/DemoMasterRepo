/* tslint:disable:max-line-length */
import * as React from 'react';

// Components
import SvgIcon from '@src/components/concrete/Icons/SvgIcon';

// Types
import { Icon } from '@src/typings/types';

const YellowLine = ({ stylesArray }: Icon & React.SVGAttributes<{}>) => (
  <SvgIcon
    fill="currentColor"
    path="M85.84 2.324a660.672 660.672 0 0 0-13.71-.092 9.425 9.425 0 0 1 1.648.585c.374.174.685.63.57 1.252-.114.612-.53.734-.91.553-2.173-1.04-4.4-1.053-6.596-1.092l-7.08-.125c-4.72-.082-9.44-.16-14.16-.24-6.202-.103-12.405-.214-18.607-.318-1.889.043-3.777.087-5.665.132-6.029.146-12.054.352-18.084.483-.392.008-.574-.599-.453-.972l-1.684-.024C.658 2.459.548 1.45 1.006 1.454c5.186.04 10.372.077 15.557.111 6.243-.241 12.49-.418 18.738-.576C46.039.716 56.784.539 67.536.452 73.569.404 79.609.447 85.64.384c.35-.004.72.328.78.903.053.523-.23 1.044-.581 1.037"
    preserveAspectRatio="none"
    stylesArray={stylesArray}
    viewBox="0 0 87 5"
  />
);

export default YellowLine;
