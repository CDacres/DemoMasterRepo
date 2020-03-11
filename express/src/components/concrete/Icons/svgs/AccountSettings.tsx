/* tslint:disable:max-line-length */
import * as React from 'react';

// Components
import SvgIcon from '@src/components/concrete/Icons/SvgIcon';

// Types
import { Icon } from '@src/typings/types';

const AccountSettings = ({ stylesArray }: Icon & React.SVGAttributes<{}>) => (
  <SvgIcon stylesArray={stylesArray}>
    <path d="m7.72 9.31 9.15 9.52a1 1 0 0 1 -.72 1.69h-9.15a1 1 0 0 1 -1-1v-9.52a1 1 0 0 1 1.72-.69z" />
    <path
      d="m8 17.5a.5.5 0 1 1 -.5-.5.5.5 0 0 1 .5.5zm-.5-3.5a.5.5 0 1 0 .5.5.5.5 0 0 0 -.5-.5zm0-3a .5.5 0 1 0 .5.5.5.5 0 0 0 -.5-.5zm12.5-4.5v15a1.5 1.5 0 0 1 -1.5 1.5h-13a1.5 1.5 0 0 1 -1.5-1.5v-15a1.5 1.5 0 0 1 1.5-1.5l1.51.03a.47.47 0 0 1 .05.01 2 2 0 0 1 1.94-1.54h.17a3 3 0 0 1 5.66 0h .17a2 2 0 0 1 2 2v1.5a1 1 0 0 1 -1 1h-8a1 1 0 0 1 -1-1v-.97h-.01l-1.5-.03a.5.5 0 0 0 -.49.5v15a .5.5 0 0 0 .5.5h13a .5.5 0 0 0 .5-.5v-15a .5.5 0 0 0 -.38-.49 5.13 5.13 0 0 0 -.34-.01.5.5 0 0 1 -.49-.51.51.51 0 0 1 .51-.49 2.71 2.71 0 0 1 .55.04 1.49 1.49 0 0 1 1.15 1.46zm-12 .5h8v-1.5a1 1 0 0 0 -1-1h-.96l-.08-.4a2 2 0 0 0 -3.92 0l-.08.4h-.96a1 1 0 0 0 -1 1zm8 10h-6.5a.5.5 0 0 0 0 1h6.5a.5.5 0 0 0 0-1zm0-3h-6.5a.5.5 0 0 0 0 1h6.5a.5.5 0 0 0 0-1zm0-3h-6.5a.5.5 0 0 0 0 1h6.5a.5.5 0 0 0 0-1z"
      fill="#484848"
    />
  </SvgIcon>
);

export default AccountSettings;
