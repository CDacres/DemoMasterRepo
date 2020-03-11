/* tslint:disable:max-line-length */
import * as React from 'react';

// Components
import SvgIcon from '@src/components/concrete/Icons/SvgIcon';

// Types
import { Icon } from '@src/typings/types';

const Lock = ({ stylesArray }: Icon & React.SVGAttributes<{}>) => (
  <SvgIcon
    path="M19.5 9H19V7A7 7 0 1 0 5 7v2h-.5C3.724 9 3 9.724 3 10.5v12c0 .776.724 1.5 1.5 1.5h15c.776 0 1.5-.724 1.5-1.5v-12c0-.776-.724-1.5-1.5-1.5zm.5 13.5c0 .224-.276.5-.5.5h-15c-.224 0-.5-.276-.5-.5v-12c0-.224.276-.5.5-.5h1a.5.5 0 0 0 .5-.5V7a6 6 0 1 1 12 0v2.5a.5.5 0 0 0 .5.5h1c.224 0 .5.276.5.5v12zM12 12a3 3 0 0 0-3 3c0 .83.355 1.591.936 2.149l-.898 2.16A.5.5 0 0 0 9.5 20h5a.5.5 0 0 0 .464-.686l-.874-2.186c.562-.548.91-1.306.91-2.128a3 3 0 0 0-3-3zm1.036 5.186L13.76 19h-3.51l.743-1.786a.5.5 0 0 0-.168-.596A2 2 0 1 1 14 15c0 .643-.305 1.237-.795 1.597a.5.5 0 0 0-.17.589zM12 3a4 4 0 0 0-4 4v2.5a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 .5-.5V7a4 4 0 0 0-4-4zm3 6H9V7a3 3 0 1 1 6 0v2z"
    stylesArray={stylesArray}
  />
);

export default Lock;
