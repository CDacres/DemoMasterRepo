/* tslint:disable:max-line-length */
import * as React from 'react';

// Components
import SvgIcon from '@src/components/concrete/Icons/SvgIcon';

// Types
import { Icon } from '@src/typings/types';

const Suitcase = ({ stylesArray }: Icon & React.SVGAttributes<{}>) => (
  <SvgIcon
    path="M21.5 5H16V3.499C16 2.667 15.328 2 14.497 2H9.503C8.665 2 8 2.668 8 3.499V5H2.5A2.501 2.501 0 0 0 0 7.494v12.012A2.499 2.499 0 0 0 2.5 22h19a2.5 2.5 0 0 0 2.5-2.494V7.494A2.499 2.499 0 0 0 21.5 5zM3 10v11h-.5c-.828 0-1.5-.67-1.5-1.494V7.494C1 6.672 1.675 6 2.5 6H3v4zm2 11H4V6h1v15zM9 3.499c0-.28.218-.499.503-.499h4.994c.28 0 .503.221.503.499V5H9V3.499zM18 21H6V6h12v15zm2 0h-1V6h1v15zm3-1.494c0 .822-.675 1.494-1.5 1.494H21V6h.5c.828 0 1.5.67 1.5 1.494v12.012z"
    style={{
      display: 'block',
      fill: 'currentColor',
      height: '26px',
      width: '26px',
    }}
    stylesArray={stylesArray}
  />
);

export default Suitcase;
