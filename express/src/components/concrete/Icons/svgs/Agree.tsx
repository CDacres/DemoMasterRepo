import * as React from 'react';

// Components
import SvgIcon from '@src/components/concrete/Icons/SvgIcon';

// Types
import { Icon } from '@src/typings/types';

const Agree = ({ stylesArray }: Icon & React.SVGAttributes<{}>) => (
  <SvgIcon
    stylesArray={stylesArray}
    viewBox="0 0 64 64"
  >
    <path
      d="M35.4 58H4a2 2 0 0 1-2-2V10a2 2 0 0 1 2-2h9.9M34 8h10a2 2 0 0 1 2 2v20"
      data-name="layer2"
      fill="none"
      stroke="#0abc00"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit="10"
      strokeWidth="3"
    />
    <path
      d="M32 6h-3.1a5 5 0 0 0-9.8 0H16a2 2 0 0 0-2 2v6h20V8a2 2 0 0 0-2-2zm6 26.1V14h-4m-20 0h-4v36h20.5M18 22h12M18 32h12M18 42h12"
      data-name="layer2"
      fill="none"
      stroke="#0abc00"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit="10"
      strokeWidth="3"
    />
    <circle
      cx="46"
      cy="46"
      data-name="layer1"
      fill="none"
      r="16"
      stroke="#0abc00"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit="10"
      strokeWidth="3"
    />
    <path
      d="M53 42l-8 9-5-5"
      data-name="layer1"
      fill="none"
      stroke="#0abc00"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit="10"
      strokeWidth="3"
    />
  </SvgIcon>
);

export default Agree;
