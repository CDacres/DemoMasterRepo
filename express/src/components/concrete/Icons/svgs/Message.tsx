/* tslint:disable:max-line-length */
import * as React from 'react';

// Components
import SvgIcon from '@src/components/concrete/Icons/SvgIcon';

// Types
import { Icon } from '@src/typings/types';

const Message = ({ stylesArray }: Icon & React.SVGAttributes<{}>) => (
  <SvgIcon
    path="m1.63 12.72v-6.84c0-2.21 1.78-3.99 3.97-3.99h12.81c2.19 0 3.97 1.79 3.97 3.99v6.84c0 2.21-1.77 3.99-3.96 3.99h-4.34v3.46c-.46-.42-.92-.84-1.35-1.24l-.03-.03c-1.17-1.08-1.97-1.82-2.18-2.04l-.17-.17h-4.75c-2.19 0-3.96-1.79-3.96-3.99zm8.26 5.13c.35.34 1.06.99 2.05 1.91l.03.03c.5.46 1.04.96 1.58 1.45l.52.48.2.18.95.86v-4.89h3.2c2.82 0 5.09-2.3 5.09-5.14v-6.85c-.01-2.83-2.29-5.13-5.11-5.13h-12.8c-2.82 0-5.1 2.3-5.1 5.13v6.84c0 2.84 2.28 5.13 5.1 5.13z"
    style={{
      display: 'block',
      fill: 'currentColor',
      height: '26px',
      width: '26px',
    }}
    stylesArray={stylesArray}
  />
);

export default Message;
