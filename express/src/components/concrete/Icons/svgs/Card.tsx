/* tslint:disable:max-line-length */
import * as React from 'react';

// Components
import SvgIcon from '@src/components/concrete/Icons/SvgIcon';

// Types
import { Icon } from '@src/typings/types';

const Card = ({ stylesArray }: Icon & React.SVGAttributes<{}>) => (
  <SvgIcon
    style={{
      display: 'block',
      fill: 'currentColor',
    }}
    stylesArray={stylesArray}
    viewBox="0 0 40 24"
  >
    <path
      d="m39 21.5c0 .8-.7 1.5-1.5 1.5h-35c-.8 0-1.5-.7-1.5-1.5v-19c0-.8.7-1.5 1.5-1.5h35c .8 0 1.5.7 1.5 1.5z"
      fill="#fff"
    />
    <path
      d="m5 7c0-.5.5-1 1-1h8c .5 0 1 .5 1 1v4c0 .5-.5 1-1 1h-8c-.5 0-1-.5-1-1zm .5 10h5c .3 0 .5-.2.5-.5s-.2-.5-.5-.5h-5c-.3 0-.5.2-.5.5s.2.5.5.5zm8 0h5c .3 0 .5-.2.5-.5s-.2-.5-.5-.5h-5c-.3 0-.5.2-.5.5s.2.5.5.5zm8 0h5c .3 0 .5-.2.5-.5s-.2-.5-.5-.5h-5c-.3 0-.5.2-.5.5s.2.5.5.5zm8 0h5c .3 0 .5-.2.5-.5s-.2-.5-.5-.5h-5c-.3 0-.5.2-.5.5s.2.5.5.5z"
      fill="#c4c4c4"
    />
    <path
      d="m2.5 0h35c1.4 0 2.5 1.1 2.5 2.5v19c0 1.4-1.1 2.5-2.5 2.5h-35c-1.4 0-2.5-1.1-2.5-2.5v-19c0-1.4 1.1-2.5 2.5-2.5zm0 1c-.8 0-1.5.7-1.5 1.5v19c0 .8.7 1.5 1.5 1.5h35c .8 0 1.5-.7 1.5-1.5v-19c0-.8-.7-1.5-1.5-1.5z"
      fill="#dbdbdb"
    />
  </SvgIcon>
);

export default Card;
