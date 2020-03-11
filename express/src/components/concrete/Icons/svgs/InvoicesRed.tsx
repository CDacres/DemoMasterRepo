import * as React from 'react';

// Components
import SvgIcon from '@src/components/concrete/Icons/SvgIcon';

// Types
import { Icon } from '@src/typings/types';

const InvoicesRed = ({ stylesArray }: Icon & React.SVGAttributes<{}>) => (
  <SvgIcon
    stylesArray={stylesArray}
    viewBox="0 0 64 64"
  >
    <path
      d="M32 8L4 58h56L32 8z"
      data-name="layer2"
      fill="none"
      stroke="#ff0000"
      strokeLinecap="round"
      strokeMiterlimit="10"
      strokeWidth="3"
    />
    <path
      d="M32 41V25m-1.5 22"
      data-name="layer1"
      fill="none"
      stroke="#ff0000"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit="10"
      strokeWidth="3"
    />
    <circle
      cx="32"
      cy="48"
      data-name="layer1"
      fill="none"
      r="2"
      stroke="#ff0000"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit="10"
      strokeWidth="3"
    />
  </SvgIcon>
);

export default InvoicesRed;
