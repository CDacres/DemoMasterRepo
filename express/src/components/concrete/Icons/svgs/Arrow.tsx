/* tslint:disable:max-line-length */
import * as React from 'react';

// Components
import SvgIcon from '@src/components/concrete/Icons/SvgIcon';

// Types
import { Icon } from '@src/typings/types';

type Props = {
  direction: string;
} & Icon & React.SVGAttributes<{}>;

const Arrow = ({ direction, stylesArray }: Props) => {
  if (direction === 'right') {
    return (
      <SvgIcon
        path="m0 12.5a.5.5 0 0 0 .5.5h21.79l-6.15 6.15a.5.5 0 1 0 .71.71l7-7v-.01a.5.5 0 0 0 .14-.35.5.5 0 0 0 -.14-.35v-.01l-7-7a .5.5 0 0 0 -.71.71l6.15 6.15h-21.79a.5.5 0 0 0 -.5.5z"
        style={{
          height: '15px',
          width: '15px',
          display: 'block',
          fill: 'currentColor',
        }}
        stylesArray={stylesArray}
      />
    );
  } else {
    return (
      <SvgIcon
        path="M336.2 274.5l-210.1 210h805.4c13 0 23 10 23 23s-10 23-23 23H126.1l210.1 210.1c11 11 11 21 0 32-5 5-10 7-16 7s-11-2-16-7l-249.1-249c-11-11-11-21 0-32l249.1-249.1c21-21.1 53 10.9 32 32z"
        stylesArray={stylesArray}
        viewBox="0 0 1000 1000"
      />
    );
  }
};

export default Arrow;
