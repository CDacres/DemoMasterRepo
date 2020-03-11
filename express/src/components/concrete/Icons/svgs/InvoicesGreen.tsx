import * as React from 'react';

// Components
import SvgIcon from '@src/components/concrete/Icons/SvgIcon';

// Types
import { Icon } from '@src/typings/types';

const InvoicesGreen = ({ stylesArray }: Icon & React.SVGAttributes<{}>) => (
  <SvgIcon
    stylesArray={stylesArray}
    viewBox="0 0 64 64"
  >
    <path
      d="M15.74 30l12 14 34-42"
      data-name="layer2"
      fill="none"
      stroke="#1abe00"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit="10"
      strokeWidth="4"
    />
    <path
      d="M53.443 32A26.002 26.002 0 1 1 27.75 10a25.914 25.914 0 0 1 10 1.993"
      data-name="layer1"
      fill="none"
      stroke="#1abe00"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit="10"
      strokeWidth="4"
    />
  </SvgIcon>
);

export default InvoicesGreen;
