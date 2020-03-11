import * as React from 'react';

// Components
import SvgIcon from '@src/components/concrete/Icons/SvgIcon';

// Types
import { Icon } from '@src/typings/types';

const InvoicesBlue = ({ stylesArray }: Icon & React.SVGAttributes<{}>) => (
  <SvgIcon
    stylesArray={stylesArray}
    viewBox="0 0 64 64"
  >
    <path
      d="M28.8 19.5a21.1 21.1 0 0 0-7.1 2.2c-7.9 4.2-9.2 11-9.2 16.3s2.3 13.1 10.8 20h7.3v-4l8.9.5a20.1 20.1 0 0 0 2.3 3.5h6.7v-6a47.9 47.9 0 0 0 6-5c2.9.3 5.9-2 7-8.7 0-1-.5-1.3-1-1.3a6.8 6.8 0 0 1-3-1c-.4-.5-1.6-4.7-3.8-8a11.7 11.7 0 0 1 4.1-5.2c-2.8-1.4-5.7-2.4-11.4-1.8-1.5-.3-4-.9-6.4-1.3"
      data-name="layer1"
      fill="none"
      stroke="#055af3"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit="10"
      strokeWidth="3"
    />
    <circle
      cx="34.5"
      cy="14"
      data-name="layer2"
      fill="none"
      r="8"
      stroke="#055af3"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit="10"
      strokeWidth="3"
    />
    <path
      d="M12.5 38c-2.9-.3-10-1.4-10 2s1.9 3.4 3.8 2.6 4.3-5.5-3.8-8.6m25.7-8.9a20.1 20.1 0 0 1 12.7-.1"
      data-name="layer1"
      fill="none"
      stroke="#055af3"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit="10"
      strokeWidth="3"
    />
    <circle
      cx="48.5"
      cy="34"
      data-name="layer1"
      fill="none"
      r="1"
      stroke="#055af3"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit="10"
      strokeWidth="3"
    />
  </SvgIcon>
);

export default InvoicesBlue;
