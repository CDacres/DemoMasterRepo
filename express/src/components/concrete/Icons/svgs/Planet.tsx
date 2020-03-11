import * as React from 'react';

// Components
import SvgIcon from '@src/components/concrete/Icons/SvgIcon';

// Types
import { Icon } from '@src/typings/types';

const Planet = ({ stylesArray }: Icon & React.SVGAttributes<{}>) => (
  <SvgIcon
    stylesArray={stylesArray}
    viewBox="0 0 64 64"
  >
    <ellipse
      cx="32"
      cy="32"
      data-name="layer2"
      fill="none"
      rx="16.1"
      ry="30"
      stroke="#00c6ff"
      strokeLinecap="round"
      strokeLinejoin="miter"
      strokeMiterlimit="10"
      strokeWidth="3"
    />
    <path
      d="M4.5 44h55m-55-24h55M32 2v60"
      data-name="layer2"
      fill="none"
      stroke="#00c6ff"
      strokeLinecap="round"
      strokeLinejoin="miter"
      strokeMiterlimit="10"
      strokeWidth="3"
    />
    <circle
      cx="32"
      cy="32"
      data-name="layer1"
      fill="none"
      r="30"
      stroke="#00c6ff"
      strokeLinecap="round"
      strokeLinejoin="miter"
      strokeMiterlimit="10"
      strokeWidth="4"
    />
  </SvgIcon>
);

export default Planet;
