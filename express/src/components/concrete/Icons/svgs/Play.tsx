/* tslint:disable:max-line-length */
import * as React from 'react';

// Components
import SvgIcon from '@src/components/concrete/Icons/SvgIcon';

// Types
import { Icon } from '@src/typings/types';

const Play = ({ stylesArray }: Icon & React.SVGAttributes<{}>) => (
  <SvgIcon
    path="m0 .63c0-.51.57-.81.99-.52l9.64 6.17c.49.35.49 1.08 0 1.43l-9.64 6.17c-.42.3-.99 0-.99-.52z"
    stylesArray={stylesArray}
    viewBox="0 0 11 14"
  />
);

export default Play;
