import * as React from 'react';

// Components
import SvgIcon from '@src/components/concrete/Icons/SvgIcon';

// Types
import { Icon } from '@src/typings/types';

const CheckItem = ({ stylesArray }: Icon & React.SVGAttributes<{}>) => (
  <SvgIcon
    style={{
      height: '1em',
      width: '1em',
      fill: '#00c6ff',
    }}
    stylesArray={stylesArray}
  >
    <path
      d="m1.29 11.98c-.29-.3-.76-.31-1.06-.02s-.31.76-.02 1.06l6.75 7c .29.3.78.31 1.07.01l15.75-16c .29-.3.29-.77-.01-1.06s-.77-.29-1.06.01l-15.21 15.45z"
      fillRule="evenodd"
    />
  </SvgIcon>
);

export default CheckItem;
