/* tslint:disable:max-line-length */
import * as React from 'react';

// Components
import SvgIcon from '@src/components/concrete/Icons/SvgIcon';

// Types
import { Icon } from '@src/typings/types';

type Props = {
  direction?: string;
} & Icon & React.SVGAttributes<{}>;

const Chevron = ({ direction, role, stylesArray }: Props) => {
  if (direction === 'right') {
    return (
      <SvgIcon
        aria-label="Next"
        path="m4.29 1.71a1 1 0 1 1 1.42-1.41l8 8a1 1 0 0 1 0 1.41l-8 8a1 1 0 1 1 -1.42-1.41l7.29-7.29z"
        role={role}
        stylesArray={stylesArray}
        viewBox="0 0 18 18"
      />
    );
  } else if (direction === 'left') {
    return (
      <SvgIcon
        aria-label="Previous"
        path="m13.7 16.29a1 1 0 1 1 -1.42 1.41l-8-8a1 1 0 0 1 0-1.41l8-8a1 1 0 1 1 1.42 1.41l-7.29 7.29z"
        role={role}
        stylesArray={stylesArray}
        viewBox="0 0 18 18"
      />
    );
  } else {
    return (
      <SvgIcon
        path="M16.291 4.295a1 1 0 1 1 1.414 1.415l-8 7.995a1 1 0 0 1-1.414 0l-8-7.995a1 1 0 1 1 1.414-1.415l7.293 7.29 7.293-7.29z"
        stylesArray={stylesArray}
        viewBox="0 0 18 18"
      />
    );
  }
};

export default Chevron;
