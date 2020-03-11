/* tslint:disable:max-line-length */
import * as React from 'react';

// Components
import SvgIcon from '@src/components/concrete/Icons/SvgIcon';

// Types
import { Icon } from '@src/typings/types';

const ShareWithOther = ({ stylesArray }: Icon & React.SVGAttributes<{}>) => (
  <SvgIcon
    aria-label="More Share Options"
    path="m10.5 3.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm-4.5 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm-4.5 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"
    role="img"
    style={{
      display: 'block',
      fill: '#484848',
      height: '18px',
      width: '18px',
    }}
    stylesArray={stylesArray}
    viewBox="0 0 12 4"
  />
);

export default ShareWithOther;
