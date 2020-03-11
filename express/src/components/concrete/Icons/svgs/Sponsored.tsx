import * as React from 'react';

// Components
import SvgIcon from '@src/components/concrete/Icons/SvgIcon';

// Types
import { Icon } from '@src/typings/types';

const Sponsored = ({ stylesArray }: Icon & React.SVGAttributes<{}>) => (
  <SvgIcon
    stylesArray={stylesArray}
    viewBox="0 0 64 64"
  >
    <path
      d="M32 45.2V47a9 9 0 0 1-9 9 9 9 0 0 1-9-9v-7.2"
      data-name="layer2"
      fill="none"
      stroke="#ff5a5f"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit="10"
      strokeWidth="3"
    />
    <path
      d="M2 24v16M62 6v52M2 28l60-18M2 36l60 18"
      data-name="layer1"
      fill="none"
      stroke="#ff5a5f"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit="10"
      strokeWidth="3"
    />
  </SvgIcon>
);

export default Sponsored;
