/* tslint:disable:max-line-length */
import * as React from 'react';

// Components
import SvgIcon from '@src/components/concrete/Icons/SvgIcon';

// Types
import { Icon } from '@src/typings/types';

const Camera = ({ stylesArray }: Icon & React.SVGAttributes<{}>) => (
  <SvgIcon stylesArray={stylesArray}>
    <path
      d="m12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm0 9a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm10-8a1 1 0 1 1 -2 0 1 1 0 0 1 2 0zm0-3h-3c-.56 0-.63-.02-.71-.11-.07-.07.03.07-.37-.54a27.01 27.01 0 0 0 -.48-.78c-.69-1.01-1.5-1.57-2.7-1.57h-5.48c-1.2 0-1.96.54-2.67 1.57-.09.12-.4.61-.47.71-.39.61-.62.72-1.12.72h-3c-1.15 0-2 1.06-2 2v11c0 .94.85 2 2 2h20c1.15 0 2-1.06 2-2v-11c0-.94-.85-2-2-2zm1 13c0 .43-.45 1-1 1h-20c-.55 0-1-.57-1-1v-11c0-.43.45-1 1-1h3c .82 0 1.37-.27 1.92-1.1.12-.17.43-.66.51-.76.53-.79 1.02-1.14 1.83-1.14h5.48c.82 0 1.35.37 1.87 1.14.12.18.5.8.47.76.49.74.35.53.47.67.33.37.64.44 1.46.44h3c .55 0 1 .57 1 1v11z"
      fillRule="evenodd"
    />
  </SvgIcon>
);

export default Camera;
